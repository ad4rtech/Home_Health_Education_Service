'use client'

import { useEffect, useState, use } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function ViewOrderPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const orderId = resolvedParams.id
  const [order, setOrder] = useState<any>(null)
  const [quarter, setQuarter] = useState<any>(null)
  const [items, setItems] = useState<any[]>([])
  const supabase = createClient()

  useEffect(() => {
    async function fetchData() {
      const { data: oData } = await supabase.from('orders').select('*').eq('id', orderId).single()
      if (!oData) return
      setOrder(oData)
      const { data: qData } = await supabase.from('quarters').select('*').eq('id', oData.quarter_id).single()
      setQuarter(qData)
      const { data: itemsData } = await supabase.from('order_items').select('*, catalogue_items(*)').eq('order_id', orderId)
      setItems(itemsData || [])
    }
    fetchData()
  }, [])

  if (!order) return <div className="max-w-4xl mx-auto py-8">Loading order...</div>

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + (item.quantity * item.catalogue_items.price), 0)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Order #{orderId.split('-')[0]}</h1>
        <div className="space-x-4">
          <Link href="/rep/dashboard" className="text-blue-600 hover:underline">Back to Dashboard</Link>
          {order.status === 'submitted' && (
             <Link href={`/rep/order/${orderId}/edit`} className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md hover:bg-yellow-200 font-medium ml-4">
               Amend Order
             </Link>
          )}
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <p><strong>Status:</strong> <span className="uppercase bg-blue-100 px-2 py-1 rounded text-blue-800 text-sm font-semibold ml-2">{order.status.replace(/_/g, ' ')}</span></p>
        <p><strong>Quarter:</strong> {quarter?.name}</p>
        
        <table className="min-w-full divide-y divide-gray-200 mt-6 border">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Quantity</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Subtotal (KES)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map((i: any) => (
              <tr key={i.id}>
                <td className="px-4 py-4">{i.catalogue_items.category}</td>
                <td className="px-4 py-4 text-right">{i.quantity}</td>
                <td className="px-4 py-4 text-right">{(i.quantity * i.catalogue_items.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50 font-bold">
            <tr>
              <td className="px-4 py-4 text-right">Total:</td>
              <td className="px-4 py-4 text-right">{totalItems}</td>
              <td className="px-4 py-4 text-right">KES {totalPrice.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
