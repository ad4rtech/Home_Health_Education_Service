import RepNavbar from '@/components/layout/RepNavbar'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { BookOpen } from 'lucide-react'

export default async function RepLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  // if (!user) {
  //   redirect('/auth/login')
  // }
  
  const org = user ? (await supabase.from('organisations').select('*').eq('user_id', user.id).single()).data : { org_name: "Nairobi Central Church", contact_name: "John Doe" };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-[#e6f4f9] selection:text-[#1a7496]">
      <RepNavbar user={user} org={org} />
      <main className="flex-1 max-w-[1200px] mx-auto w-full py-8 px-4 sm:px-6 lg:px-8">
        {children}
      </main>

      {/* Info Banner */}
      <div className="bg-slate-100 border-t border-slate-200 py-3 text-center">
        <p className="text-xs font-bold text-slate-600 flex items-center justify-center">
          <svg className="w-4 h-4 mr-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Current Quarter Info: Q3 2025 order deadline is 31 July 2025.
        </p>
      </div>

      {/* Footer */}
      <footer className="bg-white py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-200 mt-auto">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-[#006BB6] p-1.5 rounded text-white shadow-sm">
                <BookOpen className="h-5 w-5" />
              </div>
              <span className="font-bold text-xl text-slate-900 tracking-tight">HHES Kenya</span>
            </div>
            <p className="text-slate-500 text-xs max-w-xs leading-relaxed font-medium">
              Home Health Education Service sources and distributes Health, Religious, and Education books to affiliated organisations across Kenya.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4 uppercase text-[11px] tracking-wider">Dashboard</h4>
            <ul className="space-y-3 text-xs text-slate-500 font-medium">
              <li><Link href="/rep/dashboard" className="hover:text-[#006BB6] transition-colors">Active Order</Link></li>
              <li><Link href="/rep/orders" className="hover:text-[#006BB6] transition-colors">Order History</Link></li>
              <li><Link href="/rep/profile" className="hover:text-[#006BB6] transition-colors">Organisation Profile</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4 uppercase text-[11px] tracking-wider">Support</h4>
            <ul className="space-y-3 text-xs text-slate-500 font-medium mb-6">
              <li><Link href="#" className="hover:text-[#006BB6] transition-colors">Contact Centre</Link></li>
              <li><Link href="#" className="hover:text-[#006BB6] transition-colors">FAQs</Link></li>
            </ul>
            <div className="flex space-x-2">
              <span className="bg-slate-50 text-slate-600 text-[11px] px-3 py-1.5 rounded-full font-bold border border-slate-100">Return Policy</span>
              <span className="bg-slate-50 text-slate-600 text-[11px] px-3 py-1.5 rounded-full font-bold border border-slate-100">Help and Support</span>
            </div>
          </div>
        </div>
        <div className="max-w-[1200px] mx-auto mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-[11px] font-medium">
            © {new Date().getFullYear()} Home Health Education Service (HHES) Kenya. SDA Church-affiliated.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0 text-[11px] font-semibold text-slate-400">
            <Link href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-slate-600 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
