'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BookOpen, HelpCircle, ArrowRight, ShieldCheck, Mail, Lock, Eye, EyeOff, Info } from 'lucide-react'

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* Top Navbar */}
      <nav className="bg-white border-b border-slate-200 px-6 sm:px-8 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="bg-[#006BB6] p-1.5 rounded-lg text-white">
            <BookOpen className="h-5 w-5" />
          </div>
          <span className="font-extrabold text-lg tracking-tight text-slate-900">HHES Kenya</span>
          <span className="ml-3 px-2.5 py-1 rounded-full bg-slate-100 text-[10px] font-bold text-slate-600 uppercase tracking-widest border border-slate-200 shadow-sm hidden sm:inline-block">
            Admin Portal
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <button className="hidden sm:inline-flex items-center text-[11px] font-bold text-slate-500 hover:text-slate-800 transition-colors uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 mr-1.5 mb-0.5" />
            IT Support
          </button>
          <Link href="/auth/login" className="inline-flex items-center px-4 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 shadow-sm transition-colors">
            Organisation Portal <ArrowRight className="w-3.5 h-3.5 ml-2 text-slate-400" />
          </Link>
        </div>
      </nav>

      {/* Main Login Area */}
      <div className="flex-1 flex flex-col justify-center items-center p-4 sm:p-6 pb-24">
        
        {/* Login Card */}
        <div className="w-full max-w-[420px] bg-white rounded-xl shadow-lg border-t-[5px] border-t-[#006BB6] border-x border-b border-slate-200 overflow-hidden transform transition-all duration-500 animate-in slide-in-from-bottom-4 fade-in">
          <div className="p-8 sm:p-10 space-y-6">
            
            {/* Header */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#f0f7ff] border border-[#bae6fd] flex flex-col items-center justify-center shadow-sm">
                <ShieldCheck className="w-6 h-6 text-[#006BB6]" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Administrator Login</h1>
                <p className="text-sm font-medium text-slate-500 mt-2 leading-relaxed">
                  Sign in to manage orders, publishing quarters, and organisation accounts.
                </p>
              </div>
            </div>

            {/* Form */}
            <form className="space-y-5 pt-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Admin Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-slate-400" />
                  </div>
                  <input 
                    type="email" 
                    placeholder="admin.name@hheskenya.org"
                    className="w-full pl-10 pr-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#006BB6]/20 focus:border-[#006BB6] shadow-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-slate-400" />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#006BB6]/20 focus:border-[#006BB6] shadow-sm transition-all tracking-[0.2em]"
                  />
                  <div 
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-slate-400 hover:text-slate-600 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="remember"
                    className="w-4 h-4 text-[#006BB6] border-slate-300 rounded focus:ring-[#006BB6] cursor-pointer"
                  />
                  <label htmlFor="remember" className="ml-2 block text-xs font-bold text-slate-700 cursor-pointer">
                    Remember me
                  </label>
                </div>
                <Link href="#" className="text-xs font-bold text-[#006BB6] hover:text-[#005a99] transition-colors">
                  Forgot password?
                </Link>
              </div>

              <button type="submit" className="w-full flex items-center justify-center py-3 px-4 rounded-lg bg-[#006BB6] hover:bg-[#005a99] text-white text-sm font-bold shadow-sm transition-colors focus:ring-4 focus:ring-[#006BB6]/20 mt-6">
                Sign In as Administrator
              </button>
            </form>

          </div>

          {/* Footer Card Info */}
          <div className="bg-slate-50 border-t border-slate-200 p-6">
            <div className="flex items-start">
              <Info className="flex-shrink-0 w-4 h-4 text-slate-400 mt-0.5" />
              <p className="ml-3 text-[11px] font-medium text-slate-600 leading-relaxed">
                Restricted Access: Admin accounts are provisioned internally and cannot be self-registered. If you need elevated access, please contact the <span className="font-bold text-[#006BB6]">Systems Administrator</span>.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
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
