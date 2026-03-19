'use client'

import { useEffect, useState, use } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function EditOrderPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const orderId = resolvedParams.id
  
  const [order, setOrder] = useState<any>(null)
  const [quarter, setQuarter] = useState<any>(null)
  const [catalogue, setCatalogue] = useState<any[]>([])
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [cancelling, setCancelling] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data: oData } = await supabase.from('orders').select('*').eq('id', orderId).single()
    if (!oData) return setLoading(false)
    setOrder(oData)

    const { data: qData } = await supabase.from('quarters').select('*').eq('id', oData.quarter_id).single()
    setQuarter(qData)

    const { data: catData } = await supabase.from('catalogue_items').select('*').eq('quarter_id', oData.quarter_id)
    if (catData) setCatalogue(catData)

    const { data: itemsData } = await supabase.from('order_items').select('*').eq('order_id', orderId)
    
    const initialQs: Record<string, number> = {}
    if (catData) {
      catData.forEach(c => initialQs[c.id] = 0)
    }
    if (itemsData) {
      itemsData.forEach(item => {
        initialQs[item.catalogue_item_id] = item.quantity
      })
    }
    setQuantities(initialQs)
    setLoading(false)
  }

  const handleAmend = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    const itemsPayload = Object.entries(quantities).map(([id, qty]) => ({
      catalogue_item_id: id,
      quantity: qty
    }))

    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: itemsPayload })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to amend order')

      router.push('/rep/dashboard')
    } catch (err: any) {
      setError(err.message)
      setSubmitting(false)
    }
  }

  const handleCancel = async () => {
    if (!confirm('Are you sure you want to cancel this order? This cannot be undone.')) return
    
    setCancelling(true)
    try {
      const res = await fetch(`/api/orders/${orderId}/cancel`, { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to cancel order')

      router.push('/rep/dashboard')
    } catch (err: any) {
      setError(err.message)
      setCancelling(false)
    }
  }

  if (loading) return <div>Loading order details...</div>
  if (!order || order.status === 'collected' || order.status === 'cancelled') {
    return <div className="text-red-600 p-8 text-center text-xl font-bold">This order cannot be amended.</div>
  }

  const totalItems = Object.values(quantities).reduce((a, b) => a + b, 0)
  const totalPrice = catalogue.reduce((sum, item) => sum + (item.price * (quantities[item.id] || 0)), 0)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Amend Order - #{orderId.split('-')[0]}</h1>
        <button onClick={handleCancel} disabled={cancelling}
          className="px-4 py-2 border border-red-300 text-red-700 bg-red-50 hover:bg-red-100 rounded-md font-medium disabled:opacity-50">
          {cancelling ? 'Cancelling...' : 'Cancel Order'}
        </button>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <form onSubmit={handleAmend} className="space-y-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-32">Quantity</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {catalogue.map(item => (
                <tr key={item.id}>
                  <td className="px-4 py-4 font-medium text-gray-900">{item.category}</td>
                  <td className="px-4 py-4 text-gray-600">{item.price} KES</td>
                  <td className="px-4 py-4">
                    <input type="number" min="0" required
                      className="block w-full border border-gray-300 rounded-md shadow-sm p-2 sm:text-sm focus:ring-blue-500"
                      value={quantities[item.id] || ''}
                      onChange={e => setQuantities({ ...quantities, [item.id]: parseInt(e.target.value) || 0 })}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td colSpan={2} className="px-4 py-4 text-right font-bold text-gray-900">Total:</td>
                <td className="px-4 py-4 font-bold text-gray-900">{totalItems} items<br/><span className="text-sm text-gray-500">KES {totalPrice.toFixed(2)}</span></td>
              </tr>
            </tfoot>
          </table>

          {error && <div className="text-red-600 text-sm font-medium p-4 bg-red-50 rounded">{error}</div>}

          <div className="flex justify-end space-x-4">
            <Link href="/rep/dashboard" className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Discard Changes</Link>
            <button type="submit" disabled={submitting || totalItems === 0}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:opacity-50">
              {submitting ? 'Saving...' : 'Save Amendments'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
