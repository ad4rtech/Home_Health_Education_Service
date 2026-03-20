'use client'

import { useState } from 'react'
import { Download, Search, Clock, Send, ChevronDown } from 'lucide-react'

// Mock Data representing the Orders
const MOCK_ORDERS = [
  { 
    id: '#ORD-9201', date: '14 Jul 2025', 
    org: 'Nairobi Central Church', type: 'Church', 
    units: '450', categories: 'Across 6 categories', 
    status: 'Submitted', primaryAction: 'Mark Ready' 
  },
  { 
    id: '#ORD-9195', date: '12 Jul 2025', 
    org: 'Strathmore University', type: 'University', 
    units: '1,200', categories: 'Across 4 categories', 
    status: 'Ready for Pickup', primaryAction: 'Mark Collected' 
  },
  { 
    id: '#ORD-9188', date: '10 Jul 2025', 
    org: 'Kawangware SDA', type: 'Church', 
    units: '180', categories: 'Across 5 categories', 
    status: 'Collected', primaryAction: null 
  },
  { 
    id: '#ORD-9205', date: '15 Jul 2025', 
    org: 'Maxwell Academy', type: 'School', 
    units: '850', categories: 'Across 3 categories', 
    status: 'Submitted', primaryAction: 'Mark Ready' 
  },
  { 
    id: '#ORD-9170', date: '08 Jul 2025', 
    org: 'Karengata SDA Church', type: 'Church', 
    units: '320', categories: 'Across 6 categories', 
    status: 'Cancelled', primaryAction: null 
  },
]

// Mock Missing Orgs
const MOCK_MISSING = [
  { name: 'Buru Buru SDA Church', type: 'Church', email: 'b.doe@example.com' },
  { name: 'Baraton University', type: 'University', email: 'admin@baraton.ac.ke' },
  { name: 'South C SDA', type: 'Church', email: 'rep@southcsda.org' },
  { name: 'Ruiru Main Church', type: 'Church', email: 'ruiru@example.com' },
]

