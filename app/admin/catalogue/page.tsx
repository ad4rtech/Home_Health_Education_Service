'use client'

import { useState } from 'react'
import { Info, Save, SlidersHorizontal, Lock, Smartphone, BookOpen, User, Users, GraduationCap, ChevronDown } from 'lucide-react'

// Mock Data representing the 6 fixed categories
const MOCK_CATALOGUE = [
  { id: 1, name: 'Adults Lesson', desc: 'Standard quarterly adult guide', price: '400', stock: '500', icon: Smartphone },
  { id: 2, name: 'Adults Double Quarter', desc: 'Extended 6-month edition', price: '750', stock: '200', icon: BookOpen },
  { id: 3, name: 'Kindergarten', desc: 'Ages 0-4 guide', price: '300', stock: '300', icon: User },
  { id: 4, name: 'Primary', desc: 'Ages 5-9 guide', price: '300', stock: '350', icon: GraduationCap },
  { id: 5, name: 'Cornerstone', desc: 'Early teens guide', price: '350', stock: '250', icon: BookOpen },
  { id: 6, name: 'Realtime', desc: 'Young adults guide', price: '350', stock: '250', icon: Users },
]

export default function AdminCataloguePage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-[1400px] mx-auto">
      
      {/* Page Header */}
      <div className="mt-2 mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Catalogue Management</h1>
        <p className="text-sm font-medium text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Set quarterly pricing and initial stock levels for the six fixed lesson categories.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* LEFT COLUMN - MAIN EDITOR (WIDE) */}
        <div className="w-full lg:w-2/3 flex flex-col space-y-6">
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative">
            
            {/* Form Header */}
            <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <h2 className="text-base font-bold text-slate-900 tracking-tight">Q4 2025 Pricing & Inventory</h2>
                <span className="inline-flex items-center px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-bold tracking-widest uppercase">Draft Status</span>
              </div>
              <button className="bg-[#006BB6] hover:bg-[#005a99] text-white px-5 py-2.5 rounded-lg text-[13px] font-bold flex items-center shadow-sm transition-colors focus:ring-4 focus:ring-[#006BB6]/20 flex-shrink-0">
                <Save className="w-4 h-4 mr-2" /> Save Changes
              </button>
            </div>

            {/* Alert Banner */}
            <div className="bg-slate-50 border-b border-slate-100 p-5 mx-6 md:mx-8 mt-6 rounded-lg flex items-start">
              <Info className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
              <div className="ml-3">
                <p className="text-[13px] font-bold text-slate-900 leading-tight">Prices are unlocked during Draft status.</p>
                <p className="text-[12px] font-medium text-slate-500 mt-1 leading-relaxed">
                  You can freely edit pricing and initial stock quantities. Once the quarter is Published, pricing will be permanently locked to ensure all organisations receive consistent quotes.
                </p>
              </div>
            </div>

            {/* Fixed Categories Edit Table */}
            <div className="px-6 md:px-8 pt-6 pb-8 overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="border-b-2 border-slate-100">
                    <th className="pb-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest w-1/2">Lesson Category</th>
                    <th className="pb-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest w-1/4">Unit Price</th>
                    <th className="pb-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest w-1/4">Initial Stock Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_CATALOGUE.map((item, idx) => {
                    const Icon = item.icon
                    return (
                      <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                        <td className="py-5 pr-4">
                          <div className="flex items-start">
                            <div className="w-10 h-10 rounded-lg border border-slate-200 bg-white flex items-center justify-center flex-shrink-0 shadow-sm mr-4 text-slate-400 group-hover:text-[#006BB6] transition-colors">
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-slate-900 leading-tight">{item.name}</h4>
                              <p className="text-[11px] font-medium text-slate-500 mt-0.5">{item.desc}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-5 pr-4">
                          <div className="relative max-w-[140px]">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-[11px] font-bold text-slate-400 uppercase">KES</span>
                            </div>
                            <input 
                              type="text" 
                              defaultValue={item.price}
                              className="w-full pl-12 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#006BB6]/20 focus:border-[#006BB6] shadow-sm transition-all font-data"
                            />
                          </div>
                        </td>
                        <td className="py-5">
                          <div className="relative max-w-[140px]">
                            <input 
                              type="text" 
                              defaultValue={item.stock}
                              className="w-full pl-3 pr-14 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#006BB6]/20 focus:border-[#006BB6] shadow-sm transition-all font-data text-right"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                              <span className="text-[11px] font-bold text-slate-400">Units</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Visual Scroll Bar Mockup as per UI */}
            <div className="bg-slate-50 h-[10px] border-t border-slate-200 relative flex items-center px-4">
              <div className="h-2 w-full max-w-[85%] bg-slate-300 rounded-full cursor-pointer absolute shadow-inner" style={{left: '24px'}}></div>
              <div className="w-full flex justify-between absolute pr-4 left-0 right-0 pointer-events-none">
                <span className="text-[10px] text-slate-400 ml-2 mt-[-3px]">◀</span>
                <span className="text-[10px] text-slate-400 mr-2 mt-[-3px]">▶</span>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN (NARROW) */}
        <div className="w-full lg:w-1/3 flex flex-col space-y-6">
          
          {/* Quarter Selection */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center space-x-2.5 mb-6 border-b border-slate-100 pb-5">
              <SlidersHorizontal className="w-4 h-4 text-[#006BB6]" />
              <h2 className="text-sm font-bold text-slate-900 tracking-tight">Quarter Selection</h2>
            </div>
            
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-2">Edit Catalogue For</label>
              <div className="relative">
                <select defaultValue="q4" className="w-full pl-3 pr-10 py-2.5 bg-white border border-slate-200 rounded-lg text-[13px] text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#006BB6]/20 focus:border-[#006BB6] shadow-sm appearance-none cursor-pointer transition-all">
                  <option value="q4">Q4 2025 (Draft)</option>
                  <option value="q3">Q3 2025 (Published)</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Live Reference */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <h2 className="text-sm font-bold text-slate-900 tracking-tight">Live Reference</h2>
                <Lock className="w-3 h-3 text-slate-400" />
              </div>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[9px] font-bold bg-[#10B981] text-white tracking-widest uppercase shadow-sm">Q3 2025</span>
            </div>
            
            <div className="p-6">
              <p className="text-[11px] font-medium text-slate-500 leading-relaxed mb-6">
                Currently published prices. Use this as a reference while setting up the next quarter.
              </p>

              <div className="space-y-4">
                {[
                  { name: 'Adults Lesson', price: '380' },
                  { name: 'Adults Double Q', price: '720' },
                  { name: 'Kindergarten', price: '280' },
                  { name: 'Primary', price: '280' },
                  { name: 'Cornerstone', price: '320' },
                  { name: 'Realtime', price: '320' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">{item.name}</span>
                    <span className="text-[11px] font-bold text-slate-500 font-data tracking-wide">KES {item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
