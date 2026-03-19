'use client'

import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useRouter, usePathname } from 'next/navigation'
import { BookOpen, Bell, ChevronDown } from 'lucide-react'

export default function RepNavbar({ user, org }: { user: any, org: any }) {
  const supabase = createClient()
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/')

  return (
    <nav className="bg-white border-b border-slate-200/60 sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link href="/rep/dashboard" className="flex items-center space-x-2">
            <div className="bg-[#006BB6] p-1.5 rounded text-white shadow-sm">
              <BookOpen className="h-5 w-5" />
            </div>
            <span className="font-bold text-xl text-slate-900 tracking-tight">HHES Kenya</span>
          </Link>

          {/* Centered Navigation */}
          <div className="hidden md:flex space-x-8 h-full">
            <Link href="/rep/dashboard" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-bold ${pathname === '/rep/dashboard' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'} transition-colors`}>
              Dashboard
            </Link>
            <Link href="/rep/order/place" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-bold ${isActive('/rep/order/place') ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'} transition-colors`}>
              Place Order
            </Link>
            <Link href="/rep/orders" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-bold ${isActive('/rep/orders') ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'} transition-colors`}>
              My Orders
            </Link>
            <Link href="/rep/catalogue" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-bold ${isActive('/rep/catalogue') ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'} transition-colors`}>
              Catalogue
            </Link>
            <Link href="/rep/reports" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-bold ${isActive('/rep/reports') ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'} transition-colors`}>
              Reports
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            <div className="hidden lg:flex items-center px-3 py-1 bg-[#10B981] text-white rounded-full text-xs font-bold shadow-sm">
              <span className="mr-1.5">●</span> Q3 2025 — Open
            </div>
            
            <Link href="/rep/notifications" className="relative cursor-pointer text-slate-500 hover:text-slate-700 transition-colors mt-2 pb-2 block">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white leading-none">3</span>
            </Link>

            <div className="flex items-center space-x-3 pl-4 border-l border-slate-200 cursor-pointer relative group">
              <div className="flex flex-col items-end">
                <span className="text-sm font-bold text-slate-900 leading-tight">{org?.org_name || 'Organisation'}</span>
                <span className="text-[11px] font-medium text-slate-500">{org?.contact_name || user?.email}</span>
              </div>
              <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Avatar" className="h-9 w-9 rounded-full object-cover border border-slate-200 shadow-sm" />
              <ChevronDown className="h-4 w-4 text-slate-400" />
              
              {/* Dropdown for logout */}
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-sm font-medium text-red-600 hover:bg-slate-50 rounded-lg">
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
