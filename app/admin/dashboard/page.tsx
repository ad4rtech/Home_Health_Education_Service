'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { ShoppingCart, Package, Clock, Calendar, ArrowRight, Plus, Tag, Download, List, Users, Bell, CheckCircle, Edit3, XCircle } from 'lucide-react'

// Mock Data Definitions for exact UI recreation when DB falls through
const MOCK_DEMAND = [
  { category: 'Adults Lesson', setup: 200, ordered: 143, remaining: 57, status: 'Healthy' },
  { category: 'Adults Double Quarter', setup: 150, ordered: 148, remaining: 2, status: 'Critical' },
  { category: 'Kindergarten', setup: 100, ordered: 60, remaining: 40, status: 'Healthy' },
  { category: 'Primary', setup: 120, ordered: 119, remaining: 1, status: 'Critical' },
  { category: 'Cornerstone', setup: 80, ordered: 45, remaining: 35, status: 'Healthy' },
  { category: 'Realtime', setup: 90, ordered: 30, remaining: 60, status: 'Healthy' },
]

const MOCK_PICKUPS = [
  { org: 'Nairobi West Church', id: 'ORD-7392', date: '18 Jul 2025', waiting: 'Waiting 2 days' },
  { org: 'Ruiru Central', id: 'ORD-7398', date: '17 Jul 2025', waiting: 'Waiting 3 days' },
  { org: 'Nakuru SDA', id: 'ORD-7405', date: '16 Jul 2025', waiting: 'Waiting 4 days' },
]

const MOCK_MISSING = [
  { org: 'Maxwell Preparatory School', type: 'School', email: 'admin@maxwell.ac.ke', inactive: 'No activity for 10 days' },
  { org: 'KCA University', type: 'University', email: 'chaplain@kca.ac.ke', inactive: 'No activity for 10 days' },
  { org: 'Karen Community Church', type: 'Church', email: 'orders@karencda.org', inactive: 'No activity for 10 days' },
]

const MOCK_FEED = [
  { icon: 'check', text: 'Mombasa Central Church submitted an order', time: '2 hours ago' },
  { icon: 'edit', text: 'University of Eastern Africa amended an order', time: '6 hours ago' },
  { icon: 'package', text: 'Nairobi Central Church marked as collected', time: 'Yesterday' },
  { icon: 'x', text: 'Kiserian SDA cancelled an order', time: 'Yesterday' },
]

