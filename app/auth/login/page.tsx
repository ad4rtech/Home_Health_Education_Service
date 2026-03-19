'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { BookOpen, ArrowLeft, LogIn, ShoppingCart, History, Pen, CheckCircle, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/dashboard') // Middleware reliably intercepts this
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-[#e6f4f9] selection:text-[#1a7496]">
      {/* Navbar */}
      <nav className="w-full bg-slate-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center border-b border-slate-200/60">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-[#006BB6] p-1.5 rounded text-white shadow-sm">
                <BookOpen className="h-5 w-5" />
              </div>
              <span className="font-bold text-xl text-slate-900 tracking-tight">HHES Kenya</span>
            </Link>
            <div className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/documentation" className="hidden sm:block text-slate-500 hover:text-slate-900 transition-colors">
                Ordering Guide
              </Link>
              <Link href="/" className="inline-flex items-center justify-center px-4 py-2 border border-slate-200 rounded-lg text-slate-700 bg-white hover:bg-slate-50 shadow-sm transition-all focus:ring-2 focus:ring-slate-200">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/60 w-full max-w-[1100px] overflow-hidden flex flex-col lg:flex-row">
          
          {/* Left Panel */}
          <div className="bg-[#f8fafc] w-full lg:w-[45%] p-10 lg:p-12 border-r border-slate-100 flex flex-col">
            <div className="inline-flex items-center bg-white px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide text-slate-700 border border-slate-200 mb-8 shadow-sm self-start">
              <LogIn className="h-3.5 w-3.5 mr-2 text-slate-400" />
              Organisation Portal
            </div>
            
            <h1 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight leading-tight">
              Welcome back to HHES Kenya
            </h1>
            
            <p className="text-sm text-slate-600 leading-relaxed mb-10 font-medium">
              Sign in to your organisation's account to manage quarterly lesson book orders and view your digital history.
            </p>
            
            <div className="space-y-8 flex-1">
              {[
                { icon: ShoppingCart, title: 'Place quarterly orders online', desc: 'Order Adults, Kindergarten, Primary, and other lesson books without visiting HHES.' },
                { icon: History, title: 'View digital order history', desc: 'Access previous orders and easily resolve disputes with full digital records.' },
                { icon: Pen, title: 'Amend or cancel orders', desc: 'Modify your submissions easily before the pickup confirmation stage.' },
                { icon: CheckCircle, title: 'Confirm pickups digitally', desc: 'Create a complete digital audit trail from submission through to final fulfillment.' },
              ].map((item, idx) => (
                <div key={idx} className="flex">
                  <div className="flex-shrink-0 mr-4 mt-0.5">
                    <div className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center shadow-sm">
                      <item.icon className="h-4 w-4" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium max-w-[280px]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Panel (Form) */}
          <div className="w-full lg:w-[55%] p-10 lg:p-12">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Sign In</h2>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed mb-8">
              Access your organisation's secure ordering dashboard.
            </p>
            
            <button type="button" className="w-full flex items-center justify-center px-4 py-2.5 border border-slate-200 shadow-sm rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors focus:ring-2 focus:ring-[#006BB6] focus:outline-none">
              <svg className="w-4 h-4 mr-2.5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
            
            <div className="mt-8 flex items-center mb-8">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="mx-4 text-xs font-semibold tracking-wider text-slate-400 uppercase">Or sign in with email</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address</label>
                <input type="email" name="email" required
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006BB6]/40 focus:border-[#006BB6] transition-all placeholder-slate-400"
                  placeholder="name@organisation.com"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold text-slate-700">Password</label>
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-[11px] font-bold text-[#006BB6] flex items-center hover:text-[#005a99]">
                    {showPassword ? 'Hide password' : 'Show password'}
                  </button>
                </div>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} name="password" required
                    className="w-full px-3 py-2.5 pr-10 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006BB6]/40 focus:border-[#006BB6] transition-all placeholder-slate-400"
                    placeholder="Enter your password"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                  />
                  <button type="button" tabIndex={-1} onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input type="checkbox" id="remember" className="h-3.5 w-3.5 text-[#006BB6] focus:ring-[#006BB6] border-slate-300 rounded cursor-pointer" />
                  <label htmlFor="remember" className="ml-2 block text-xs text-slate-500 cursor-pointer">
                    Remember me
                  </label>
                </div>
                <Link href="/auth/forgot-password" className="text-[11px] font-bold text-[#006BB6] hover:text-[#005a99]">
                  Forgot password?
                </Link>
              </div>

              {error && <div className="text-red-500 text-xs bg-red-50 p-2.5 rounded-lg border border-red-100">{error}</div>}

              <button type="submit" disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-[#006BB6] hover:bg-[#005a99] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006BB6] transition-colors disabled:opacity-50">
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
              
              <div className="pt-6 border-t border-slate-200 mt-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 text-xs">
                  <p className="text-slate-500 max-w-[280px] leading-relaxed">
                    New to the online portal? Request access for your church or institution.
                  </p>
                  <Link href="/auth/register" className="flex-shrink-0 inline-flex items-center justify-center px-4 py-2 border border-slate-200 rounded-lg text-slate-700 bg-white hover:bg-slate-50 font-bold shadow-sm transition-colors">
                    Register Organisation
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Simplified Footer */}
      <footer className="bg-white py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-200 mt-auto">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
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
            <h4 className="font-bold text-slate-900 mb-4 uppercase text-[11px] tracking-wider">Platform</h4>
            <ul className="space-y-3 text-xs text-slate-500 font-medium">
              <li><Link href="/auth/register" className="hover:text-[#006BB6] transition-colors">Register Organisation</Link></li>
              <li><Link href="/auth/login" className="hover:text-[#006BB6] transition-colors">Organisation Sign In</Link></li>
              <li><Link href="/documentation" className="hover:text-[#006BB6] transition-colors">Ordering Guide</Link></li>
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
        <div className="max-w-[1400px] mx-auto mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center">
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
