'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Building2, Tag, MapPin, User, Phone, Mail, Lock, Key, EyeOff, ChevronDown } from 'lucide-react'

export default function ProfilePage() {
  const [org, setOrg] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  const supabase = createClient()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      setUser(user)
      const { data: orgData } = await supabase.from('organisations').select('*').eq('user_id', user.id).single()
      setOrg(orgData)
    }
    setLoading(false)
  }

  // Data fallbacks for exact Mockup rendering
  const displayOrg = org || {
    org_name: 'Nairobi Central Church',
    org_type: 'Church',
    location: 'Nairobi CBD, Kenya',
    contact_name: 'John Doe',
    phone: '+254 700 000 000',
  }
  const displayEmail = user?.email || 'johndoe@nairobicentral.org'

  return (
    <div className="max-w-[760px] mx-auto animate-in fade-in duration-500 pb-20">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Organisation Profile</h1>
        <p className="text-sm font-medium text-slate-500 leading-relaxed">
          Manage your organisation details, contact information, and security settings.
        </p>
      </div>

      {/* Main Profile Form Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        
        {/* Section 1: Profile Picture */}
        <div className="p-6 sm:p-8">
          <h2 className="text-sm font-bold text-slate-900 mb-1">Profile Picture</h2>
          <p className="text-xs font-medium text-slate-500 mb-5">Update the avatar associated with your account.</p>
          
          <div className="flex items-center space-x-5">
            <img 
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d" 
              alt="Profile Avatar" 
              className="w-16 h-16 rounded-full object-cover border-2 border-slate-100 shadow-sm"
            />
            <div className="flex space-x-3">
              <button className="px-4 py-2 border border-slate-200 shadow-sm text-xs font-bold rounded-lg text-slate-700 bg-white hover:bg-slate-50 transition-colors">
                Change Avatar
              </button>
              <button className="px-4 py-2 border border-red-100 shadow-sm text-xs font-bold rounded-lg text-red-500 bg-white hover:bg-red-50 transition-colors">
                Remove
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: Organisation Details */}
        <div className="p-6 sm:p-8 border-t border-slate-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Org Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Organisation Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building2 className="h-4 w-4 text-slate-400" />
                </div>
                <input 
                  type="text" 
                  defaultValue={displayOrg.org_name}
                  className="w-full pl-10 pr-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#006BB6]/20 focus:border-[#006BB6] transition-all"
                />
              </div>
            </div>

            {/* Org Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Organisation Type</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Tag className="h-4 w-4 text-slate-400" />
                </div>
                <select 
                  defaultValue={displayOrg.org_type}
                  className="w-full appearance-none pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#006BB6]/20 focus:border-[#006BB6] transition-all cursor-pointer"
                >
                  <option value="Church">Church</option>
                  <option value="School">School</option>
                  <option value="University">University</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Physical Address / Location</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-4 w-4 text-slate-400" />
                </div>
                <input 
                  type="text" 
                  defaultValue={displayOrg.location}
                  className="w-full pl-10 pr-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#006BB6]/20 focus:border-[#006BB6] transition-all"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Section 3: Contact Information */}
        <div className="p-6 sm:p-8 border-t border-slate-100">
          <h2 className="text-sm font-bold text-slate-900 mb-1">Contact Information</h2>
          <p className="text-xs font-medium text-slate-500 mb-6">Details of the primary representative for this organisation.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Contact Name */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1.5">Contact Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-slate-400" />
                </div>
                <input 
                  type="text" 
                  defaultValue={displayOrg.contact_name}
                  className="w-full pl-10 pr-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#006BB6]/20 focus:border-[#006BB6] transition-all"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1.5">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-4 w-4 text-slate-400" />
                </div>
                <input 
                  type="tel" 
                  defaultValue={displayOrg.phone}
                  className="w-full pl-10 pr-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 font-medium font-data focus:outline-none focus:ring-2 focus:ring-[#006BB6]/20 focus:border-[#006BB6] transition-all"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-slate-700 mb-1.5">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-slate-400" />
                </div>
                <input 
                  type="email" 
                  defaultValue={displayEmail}
                  className="w-full pl-10 pr-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#006BB6]/20 focus:border-[#006BB6] transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Security Settings */}
        <div className="p-6 sm:p-8 border-t border-slate-100">
          <h2 className="text-sm font-bold text-slate-900 mb-1">Security Settings</h2>
          <p className="text-xs font-medium text-slate-500 mb-6">Update your password to ensure your account remains secure.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Current Password */}
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-slate-700 mb-1.5">Current Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-slate-400" />
                </div>
                <input 
                  type="password" 
                  defaultValue="hunter2isasecret"
                  className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#006BB6]/20 focus:border-[#006BB6] transition-all tracking-[0.25em]"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer hover:text-slate-600 transition-colors">
                  <EyeOff className="h-4 w-4 text-slate-400" />
                </div>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1.5">New Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Key className="h-4 w-4 text-slate-400" />
                </div>
                <input 
                  type="password" 
                  placeholder="Enter new password"
                  className="w-full pl-10 pr-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#006BB6]/20 focus:border-[#006BB6] transition-all"
                />
              </div>
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1.5">Confirm New Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Key className="h-4 w-4 text-slate-400" />
                </div>
                <input 
                  type="password" 
                  placeholder="Confirm new password"
                  className="w-full pl-10 pr-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#006BB6]/20 focus:border-[#006BB6] transition-all"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 px-6 sm:px-8 py-5 border-t border-slate-200 flex justify-end items-center space-x-4">
          <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-sm transition-colors">
            Cancel Changes
          </button>
          <button className="px-5 py-2.5 bg-[#006BB6] hover:bg-[#005a99] border border-transparent rounded-lg text-xs font-bold text-white shadow-sm transition-colors focus:ring-4 focus:ring-[#006BB6]/20">
            Save Changes
          </button>
        </div>

      </div>
    </div>
  )
}
