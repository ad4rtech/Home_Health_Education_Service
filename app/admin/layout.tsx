import AdminNavbar from '@/components/layout/AdminNavbar'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { BookOpen } from 'lucide-react'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    // Temp auth bypass for UI viewing
    // redirect('/login')
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <AdminNavbar user={user} />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        {children}
      </main>

      {/* Admin Global Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto pt-16 pb-8">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2.5 mb-4">
                <div className="bg-[#006BB6] p-1.5 rounded-lg text-white shadow-sm">
                  <BookOpen className="h-5 w-5" />
                </div>
                <span className="font-extrabold text-lg text-slate-900 tracking-tight">HHES Kenya</span>
              </div>
              <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-sm">
                Home Health Education Service sources and distributes Health, Religious, and Education books to affiliated organisations across Kenya.
              </p>
            </div>

            <div>
              <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest mb-6 border-l-2 border-[#006BB6] pl-2">Portals</h4>
              <ul className="space-y-4">
                <li><Link href="/admin/dashboard" className="text-sm font-medium text-slate-500 hover:text-[#006BB6] transition-colors">Admin Dashboard</Link></li>
                <li><Link href="/auth/login" className="text-sm font-medium text-slate-500 hover:text-[#006BB6] transition-colors">Organisation Portal</Link></li>
                <li><Link href="#" className="text-sm font-medium text-slate-500 hover:text-[#006BB6] transition-colors">System Status</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest mb-6 border-l-2 border-[#006BB6] pl-2">Support</h4>
              <ul className="space-y-4 mb-6">
                <li><Link href="#" className="text-sm font-medium text-slate-500 hover:text-[#006BB6] transition-colors">IT Support Desk</Link></li>
                <li><Link href="#" className="text-sm font-medium text-slate-500 hover:text-[#006BB6] transition-colors">Admin Documentation</Link></li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-lg transition-colors border border-slate-200 shadow-sm">
                  Return Policy
                </button>
                <button className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-lg transition-colors border border-slate-200 shadow-sm">
                  Help and Support
                </button>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs font-medium text-slate-400">
              © 2025 Home Health Education Service (HHES) Kenya. SDA Church-affiliated.
            </p>
            <div className="flex items-center space-x-6">
              <Link href="#" className="text-xs font-medium text-slate-400 hover:text-slate-600 transition-colors">Privacy Policy</Link>
              <Link href="#" className="text-xs font-medium text-slate-400 hover:text-slate-600 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
