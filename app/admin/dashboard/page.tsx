'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchDashboard()
  }, [])

  const fetchDashboard = async () => {
    const { data: qData } = await supabase.from('quarters').select('*').eq('status', 'published').maybeSingle()
    if (!qData) {
      setLoading(false)
      return
    }

    const { data: orgs } = await supabase.from('organisations').select('*').eq('status', 'approved')
    const { data: orders } = await supabase.from('orders').select('*, order_items(*)').eq('quarter_id', qData.id)
    const { data: catalogue } = await supabase.from('catalogue_items').select('*').eq('quarter_id', qData.id)

    const orderedOrgIds = new Set(orders?.map(o => o.organisation_id))
    const notYetOrdered = orgs?.filter(org => !orderedOrgIds.has(org.id)) || []

    const pendingPickups = orders?.filter(o => o.status === 'ready_for_pickup').length || 0
    const totalOrders = orders?.length || 0

    // Demand Table calculation
    const demand = catalogue?.map(cat => {
      const totalOrdered = orders?.reduce((sum, order) => {
        const item = order.order_items.find((i: any) => i.catalogue_item_id === cat.id)
        return sum + (item ? item.quantity : 0)
      }, 0) || 0
      const remaining = cat.stock_quantity - totalOrdered
      return {
        ...cat,
        totalOrdered,
        remaining
      }
    }) || []

    setData({
      quarter: qData,
      totalOrders,
      pendingPickups,
      notYetOrdered,
      demand
    })
    setLoading(false)
  }

  if (loading) return <div>Loading dashboard...</div>

  if (!data) return (
    <div className="text-center p-12 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-900">No Active Quarter</h2>
      <p className="mt-2 text-gray-600">Publish a quarter to see the dashboard metrics.</p>
      <Link href="/admin/quarters" className="text-blue-600 mt-4 inline-block hover:underline">Manage Quarters</Link>
    </div>
  )

  const daysLeft = Math.ceil((new Date(data.quarter.deadline_date).getTime() - new Date().getTime()) / (1000 * 3600 * 24))

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard - {data.quarter.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <p className="text-sm font-medium text-gray-500 truncate">Total Orders</p>
          <p className="mt-1 text-3xl font-semibold text-gray-900">{data.totalOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-yellow-500">
          <p className="text-sm font-medium text-gray-500 truncate">Pending Pickup</p>
          <p className="mt-1 text-3xl font-semibold text-gray-900">{data.pendingPickups}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-red-500">
          <p className="text-sm font-medium text-gray-500 truncate">Orgs Not Yet Ordered</p>
          <p className="mt-1 text-3xl font-semibold text-gray-900">{data.notYetOrdered.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
          <p className="text-sm font-medium text-gray-500 truncate">Deadline Countdown</p>
          <p className="mt-1 text-3xl font-semibold text-gray-900">
            {daysLeft > 0 ? `${daysLeft} days` : 'Past Deadline'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-medium text-gray-900">Live Demand Table</h3>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Set</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ordered</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.demand.map((item: any) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">{item.stock_quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">{item.totalOrdered}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold">
                    <span className={
                      item.remaining > 50 ? 'text-green-600' :
                      item.remaining > 0 ? 'text-amber-500' : 'text-red-600'
                    }>
                      {item.remaining}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-medium text-gray-900">Not Yet Ordered</h3>
          </div>
          <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {data.notYetOrdered.map((org: any) => (
              <li key={org.id} className="p-4">
                <p className="text-sm font-medium text-gray-900">{org.org_name}</p>
                <p className="text-xs text-gray-500">{org.org_type} • {org.contact_name}</p>
              </li>
            ))}
            {data.notYetOrdered.length === 0 && (
              <li className="p-4 text-sm text-gray-500 text-center">All approved orgs have ordered!</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}
