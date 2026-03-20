'use client'

import { useState } from 'react'
import { UserPlus, Search, ChevronDown, CheckCircle, XCircle } from 'lucide-react'

// Mock Data representing Pending Registrations
const MOCK_PENDING = [
  { 
    name: 'Lavington SDA Church', type: 'Church', 
    contact: 'James Omondi', email: 'james.o@lavingtonsda.org', 
    date: '16 Jul 2025', time: '10:24 AM' 
  },
  { 
    name: 'UEAB Gateway', type: 'University', 
    contact: 'Sarah Kimani', email: 's.kimani@ueab.ac.ke', 
    date: '15 Jul 2025', time: '02:15 PM' 
  },
]

// Mock Data representing All Organisations
const MOCK_ORGS = [
  {
    org: 'Nairobi Central Church', joined: 'Joined Jan 2024', type: 'Church',
    contact: 'John Doe', email: 'j.doe@example.com',
    status: 'Active', access: 'Enabled'
  },
  {
    org: 'Strathmore University', joined: 'Joined Feb 2024', type: 'University',
    contact: 'Mary Wanjiku', email: 'm.wanjiku@strathmore.edu',
    status: 'Active', access: 'Enabled'
  },
  {
    org: 'Kawangware SDA', joined: 'Joined Mar 2024', type: 'Church',
    contact: 'Peter Njuguna', email: 'peter@kawangware.org',
    status: 'Inactive', access: 'Disabled'
  },
  {
    org: 'Unknown Independent Church', joined: 'Applied Jun 2025', type: 'Church',
    contact: 'David Smith', email: 'david@unknown.org',
    status: 'Rejected', access: 'No Access'
  },
]

