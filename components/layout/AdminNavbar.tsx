'use client'

import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useRouter, usePathname } from 'next/navigation'
import { BookOpen, Bell, ChevronDown } from 'lucide-react'

export default function AdminNavbar({ user }: { user: any }) {
  const supabase = createClient()
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth/admin')
  }

  const isActive = (path: string) => pathname?.startsWith(path)

  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center space-x-2.5 flex-shrink-0">
            <div className="bg-[#006BB6] p-1.5 rounded-lg text-white shadow-sm">
              <BookOpen className="h-4 w-4" />
            </div>
            <span className="font-extrabold text-[#003366] text-lg tracking-tight">HHES Admin</span>
          </div>

          {/* Center Navigation Links */}
          <div className="hidden sm:flex items-center justify-center space-x-6">
            <Link href="/admin/dashboard" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-bold ${isActive('/admin/dashboard') ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'} transition-colors`}>
              Dashboard
            </Link>
            <Link href="/admin/quarters" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-bold ${isActive('/admin/quarters') ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'} transition-colors`}>
              Quarters
            </Link>
            <Link href="/admin/catalogue" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-bold ${isActive('/admin/catalogue') ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'} transition-colors`}>
              Catalogue
            </Link>
            <Link href="/admin/orders" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-bold ${isActive('/admin/orders') ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'} transition-colors`}>
              Orders
            </Link>
            <Link href="/admin/organisations" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-bold ${isActive('/admin/organisations') ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'} transition-colors`}>
              Organisations
            </Link>
            <Link href="/admin/reports" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-bold ${isActive('/admin/reports') ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'} transition-colors`}>
              Reports
            </Link>
            <Link href="/admin/notifications" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-bold ${isActive('/admin/notifications') ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'} transition-colors`}>
              Notifications
            </Link>
            <Link href="/admin/profile" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-bold ${isActive('/admin/profile') ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'} transition-colors`}>
              Profile
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            {/* Notifications */}
            <div className="relative cursor-pointer text-slate-500 hover:text-slate-700 transition-colors mt-2 pb-2">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white leading-none">5</span>
            </div>

            {/* Profile Dropdown */}
            <div className="flex items-center space-x-3 pl-4 border-l border-slate-200 cursor-pointer relative group" onClick={handleLogout} title="Click to Logout">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-[13px] font-bold text-slate-900 leading-tight">Admin User</span>
                <span className="text-[10px] font-bold text-slate-400">Super Admin</span>
              </div>
              <img 
                src="https://i.pravatar.cc/150?u=admin" 
                alt="Profile Avatar" 
                className="w-8 h-8 rounded-full border border-slate-200"
              />
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>

        </div>
      </div>
    </nav>
  )
}
