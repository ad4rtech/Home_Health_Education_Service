'use client'

import { useState } from 'react'

export default function AdminProfilePage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-[1000px] mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col gap-1 mt-2 mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Profile Settings</h1>
        <p className="text-sm font-medium text-slate-500 max-w-2xl leading-relaxed">
          Manage your administrative account details and preferences.
        </p>
      </div>

      {/* Main Layout Grid */}
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
        
        {/* Left Navigation Column */}
        <div className="w-full md:w-64 flex-shrink-0 sticky top-24">
          <nav className="flex flex-col space-y-1">
            <a href="#personal-info" className="px-4 py-2.5 bg-white shadow-sm border border-slate-200 rounded-lg text-[13px] font-bold text-slate-900 transition-colors">
              Personal Information
            </a>
            <a href="#security" className="px-4 py-2.5 rounded-lg text-[13px] font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors border border-transparent">
              Security & Password
            </a>
            <a href="#notifications" className="px-4 py-2.5 rounded-lg text-[13px] font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors border border-transparent">
              Notification Preferences
            </a>
          </nav>
        </div>

        {/* Right Content Column */}
        <div className="flex-1 w-full space-y-6">
          
          {/* 1. Personal Information Card */}
          <div id="personal-info" className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden scroll-mt-24">
            <div className="p-6 md:p-8 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">Personal Information</h2>
              <p className="text-xs font-medium text-slate-500 mt-1">Update your photo and personal details.</p>
              
              <div className="mt-8 flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-slate-200 overflow-hidden border-2 border-slate-100 shadow-sm flex-shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                    alt="Admin Avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-[11px] font-bold shadow-sm hover:bg-slate-50 transition-colors">
                    Change Photo
                  </button>
                  <button className="text-[11px] font-bold text-slate-500 hover:text-red-600 transition-colors">
                    Remove
                  </button>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-2">First Name</label>
                  <input 
                    type="text" 
                    defaultValue="Admin"
                    className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-[13px] text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#006BB6]/20 focus:border-[#006BB6] shadow-sm transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    defaultValue="User"
                    className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-[13px] text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#006BB6]/20 focus:border-[#006BB6] shadow-sm transition-all"
                  />
                </div>
                
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    defaultValue="admin@hheskenya.org"
                    className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-[13px] text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#006BB6]/20 focus:border-[#006BB6] shadow-sm transition-all"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 mb-2">System Role</label>
                  <input 
                    type="text" 
                    defaultValue="Super Admin"
                    disabled
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[13px] text-slate-500 font-medium cursor-not-allowed shadow-sm"
                  />
                  <p className="text-[10px] font-medium text-slate-400 mt-2">
                    Your role determines your access level. Contact IT support to request role changes.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50/50 p-4 sm:px-8 border-t border-slate-100 flex justify-end">
              <button className="bg-[#006BB6] hover:bg-[#005a99] text-white px-5 py-2.5 rounded-lg text-[12px] font-bold shadow-sm transition-colors focus:ring-4 focus:ring-[#006BB6]/20 w-full sm:w-auto">
                Save Changes
              </button>
            </div>
          </div>

          {/* 2. Security & Password Card */}
          <div id="security" className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden scroll-mt-24">
            <div className="p-6 md:p-8 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">Security & Password</h2>
              <p className="text-xs font-medium text-slate-500 mt-1">Update your password to keep your account secure.</p>
              
              <div className="mt-8 space-y-5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-2">Current Password</label>
                  <input 
                    type="password" 
                    defaultValue="........"
                    className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-[13px] text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#006BB6]/20 focus:border-[#006BB6] shadow-sm transition-all"
                  />
                </div>
                
                <div className="pt-2">
                  <label className="block text-[11px] font-bold text-slate-700 mb-2">New Password</label>
                  <input 
                    type="password" 
                    placeholder="Enter new password"
                    className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-[13px] text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#006BB6]/20 focus:border-[#006BB6] shadow-sm transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-2">Confirm New Password</label>
                  <input 
                    type="password" 
                    placeholder="Confirm new password"
                    className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-[13px] text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#006BB6]/20 focus:border-[#006BB6] shadow-sm transition-all"
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50/50 p-4 sm:px-8 border-t border-slate-100 flex justify-end">
              <button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-5 py-2.5 rounded-lg text-[12px] font-bold shadow-sm transition-colors focus:ring-4 focus:ring-slate-200 w-full sm:w-auto">
                Update Password
              </button>
            </div>
          </div>

          {/* 3. Notification Preferences Card */}
          <div id="notifications" className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden scroll-mt-24">
            <div className="p-6 md:p-8 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">Notification Preferences</h2>
              <p className="text-xs font-medium text-slate-500 mt-1">Choose which alerts you want to receive via email.</p>
            </div>
            
            <div className="divide-y divide-slate-100">
              
              <div className="p-6 md:px-8 flex items-center justify-between gap-4">
                <div className="pr-4">
                  <h3 className="text-[13px] font-bold text-slate-900 leading-tight">New Organisation Registrations</h3>
                  <p className="text-[11px] font-medium text-slate-500 mt-1 leading-relaxed">Receive an email when a new organisation requests an account.</p>
                </div>
                {/* Toggle Switch On */}
                <div className="relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#006BB6] transition-colors ease-in-out duration-200 shadow-sm">
                  <span className="translate-x-[8px] pointer-events-none inline-block h-[14px] w-[14px] rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                </div>
              </div>

              <div className="p-6 md:px-8 flex items-center justify-between gap-4">
                <div className="pr-4">
                  <h3 className="text-[13px] font-bold text-slate-900 leading-tight">Critical Stock Alerts</h3>
                  <p className="text-[11px] font-medium text-slate-500 mt-1 leading-relaxed">Get notified when order demand exceeds available inventory for any category.</p>
                </div>
                {/* Toggle Switch On */}
                <div className="relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#006BB6] transition-colors ease-in-out duration-200 shadow-sm">
                  <span className="translate-x-[8px] pointer-events-none inline-block h-[14px] w-[14px] rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                </div>
              </div>

              <div className="p-6 md:px-8 flex items-center justify-between gap-4">
                <div className="pr-4">
                  <h3 className="text-[13px] font-bold text-slate-900 leading-tight">Order Cancellations</h3>
                  <p className="text-[11px] font-medium text-slate-500 mt-1 leading-relaxed">Receive an email when an organisation cancels a submitted order.</p>
                </div>
                {/* Toggle Switch On */}
                <div className="relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#006BB6] transition-colors ease-in-out duration-200 shadow-sm">
                  <span className="translate-x-[8px] pointer-events-none inline-block h-[14px] w-[14px] rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                </div>
              </div>

              <div className="p-6 md:px-8 flex items-center justify-between gap-4">
                <div className="pr-4">
                  <h3 className="text-[13px] font-bold text-slate-900 leading-tight">Deadline Overrides</h3>
                  <p className="text-[11px] font-medium text-slate-500 mt-1 leading-relaxed">Get notified when another admin grants a deadline extension.</p>
                </div>
                {/* Toggle Switch Off */}
                <div className="relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-slate-200 transition-colors ease-in-out duration-200 shadow-sm border border-slate-300">
                  <span className="translate-x-[-8px] pointer-events-none inline-block h-[14px] w-[14px] rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