export default function AdminOrganisationsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-[1400px] mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col gap-1 mt-2 mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Organisation Management</h1>
        <p className="text-sm font-medium text-slate-500 max-w-2xl leading-relaxed">
          Review registration requests and manage affiliated organisations.
        </p>
      </div>

      {/* Main Stacked Layout */}
      <div className="flex flex-col space-y-8">
        
        {/* Pending Registrations Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative pb-4">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <UserPlus className="w-5 h-5 text-[#f97316]" />
              <h2 className="text-sm font-bold text-slate-900 tracking-tight">Pending Registrations</h2>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#f97316] text-white text-[10px] font-bold tracking-widest uppercase shadow-sm">
              2 Requests
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="bg-[#f8fafc] border-b border-slate-200">
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">Organisation Name</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">Type</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">Contact Details</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">Date Submitted</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_PENDING.map((req, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-5 whitespace-nowrap">
                      <p className="text-[13px] font-bold text-slate-900">{req.name}</p>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-700 tracking-widest uppercase shadow-sm">
                        {req.type}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <p className="text-[13px] font-bold text-slate-900">{req.contact}</p>
                      <p className="text-[11px] font-medium text-slate-500 mt-0.5">{req.email}</p>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <p className="text-[13px] font-bold text-slate-900 font-data tracking-wide">{req.date}</p>
                      <p className="text-[11px] font-medium text-slate-500 font-data mt-0.5">{req.time}</p>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end space-x-3">
                        <button className="text-[11px] font-bold text-red-500 hover:text-red-700 hover:underline transition-all">
                          Reject...
                        </button>
                        <button className="px-4 py-2 bg-[#10B981] text-white rounded-lg text-[11px] font-bold shadow-sm hover:bg-[#059669] transition-colors">
                          Approve
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Visual Scroll Bar Mockup as per UI */}
            <div className="absolute top-16 bottom-6 right-1 w-1.5 bg-slate-100 rounded-full">
              <div className="w-full h-32 bg-slate-300 rounded-full mt-4 cursor-pointer"></div>
            </div>
            <div className="bg-slate-50 h-[10px] border-t border-slate-200 relative flex items-center px-4">
              <div className="h-1.5 w-[30%] bg-slate-400 rounded-full cursor-pointer absolute shadow-sm" style={{left: '20px'}}></div>
              <div className="w-full flex justify-between absolute pr-4 left-0 right-0 pointer-events-none">
                <span className="text-[6px] text-slate-500 ml-1">◀</span>
                <span className="text-[6px] text-slate-500 mr-[10px]">▶</span>
              </div>
            </div>
          </div>
        </div>

        {/* Master Directory Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative pb-4">
          
          {/* Top Filter Bar */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col lg:flex-row gap-4 lg:items-center">
            <div className="relative flex-1 opacity-90">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search organisations by name or email..."
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-[13px] text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#006BB6]/20 focus:border-[#006BB6] shadow-sm transition-all"
              />
            </div>
            
            <div className="flex flex-wrap sm:flex-nowrap gap-3 items-center">
              <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 min-w-[200px]">
                <span className="text-[11px] font-bold text-slate-400 flex-shrink-0">Status:</span>
                <div className="relative flex-1">
                  <select className="w-full bg-transparent text-[13px] font-bold text-slate-900 focus:outline-none appearance-none cursor-pointer pr-6 leading-tight">
                    <option>All Statuses</option>
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>Rejected</option>
                  </select>
                  <ChevronDown className="absolute right-0 top-1 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 min-w-[150px]">
                <span className="text-[11px] font-bold text-slate-400 flex-shrink-0">Org Type:</span>
                <div className="relative flex-1">
                  <select className="w-full bg-transparent text-[13px] font-bold text-slate-900 focus:outline-none appearance-none cursor-pointer pr-6 leading-tight">
                    <option>All Types</option>
                    <option>Church</option>
                    <option>University</option>
                    <option>School</option>
                  </select>
                  <ChevronDown className="absolute right-0 top-1 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-b border-slate-200">
              <thead>
                <tr className="bg-[#f8fafc] border-b border-slate-200">
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">Organisation</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">Type</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">Contact Detail</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">Status</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">System Access</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_ORGS.map((org, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-5 whitespace-nowrap">
                      <p className="text-[13px] font-bold text-slate-900">{org.org}</p>
                      <p className="text-[10px] font-medium text-slate-500 mt-1">{org.joined}</p>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-700 tracking-widest uppercase shadow-sm">
                        {org.type}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <p className="text-[13px] font-bold text-slate-900">{org.contact}</p>
                      <p className="text-[11px] font-medium text-slate-500 mt-0.5">{org.email}</p>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      {org.status === 'Active' ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold border border-[#10B981] text-[#059669] tracking-widest uppercase shadow-sm bg-[#10B981]/10">Active</span>
                      ) : org.status === 'Inactive' ? (
                        <span className="text-[11px] font-bold text-slate-900 tracking-wide">Inactive</span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#ef4444] text-white tracking-widest shadow-sm uppercase">Rejected</span>
                      )}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      {org.access === 'Enabled' ? (
                        <div className="flex items-center space-x-3">
                          {/* Toggle Switch On */}
                          <div className="relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#006BB6] transition-colors ease-in-out duration-200 shadow-sm">
                            <span className="translate-x-[8px] pointer-events-none inline-block h-[14px] w-[14px] rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                          </div>
                          <span className="text-[11px] font-bold text-slate-900 tracking-wide">Enabled</span>
                        </div>
                      ) : org.access === 'Disabled' ? (
                        <div className="flex items-center space-x-3 opacity-60">
                          {/* Toggle Switch Off */}
                          <div className="relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-slate-300 transition-colors ease-in-out duration-200 shadow-sm">
                            <span className="translate-x-[-8px] pointer-events-none inline-block h-[14px] w-[14px] rounded-full bg-slate-50 transition duration-200 ease-in-out" />
                          </div>
                          <span className="text-[11px] font-bold text-slate-600 tracking-wide">Disabled</span>
                        </div>
                      ) : (
                        <span className="text-[11px] font-bold text-slate-400">No Access</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Visual Scroll Bar Mockup as per UI */}
            <div className="absolute top-24 bottom-20 right-1 w-1.5 bg-slate-100 rounded-full">
              <div className="w-full h-48 bg-slate-300 rounded-full mt-4 cursor-pointer"></div>
            </div>
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
            <span className="text-[11px] font-medium text-slate-500">Showing 1-4 of 342 organisations</span>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1.5 bg-white border border-slate-200 rounded text-[11px] font-bold text-slate-500 hover:bg-slate-50 transition-colors">Previous</button>
              <button className="px-3 py-1.5 bg-white border border-slate-200 rounded text-[11px] font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">Next</button>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
