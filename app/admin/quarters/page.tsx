'use client'

import { useState } from 'react'
import { Plus, XCircle, Filter, Clock, Lock, CalendarDays, ChevronDown } from 'lucide-react'

// Mock Data Definitions
const MOCK_DIRECTORY = [
  { name: 'Q4 2025', opens: '1 Oct 2025', deadline: '31 Oct 2025', status: 'Draft', visibility: 'Hidden' },
  { name: 'Q3 2025', opens: '1 Jul 2025', deadline: '31 Jul 2025', status: 'Open', visibility: 'Published' },
  { name: 'Q2 2025', opens: '1 Apr 2025', deadline: '30 Apr 2025', status: 'Closed', visibility: 'Archived' },
  { name: 'Q1 2025', opens: '1 Jan 2025', deadline: '31 Jan 2025', status: 'Closed', visibility: 'Archived' },
]

const MOCK_AUDIT = [
  { 
    org: 'Lavington SDA', 
    extension: 'Extended to 2 Aug',
    reason: '"Payment system delay requested via email request."',
    by: 'BY: ADMIN USER',
    logged: 'Logged: 24 Jul, 09:15'
  },
  { 
    org: 'Machakos University', 
    extension: 'Extended to 3 Aug',
    reason: '"Institutional approval delay, verified by Dean."',
    by: 'BY: ADMIN USER',
    logged: 'Logged: 22 Jul, 14:30'
  }
]

