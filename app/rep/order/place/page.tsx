'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function PlaceOrderPage() {
  const [quarter, setQuarter] = useState<any>(null)
  const [org, setOrg] = useState<any>(null)
  const [catalogue, setCatalogue] = useState<any[]>([])
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data: orgData } = await supabase.from('organisations').select('*').eq('user_id', user.id).single()
    setOrg(orgData)

    const { data: qData } = await supabase.from('quarters').select('*').eq('status', 'published').maybeSingle()
    if (qData) {
      setQuarter(qData)
      const { data: catData } = await supabase.from('catalogue_items').select('*').eq('quarter_id', qData.id)
      if (catData) {
        setCatalogue(catData)
        const initialQs: Record<string, number> = {}
        catData.forEach(c => initialQs[c.id] = 0)
        setQuantities(initialQs)
      }
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    const itemsPayload = Object.entries(quantities).map(([id, qty]) => ({
      catalogue_item_id: id,
      quantity: qty
    }))

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quarter_id: quarter.id,
          organisation_id: org.id,
          items: itemsPayload
        })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to submit order')

      router.push('/rep/dashboard')
    } catch (err: any) {
      setError(err.message)
      setSubmitting(false)
    }
  }

  if (loading) return <div>Loading order form...</div>

  if (!quarter) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">No Active Quarter</h2>
        <p className="mt-2 text-gray-600">Ordering is currently closed.</p>
        <Link href="/rep/dashboard" className="text-blue-600 mt-4 inline-block hover:underline">Return to Dashboard</Link>
      </div>
    )
  }

  const totalItems = Object.values(quantities).reduce((a, b) => a + b, 0)
  const totalPrice = catalogue.reduce((sum, item) => sum + (item.price * (quantities[item.id] || 0)), 0)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Place Order - {quarter.name}</h1>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <form onSubmit={handleSubmit} className="space-y-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price (KES)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Availability</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-32">Quantity</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {catalogue.map(item => {
                const stockStatus = item.stock_quantity > 50 ? 'Available' : item.stock_quantity > 0 ? 'Low' : 'Out'
                const stockColor = stockStatus === 'Available' ? 'text-green-600' : stockStatus === 'Low' ? 'text-yellow-600' : 'text-red-600'
                
                return (
                  <tr key={item.id}>
                    <td className="px-4 py-4 font-medium text-gray-900">{item.category}</td>
                    <td className="px-4 py-4 text-gray-600">{item.price}</td>
                    <td className={`px-4 py-4 font-semibold ${stockColor}`}>{stockStatus}</td>
                    <td className="px-4 py-4">
                      <input type="number" min="0" required
                        className="block w-full border border-gray-300 rounded-md shadow-sm p-2 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                        value={quantities[item.id] || ''}
                        onChange={e => setQuantities({ ...quantities, [item.id]: parseInt(e.target.value) || 0 })}
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td colSpan={3} className="px-4 py-4 text-right font-bold text-gray-900">Total:</td>
                <td className="px-4 py-4 font-bold text-gray-900">{totalItems} items<br/><span className="text-sm text-gray-500">KES {totalPrice.toFixed(2)}</span></td>
              </tr>
            </tfoot>
          </table>

          {error && <div className="text-red-600 text-sm font-medium p-4 bg-red-50 rounded">{error}</div>}

          <div className="flex justify-end space-x-4">
            <Link href="/rep/dashboard" className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Cancel</Link>
            <button type="submit" disabled={submitting || totalItems === 0}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:opacity-50 select-none">
              {submitting ? 'Submitting...' : 'Submit Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
