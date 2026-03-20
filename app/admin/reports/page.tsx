'use client'

import { useState } from 'react'
import { Download, Inbox, Clock, CheckCircle, XCircle, BarChart2, AlertCircle, ShieldCheck, TrendingUp, Search, ChevronDown, ArrowRight } from 'lucide-react'
import Link from 'next/link'

// Mock Data
const MOCK_DEMAND = [
  { category: 'Adults Lesson', ordered: '1,435', stock: '2,000', variance: '+565', status: 'Healthy' },
  { category: 'Adults Double Quarter', ordered: '148', stock: '150', variance: '+2', status: 'Low' },
  { category: 'Kindergarten', ordered: '60', stock: '100', variance: '+40', status: 'Healthy' },
  { category: 'Primary', ordered: '119', stock: '120', variance: '+1', status: 'Critical' },
  { category: 'Cornerstone', ordered: '45', stock: '80', variance: '+35', status: 'Healthy' },
  { category: 'Realtime', ordered: '30', stock: '90', variance: '+60', status: 'Healthy' },
]

const MOCK_MISSING = [
  { org: 'Kawangware SDA', type: 'Church', email: 'peter@kawangware.org' },
  { org: 'UEAB Main Campus', type: 'University', email: 'procurement@ueab.ac.ke' },
  { org: 'Karen Community Church', type: 'Church', email: 'info@karenchurch.org' },
  { org: 'Maxwell Preparatory', type: 'School', email: 'admin@maxwellprep.ac.ke' },
]

const MOCK_AUDIT = [
  { 
    org: 'Strathmore University', time: '28 Jul 2025, 14:30', 
    excep1: 'Deadline: 31 Jul → 05 Aug', excep2: '"Awaiting final internal budget sign-off"',
    by: 'Admin User'
  },
  { 
    org: 'Nairobi Central Church', time: '25 Jul 2025, 09:15', 
    excep1: 'Deadline: 31 Jul → 02 Aug', excep2: '"System access issues reported by Rep"',
    by: 'Jane Smith'
  },
  { 
    org: 'Kiserian SDA', time: '22 Jul 2025, 11:45', 
    excep1: 'Deadline: 31 Jul → 04 Aug', excep2: '"Rep on compassionate leave"',
    by: 'Admin User'
  },
]

