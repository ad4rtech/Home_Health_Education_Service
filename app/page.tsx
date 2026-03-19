import Link from 'next/link'
import { ArrowRight, BookOpen, CheckCircle, Clock, Edit3, FileText, Laptop, LayoutDashboard, TrendingUp, User, Church } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-[#e6f4f9] selection:text-[#1a7496]">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-[#2596be]" />
              <span className="font-bold text-xl text-slate-900 tracking-tight">HHES Kenya</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/documentation" className="hidden sm:block text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                Ordering Guide
              </Link>
              <Link href="/auth/login" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-[#2596be] hover:bg-[#1a7496] shadow-sm hover:shadow transition-all active:scale-95">
                <User className="h-4 w-4 mr-2" />
                Organisation Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center space-x-2 bg-slate-100 text-slate-700 px-4 py-1.5 rounded-full text-sm font-medium mb-8 border border-slate-200 cursor-pointer hover:bg-slate-200 transition-colors overflow-hidden">
          <div className="bg-white rounded-full p-1 border border-slate-200 -ml-2 -my-1">
            <Church className="h-4 w-4 text-slate-500" />
          </div>
          <span>SDA Church-Affiliated Procurement</span>
          <ArrowRight className="h-4 w-4" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
          The new digital standard for <span className="text-slate-900">quarterly book orders.</span>
        </h1>
        
        <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Say goodbye to pen and paper. Affiliated organisations can now place, track, and manage orders for Quarterly Delegate Lesson Resources entirely online with zero processing errors.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/auth/register" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-medium rounded-lg text-white bg-[#2596be] hover:bg-[#1a7496] shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5">
            Register Organisation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link href="#how-it-works" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 border border-slate-200 text-base font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 shadow-sm hover:shadow transition-all duration-200">
            Learn How It Works
          </Link>
        </div>

        {/* Dashboard Mockup / Hero Image Area */}
        <div className="mt-20 relative mx-auto w-full max-w-5xl">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent z-10 h-full w-full pointer-events-none"></div>
          <div className="rounded-2xl shadow-2xl border border-slate-200 bg-white overflow-hidden transform hover:scale-[1.01] transition-transform duration-500">
             <div className="h-10 bg-slate-100 border-b border-slate-200 flex items-center px-4 space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
             </div>
             <div className="p-8 flex justify-center items-center bg-[url('https://images.unsplash.com/photo-1542744094-24638eff58b7?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center h-[500px]">
                <div className="text-center text-slate-800 bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl w-full max-w-3xl">
                  <LayoutDashboard className="h-16 w-16 mx-auto mb-4 text-[#2596be]" />
                  <p className="font-medium text-lg text-slate-900 border-b pb-4 mb-4 border-slate-200">HHES Quarterly Dashboard</p>
                  <div className="grid grid-cols-3 gap-6 text-left">
                     <div className="bg-slate-50 p-4 border border-slate-200 rounded-lg">
                       <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Total Orders</p>
                       <p className="text-3xl font-bold mt-2 font-data">142</p>
                     </div>
                     <div className="bg-[#f2fafc] p-4 border border-[#c1e6f3] rounded-lg col-span-2 flex flex-col justify-center">
                       <p className="text-xs text-[#2596be] uppercase tracking-widest font-bold">Q1 Demands Processed</p>
                       <div className="w-full bg-[#c1e6f3] rounded-full h-2.5 mt-4">
                         <div className="bg-[#2596be] h-2.5 rounded-full w-4/5"></div>
                       </div>
                       <p className="text-sm text-[#1a7496] font-bold mt-2">80% Fulfillment metric</p>
                     </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-50 px-4 sm:px-6 lg:px-8 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Why we are moving online</h2>
            <p className="mt-4 text-lg text-slate-600">
              We're upgrading our systems to provide complete visibility, eliminate paperwork errors, and save every affiliated organisation the trip to the HHES centre.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {[
              { icon: Laptop, title: '100% Online Ordering', desc: 'Place and safely track your quarterly orders from your church, school, or university office without needing to drop physical paperwork.' },
              { icon: Clock, title: 'Digital Order History', desc: 'Every order is permanently archived online so you can safely reference past quantities and exact submission locations.' },
              { icon: CheckCircle, title: 'Zero Processing Errors', desc: 'Validation algorithms ensure your order is calculated accurately and check quantities before submission to the central HQ.' },
              { icon: Edit3, title: 'Flexible Modifications', desc: 'Organisations can comfortably amend their quantities right up to the submission deadline window for exact operational flexibility.' },
              { icon: TrendingUp, title: 'Real-Time Demand Planning', desc: 'HHES admin oversees inventory statuses instantly across the entire region to better direct final demand procurement with print houses.' },
              { icon: FileText, title: 'Digital Audit Trail', desc: 'Status changes and exact amendments create a complete exact track record ensuring full strict accountability exactly.' },
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-[#e6f4f9] text-[#2596be] flex items-center justify-center mb-6 group-hover:bg-[#2596be] group-hover:text-white transition-colors duration-300">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catalogue Showcase Section */}
      <section className="py-24 bg-slate-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-6">Quarterly Lesson Books</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Our digital catalogue provides all vital lesson materials intuitively formatted and separated by standard categories, allowing organisations to precisely request exact quarterly quantities before the deadline closes.
              </p>
              
              <ul className="space-y-4 mb-10">
                {['Adults', 'Adults Double Quarter', 'Kindergarten and Primary', 'Cornerstone and Realtime'].map((item, i) => (
                  <li key={i} className="flex items-center text-slate-700 font-medium">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              
              <Link href="/auth/register" className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 text-base font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 shadow-sm transition-colors">
                Browse Catalogue
              </Link>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-[#e6f4f9] rounded-3xl transform translate-x-4 translate-y-4 opacity-50"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-xl bg-white p-2">
                <div className="w-full h-[400px] bg-slate-100 rounded-2xl flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center">
                  <div className="absolute inset-0 bg-white/20"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 bg-slate-50 px-4 sm:px-6 lg:px-8 border-y border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Total Control Over Your Orders</h2>
            <p className="mt-4 text-lg text-slate-600">
              We've built operations & security directly into the platform. Amend or cancel your orders in full confidence, then perform pickup digitally for a complete audit trail.
            </p>
          </div>

          <div className="space-y-12">
            {[
              { num: '1', title: 'Register and Validate', desc: 'Securely create an account for your church, school, or university in under a minute.' },
              { num: '2', title: 'Submit Quarterly Demand', desc: 'Input your target quantities into the interface exactly when the quarter opens for submissions.' },
              { num: '3', title: 'Digital Pickup Confirmation', desc: 'Confirm collection securely via validation hardware restricting exact physical pickup fulfillment.' },
            ].map((step, i) => (
              <div key={i} className="flex relative bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 mr-6 relative z-10">
                  <div className="w-14 h-14 rounded-full bg-[#f2fafc] border-2 border-[#b5e0f0] flex items-center justify-center text-xl font-bold text-[#2596be] shadow-sm">
                    {step.num}
                  </div>
                </div>
                <div className="pt-3">
                  <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-slate-600 leading-relaxed text-sm font-medium">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#2596be] text-center px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Ready to digitize your ordering?</h2>
        <p className="mt-4 text-[#e6f4f9] text-lg max-w-2xl mx-auto">
          Join affiliated organisations across Kenya in moving rendering quarterly ordering fully online.
        </p>
        <div className="mt-10">
          <Link href="/auth/register" className="inline-flex items-center justify-center px-10 py-4 border border-transparent text-lg font-bold rounded-lg text-[#2596be] bg-white hover:bg-slate-50 shadow-xl hover:shadow-2xl transition-all duration-200 hover:-translate-y-1">
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-6 w-6 text-[#2596be]" />
              <span className="font-bold text-xl text-slate-900 tracking-tight">HHES Kenya</span>
            </div>
            <p className="text-slate-500 text-sm max-w-xs leading-relaxed font-medium">
              Home Health Education Service. We sustainably distribute securely accurate lesson books to affiliated organisations across Kenya.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4 uppercase text-sm tracking-wider">Platform</h4>
            <ul className="space-y-3 text-sm text-slate-600 font-medium">
              <li><Link href="/auth/register" className="hover:text-[#2596be] transition-colors">Register Organisation</Link></li>
              <li><Link href="/auth/login" className="hover:text-[#2596be] transition-colors">Organisation Sign In</Link></li>
              <li><Link href="/admin/dashboard" className="hover:text-[#2596be] transition-colors">Ordering Guide</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4 uppercase text-sm tracking-wider">Support</h4>
            <ul className="space-y-3 text-sm text-slate-600 font-medium">
              <li><Link href="#" className="hover:text-[#2596be] transition-colors">Contact Centre</Link></li>
              <li><Link href="#" className="hover:text-[#2596be] transition-colors">FAQs</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm font-medium">
            © {new Date().getFullYear()} Home Health Education Service, HHES Kenya. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0 text-xs font-semibold text-slate-500">
            <Link href="#" className="hover:text-slate-900 transition-colors px-3 py-1.5 border border-slate-200 rounded-full">Privacy Policy</Link>
            <Link href="#" className="hover:text-slate-900 transition-colors px-3 py-1.5 border border-slate-200 rounded-full">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
