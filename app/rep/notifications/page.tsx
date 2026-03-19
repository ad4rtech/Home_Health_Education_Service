'use client'

import { useState } from 'react'
import { Calendar, Timer, CheckCircle, Trash2, CheckCheck, UserCheck, Package, PackageCheck, AlertCircle, XCircle } from 'lucide-react'

// Mock Data Definitions ensuring UI fidelity
const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: 'success',
    title: 'Order Confirmation: #ORD-25Q3-4921',
    message: 'Your order for Q3 2025 has been successfully submitted to HHES. An automated email confirmation with your order reference and breakdown has been sent to your registered email address.',
    timestamp: 'Today, 10:00 AM',
    unread: true,
    breakdown: [
      { name: 'Adults', qty: 50 },
      { name: 'Adults Double Qtr', qty: 20 },
      { name: 'Kindergarten', qty: 15 },
      { name: 'Primary', qty: 15 },
      { name: 'Cornerstone', qty: 10 },
      { name: 'Realtime', qty: 10 },
    ],
    actions: [{ label: 'View Order Details', type: 'outline' }]
  },
  {
    id: 2,
    type: 'warning',
    title: 'Reminder: Q3 2025 Order Deadline Approaching',
    message: 'This is an automated reminder that the Q3 2025 order window closes in 3 days on 31 Jul 2025. Please review and finalize any amendments to your submitted order before the deadline to ensure accurate procurement planning.',
    timestamp: 'Today, 08:00 AM',
    unread: true,
    actions: []
  },
  {
    id: 3,
    type: 'info',
    title: 'Organisation Registration Approved',
    message: 'Welcome to the HHES Digital Ordering Platform. Your registration for Nairobi Central Church has been reviewed and approved by an administrator. You can now access your dashboard and place quarterly lesson book orders.',
    timestamp: 'Yesterday, 14:15 PM',
    unread: true,
    actions: []
  },
  {
    id: 4,
    type: 'calendar',
    title: 'Q3 2025 Order Window Now Open',
    message: 'The order window for Q3 2025 is now active. All affiliated organisations are requested to submit their quarterly bulk orders between 1 Jul 2025 and 31 Jul 2025. You can view the latest catalogue pricing on your dashboard before ordering.',
    timestamp: '01 Jul 2025, 08:00 AM',
    unread: false,
    actions: [{ label: 'View Catalogue', type: 'outline' }]
  },
  {
    id: 5,
    type: 'read',
    title: 'Pickup Confirmation: #ORD-25Q2-1108',
    message: 'Your Q2 2025 order has been officially marked as collected. This completes your transaction for the quarter. Thank you for collecting your 115 units from the HHES Main Centre. A digital receipt has been saved to your Order History.',
    timestamp: '15 May 2025, 11:45 AM',
    unread: false,
    actions: []
  },
  {
    id: 6,
    type: 'read',
    title: 'Order Ready for Pickup: #ORD-25Q2-1108',
    message: 'Your lesson books for Q2 2025 have been prepared and are ready for collection. Please arrange for your representative to visit the HHES Main Centre. Our operating hours are Monday to Thursday, 08:00 AM to 05:00 PM.',
    timestamp: '10 May 2025, 09:30 AM',
    unread: false,
    actions: []
  },
  {
    id: 7,
    type: 'read',
    title: 'Order Amendment Confirmation: #ORD-25Q2-1108',
    message: 'Your amendment to order #ORD-25Q2-1108 has been successfully saved. Your updated total request of 115 units has been recorded by the system for Q2 2025 procurement.',
    timestamp: '12 Apr 2025, 15:20 PM',
    unread: false,
    actions: []
  },
  {
    id: 8,
    type: 'read',
    title: 'Order Cancellation Confirmation: #ORD-24Q4-8831',
    message: 'We confirm that your order #ORD-24Q4-8831 for Q4 2024 has been successfully cancelled. HHES will not procure or hold stock for this cancelled order. If you need lesson books later, you will need to submit a new order before the deadline closes.',
    timestamp: '15 Oct 2024, 10:10 AM',
    unread: false,
    actions: []
  }
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS)

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })))
  }

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const getIcon = (type: string, unread: boolean) => {
    if (!unread) {
      return (
        <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center flex-shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
        </div>
      )
    }

    switch (type) {
      case 'success':
        return (
          <div className="w-10 h-10 rounded-full bg-[#10B981] flex items-center justify-center flex-shrink-0 shadow-sm border border-[#059669]">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
        )
      case 'warning':
        return (
          <div className="w-10 h-10 rounded-full bg-[#f97316] flex items-center justify-center flex-shrink-0 shadow-sm border border-[#ea580c]">
            <Timer className="w-5 h-5 text-white" />
          </div>
        )
      case 'info':
        return (
          <div className="w-10 h-10 rounded-full bg-[#006BB6] flex items-center justify-center flex-shrink-0 shadow-sm border border-[#005a99]">
            <UserCheck className="w-5 h-5 text-white" />
          </div>
        )
      case 'calendar':
        return (
          <div className="w-10 h-10 rounded-full bg-[#f0f7ff] border border-[#bae6fd] flex items-center justify-center flex-shrink-0 shadow-sm">
            <Calendar className="w-5 h-5 text-[#006BB6]" />
          </div>
        )
      default:
        return (
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 border border-slate-200">
            <div className="w-2 h-2 rounded-full bg-slate-400"></div>
          </div>
        )
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-[1000px] mx-auto">
      
      {/* Top Banner (Orange Border Variant) */}
      <div className="bg-white rounded-xl shadow-sm border border-[#fdba74] border-l-[6px] border-l-[#f97316] p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-start md:items-center space-x-4">
          <div className="hidden sm:flex text-[#f97316]">
            <Calendar className="h-7 w-7" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Q3 2025 Order Window Closing Soon
            </h2>
            <p className="text-sm font-medium text-slate-500 mt-1">
              Opens: 1 Jul 2025 <span className="mx-2 text-slate-300">|</span> Deadline: 31 Jul 2025
            </p>
          </div>
        </div>
        <button className="bg-[#ea580c] hover:bg-[#c2410c] text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center shadow-sm transition-colors focus:ring-4 focus:ring-orange-500/20">
          <Timer className="h-4 w-4 mr-2" />
          3 days remaining
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-transparent pb-2">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Notifications</h1>
          <p className="text-sm font-medium text-slate-500 leading-relaxed">
            View all your system alerts, order updates, and automated email confirmations below.
          </p>
        </div>
        <button 
          onClick={markAllAsRead}
          className="inline-flex items-center px-4 py-2 bg-white border border-slate-200 shadow-sm rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors flex-shrink-0"
        >
          <CheckCheck className="w-4 h-4 mr-2 text-slate-400" /> Mark all as read
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`relative bg-white rounded-xl shadow-sm border ${notification.unread ? 'border-[#006BB6]/20 border-l-[6px] border-l-[#006BB6]' : 'border-slate-200 border-l-transparent'} overflow-hidden transition-all duration-300 hover:shadow-md`}
          >
            <div className="p-6">
              <div className="flex items-start justify-between gap-6">
                
                {/* Left Content (Icon + Text) */}
                <div className="flex items-start gap-4 sm:gap-6 flex-1">
                  {getIcon(notification.type, notification.unread)}
                  
                  <div className="flex-1">
                    <h3 className={`text-sm ${notification.unread ? 'font-bold' : 'font-semibold'} text-slate-900 leading-tight mb-1.5`}>
                      {notification.title}
                    </h3>
                    <p className="text-[13px] font-medium text-slate-500 leading-relaxed max-w-3xl">
                      {notification.message}
                    </p>

                    {/* Optional Breakdown */}
                    {notification.breakdown && (
                      <div className="mt-4 pt-4 border-t border-dashed border-slate-200">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Order Breakdown</p>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                          {notification.breakdown.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <span className="text-xs font-medium text-slate-500">{item.name}</span>
                              <span className="text-xs font-bold text-slate-900 font-data">{item.qty} Units</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Actions Row */}
                    <div className="mt-5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {notification.actions?.map((action, idx) => (
                          <button key={idx} className="inline-flex items-center px-4 py-2 border border-slate-200 shadow-sm text-[11px] font-bold rounded-lg text-slate-700 bg-white hover:bg-slate-50 transition-colors">
                            {action.label}
                          </button>
                        ))}
                      </div>

                      <button 
                        onClick={() => deleteNotification(notification.id)}
                        className={`inline-flex items-center text-[11px] font-bold ${notification.actions?.length === 0 ? 'mt-0' : ''} text-red-500 hover:text-red-700 transition-colors border border-transparent hover:border-red-100 rounded px-2 py-1`}
                      >
                        Delete
                      </button>
                    </div>

                  </div>
                </div>

                {/* Right Content (Timestamp & Top Delete) */}
                <div className="hidden sm:flex flex-col items-end gap-3 flex-shrink-0">
                  <span className="text-[11px] font-medium text-slate-400 whitespace-nowrap">
                    {notification.timestamp}
                  </span>
                  <button 
                    onClick={() => deleteNotification(notification.id)}
                    className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors border border-red-100 bg-white shadow-sm"
                    title="Delete Notification"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                
              </div>
            </div>
          </div>
        ))}
        
        {notifications.length === 0 && (
          <div className="text-center py-24 bg-white rounded-xl border border-slate-200 border-dashed">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
              <CheckCheck className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">You're all caught up!</h3>
            <p className="text-sm font-medium text-slate-500">There are no new notifications to display right now.</p>
          </div>
        )}
      </div>

    </div>
  )
}