export default function AdminReportsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-[1400px] mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Reports & Analytics</h1>
          <p className="text-sm font-medium text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Monitor demand, compliance, and historical trends.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-shrink-0">
          <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2.5 min-w-[200px]">
            <span className="text-[11px] font-bold text-slate-400 flex-shrink-0">Quarter:</span>
            <div className="relative flex-1">
              <select className="w-full bg-transparent text-[13px] font-bold text-slate-900 focus:outline-none appearance-none cursor-pointer pr-6 leading-tight">
                <option>Q3 2025 (Active)</option>
                <option>Q2 2025 (Archived)</option>
              </select>
              <ChevronDown className="absolute right-0 top-1 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <button className="bg-[#006BB6] hover:bg-[#005a99] text-white px-5 py-2.5 rounded-lg text-[13px] font-bold flex items-center shadow-sm transition-colors focus:ring-4 focus:ring-[#006BB6]/20 w-full sm:w-auto justify-center">
            <Download className="w-4 h-4 mr-2" /> Export Summary CSV
          </button>
        </div>
      </div>

      {/* 4-Card Metric Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xs font-medium text-slate-500">Total Orders Received</h3>
            <Inbox className="w-4 h-4 text-slate-400" />
          </div>
          <div>
            <p className="text-3xl font-extrabold text-slate-900 font-data tracking-tight leading-none mb-3">248</p>
            <p className="text-[11px] font-bold text-[#10B981] flex items-center tracking-wide">
              <TrendingUp className="w-3 h-3 mr-1" /> +12% vs last quarter
            </p>
          </div>
        </div>
        
        {/* Card 2 */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xs font-medium text-slate-500">Pending / Submitted</h3>
            <Clock className="w-4 h-4 text-slate-400" />
          </div>
          <div>
            <p className="text-3xl font-extrabold text-slate-900 font-data tracking-tight leading-none mb-3">180</p>
            <p className="text-[11px] font-medium text-slate-500 tracking-wide">
              Awaiting preparation
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xs font-medium text-slate-500">Ready & Collected</h3>
            <CheckCircle className="w-4 h-4 text-slate-400" />
          </div>
          <div>
            <p className="text-3xl font-extrabold text-slate-900 font-data tracking-tight leading-none mb-3">65</p>
            <p className="text-[11px] font-bold text-[#10B981] flex items-center tracking-wide">
              <ArrowRight className="w-3 h-3 mr-1" /> Moving steadily
            </p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xs font-medium text-slate-500">Cancelled Orders</h3>
            <XCircle className="w-4 h-4 text-slate-400" />
          </div>
          <div>
            <p className="text-3xl font-extrabold text-slate-900 font-data tracking-tight leading-none mb-3">3</p>
            <p className="text-[11px] font-medium text-slate-500 tracking-wide">
              Within normal bounds
            </p>
          </div>
        </div>
      </div>

      {/* Real-time Demand Table (Full Width) */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative pb-4">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <BarChart2 className="w-5 h-5 text-[#006BB6]" />
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">Real-time Demand Summary (Q3 2025)</h2>
          </div>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#10B981] text-white text-[9px] font-bold tracking-widest uppercase shadow-sm">
            Auto-Refreshes
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-slate-200">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">Category</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap text-right">Total Ordered</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap text-right">Available Stock</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap text-right">Variance</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap px-8">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_DEMAND.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-[13px] font-bold text-slate-900">{item.category}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <p className="text-[13px] font-bold text-slate-900 font-data">{item.ordered}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <p className="text-[13px] font-medium text-slate-500 font-data">{item.stock}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <p className={`text-[13px] font-bold font-data ${item.variance.includes('+') && item.status === 'Healthy' ? 'text-[#10B981]' : item.status === 'Low' ? 'text-[#f97316]' : 'text-red-500'}`}>
                      {item.variance}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap pl-8">
                    {item.status === 'Healthy' && <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold border border-[#10B981] text-[#059669] tracking-widest uppercase bg-[#10B981]/10">Healthy</span>}
                    {item.status === 'Low' && <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#f97316] text-white tracking-widest uppercase shadow-sm">Low</span>}
                    {item.status === 'Critical' && <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#ef4444] text-white tracking-widest uppercase shadow-sm">Critical</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Visual Scroll Bar Mockup as per UI */}
          <div className="absolute top-16 bottom-6 right-1 w-[5px] bg-slate-100 rounded-full">
            <div className="w-full h-32 bg-slate-400 rounded-full mt-2 cursor-pointer shadow-sm"></div>
          </div>
          <div className="bg-slate-50 h-[10px] border-t border-slate-200 relative flex items-center px-4">
            <div className="h-1.5 w-[90%] bg-slate-400 rounded-full cursor-pointer absolute shadow-sm" style={{left: '20px'}}></div>
            <div className="w-full flex justify-between absolute pr-4 left-0 right-0 pointer-events-none">
              <span className="text-[6px] text-slate-500 ml-1">◀</span>
              <span className="text-[6px] text-slate-500 mr-[10px]">▶</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Dual Lists */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Not Yet Ordered */}
        <div className="w-full lg:w-1/2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative pb-4">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <AlertCircle className="w-5 h-5 text-[#f97316]" />
              <h2 className="text-sm font-bold text-slate-900 tracking-tight">Not Yet Ordered</h2>
            </div>
            <span className="text-[11px] font-bold text-slate-400">
              42 Organisations
            </span>
          </div>

          <div className="p-4 border-b border-slate-100 flex gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-3.5 w-3.5 text-slate-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search..."
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded text-[12px] text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#006BB6]/20 shadow-sm"
              />
            </div>
            <div className="relative w-32">
              <select className="w-full bg-white border border-slate-200 rounded text-[12px] font-bold text-slate-700 focus:outline-none py-1.5 pl-3 pr-6 appearance-none cursor-pointer shadow-sm">
                <option>All Types</option>
              </select>
              <ChevronDown className="absolute right-2 top-2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <table className="min-w-full text-left table-fixed">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-slate-100">
                <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-[40%]">Organisation</th>
                <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-[40%]">Contact Email</th>
                <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right w-[20%]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_MISSING.map((org, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-3.5 overflow-hidden">
                    <p className="text-[12px] font-bold text-slate-900 truncate">{org.org}</p>
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-[9px] font-bold text-slate-600 mt-1 uppercase shadow-sm">{org.type}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-[11px] font-medium text-slate-600 truncate">{org.email}</p>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button className="px-3 py-1.5 bg-white border border-slate-200 text-[10px] font-bold text-slate-700 rounded shadow-sm hover:bg-slate-50 transition-colors">
                      Reminder
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Visual Scroll Bar Mockup as per UI */}
          <div className="absolute top-[138px] bottom-6 right-1 w-[5px] bg-slate-100 rounded-full">
            <div className="w-full h-32 bg-slate-400 rounded-full mt-2 cursor-pointer shadow-sm"></div>
          </div>
          <div className="bg-slate-50 h-[10px] border-t border-slate-200 relative flex items-center px-4 mt-2">
            <div className="h-1.5 w-[85%] bg-slate-400 rounded-full cursor-pointer absolute shadow-sm" style={{left: '20px'}}></div>
            <div className="w-full flex justify-between absolute pr-4 left-0 right-0 pointer-events-none">
              <span className="text-[6px] text-slate-500 ml-1">◀</span>
              <span className="text-[6px] text-slate-500 mr-[10px]">▶</span>
            </div>
          </div>
        </div>

        {/* Override Audit Log */}
        <div className="w-full lg:w-1/2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative pb-4">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <ShieldCheck className="w-5 h-5 text-[#006BB6]" />
              <h2 className="text-sm font-bold text-slate-900 tracking-tight">Override Audit Log</h2>
            </div>
            <Link href="#" className="text-[11px] font-bold text-[#006BB6] hover:text-[#005a99] transition-colors">
              View All
            </Link>
          </div>

          <table className="min-w-full text-left table-fixed">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-slate-100">
                <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-[35%]">Organisation</th>
                <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-[45%]">Exception Details</th>
                <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right w-[20%]">Actioned By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_AUDIT.map((log, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-4 overflow-hidden">
                    <p className="text-[12px] font-bold text-slate-900 truncate">{log.org}</p>
                    <p className="text-[10px] font-medium text-slate-500 mt-1">{log.time}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-[11px] font-bold text-slate-900 truncate">{log.excep1}</p>
                    <p className="text-[10px] italic font-medium text-slate-500 mt-1 truncate">{log.excep2}</p>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <p className="text-[11px] font-medium text-slate-700">{log.by}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Visual Scroll Bar Mockup as per UI */}
          <div className="absolute top-16 bottom-6 right-1 w-[5px] bg-slate-100 rounded-full">
            <div className="w-full h-16 bg-slate-400 rounded-full mt-2 cursor-pointer shadow-sm"></div>
          </div>
          <div className="bg-slate-50 h-[10px] border-t border-slate-200 relative flex items-center px-4 mt-2">
            <div className="h-1.5 w-[85%] bg-slate-400 rounded-full cursor-pointer absolute shadow-sm" style={{left: '20px'}}></div>
            <div className="w-full flex justify-between absolute pr-4 left-0 right-0 pointer-events-none">
              <span className="text-[6px] text-slate-500 ml-1">◀</span>
              <span className="text-[6px] text-slate-500 mr-[10px]">▶</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
