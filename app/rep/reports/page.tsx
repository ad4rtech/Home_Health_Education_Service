'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { exportToCSV, exportToPDF } from '@/lib/export'

export default function RepReportsPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data: org } = await supabase.from('organisations').select('*').eq('user_id', user.id).single()
    if (!org) return setLoading(false)

    const { data } = await supabase.from('orders')
      .select('*, quarters(name), order_items(*, catalogue_items(category, price))')
      .eq('organisation_id', org.id)
      .order('created_at', { ascending: false })
      
    if (data) setOrders(data)
    setLoading(false)
  }

  const handleExportCSV = () => {
    const flatData = orders.map(o => {
      const totalItems = o.order_items.reduce((sum: number, i: any) => sum + i.quantity, 0)
      const totalPrice = o.order_items.reduce((sum: number, i: any) => sum + (i.quantity * i.catalogue_items.price), 0)
      return {
        'Order ID': o.id,
        'Quarter': o.quarters?.name,
        'Status': o.status,
        'Total Items': totalItems,
        'Total Cost (KES)': totalPrice,
        'Created At': new Date(o.created_at).toLocaleDateString()
      }
    })
    exportToCSV('order_history', flatData)
  }

  if (loading) return <div>Loading reports...</div>

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Order History & Reports</h1>
        <div className="space-x-4">
          <button onClick={handleExportCSV} className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 font-medium">
            Export to CSV
          </button>
          <button onClick={() => exportToPDF('order_history', 'report-table')} className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 font-medium">
            Export to PDF
          </button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md mt-6 p-4" id="report-table">
        <h2 className="text-xl font-bold mb-4 hidden print:block">HHES Ordering - Order History</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quarter</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total Items</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Cost (KES)</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((o) => {
              const totalItems = o.order_items.reduce((sum: number, i: any) => sum + i.quantity, 0)
              const totalPrice = o.order_items.reduce((sum: number, i: any) => sum + (i.quantity * i.catalogue_items.price), 0)
              return (
                <tr key={o.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{o.quarters?.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{o.id.split('-')[0]}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 uppercase text-xs font-semibold">{o.status.replace(/_/g, ' ')}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{totalItems}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">{totalPrice.toFixed(2)}</td>
                </tr>
              )
            })}
            {orders.length === 0 && (
              <tr><td colSpan={5} className="px-6 py-4 text-center text-gray-500">No order history found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
