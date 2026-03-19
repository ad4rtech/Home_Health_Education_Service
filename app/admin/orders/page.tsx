'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  
  const supabase = createClient()

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    const { data: qData } = await supabase.from('quarters').select('*').eq('status', 'published').maybeSingle()
    if (!qData) {
      setLoading(false)
      return
    }

    const { data: oData } = await supabase.from('orders')
      .select('*, organisations(org_name, org_type)')
      .eq('quarter_id', qData.id)
      .order('created_at', { ascending: false })
      
    if (oData) setOrders(oData)
    setLoading(false)
  }

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/orders/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      if (!res.ok) throw new Error('Failed to update status')
      fetchOrders()
    } catch (e: any) {
      alert(e.message)
    }
  }

  const filteredOrders = orders.filter(o => {
    if (statusFilter !== 'all' && o.status !== statusFilter) return false
    if (typeFilter !== 'all' && o.organisations.org_type !== typeFilter) return false
    return true
  })

  if (loading) return <div>Loading orders...</div>

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
      </div>

      <div className="bg-white p-4 rounded-lg shadow flex space-x-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Status Filter</label>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
            className="mt-1 block w-48 border border-gray-300 rounded-md p-2">
            <option value="all">All Statuses</option>
            <option value="submitted">Submitted</option>
            <option value="ready_for_pickup">Ready for Pickup</option>
            <option value="collected">Collected</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Org Type Filter</label>
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
            className="mt-1 block w-48 border border-gray-300 rounded-md p-2">
            <option value="all">All Types</option>
            <option value="Church">Church</option>
            <option value="University">University</option>
            <option value="School">School</option>
          </select>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organisation</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.map(order => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                  <Link href={`/admin/orders/${order.id}`}>#{order.id.split('-')[0]}</Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.organisations?.org_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.organisations?.org_type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    order.status === 'collected' ? 'bg-green-100 text-green-800' :
                    order.status === 'ready_for_pickup' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status.replace(/_/g, ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  {order.status === 'submitted' && (
                    <button onClick={() => handleUpdateStatus(order.id, 'ready_for_pickup')} className="text-blue-600 hover:text-blue-900 bg-blue-50 px-3 py-1 rounded">Mark Ready</button>
                  )}
                  {order.status === 'ready_for_pickup' && (
                    <button onClick={() => handleUpdateStatus(order.id, 'collected')} className="text-green-600 hover:text-green-900 bg-green-50 px-3 py-1 rounded">Mark Collected</button>
                  )}
                </td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">No orders found matching filters.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
