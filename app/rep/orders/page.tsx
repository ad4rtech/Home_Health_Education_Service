'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { Calendar, Timer, FileText, Send, Package, CheckCircle, ChevronDown, Pen, XCircle, Search, Eye } from 'lucide-react'

// Mock Data Definitions ensuring UI fidelity
const MOCK_CURRENT_ORDER = {
  id: '#ORD-25Q3-4921',
  quarter: 'Q3 2025 Order',
  date: '14 Jul 2025',
  total_items: 120,
  total_price: 52500,
  status: 'submitted',
  location: 'HHES Main Centre, Nairobi',
  breakdown: [
    { name: 'Adults', qty: 50 },
    { name: 'Adults Double Qtr', qty: 20 },
    { name: 'Kindergarten', qty: 15 },
    { name: 'Primary', qty: 15 },
    { name: 'Cornerstone', qty: 10 },
    { name: 'Realtime', qty: 10 },
  ]
}

const MOCK_HISTORY = [
  { id: '#ORD-25Q2-1108', quarter: 'Q2 2025 Order', date: '10 Apr 2025', items: 115, price: 48000, status: 'Collected' },
  { id: '#ORD-25Q1-0942', quarter: 'Q1 2025 Order', date: '05 Jan 2025', items: 120, price: 50000, status: 'Collected' },
  { id: '#ORD-24Q4-8831', quarter: 'Q4 2024 Order', date: '12 Oct 2024', items: 130, price: 53500, status: 'Cancelled' },
]