export default function AdminQuartersPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-[1400px] mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Quarter Management</h1>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Create ordering cycles, manage deadlines, and grant extensions.
          </p>
        </div>
        <button className="bg-[#006BB6] hover:bg-[#005a99] text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center shadow-sm transition-colors focus:ring-4 focus:ring-[#006BB6]/20 flex-shrink-0">
          <Plus className="w-4 h-4 mr-2" /> Create New Quarter
        </button>
      </div>

      {/* Main Complex Grid Layout */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* LEFT COLUMN - WIDE */}
        <div className="w-full lg:w-2/3 flex flex-col space-y-6">
          
          {/* Active Quarter Banner Card */}
          <div className="bg-white rounded-xl shadow-sm border border-[#86efac] border-l-[6px] border-l-[#10B981] overflow-hidden">
            <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between md:items-start gap-6 border-b border-slate-100">
              <div>
                <div className="flex items-center space-x-3 mb-2 w-full flex-wrap gap-y-2">
                  <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                    Active Quarter: Q3 2025
                  </h2>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#10B981] text-white tracking-widest uppercase shadow-sm">Open</span>
                </div>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">
                  Ordering is currently live for all active organisations.
                </p>
              </div>
              <div className="text-left md:text-right flex flex-col items-start md:items-end flex-shrink-0">
                <p className="text-4xl font-extrabold text-slate-900 tracking-tight font-data leading-none">6 Days</p>
                <p className="text-[11px] font-bold text-slate-400 mt-2">Remaining until deadline</p>
              </div>
            </div>

            <div className="bg-slate-50/50 p-6 md:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div className="flex flex-wrap gap-8 sm:gap-16">
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Window Opens</p>
                  <p className="text-[13px] font-bold text-slate-900 font-data">1 Jul 2025</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Order Deadline</p>
                  <p className="text-[13px] font-bold text-slate-900 font-data">31 Jul 2025</p>
                </div>
              </div>
              <button className="flex items-center justify-center px-5 py-2.5 border border-red-200 text-red-500 bg-white hover:bg-red-50 rounded-lg text-xs font-bold transition-colors shadow-sm w-full sm:w-auto flex-shrink-0">
                <XCircle className="w-4 h-4 mr-2" /> Close Quarter Manually
              </button>
            </div>
          </div>

          {/* Quarter Cycles Directory Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative pb-4">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
              <h2 className="text-sm font-bold text-slate-900 tracking-tight">Quarter Cycles Directory</h2>
              <button className="text-[11px] font-bold text-slate-500 hover:text-slate-700 transition-colors uppercase tracking-wider flex items-center">
                <Filter className="w-3.5 h-3.5 mr-1.5" /> Filter
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-100">
                <thead className="bg-[#f8fafc]">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">Quarter Name</th>
                    <th scope="col" className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">Open Date</th>
                    <th scope="col" className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">Deadline</th>
                    <th scope="col" className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">Status</th>
                    <th scope="col" className="px-6 py-4 text-right text-[11px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">Publish Visibility</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100">
                  {MOCK_DIRECTORY.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900">{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-[13px] font-medium text-slate-600 font-data">{item.opens}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-[13px] font-medium text-slate-600 font-data">{item.deadline}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.status === 'Open' ? (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#10B981] text-white tracking-widest uppercase shadow-sm">Open</span>
                        ) : item.status === 'Draft' ? (
                          <span className="inline-flex items-center px-2.5 py-1 rounded border border-slate-200 bg-slate-50 text-slate-600 text-[10px] font-bold tracking-widest uppercase">Draft</span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-1 rounded border border-slate-200 bg-slate-50 text-slate-500 text-[10px] font-bold tracking-widest uppercase">Closed</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        {item.visibility === 'Archived' ? (
                          <span className="text-[11px] font-bold text-slate-400">Archived</span>
                        ) : item.visibility === 'Published' ? (
                          <div className="flex items-center justify-end space-x-3">
                            <span className="text-[11px] font-bold text-slate-900">Published</span>
                            {/* Toggle Switch On */}
                            <div className="relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#10B981] transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:ring-offset-2 border border-[#059669]">
                              <span aria-hidden="true" className="translate-x-[8px] pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end space-x-3 opacity-60">
                            <span className="text-[11px] font-bold text-slate-500">Hidden</span>
                            {/* Toggle Switch Off */}
                            <div className="relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-slate-200 transition-colors ease-in-out duration-200 border border-slate-300">
                              <span aria-hidden="true" className="translate-x-[-8px] pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Visual Scroll Bar Mockup as per UI */}
            <div className="absolute bottom-1 left-6 right-6">
              <div className="bg-slate-50 h-[10px] border border-slate-200 relative flex items-center rounded-full px-2 shadow-inner">
                <div className="h-1.5 w-64 bg-slate-400 rounded-full cursor-pointer absolute shadow-sm" style={{left: '8px'}}></div>
                <div className="w-full flex justify-between absolute pr-4 left-0 right-0 pointer-events-none opacity-50">
                  <span className="text-[6px] text-slate-500 ml-1">◀</span>
                  <span className="text-[6px] text-slate-500 mr-2">▶</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN - NARROW */}
        <div className="w-full lg:w-1/3 flex flex-col space-y-6">
          
          {/* Grant Deadline Override Form */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
            <div className="flex items-center space-x-2.5 mb-5 pb-5 border-b border-slate-100">
              <Clock className="w-4 h-4 text-[#006BB6]" />
              <h2 className="text-sm font-bold text-slate-900 tracking-tight">Grant Deadline Override</h2>
            </div>
            
            <p className="text-[11px] font-medium text-slate-500 leading-relaxed mb-6">
              Extend the submission deadline for a specific organisation. All overrides are permanently logged.
            </p>

            <form className="space-y-5" onSubmit={e => e.preventDefault()}>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-2">Select Organisation</label>
                <div className="relative">
                  <select defaultValue="" className="w-full pl-3 pr-10 py-2.5 bg-white border border-slate-200 rounded-lg text-[13px] text-slate-600 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#006BB6]/20 focus:border-[#006BB6] shadow-sm appearance-none cursor-pointer transition-all">
                    <option value="" disabled hidden>Search for an organisation...</option>
                    <option value="1">Lavington SDA</option>
                    <option value="2">Nairobi West Church</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-2">New Deadline Date</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="DD / MM / YYYY"
                    className="w-full pl-3 pr-10 py-2.5 bg-white border border-slate-200 rounded-lg text-[13px] text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#006BB6]/20 focus:border-[#006BB6] shadow-sm transition-all font-data"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                    <CalendarDays className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-2">Reason for Override (Mandatory)</label>
                <textarea 
                  rows={3}
                  placeholder="State the exceptional circumstance..."
                  className="w-full pl-3 pr-3 py-2.5 bg-white border border-slate-200 rounded-lg text-[13px] text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#006BB6]/20 focus:border-[#006BB6] shadow-sm transition-all resize-none"
                />
              </div>

              <button type="submit" className="w-full flex items-center justify-center py-2.5 px-4 rounded-lg bg-[#006BB6] hover:bg-[#005a99] text-white text-[13px] font-bold shadow-sm transition-colors focus:ring-4 focus:ring-[#006BB6]/20 mt-4">
                Grant Extension
              </button>
            </form>
          </div>

          {/* Override Audit Log Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <h2 className="text-sm font-bold text-slate-900 tracking-tight">Override Audit Log</h2>
                <Lock className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 text-[9px] font-bold tracking-widest uppercase">Q3 2025</span>
            </div>
            
            <div className="divide-y divide-slate-100">
              {MOCK_AUDIT.map((item, idx) => (
                <div key={idx} className="p-5 hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between items-start mb-2 gap-4">
                    <h4 className="text-[13px] font-bold text-slate-900 leading-tight">{item.org}</h4>
                    <p className="text-[11px] font-bold text-[#006BB6] whitespace-nowrap">{item.extension}</p>
                  </div>
                  <p className="text-[11px] italic font-medium text-slate-500 leading-relaxed mb-3 pr-4">
                    {item.reason}
                  </p>
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest">
                    <span className="text-slate-400">{item.by}</span>
                    <span className="text-slate-400 text-right">{item.logged}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/30 text-center">
              <button className="text-[11px] font-bold text-[#006BB6] hover:text-[#005a99] transition-colors leading-none tracking-wide">
                View Complete Audit Trail
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
