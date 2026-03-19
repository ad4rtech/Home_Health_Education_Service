'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Timer, Church, MapPin, User as UserIcon, Minus, Plus, Info } from 'lucide-react'

const IMAGE_MAP: Record<string, string> = {
  'Adults': 'https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?w=200&h=200&fit=crop&q=80',
  'Adults Lesson': 'https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?w=200&h=200&fit=crop&q=80',
  'Adults Double Quarter': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=200&fit=crop&q=80',
  'Kindergarten': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=200&h=200&fit=crop&q=80',
  'Primary': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=200&h=200&fit=crop&q=80',
  'Cornerstone': 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=200&fit=crop&q=80',
  'Realtime': 'https://images.unsplash.com/photo-1455390582262-044cdead27d8?w=200&h=200&fit=crop&q=80'
}

const mockCategories = [
  { id: '1', category: 'Adults', price: 450 },
  { id: '2', category: 'Adults Double Quarter', price: 900 },
  { id: '3', category: 'Kindergarten', price: 300 },
  { id: '4', category: 'Primary', price: 300 },
  { id: '5', category: 'Cornerstone', price: 400 },
  { id: '6', category: 'Realtime', price: 400 }
]

export default function PlaceOrderPage() {
  const [quarter, setQuarter] = useState<any>(null)
  const [org, setOrg] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const [catalogue, setCatalogue] = useState<any[]>([])
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
    
    if (user) {
      const { data: orgData } = await supabase.from('organisations').select('*').eq('user_id', user.id).single()
      setOrg(orgData)

      const { data: qData } = await supabase.from('quarters').select('*').eq('status', 'published').maybeSingle()
      if (qData) {
        setQuarter(qData)
        const { data: catData } = await supabase.from('catalogue_items').select('*').eq('quarter_id', qData.id)
        if (catData && catData.length > 0) {
          setCatalogue(catData)
          const initialQs: Record<string, number> = {}
          catData.forEach(c => initialQs[c.id] = 0)
          setQuantities(initialQs)
        } else {
          // Setup mock quantities if needed
          const initialQs: Record<string, number> = {}
          mockCategories.forEach(c => initialQs[c.id] = 0)
          setQuantities(initialQs)
        }
      } else {
        // Mock fallback for UI testing when DB empty
        const initialQs: Record<string, number> = {}
        mockCategories.forEach(c => initialQs[c.id] = 0)
        setQuantities(initialQs)
      }
    } else {
        // True unauthenticated fallback for UI display
        const initialQs: Record<string, number> = {}
        mockCategories.forEach(c => initialQs[c.id] = 0)
        setQuantities(initialQs)
    }
    setLoading(false)
  }

  const updateQuantity = (id: string, delta: number) => {
    setQuantities(prev => {
      const current = prev[id] || 0
      const next = Math.max(0, current + delta)
      return { ...prev, [id]: next }
    })
  }

  const handleSubmit = async () => {
    if (!org || !quarter) return // safety check
    
    setSubmitting(true)
    setError(null)

    const itemsPayload = Object.entries(quantities)
      .filter(([_, qty]) => qty > 0)
      .map(([id, qty]) => ({
        catalogue_item_id: id,
        quantity: qty
      }))

    if (itemsPayload.length === 0) {
      setError("Please add at least one item to your order.")
      setSubmitting(false)
      return
    }

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quarter_id: quarter.id,
          organisation_id: org.id,
          items: itemsPayload
        })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to submit order')

      router.push('/rep/dashboard')
    } catch (err: any) {
      setError(err.message)
      setSubmitting(false)
    }
  }

  const displayQuarter = quarter || { name: 'Q3 2025', open_date: '2025-07-01', deadline_date: '2025-07-31' }
  const displayOrg = org || { org_name: 'Nairobi Central Church', org_type: 'Church', contact_name: 'John Doe' }
  const displayCatalogue = catalogue.length > 0 ? catalogue : mockCategories

  const totalItems = Object.values(quantities).reduce((a, b) => a + b, 0)
  const totalPrice = displayCatalogue.reduce((sum, item) => sum + (item.price * (quantities[item.id] || 0)), 0)

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* Top Banner */}
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

      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">Place Quarterly Order</h1>
        <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-2xl">
          Enter quantities for each lesson book category below. You can amend your order quantities anytime before the deadline or until your order is collected.
        </p>
      </div>

      {/* Info Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col sm:flex-row flex-wrap gap-8 sm:gap-16">
        <div>
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Ordering For</h4>
          <div className="flex items-center text-sm font-bold text-slate-900">
            <Church className="w-4 h-4 mr-2 text-slate-400" />
            {displayOrg.org_name}
          </div>
        </div>
        <div>
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Location</h4>
          <div className="flex items-center text-sm font-bold text-slate-900">
            <MapPin className="w-4 h-4 mr-2 text-slate-400" />
            1st Avenue, Nairobi
          </div>
        </div>
        <div>
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Authorised Rep</h4>
          <div className="flex items-center text-sm font-bold text-slate-900">
            <UserIcon className="w-4 h-4 mr-2 text-slate-400" />
            {displayOrg.contact_name}
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column (Form) */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 sm:p-8 space-y-2 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Order Quantities</h2>
            <p className="text-sm font-medium text-slate-500">Specify the number of units required for each category.</p>
          </div>
          
          <div className="divide-y divide-slate-100">
            {displayCatalogue.map(item => {
              const qty = quantities[item.id] || 0
              const itemTotal = qty * item.price
              const imageSrc = IMAGE_MAP[item.category] || IMAGE_MAP['Adults']

              return (
                <div key={item.id} className="p-6 flex flex-col sm:flex-row sm:items-center gap-6 hover:bg-slate-50/50 transition-colors">
                  {/* Image & Title */}
                  <div className="flex items-center space-x-4 flex-1">
                    <img src={imageSrc} alt={item.category} className="w-14 h-14 rounded-lg object-cover shadow-sm border border-slate-100" />
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 leading-tight">{item.category}</h3>
                      <p className="text-xs font-medium text-slate-500 mt-1">KES {item.price} per unit</p>
                    </div>
                  </div>
                  
                  {/* Controls & Total */}
                  <div className="flex items-center justify-between sm:justify-end space-x-8 sm:w-64">
                    {/* Stepper */}
                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg p-1">
                      <button type="button" onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-white hover:text-slate-900 rounded-md transition-colors focus:outline-none">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <input 
                        type="number" 
                        min="0"
                        value={qty}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 0
                          setQuantities(prev => ({ ...prev, [item.id]: Math.max(0, val) }))
                        }}
                        className="w-12 h-8 flex items-center justify-center text-center text-sm font-bold text-slate-900 bg-transparent focus:outline-none font-data [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <button type="button" onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-white hover:text-slate-900 rounded-md transition-colors focus:outline-none">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Row Total */}
                    <div className="w-20 text-right">
                      <span className="text-sm font-bold tracking-tight text-slate-900 font-data">KES {itemTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Column (Sidebar Summary) */}
        <div className="lg:col-span-1 sticky top-28">
           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
             <h2 className="text-lg font-bold text-slate-900 tracking-tight mb-6">Order Summary</h2>
             
             <div className="space-y-4 text-sm font-medium border-b border-slate-100 pb-6 mb-6">
               <div className="flex justify-between items-center text-slate-500">
                 <span>Total Items</span>
                 <span className="text-slate-900 font-bold font-data">{totalItems.toLocaleString()}</span>
               </div>
               <div className="flex justify-between items-center text-slate-500">
                 <span>Quarter</span>
                 <span className="text-slate-900 font-bold">{displayQuarter.name}</span>
               </div>
               <div className="flex justify-between items-center text-slate-500">
                 <span>Organisation Type</span>
                 <span className="text-slate-900 font-bold">{displayOrg.org_type || 'Church'}</span>
               </div>
             </div>

             <div className="flex justify-between items-center mb-8">
               <span className="text-sm font-bold text-slate-900">Estimated Total</span>
               <span className="text-xl font-extrabold text-slate-900 font-data tracking-tight">KES {totalPrice.toLocaleString()}</span>
             </div>

             {error && (
               <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 text-xs font-bold rounded-lg text-center">
                 {error}
               </div>
             )}

             <button 
                onClick={handleSubmit} 
                className="w-full flex items-center justify-center py-3.5 px-4 rounded-lg bg-[#006BB6] hover:bg-[#005a99] text-white text-sm font-bold shadow-sm transition-colors focus:ring-4 focus:ring-[#006BB6]/20 disabled:opacity-50 disabled:cursor-not-allowed mb-6"
              >
               {submitting ? 'Submitting Order...' : 'Submit Order'}
             </button>

             <div className="flex bg-[#f2fafc] p-4 rounded-lg border border-[#e5f6fc]">
               <Info className="w-4 h-4 text-[#006BB6] mt-0.5 flex-shrink-0 mr-3" />
               <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
                 You can amend your quantities freely after submission, up until the closing deadline (31 Jul 2025) or until your items are packed.
               </p>
             </div>
           </div>
        </div>

      </div>
    </div>
  )
}

