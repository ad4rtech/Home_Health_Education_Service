'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { exportToCSV, exportToPDF } from '@/lib/export'

export default function AdminReportsPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [overrides, setOverrides] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    const [ordersRes, overridesRes] = await Promise.all([
      supabase.from('orders').select('*, quarters(name), organisations(org_name, org_type), order_items(*, catalogue_items(category, price))').order('created_at', { ascending: false }),
      supabase.from('deadline_overrides').select('*, quarters(name), organisations(org_name), profiles(full_name)').order('created_at', { ascending: false })
    ])
    
    if (ordersRes.data) setOrders(ordersRes.data)
    if (overridesRes.data) setOverrides(overridesRes.data)
    setLoading(false)
  }

  const handleExportOrders = () => {
    const flatData = orders.map(o => {
      const totalItems = o.order_items.reduce((sum: number, i: any) => sum + i.quantity, 0)
      const totalPrice = o.order_items.reduce((sum: number, i: any) => sum + (i.quantity * i.catalogue_items.price), 0)
      return {
        'Order ID': o.id,
        'Quarter': o.quarters?.name,
        'Organisation': o.organisations?.org_name,
        'Type': o.organisations?.org_type,
        'Status': o.status,
        'Total Items': totalItems,
        'Total Cost (KES)': totalPrice,
        'Date': new Date(o.created_at).toLocaleDateString()
      }
    })
    exportToCSV('all_orders_report', flatData)
  }

  const handleExportOverrides = () => {
    const flatData = overrides.map(o => ({
      'ID': o.id,
      'Quarter': o.quarters?.name,
      'Organisation': o.organisations?.org_name,
      'Original Deadline': new Date(o.original_deadline).toLocaleDateString(),
      'New Deadline': new Date(o.new_deadline).toLocaleDateString(),
      'Reason': o.reason,
      'Granted By': o.profiles?.full_name,
      'Granted At': new Date(o.created_at).toLocaleString()
    }))
    exportToCSV('deadline_overrides_audit', flatData)
  }

  if (loading) return <div>Loading reports...</div>

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900">System Reports</h1>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">All Orders Master List</h2>
            <div className="space-x-4">
              <button onClick={handleExportOrders} className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 font-medium text-sm">Export CSV</button>
              <button onClick={() => exportToPDF('all_orders_report', 'orders-table')} className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 font-medium text-sm">Export PDF</button>
            </div>
          </div>
          <div className="overflow-x-auto" id="orders-table">
            <p className="text-gray-600 text-sm mb-2 text-center py-4 bg-gray-50 border rounded">Report ready for export: {orders.length} orders found across all quarters.</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <div className="flex justify-between items-center px-4">
          <h2 className="text-xl font-bold text-gray-800">Deadline Override Audit Log</h2>
          <button onClick={handleExportOverrides} className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 font-medium text-sm">Export Audit CSV</button>
        </div>
        <div className="overflow-x-auto mt-4 px-4">
          <table className="min-w-full divide-y divide-gray-200 border">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quarter</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Organisation</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">New Deadline</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Admin</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {overrides.map(o => (
                <tr key={o.id}>
                  <td className="px-4 py-3 text-sm">{o.quarters?.name}</td>
                  <td className="px-4 py-3 text-sm">{o.organisations?.org_name}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-blue-600">{new Date(o.new_deadline).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-sm">{o.reason}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{o.profiles?.full_name}</td>
                </tr>
              ))}
              {overrides.length === 0 && <tr><td colSpan={5} className="px-4 py-4 text-center text-sm text-gray-500">No overrides on record.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
