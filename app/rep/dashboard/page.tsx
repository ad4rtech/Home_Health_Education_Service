'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { Calendar, Timer, CheckCircle, Pen, BookOpen, History, LogIn, UserPlus, ChevronDown } from 'lucide-react'

export default function RepDashboardPage() {
  const [activeQuarter, setActiveQuarter] = useState<any>(null)
  const [currentOrder, setCurrentOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [org, setOrg] = useState<any>(null)
  
  const supabase = createClient()

  useEffect(() => {
    fetchDashboard()
  }, [])

  const fetchDashboard = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data: orgData } = await supabase.from('organisations').select('*').eq('user_id', user.id).single()
      setOrg(orgData)
      const { data: qData } = await supabase.from('quarters').select('*').eq('status', 'published').maybeSingle()
      setActiveQuarter(qData)

      if (qData && orgData) {
        const { data: oData } = await supabase.from('orders')
          .select('*, order_items(*, catalogue_items(category))')
          .eq('quarter_id', qData.id)
          .eq('organisation_id', orgData.id)
          .maybeSingle()
        setCurrentOrder(oData)
      }
    }
    setLoading(false)
  }

  // For demonstration to match the mockup exactly if no DB data exists yet
  const mockQuarter = { name: "Q3 2025", open_date: "2025-07-01", deadline_date: "2025-07-31" }
  const displayQuarter = activeQuarter || mockQuarter

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* Top Banner */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-[#006BB6] p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-start md:items-center space-x-4">
          <div className="hidden sm:flex p-3 bg-blue-50 text-[#006BB6] rounded-lg">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {displayQuarter.name} Order Window is Open
            </h2>
            <p className="text-sm font-medium text-slate-500 mt-1">
              Opens: {new Date(displayQuarter.open_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} <span className="mx-2 text-slate-300">|</span> Deadline: {new Date(displayQuarter.deadline_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          </div>
        </div>
        <button className="bg-[#ea580c] hover:bg-[#c2410c] text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center shadow-sm transition-colors focus:ring-4 focus:ring-orange-500/20">
          <Timer className="h-4 w-4 mr-2" />
          6 days remaining
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Orders) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Current Order Status Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">My Current Order Status</h3>
                  <p className="text-sm font-medium text-slate-500 mt-1">Quarter 3, 2025</p>
                </div>
                 <div className="inline-flex items-center px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-bold bg-[#006BB6] text-white shadow-sm">
                  <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                  Submitted
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                <button disabled className="flex items-center justify-center px-4 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-400 bg-slate-50 cursor-not-allowed">
                  <span className="mr-1.5 text-lg leading-none">+</span> Place Order
                </button>
                <Link href={currentOrder ? `/rep/order/${currentOrder.id}/edit` : '#'} className="flex items-center justify-center px-4 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                  <Pen className="w-3.5 h-3.5 mr-2 text-slate-400" /> Edit Order
                </Link>
                <Link href="/rep/catalogue" className="flex items-center justify-center px-4 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                  <BookOpen className="w-3.5 h-3.5 mr-2 text-slate-400" /> View Catalogue
                </Link>
                <Link href="/rep/orders" className="flex items-center justify-center px-4 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                  <History className="w-3.5 h-3.5 mr-2 text-slate-400" /> View Order History
                </Link>
              </div>

              {/* Snapshot Table */}
              <div>
                <div className="flex justify-between items-end mb-3 px-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Order Summary Snapshot</h4>
                  <span className="text-xs font-medium text-slate-500">Total Items: 310 Books</span>
                </div>
                
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y border-collapse divide-slate-200">
                    <thead className="bg-slate-50">
                      <tr>
                        <th scope="col" className="px-6 py-3.5 text-left text-xs font-bold text-slate-500 border-b border-slate-200">Book Category</th>
                        <th scope="col" className="px-6 py-3.5 text-right text-xs font-bold text-slate-500 border-b border-slate-200">Quantity Ordered</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900 border-r border-slate-100 border-b border-slate-100">Adults</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 text-right font-data border-b border-slate-100">150</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900 border-r border-slate-100 border-b border-slate-100">Adults Double Quarter</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 text-right font-data border-b border-slate-100">20</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900 border-r border-slate-100 border-b border-slate-100">Kindergarten</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 text-right font-data border-b border-slate-100">60</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900 border-r border-slate-100">Primary</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 text-right font-data">80</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
          
          {/* Past Quarter Summary - Collapsible Style Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 px-6 py-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Past Quarter Summary (Q2 2025)</h3>
              <p className="text-xs font-medium text-slate-500 mt-1">Total Items: 280 &bull; Status: Collected</p>
            </div>
            <ChevronDown className="h-5 w-5 text-slate-400" />
          </div>

        </div>

        {/* Right Column (Recent Activity) */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
            <h3 className="text-sm font-bold text-slate-900 mb-8 border-b border-slate-100 pb-4">Recent Activity</h3>
            
            <div className="relative pl-4 border-l-2 border-slate-100 space-y-8">
              {/* Event 1 */}
              <div className="relative">
                <div className="absolute -left-[27px] bg-[#006BB6] p-1 rounded-full border-4 border-white shadow-sm">
                  <CheckCircle className="h-3.5 w-3.5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Order submitted</p>
                  <p className="text-[11px] font-medium text-slate-500 mt-1">14 Jul 2025, 09:41 AM</p>
                </div>
              </div>
              
               {/* Event 2 */}
              <div className="relative">
                <div className="absolute -left-[27px] bg-white p-1 rounded-full border-[3px] border-slate-100">
                  <Pen className="h-3 w-3 text-slate-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700">Order amended</p>
                  <p className="text-[11px] font-medium text-slate-500 mt-1">16 Jul 2025, 14:22 PM</p>
                </div>
              </div>

               {/* Event 3 */}
               <div className="relative">
                <div className="absolute -left-[27px] bg-white p-1 rounded-full border-[3px] border-slate-100">
                  <LogIn className="h-3 w-3 text-slate-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700">Logged in securely</p>
                  <p className="text-[11px] font-medium text-slate-500 mt-1">20 Jul 2025, 08:00 AM</p>
                </div>
              </div>

              {/* Event 4 */}
              <div className="relative">
                <div className="absolute -left-[27px] bg-white p-1 rounded-full border-[3px] border-slate-100">
                  <UserPlus className="h-3 w-3 text-slate-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700">Account registered</p>
                  <p className="text-[11px] font-medium text-slate-500 mt-1">01 Jan 2025, 10:15 AM</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  )
}
