'use client'

import { Download, Filter, FileText, FileSpreadsheet, PlusCircle, AlertCircle, StopCircle, ArrowUpRight } from 'lucide-react'

export default function ReportsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-[1200px] mx-auto">
      
      {/* Header */}
      <div className="border-b border-transparent pb-2 mt-4">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">Organisation Reports</h1>
        <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-2xl">
          Insights, compliance records, and complete order history for your organisation.
        </p>
      </div>

      {/* Order History Export */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Order History Export</h2>
            <p className="text-sm font-medium text-slate-500 mt-1">Filter and download your past orders for institutional procurement records.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center px-4 py-2 border border-slate-200 shadow-sm text-[11px] font-bold rounded-lg text-slate-700 bg-white hover:bg-slate-50 transition-colors">
               <Filter className="w-3.5 h-3.5 mr-2 text-slate-500" /> Filter
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-slate-200 shadow-sm text-[11px] font-bold rounded-lg text-slate-700 bg-white hover:bg-slate-50 transition-colors">
               <FileText className="w-3.5 h-3.5 mr-2 text-slate-500" /> Export PDF
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-[11px] font-bold rounded-lg text-white bg-[#006BB6] hover:bg-[#005a99] transition-colors focus:ring-4 focus:ring-[#006BB6]/20">
               <FileSpreadsheet className="w-3.5 h-3.5 mr-2" /> Export CSV
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-[#f8fafc]">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-[11px] font-bold text-slate-600 tracking-widest uppercase">Quarter</th>
                <th scope="col" className="px-6 py-4 text-left text-[11px] font-bold text-slate-600 tracking-widest uppercase">Order ID</th>
                <th scope="col" className="px-6 py-4 text-left text-[11px] font-bold text-slate-600 tracking-widest uppercase">Submission Date</th>
                <th scope="col" className="px-6 py-4 text-left text-[11px] font-bold text-slate-600 tracking-widest uppercase">Categories Ordered</th>
                <th scope="col" className="px-6 py-4 text-left text-[11px] font-bold text-slate-600 tracking-widest uppercase">Total Quantities</th>
                <th scope="col" className="px-6 py-4 text-left text-[11px] font-bold text-slate-600 tracking-widest uppercase">Final Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {[
                { q: 'Q2 2025', id: 'ORD-8932', date: '12 Apr 2025', cats: '6/6', qty: '1,240' },
                { q: 'Q1 2025', id: 'ORD-7105', date: '10 Jan 2025', cats: '6/6', qty: '1,180' },
                { q: 'Q4 2024', id: 'ORD-6541', date: '05 Oct 2024', cats: '5/6', qty: '850' },
                { q: 'Q3 2024', id: 'ORD-5820', date: '18 Jul 2024', cats: '6/6', qty: '1,020' },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900">{row.q}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-data">{row.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">{row.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-data">{row.cats}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900 font-data">{row.qty}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#10B981] text-white tracking-widest uppercase shadow-sm">
                      Collected
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2x2 Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Growth Bar Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Quarter-on-Quarter Growth</h2>
          <p className="text-sm font-medium text-slate-500 mt-1 mb-8">Compare total lesson books ordered across recent quarters.</p>
          
          <div className="h-48 flex items-end justify-between px-2 sm:px-6 relative">
            {/* Y Axes guides */}
            <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col justify-between pointer-events-none">
              <div className="border-b border-dashed border-slate-100 w-full flex items-end justify-start"><span className="text-[10px] font-bold text-slate-400 font-data translate-y-2 -translate-x-6">1.5k</span></div>
              <div className="border-b border-dashed border-slate-100 w-full flex items-end justify-start"><span className="text-[10px] font-bold text-slate-400 font-data translate-y-2 -translate-x-6">1.0k</span></div>
              <div className="border-b border-dashed border-slate-100 w-full flex items-end justify-start"><span className="text-[10px] font-bold text-slate-400 font-data translate-y-2 -translate-x-6">0.5k</span></div>
              <div className="border-b border-solid border-slate-200 w-full flex items-end justify-start"><span className="text-[10px] font-bold text-slate-400 font-data translate-y-2 -translate-x-4">0</span></div>
            </div>
            
            {/* Bars */}
            <div className="relative z-10 flex flex-col items-center group w-1/5 max-w-[50px]">
              <span className="text-[10px] font-bold text-slate-500 mb-2 opacity-0 group-hover:opacity-100 transition-opacity font-data">1,020</span>
              <div className="w-full bg-[#f1f5f9] rounded-t-sm h-[32px] sm:h-[95px] transition-all duration-500 hover:bg-[#e2e8f0]"></div>
              <span className="text-[10px] font-bold text-slate-500 mt-3 font-data">Q3 '24</span>
            </div>
            <div className="relative z-10 flex flex-col items-center group w-1/5 max-w-[50px]">
              <span className="text-[10px] font-bold text-slate-500 mb-2 opacity-0 group-hover:opacity-100 transition-opacity font-data">850</span>
              <div className="w-full bg-[#f1f5f9] rounded-t-sm h-[20px] sm:h-[75px] transition-all duration-500 hover:bg-[#e2e8f0]"></div>
              <span className="text-[10px] font-bold text-slate-500 mt-3 font-data">Q4 '24</span>
            </div>
            <div className="relative z-10 flex flex-col items-center group w-1/5 max-w-[50px]">
              <span className="text-[10px] font-bold text-slate-500 mb-2 opacity-0 group-hover:opacity-100 transition-opacity font-data">1,180</span>
              <div className="w-full bg-[#f1f5f9] rounded-t-sm h-[40px] sm:h-[110px] transition-all duration-500 hover:bg-[#e2e8f0]"></div>
              <span className="text-[10px] font-bold text-slate-500 mt-3 font-data">Q1 '25</span>
            </div>
            <div className="relative z-10 flex flex-col items-center group w-1/5 max-w-[50px]">
              <span className="text-[11px] font-bold text-[#006BB6] mb-2 font-data">1,240</span>
              <div className="w-full bg-[#006BB6] shadow-sm rounded-t-sm h-[45px] sm:h-[120px] transition-all duration-500 hover:bg-[#005a99]"></div>
              <span className="text-[10px] font-bold text-slate-900 mt-3 font-data">Q2 '25</span>
            </div>
          </div>
        </div>

        {/* Category Breakdown Donut */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Category Breakdown</h2>
          <p className="text-sm font-medium text-slate-500 mt-1 mb-8">Age-group distribution for your most recent Q2 2025 order.</p>

          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-8 sm:gap-12">
            {/* CSS Donut Chart */}
            <div className="relative w-36 h-36 rounded-full shadow-sm flex items-center justify-center flex-shrink-0" style={{
              background: 'conic-gradient(#006BB6 0% 35%, #1e293b 35% 55%, #10B981 55% 70%, #f97316 70% 85%, #ef4444 85% 95%, #94a3b8 95% 100%)'
            }}>
              <div className="w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
                <span className="text-lg font-extrabold text-slate-900 font-data leading-none">1,240</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Total Books</span>
              </div>
            </div>

            {/* Legend */}
            <div className="w-full max-w-[200px] flex flex-col space-y-3">
              {[
                { color: 'bg-[#006BB6]', label: 'Adults', pct: '35%' },
                { color: 'bg-[#1e293b]', label: 'Primary', pct: '20%' },
                { color: 'bg-[#10B981]', label: 'Kindergarten', pct: '15%' },
                { color: 'bg-[#f97316]', label: 'Realtime', pct: '15%' },
                { color: 'bg-[#ef4444]', label: 'Adults Double Q.', pct: '10%' },
                { color: 'bg-[#94a3b8]', label: 'Cornerstone', pct: '5%' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-sm ${item.color} mr-3 shadow-sm`}></div>
                    <span className="text-xs font-bold text-slate-700">{item.label}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-900 font-data">{item.pct}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Amendment Frequency */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Amendment Frequency</h2>
          <p className="text-sm font-medium text-slate-500 mt-1 mb-8">Insights into how often you modify your submitted orders.</p>

          <div className="flex flex-col sm:flex-row gap-6 h-full">
            <div className="bg-[#f8fafc] border border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center w-full sm:w-1/3 min-w-[140px]">
              <span className="text-4xl font-extrabold text-slate-900 font-data mb-2">2.5</span>
              <span className="text-[10px] font-bold text-slate-500 text-center uppercase tracking-wide leading-tight">Average amendments per quarter</span>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <p className="text-sm font-bold text-slate-800 leading-relaxed mb-4">
                You tend to adjust your initial quantities <span className="text-[#006BB6]">2 to 3 times</span> before the quarterly deadline closes.
              </p>
              <div className="bg-[#f0f7ff] border-l-4 border-[#006BB6] p-4 rounded-r-lg">
                <p className="text-[11px] font-medium text-[#005a99] leading-relaxed">
                  <span className="font-bold">Insight:</span> Submitting your initial order closer to the deadline might reduce the need for frequent adjustments as your congregation's numbers settle.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Compliance Record */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="p-6 sm:p-8 flex items-start justify-between border-b border-transparent pb-6">
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">Compliance Record</h2>
              <p className="text-sm font-medium text-slate-500 mt-1">Log of missed submission windows or late activities.</p>
            </div>
            <div className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold bg-[#10B981] text-white tracking-widest uppercase shadow-sm whitespace-nowrap ml-4">
              92% Compliance
            </div>
          </div>

          <div className="px-6 sm:px-8 pb-6 sm:pb-8 flex-1 space-y-4">
            <div className="flex items-center justify-between bg-white border border-slate-200 shadow-sm rounded-lg p-4 transition-shadow hover:shadow-md">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center border border-red-100 mr-4 flex-shrink-0">
                  <StopCircle className="w-4 h-4 text-red-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">Q3 2023</h4>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">Missed Submission Deadline</p>
                </div>
              </div>
              <span className="text-[11px] font-medium text-slate-400 font-data ml-4">Jul 2023</span>
            </div>

            <div className="flex items-center justify-between bg-white border border-slate-200 shadow-sm rounded-lg p-4 transition-shadow hover:shadow-md">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center border border-amber-100 mr-4 flex-shrink-0">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">Q1 2024</h4>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">Late Amendment Request</p>
                </div>
              </div>
              <span className="text-[11px] font-medium text-slate-400 font-data ml-4">Jan 2024</span>
            </div>
          </div>
        </div>

      </div>

      {/* Order Timeline (Audit Trail) */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 sm:p-8 flex items-start justify-between border-b border-slate-100 mb-6">
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">Order Timeline (Audit Trail)</h2>
            <p className="text-sm font-medium text-slate-500 mt-1">Chronological view of all actions taken on your most recent Q2 2025 order.</p>
          </div>
          <button className="hidden sm:inline-flex flex-shrink-0 items-center px-4 py-2 border border-slate-200 shadow-sm text-[11px] font-bold rounded-lg text-slate-700 bg-white hover:bg-slate-50 transition-colors ml-4">
             Download Log
          </button>
        </div>

        <div className="px-6 sm:px-10 pb-6 sm:pb-10 pt-2 space-y-8">
          
          {/* Timeline Event 1 */}
          <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-100">
            <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-[#10B981] rounded-full ring-4 ring-white shadow-sm"></div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Order Collected</h3>
              <p className="text-xs font-medium text-slate-600 mt-1.5 leading-relaxed max-w-2xl">
                Order picked up by John Doe at HHES Centre. Verification code matched successfully.
              </p>
              <p className="text-[11px] font-medium text-slate-400 mt-2 font-data">20 Apr 2025, 14:30</p>
            </div>
          </div>

          {/* Timeline Event 2 */}
          <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-100">
            <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-[#006BB6] rounded-full ring-4 ring-white shadow-sm"></div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Ready for Pickup</h3>
              <p className="text-xs font-medium text-slate-600 mt-1.5 leading-relaxed max-w-2xl">
                Order packed, verified, and marked ready for collection by HHES Admin.
              </p>
              <p className="text-[11px] font-medium text-slate-400 mt-2 font-data">18 Apr 2025, 08:15</p>
            </div>
          </div>

          {/* Timeline Event 3 */}
          <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-100">
            <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-[#f97316] rounded-full ring-4 ring-white shadow-sm"></div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Order Amended</h3>
              <p className="text-xs font-medium text-slate-600 mt-1.5 leading-relaxed max-w-2xl">
                Quantities adjusted: Primary (+10), Adults (+5). Total volume updated to 1,240.
              </p>
              <p className="text-[11px] font-medium text-slate-400 mt-2 font-data">15 Apr 2025, 11:20</p>
            </div>
          </div>

          {/* Timeline Event 4 */}
          <div className="relative pl-6 sm:pl-8 border-l-2 border-transparent">
            <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-white border-2 border-slate-300 rounded-full ring-4 ring-white shadow-sm"></div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Order Submitted</h3>
              <p className="text-xs font-medium text-slate-600 mt-1.5 leading-relaxed max-w-2xl">
                Initial order placed via digital portal. Total volume: 1,225. System generated Order ID: ORD-8932.
              </p>
              <p className="text-[11px] font-medium text-slate-400 mt-2 font-data">12 Apr 2025, 10:45</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}
