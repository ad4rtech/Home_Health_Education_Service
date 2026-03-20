'use client'

import { useState } from 'react'
import { Filter, Check, Clock, UserPlus, AlertTriangle, XCircle, ShieldCheck, Bell, Trash2 } from 'lucide-react'

// Mock Data representing Notifications
const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: 'registration',
    isUnread: true,
    title: 'New Organisation Registration Pending',
    time: '10 mins ago',
    message: 'Nakuru West SDA Church has submitted a registration request. Please review and approve the organisation to allow them to participate in the Q3 2025 quarter.',
    primaryAction: 'Review Request',
  },
  {
    id: 2,
    type: 'alert',
    isUnread: true,
    title: 'Critical Stock Alert: Primary Lesson',
    time: '2 hours ago',
    message: 'Available stock for Primary category has dropped below the critical threshold. Only 1 unit remaining vs 119 ordered in Q3 2025. Please review procurement plans immediately.',
    primaryAction: 'View Catalogue',
  },
  {
    id: 3,
    type: 'cancellation',
    isUnread: false,
    title: 'Order Cancelled by Organisation',
    time: 'Yesterday, 14:30',
    message: 'Kiserian SDA has cancelled their submitted order (#ORD-8921) for Q3 2025. This order will no longer require fulfillment and stock reservations have been released.',
    primaryAction: 'View Order',
  },
  {
    id: 4,
    type: 'success',
    isUnread: false,
    title: 'Deadline Override Utilized',
    time: 'Yesterday, 09:15',
    message: 'Strathmore University successfully submitted their Q3 2025 order utilizing the deadline extension granted until 05 Aug 2025. Override audit log has been updated.',
    primaryAction: 'View Audit Log',
  },
  {
    id: 5,
    type: 'reminder',
    isUnread: false,
    title: 'Automated Reminders Dispatched',
    time: 'Jul 28, 2025',
    message: 'The system has automatically sent the "3-Days Remaining" email reminder to the 42 organisations that have not yet placed an order for the active Q3 2025 quarter.',
    primaryAction: 'View Pending Orgs',
  },
]

export default function AdminNotificationsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-[1000px] mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2 mb-6">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">System Notifications</h1>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#006BB6] text-white tracking-widest uppercase shadow-sm">
              2 Unread
            </span>
          </div>
          <p className="text-sm font-medium text-slate-500 max-w-2xl leading-relaxed">
            Manage operational alerts, registrations, and order updates.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-shrink-0">
          <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-xs font-bold flex items-center justify-center shadow-sm hover:bg-slate-50 transition-colors w-full sm:w-auto">
            <Filter className="w-3.5 h-3.5 mr-2 text-slate-400" /> 
            All Notifications
            <span className="text-[9px] ml-2 text-slate-400">▼</span>
          </button>
          <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-xs font-bold flex items-center justify-center shadow-sm hover:bg-slate-50 transition-colors w-full sm:w-auto">
            <Check className="w-3.5 h-3.5 mr-2 text-slate-400" /> Mark all as read
          </button>
        </div>
      </div>

      {/* Notifications List Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="divide-y divide-slate-100">
          
          {MOCK_NOTIFICATIONS.map((notif) => (
            <div 
              key={notif.id} 
              className={`p-6 sm:p-8 hover:bg-slate-50/50 transition-colors relative flex gap-4 sm:gap-6 ${notif.isUnread ? 'bg-[#f8fafc]' : 'bg-white'}`}
            >
              {/* Unread Left Border Visual Indicator */}
              {notif.isUnread && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#006BB6]"></div>
              )}

              {/* Dynamic Icon */}
              <div className="flex-shrink-0 mt-1">
                {notif.type === 'registration' && (
                  <div className="w-10 h-10 rounded-full border-2 border-[#006BB6] bg-white flex items-center justify-center text-[#006BB6] shadow-sm">
                    <UserPlus className="w-5 h-5" />
                  </div>
                )}
                {notif.type === 'alert' && (
                  <div className="w-10 h-10 rounded-full bg-[#ef4444] flex items-center justify-center text-white shadow-sm">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                )}
                {notif.type === 'cancellation' && (
                  <div className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400 shadow-sm">
                    <XCircle className="w-5 h-5" />
                  </div>
                )}
                {notif.type === 'success' && (
                  <div className="w-10 h-10 rounded-full bg-[#10B981] flex items-center justify-center text-white shadow-sm">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                )}
                {notif.type === 'reminder' && (
                  <div className="w-10 h-10 rounded-full bg-[#f97316] flex items-center justify-center text-white shadow-sm">
                    <Bell className="w-5 h-5" />
                  </div>
                )}
              </div>

              {/* Notification Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                  <h3 className={`text-sm font-bold tracking-tight leading-snug pr-4 ${notif.isUnread ? 'text-slate-900' : 'text-slate-800'}`}>
                    {notif.title}
                  </h3>
                  <div className="flex items-center text-[11px] font-medium text-slate-400 flex-shrink-0">
                    <Clock className="w-3 h-3 mr-1.5" />
                    {notif.time}
                  </div>
                </div>

                <p className="text-[13px] font-medium text-slate-500 leading-relaxed max-w-3xl mb-5">
                  {notif.message}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-4">
                    <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-[11px] font-bold shadow-sm hover:bg-slate-50 transition-colors">
                      {notif.primaryAction}
                    </button>
                    {notif.isUnread && (
                      <button className="text-[11px] font-bold text-[#006BB6] hover:text-[#005a99] transition-colors tracking-wide">
                        Mark as read
                      </button>
                    )}
                  </div>
                  
                  <button className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50" aria-label="Delete notification">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>

    </div>
  )
}