export default function MyOrdersPage() {
  const [activeQuarter, setActiveQuarter] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchQuarter()
  }, [])

  const fetchQuarter = async () => {
    const { data } = await supabase.from('quarters').select('*').eq('status', 'published').maybeSingle()
    setActiveQuarter(data)
    setLoading(false)
  }

  const displayQuarter = activeQuarter || { name: 'Q3 2025', open_date: '2025-07-01', deadline_date: '2025-07-31' }

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      
      {/* Top Banner (Orange Border Variant) */}
      <div className="bg-white rounded-xl shadow-sm border border-[#fdba74] border-l-[6px] border-l-[#f97316] p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-start md:items-center space-x-4">
          <div className="hidden sm:flex text-[#f97316]">
            <Calendar className="h-7 w-7" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {displayQuarter.name} Order Window Closing Soon
            </h2>
            <p className="text-sm font-medium text-slate-500 mt-1">
              Opens: {new Date(displayQuarter.open_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} <span className="mx-2 text-slate-300">|</span> Deadline: {new Date(displayQuarter.deadline_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          </div>
        </div>
        <button className="bg-[#ea580c] hover:bg-[#c2410c] text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center shadow-sm transition-colors focus:ring-4 focus:ring-orange-500/20">
          <Timer className="h-4 w-4 mr-2" />
          3 days remaining
        </button>
      </div>

      {/* Current Order Status Tracker */}
      <div>
        <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-4 ml-1">Current order status</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Step 1 */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="bg-[#10B981] p-2.5 rounded-lg flex-shrink-0 text-white shadow-sm border border-[#059669]">
              <FileText className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 leading-tight">Draft Created</h4>
              <p className="text-[11px] font-medium text-slate-500 mt-1.5 leading-relaxed">
                Quantities were entered and saved for Q3 2025.
              </p>
            </div>
          </div>
          
          {/* Step 2 (Active) */}
          <div className="bg-[#f0f7ff] rounded-xl p-5 border border-[#006BB6] shadow-sm flex items-start gap-4">
            <div className="bg-[#006BB6] p-2.5 rounded-lg flex-shrink-0 text-white shadow-md border border-[#005a99]">
              <Send className="w-5 h-5 -ml-0.5 mt-0.5" strokeWidth={2.5} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#006BB6] leading-tight">Submitted</h4>
              <p className="text-[11px] font-medium text-[#005a99] mt-1.5 leading-relaxed">
                Order sent to HHES on 14 Jul 2025 and is awaiting fulfillment.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex items-start gap-4 opacity-75">
            <div className="bg-slate-100 p-2.5 rounded-lg flex-shrink-0 text-slate-500 border border-slate-200">
              <Package className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 leading-tight">Ready for Pickup</h4>
              <p className="text-[11px] font-medium text-slate-500 mt-1.5 leading-relaxed">
                You will be notified once packing is complete.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex items-start gap-4 opacity-75">
            <div className="bg-slate-100 p-2.5 rounded-lg flex-shrink-0 text-slate-500 border border-slate-200">
              <CheckCircle className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 leading-tight">Collected</h4>
              <p className="text-[11px] font-medium text-slate-500 mt-1.5 leading-relaxed">
                Digital pickup confirmation will complete the order trail.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="border-b border-transparent pb-4">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">My Orders</h1>
        <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-2xl">
          View and manage your current active order and track your organisation's past order history.
        </p>
      </div>

      {/* Current Quarter Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-2">Current Quarter</h3>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          {/* Order Header */}
          <div className="bg-slate-50 border-b border-slate-200 px-6 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">{MOCK_CURRENT_ORDER.quarter}</h2>
              <p className="text-xs font-medium text-slate-500 mt-1">
                Order ID: <span className="font-data">{MOCK_CURRENT_ORDER.id}</span> • Submitted: {MOCK_CURRENT_ORDER.date}
              </p>
            </div>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-[#006BB6] text-white shadow-sm">
              <CheckCircle className="w-4 h-4 mr-1.5" />
              Submitted
            </div>
          </div>

          {/* Middle Body */}
          <div className="p-6 sm:p-8 flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
              <div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Total Items</p>
                 <p className="text-lg font-bold text-slate-900 tracking-tight font-data">{MOCK_CURRENT_ORDER.total_items} Units</p>
              </div>
              <div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Estimated Total</p>
                 <p className="text-lg font-bold text-slate-900 tracking-tight font-data">KES {MOCK_CURRENT_ORDER.total_price.toLocaleString()}</p>
              </div>
              <div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Pickup Location</p>
                 <p className="text-lg font-bold text-slate-900 tracking-tight">{MOCK_CURRENT_ORDER.location}</p>
              </div>
            </div>

            <div className="border-t border-dashed border-slate-200 pt-6">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Order Breakdown</p>
              <div className="flex flex-wrap gap-2.5">
                {MOCK_CURRENT_ORDER.breakdown.map((item, i) => (
                  <div key={i} className="inline-flex items-center bg-slate-50 border border-slate-200 rounded text-xs font-bold text-slate-600 shadow-sm overflow-hidden">
                    <span className="bg-slate-100 border-r border-slate-200 px-2.5 py-1.5 text-slate-900 font-data">{item.qty}</span>
                    <span className="bg-white px-3 py-1.5">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions Border */}
          <div className="border-t border-slate-200 bg-white px-6 py-4 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
            <button className="inline-flex items-center px-6 py-2 border border-slate-300 shadow-sm text-xs font-bold rounded-lg text-slate-700 bg-white hover:bg-slate-50 transition-colors">
              <Pen className="w-3.5 h-3.5 mr-2" />
              Edit Order
            </button>
            <button className="inline-flex items-center px-6 py-2 border border-red-200 shadow-sm text-xs font-bold rounded-lg text-red-600 bg-white hover:bg-red-50 transition-colors">
              <XCircle className="w-3.5 h-3.5 mr-2" />
              Cancel Order
            </button>
          </div>
        </div>
      </div>

      {/* Order History Section */}
      <div className="space-y-6 pt-6 border-t border-slate-200 border-dashed">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">Order History</h3>
          <div className="relative">
            <select className="appearance-none bg-white border border-slate-200 rounded-lg py-2 pl-4 pr-10 text-xs font-bold text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#006BB6]/20">
              <option>All Quarters</option>
              <option>2025</option>
              <option>2024</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div className="space-y-4">
          {MOCK_HISTORY.map((order, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row justify-between md:items-center gap-6 hover:shadow-md transition-shadow">
              
              <div className="flex-1">
                <div className="flex items-start md:items-center justify-between md:justify-start gap-4 mb-2 md:mb-1">
                  <h4 className="text-base font-bold text-slate-900 tracking-tight">{order.quarter}</h4>
                  {order.status === 'Collected' ? (
                    <div className="inline-flex md:hidden items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#10B981] text-white tracking-widest uppercase">
                       <CheckCircle className="w-3 h-3 mr-1" strokeWidth={3} /> {order.status}
                    </div>
                  ) : (
                    <div className="inline-flex md:hidden items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 tracking-widest uppercase border border-slate-200">
                       {order.status}
                    </div>
                  )}
                </div>
                <p className="text-xs font-medium text-slate-500 mb-4 md:mb-0">
                  Order ID: <span className="font-data">{order.id}</span> &bull; Submitted: {order.date}
                </p>
              </div>

              <div className="hidden md:block w-32 text-center">
                {order.status === 'Collected' ? (
                  <div className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold bg-[#10B981] text-white shadow-sm tracking-widest uppercase">
                     <CheckCircle className="w-3 h-3 mr-1.5" strokeWidth={3} /> {order.status}
                  </div>
                ) : (
                  <div className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200 shadow-sm tracking-widest uppercase">
                     {order.status}
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full md:w-auto md:min-w-[300px]">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900 font-data">{order.items} Units</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-sm font-bold text-slate-900 font-data">KES {order.price.toLocaleString()}</span>
                </div>
                <button className="w-full sm:w-auto px-6 py-2.5 border border-slate-200 shadow-sm text-xs font-bold rounded-lg text-slate-700 bg-white hover:bg-slate-50 transition-colors">
                  View Details
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