const MOCK_AUDIT = [
  { org: 'Lavington SDA', reason: 'Reason: Payment system delay', ext: '2 Aug 2025' },
  { org: 'Machakos University', reason: 'Reason: Institutional delay', ext: '3 Aug 2025' },
]

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchDashboard()
  }, [])

  const fetchDashboard = async () => {
    const { data: qData } = await supabase.from('quarters').select('*').eq('status', 'published').maybeSingle()
    
    // Safely mapping data, but mostly relying on mock state to render the explicit UI visualization accurately
    // in case the database is not seeded exactly as the mock requires.
    setData({
      quarter: qData || { name: 'Q3 2025', open_date: '2025-07-01', deadline_date: '2025-07-31' },
      totalOrders: 412,
      pendingPickups: 28,
      notYetOrderedCount: 14,
    })
    
    setLoading(false)
  }

  if (loading) return <div>Loading Admin Dashboard...</div>

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20 max-w-[1400px] mx-auto">
      
      {/* Top Value Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Orders */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
          <ShoppingCart className="absolute top-6 right-6 w-5 h-5 text-slate-300" />
          <h3 className="text-xs font-bold text-slate-500 tracking-wide">Total Orders This Quarter</h3>
          <p className="mt-3 text-4xl font-extrabold text-slate-900 tracking-tight font-data">{data?.totalOrders || 412}</p>
          <p className="mt-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Submitted for active {data?.quarter?.name || 'Q3 2025'}</p>
        </div>

        {/* Pending Pickup */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
          <Package className="absolute top-6 right-6 w-5 h-5 text-slate-300" />
          <h3 className="text-xs font-bold text-slate-500 tracking-wide">Pending Pickup</h3>
          <p className="mt-3 text-4xl font-extrabold text-slate-900 tracking-tight font-data">{data?.pendingPickups || 28}</p>
          <p className="mt-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Awaiting collection at centre</p>
        </div>

        {/* Not Yet Ordered */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
          <Clock className="absolute top-6 right-6 w-5 h-5 text-slate-300" />
          <h3 className="text-xs font-bold text-slate-500 tracking-wide">Not Yet Ordered</h3>
          <p className="mt-3 text-4xl font-extrabold text-slate-900 tracking-tight font-data">{data?.notYetOrderedCount || 14}</p>
          <p className="mt-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Active organisations pending</p>
        </div>

        {/* Deadline Countdown */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
          <Calendar className="absolute top-6 right-6 w-5 h-5 text-slate-300" />
          <h3 className="text-xs font-bold text-slate-500 tracking-wide">Deadline Countdown</h3>
          <p className="mt-3 text-4xl font-extrabold text-slate-900 tracking-tight font-data">6 Days</p>
          <p className="mt-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Closes 31 Jul 2025, 23:59</p>
        </div>
      </div>

      {/* Main Banner */}
      <div className="bg-white rounded-xl shadow-sm border border-[#86efac] border-l-[6px] border-l-[#10B981] p-6 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-3 mb-1.5">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {data?.quarter?.name || 'Q3 2025'} Order Window
            </h2>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#10B981] text-white tracking-widest uppercase">Open</span>
          </div>
          <p className="text-sm font-medium text-slate-500">
            Window Open: 1 Jul 2025 <span className="mx-2 text-slate-300">—</span> Deadline: 31 Jul 2025
          </p>
        </div>
        <button className="bg-white border border-slate-300 text-slate-700 px-5 py-2.5 rounded-lg text-xs font-bold flex items-center shadow-sm hover:bg-slate-50 transition-colors flex-shrink-0">
          Manage Quarter <ArrowRight className="w-3.5 h-3.5 ml-2 text-slate-400" />
        </button>
      </div>

      {/* Actions Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <button className="bg-[#006BB6] hover:bg-[#005a99] text-white px-5 py-2.5 rounded-lg text-xs font-bold flex items-center shadow-sm transition-colors focus:ring-4 focus:ring-[#006BB6]/20">
          <Plus className="w-4 h-4 mr-2" /> Open New Quarter
        </button>
        <button className="bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-lg text-xs font-bold flex items-center shadow-sm hover:bg-slate-50 transition-colors">
          <Tag className="w-3.5 h-3.5 mr-2" /> Update Catalogue Prices
        </button>
        <button className="bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-lg text-xs font-bold flex items-center shadow-sm hover:bg-slate-50 transition-colors">
          <Download className="w-3.5 h-3.5 mr-2" /> Export Quarter Summary
        </button>
        <button className="bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-lg text-xs font-bold flex items-center shadow-sm hover:bg-slate-50 transition-colors">
          <List className="w-3.5 h-3.5 mr-2" /> View All Orders
        </button>
        <button className="bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-lg text-xs font-bold flex items-center shadow-sm hover:bg-slate-50 transition-colors">
          <Users className="w-3.5 h-3.5 mr-2" /> Manage Organisations
        </button>
      </div>

      {/* Main Complex Grid Layout */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* LEFT COLUMN - WIDE */}
        <div className="w-full lg:w-2/3 flex flex-col space-y-6">
          
          {/* Demand Summary Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 tracking-tight">Demand Summary</h2>
              <button className="bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-md text-[11px] font-bold shadow-sm hover:bg-slate-50 transition-colors">
                Export CSV
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-100">
                <thead className="bg-[#f8fafc]">
                  <tr>
                    <th className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap border-b border-slate-200">Category</th>
                    <th className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap border-b border-slate-200">Stock Set</th>
                    <th className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap border-b border-slate-200">Total Ordered</th>
                    <th className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap border-b border-slate-200">Remaining Stock</th>
                    <th className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap border-b border-slate-200">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_DEMAND.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-slate-900">{item.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-600 font-data">{item.setup}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-600 font-data">{item.ordered}</td>
                      <td className={`px-6 py-4 whitespace-nowrap text-xs font-bold font-data ${item.remaining <= 10 ? 'text-red-600' : 'text-slate-900'}`}>{item.remaining}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.status === 'Healthy' ? (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#10B981] text-white shadow-sm border border-[#059669]">Healthy</span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-500 text-white shadow-sm border border-red-600">Critical</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Scroll Indication (purely visual for mockup fidelity) */}
            <div className="bg-slate-50 h-[12px] border-t border-slate-200 relative flex items-center rounded-b-xl px-2">
              <div className="h-1.5 w-64 bg-slate-400 rounded-full cursor-pointer absolute"></div>
              <div className="w-full flex justify-between absolute pr-4 left-0 right-0 pointer-events-none">
                <span className="text-[6px] text-slate-400">◀</span>
                <span className="text-[6px] text-slate-400">▶</span>
              </div>
            </div>
          </div>

          {/* Pending Pickups Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <h2 className="text-sm font-bold text-slate-900 tracking-tight">Pending Pickups</h2>
                <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest bg-[#f97316] text-white">28 Total</span>
              </div>
              <button className="text-[11px] font-bold text-slate-500 hover:text-slate-800 transition-colors uppercase tracking-wider">
                View All
              </button>
            </div>
            <div className="divide-y divide-slate-100">
              {MOCK_PICKUPS.map((pickup, idx) => (
                <div key={idx} className="p-5 sm:p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-slate-50 transition-colors">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-none mb-2">{pickup.org}</h4>
                    <p className="text-[11px] font-medium text-slate-500 flex items-center">
                      <span className="bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-[10px] font-bold font-data mr-2">{pickup.id}</span>
                      <span>• Marked ready: {pickup.date} • <span className="text-[#ea580c] font-bold">{pickup.waiting}</span></span>
                    </p>
                  </div>
                  <button className="w-full sm:w-auto px-4 py-2 border border-slate-200 shadow-sm text-[11px] font-bold rounded-lg text-slate-700 bg-white hover:bg-slate-50 transition-colors">
                     Mark as Collected
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN - NARROW */}
        <div className="w-full lg:w-1/3 flex flex-col space-y-6">
          
          {/* Not Yet Ordered */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center space-x-3">
              <h2 className="text-sm font-bold text-slate-900 tracking-tight">Not Yet Ordered</h2>
              <span className="inline-flex items-center px-2 py-1 rounded bg-slate-100 border border-slate-200 text-slate-600 text-[9px] font-bold uppercase tracking-widest">14 Orgs</span>
            </div>
            <div className="divide-y divide-slate-100">
              {MOCK_MISSING.map((org, idx) => (
                <div key={idx} className="p-5 flex justify-between items-start hover:bg-slate-50 transition-colors">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight mb-1.5">{org.org}</h4>
                    <p className="text-[10px] font-medium text-slate-500">
                      {org.type} • {org.email}
                    </p>
                    <p className="text-[10px] font-bold text-[#ea580c] mt-1">{org.inactive}</p>
                  </div>
                  <button className="flex-shrink-0 w-8 h-8 rounded-md border border-slate-200 shadow-sm bg-white flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors">
                    <Bell className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders Feed */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-900 tracking-tight">Recent Orders Feed</h2>
            </div>
            <div className="p-5 space-y-5">
              {MOCK_FEED.map((feed, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row justify-between sm:items-start gap-3 w-full">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    {/* Render exact icons to match visualization */}
                    {feed.icon === 'check' && <div className="w-7 h-7 rounded-full bg-[#10B981] flex items-center justify-center flex-shrink-0 shadow-sm"><CheckCircle className="w-4 h-4 text-white" /></div>}
                    {feed.icon === 'edit' && <div className="w-7 h-7 rounded-full bg-[#f97316] flex items-center justify-center flex-shrink-0 shadow-sm"><Edit3 className="w-3.5 h-3.5 text-white" /></div>}
                    {feed.icon === 'package' && <div className="w-7 h-7 rounded-full bg-[#006BB6] flex items-center justify-center flex-shrink-0 shadow-sm"><Package className="w-3.5 h-3.5 text-white" /></div>}
                    {feed.icon === 'x' && <div className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 shadow-sm"><XCircle className="w-4 h-4 text-white" /></div>}
                    
                    <div className="min-w-0 pr-2">
                       <p className="text-[11px] font-bold text-slate-800 leading-snug truncate">{feed.text}</p>
                       <p className="text-[10px] font-medium text-slate-400 mt-0.5">{feed.time}</p>
                    </div>
                  </div>
                  <button className="text-[10px] font-bold text-slate-400 hover:text-slate-800 transition-colors uppercase tracking-wider flex-shrink-0 self-start mt-1 hidden sm:block">
                     View
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Override Audit */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 tracking-tight">Override Audit</h2>
              <button className="text-[10px] font-bold text-[#006BB6] hover:text-[#005a99] transition-colors uppercase tracking-widest">
                View Full Log
              </button>
            </div>
            <div className="p-5 space-y-4">
              {MOCK_AUDIT.map((audit, idx) => (
                <div key={idx} className="flex justify-between items-center gap-2">
                  <div className="min-w-0 flex-1 pr-2">
                    <p className="text-[11px] font-bold text-slate-900 leading-snug truncate">{audit.org}</p>
                    <p className="text-[10px] font-medium text-slate-500">{audit.reason}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Extended to</p>
                    <p className="text-[11px] font-bold text-[#006BB6] font-data mt-0.5">{audit.ext}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