export default function AdminOrdersPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-[1400px] mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Order Management</h1>
          <p className="text-sm font-medium text-slate-500 mt-1 max-w-2xl leading-relaxed">
            View, filter, and process quarterly lesson book orders.
          </p>
        </div>
        <button className="bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center shadow-sm hover:bg-slate-50 transition-colors flex-shrink-0">
          <Download className="w-4 h-4 mr-2 text-slate-500" /> Export Report
        </button>
      </div>

      {/* Main Grid Layout */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* LEFT COLUMN - MAIN EDITOR (WIDE) */}
        <div className="w-full lg:w-2/3 flex flex-col space-y-6">
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative">
            
            {/* Filter Bar */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-4 sm:items-center">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400" />
                </div>
                <input 
                  type="text" 
                  placeholder="Search by order ID or organisation..."
                  className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-[13px] text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#006BB6]/20 focus:border-[#006BB6] shadow-sm transition-all"
                />
              </div>
              
              <div className="flex flex-wrap sm:flex-nowrap gap-3 items-center">
                <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 min-w-[140px]">
                  <span className="text-[11px] font-bold text-slate-400 flex-shrink-0">Status:</span>
                  <div className="relative flex-1">
                    <select className="w-full bg-transparent text-[13px] font-bold text-slate-900 focus:outline-none appearance-none cursor-pointer pr-6">
                      <option>All Active</option>
                      <option>Submitted</option>
                      <option>Ready</option>
                    </select>
                    <ChevronDown className="absolute right-0 top-1 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 min-w-[140px]">
                  <span className="text-[11px] font-bold text-slate-400 flex-shrink-0">Org Type:</span>
                  <div className="relative flex-1">
                    <select className="w-full bg-transparent text-[13px] font-bold text-slate-900 focus:outline-none appearance-none cursor-pointer pr-6">
                      <option>All Types</option>
                      <option>Church</option>
                      <option>School</option>
                    </select>
                    <ChevronDown className="absolute right-0 top-1 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 min-w-[140px]">
                  <span className="text-[11px] font-bold text-slate-400 flex-shrink-0">Quarter:</span>
                  <div className="relative flex-1">
                    <select className="w-full bg-transparent text-[13px] font-bold text-slate-900 focus:outline-none appearance-none cursor-pointer pr-6">
                      <option>Q3 2025</option>
                      <option>Q2 2025</option>
                    </select>
                    <ChevronDown className="absolute right-0 top-1 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full text-left border-b border-slate-200">
                <thead>
                  <tr className="bg-[#f8fafc] border-b border-slate-200">
                    <th className="px-5 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">Order ID & Date</th>
                    <th className="px-5 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">Organisation</th>
                    <th className="px-5 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">Total Units</th>
                    <th className="px-5 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">Status</th>
                    <th className="px-5 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_ORDERS.map((order, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-4 whitespace-nowrap">
                        <p className="text-[13px] font-black text-slate-900 font-data tracking-wide">{order.id}</p>
                        <p className="text-[11px] font-medium text-slate-500 mt-0.5">{order.date}</p>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <p className="text-[13px] font-bold text-slate-900">{order.org}</p>
                        <p className="text-[11px] font-medium text-slate-500 mt-0.5">{order.type}</p>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <p className="text-[13px] font-bold text-slate-900 font-data">{order.units}</p>
                        <p className="text-[11px] font-medium text-slate-500 mt-0.5">{order.categories}</p>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        {order.status === 'Submitted' && <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#eff6ff] text-[#006BB6] tracking-widest uppercase">Submitted</span>}
                        {order.status === 'Ready for Pickup' && <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#f97316] text-white tracking-widest uppercase shadow-sm">Ready for Pickup</span>}
                        {order.status === 'Collected' && <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#10B981] text-white tracking-widest uppercase shadow-sm">Collected</span>}
                        {order.status === 'Cancelled' && <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-500 text-white tracking-widest uppercase shadow-sm">Cancelled</span>}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
                            View
                          </button>
                          {order.primaryAction && order.primaryAction === 'Mark Ready' && (
                            <button className="px-3 py-1.5 bg-[#006BB6] text-white rounded-lg text-[11px] font-bold shadow-sm hover:bg-[#005a99] transition-colors">
                              {order.primaryAction}
                            </button>
                          )}
                          {order.primaryAction && order.primaryAction === 'Mark Collected' && (
                            <button className="px-3 py-1.5 bg-[#10B981] text-white rounded-lg text-[11px] font-bold shadow-sm hover:bg-[#059669] transition-colors">
                              {order.primaryAction}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Visual Scroll Bar Mockup as per UI */}
              <div className="bg-slate-50 h-[10px] border-b border-slate-200 relative flex items-center px-4">
                <div className="h-1.5 w-[85%] bg-slate-400 rounded-full cursor-pointer absolute shadow-sm" style={{left: '20px'}}></div>
                <div className="w-full flex justify-between absolute pr-4 left-0 right-0 pointer-events-none">
                  <span className="text-[6px] text-slate-500 ml-1">◀</span>
                  <span className="text-[6px] text-slate-500 mr-[10px]">▶</span>
                </div>
              </div>
            </div>

            {/* Pagination Footer */}
            <div className="p-4 flex items-center justify-between">
              <span className="text-[11px] font-medium text-slate-500">Showing 1-5 of 142 orders</span>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1.5 bg-white border border-slate-200 rounded text-[11px] font-bold text-slate-500 hover:bg-slate-50 transition-colors">Previous</button>
                <button className="px-3 py-1.5 bg-white border border-slate-200 rounded text-[11px] font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">Next</button>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN (NARROW) */}
        <div className="w-full lg:w-1/3 flex flex-col space-y-6">
          
          {/* Progress Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-900 tracking-tight">Q3 2025 Progress</h2>
            </div>
            
            <div className="p-6 pb-8 space-y-5">
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-500">Submitted Orders</span>
                  <span className="text-[11px] font-bold text-slate-900 font-data tracking-wide">142 / 200</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-[#006BB6] rounded-full w-[71%]"></div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] font-bold text-slate-500">Pending Processing</span>
                <span className="text-[11px] font-bold text-slate-900 font-data tracking-wide">12 Orders</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500">Ready for Pickup</span>
                <span className="text-[11px] font-bold text-slate-900 font-data tracking-wide">28 Orders</span>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between rounded-b-xl">
              <span className="text-[11px] font-bold text-slate-700">Order Deadline</span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[9px] font-bold bg-[#ef4444] text-white shadow-sm tracking-widest uppercase">
                6 Days Remaining
              </span>
            </div>
          </div>

          {/* Not Yet Ordered Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-[#f97316]" />
                <h2 className="text-sm font-bold text-slate-900 tracking-tight">Not Yet Ordered</h2>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 text-[9px] font-bold tracking-widest uppercase">
                58 Orgs
              </span>
            </div>

            <div className="divide-y divide-slate-100 flex-1">
              {MOCK_MISSING.map((org, idx) => (
                <div key={idx} className="p-5 hover:bg-slate-50 transition-colors flex justify-between items-center gap-4">
                  <div className="min-w-0 pr-2">
                    <h4 className="text-[13px] font-bold text-slate-900 leading-tight truncate">{org.name}</h4>
                    <p className="text-[10px] font-medium text-slate-500 mt-1 truncate">
                      {org.type} • {org.email}
                    </p>
                  </div>
                  <button className="flex-shrink-0 px-3 py-1.5 border border-slate-200 bg-white text-[10px] font-bold text-slate-700 rounded shadow-sm hover:bg-slate-50 transition-colors">
                    Remind
                  </button>
                </div>
              ))}
            </div>

            <button className="mt-auto w-full p-4 border-t border-slate-100 bg-slate-50/50 hover:bg-[#f0f7ff] hover:text-[#006BB6] transition-colors flex items-center justify-center text-[11px] font-bold text-[#006BB6] group">
              <Send className="w-3.5 h-3.5 mr-2 text-[#006BB6] group-hover:-mt-0.5 group-hover:translate-x-0.5 transition-transform" /> 
              Send Bulk Reminder (58)
            </button>
          </div>

        </div>

      </div>
    </div>
  )
}
