'use client'

import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function RepNavbar({ user }: { user: any }) {
  const supabase = createClient()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <nav className="bg-green-800 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl tracking-tight">HHES Lessons</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4 items-center">
              <Link href="/rep/dashboard" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700">Dashboard</Link>
              <Link href="/rep/order/place" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700">Place Order</Link>
              <Link href="/rep/orders" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700">Order History</Link>
              <Link href="/rep/catalogue" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700">Catalogue</Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm border border-green-600 px-3 py-1 rounded-full">{user?.email}</span>
            <button onClick={handleLogout} className="text-sm bg-green-700 hover:bg-green-600 px-3 py-2 rounded-md font-medium">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
