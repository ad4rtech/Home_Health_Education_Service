'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { Calendar, Timer, ShoppingCart, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'

const mockCategories = [
  {
    category: 'Adults',
    desc: 'Standard quarterly lesson guide designed for adult Sabbath School classes and study groups.',
    price: 450,
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?w=600&q=80'
  },
  {
    category: 'Adults Double Quarter',
    desc: 'Combined lesson guide covering two full quarters for continuous adult class study.',
    price: 900,
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80'
  },
  {
    category: 'Kindergarten',
    desc: 'Interactive and illustrated lesson guide tailored for children aged 3-5 years.',
    price: 300,
    status: 'Low Stock',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&q=80'
  },
  {
    category: 'Primary',
    desc: 'Engaging lesson guide and activities designed for children aged 6-9 years.',
    price: 300,
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80'
  },
  {
    category: 'Cornerstone',
    desc: 'Youth lesson guide focusing on teen spiritual growth, relevant topics, and foundational beliefs.',
    price: 400,
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80'
  },
  {
    category: 'Realtime',
    desc: 'Young adult lesson guide with contemporary life applications and in-depth discussions.',
    price: 400,
    status: 'Out of Stock',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead27d8?w=600&q=80'
  }
]

export default function CataloguePage() {
  const [activeQuarter, setActiveQuarter] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchQuarter()
  }, [])

  const fetchQuarter = async () => {
    const { data } = await supabase.from('quarters').select('*').eq('status', 'published').maybeSingle()
    setActiveQuarter(data)
    setLoading(false)
  }

  const displayQuarter = activeQuarter || { name: 'Q3 2025', open_date: '2025-07-01', deadline_date: '2025-07-31' }

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      
      {/* Top Banner (Orange Border Variant) */}
      <div className="bg-white rounded-xl shadow-sm border border-[#fdba74] border-l-[6px] border-l-[#f97316] p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-start md:items-center space-x-4">
          <div className="hidden sm:flex text-[#f97316]">
            <Calendar className="h-7 w-7" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {displayQuarter.name} Order Window Closing Soon
            </h2>
            <p className="text-sm font-medium text-slate-500 mt-1">
              Opens: {new Date(displayQuarter.open_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} <span className="mx-2 text-slate-300">|</span> Deadline: {new Date(displayQuarter.deadline_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          </div>
        </div>
        <button className="bg-[#ea580c] hover:bg-[#c2410c] text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center shadow-sm transition-colors focus:ring-4 focus:ring-orange-500/20">
          <Timer className="h-4 w-4 mr-2" />
          3 days remaining
        </button>
      </div>

      {/* Header & Action */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-transparent pb-2 gap-6">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">Lesson Book Catalogue</h1>
          <p className="text-sm font-medium text-slate-500 leading-relaxed">
            Browse available lesson book categories and their pricing for the current quarter. <br className="hidden sm:block" />Identical pricing applies to both Church and Institution representatives.
          </p>
        </div>
        <Link href="/rep/order/place" className="flex-shrink-0 bg-[#006BB6] hover:bg-[#005a99] text-white px-6 py-2.5 rounded-md text-sm font-bold flex items-center shadow-sm transition-colors focus:ring-4 focus:ring-[#006BB6]/20">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Start Order
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockCategories.map((item, idx) => {
          const isOut = item.status === 'Out of Stock'
          const isLow = item.status === 'Low Stock'

          return (
            <div key={idx} className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col group ${isOut ? 'opacity-70 grayscale-[0.5]' : 'hover:shadow-md transition-shadow'}`}>
              {/* Image Section */}
              <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                <img src={item.image} alt={item.category} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/5"></div>
                
                {/* Floating Badge */}
                <div className="absolute top-4 right-4">
                  {isOut ? (
                    <div className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-500 text-white shadow-sm border border-red-600/50 backdrop-blur-sm">
                      <XCircle className="w-3.5 h-3.5 mr-1.5" strokeWidth={2.5} /> Out of Stock
                    </div>
                  ) : isLow ? (
                    <div className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-500 text-white shadow-sm border border-orange-600/50 backdrop-blur-sm">
                      <AlertTriangle className="w-3.5 h-3.5 mr-1.5" strokeWidth={2.5} /> Low Stock
                    </div>
                  ) : (
                    <div className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500 text-white shadow-sm border border-emerald-600/50 backdrop-blur-sm">
                      <CheckCircle className="w-3.5 h-3.5 mr-1.5" strokeWidth={2.5} /> Available
                    </div>
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 sm:p-8 flex flex-col flex-1">
                <h3 className={`text-lg font-bold ${isOut ? 'text-slate-500' : 'text-slate-900'} mb-3 leading-tight tracking-tight`}>
                  {item.category}
                </h3>
                <p className={`text-sm font-medium ${isOut ? 'text-slate-400' : 'text-slate-500'} leading-relaxed flex-1`}>
                  {item.desc}
                </p>

                <div className={`mt-8 pt-6 border-t ${isOut ? 'border-slate-100' : 'border-slate-100'}`}>
                  <div className="flex items-baseline space-x-1.5">
                    <span className={`text-2xl font-bold tracking-tight font-data ${isOut ? 'text-slate-400 line-through decoration-slate-300' : 'text-slate-900'}`}>
                      KES {item.price} 
                    </span>
                    <span className={`text-xs font-semibold uppercase tracking-widest ${isOut ? 'text-slate-400' : 'text-slate-400'}`}>
                      / unit
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}
