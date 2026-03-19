'use client'

import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function AdminNavbar({ user }: { user: any }) {
  const supabase = createClient()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <nav className="bg-blue-800 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl tracking-tight">HHES Admin</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4 items-center">
              <Link href="/admin/dashboard" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">Dashboard</Link>
              <Link href="/admin/organisations" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">Organisations</Link>
              <Link href="/admin/quarters" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">Quarters</Link>
              <Link href="/admin/catalogue" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">Catalogue</Link>
              <Link href="/admin/orders" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">Orders</Link>
              <Link href="/admin/reports" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">Reports</Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm border border-blue-600 px-3 py-1 rounded-full">{user?.email}</span>
            <button onClick={handleLogout} className="text-sm bg-blue-700 hover:bg-blue-600 px-3 py-2 rounded-md font-medium">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
