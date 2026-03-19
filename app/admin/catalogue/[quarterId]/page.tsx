'use client'

import { useEffect, useState, use } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const CATEGORIES = [
  "Adults Lesson",
  "Adults Lesson Double Quarter",
  "Kindergarten",
  "Primary",
  "Cornerstone",
  "Realtime"
]

export default function QuarterCataloguePage({ params }: { params: Promise<{ quarterId: string }> }) {
  const resolvedParams = use(params)
  const quarterId = resolvedParams.quarterId
  const [quarter, setQuarter] = useState<any>(null)
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data: qData } = await supabase.from('quarters').select('*').eq('id', quarterId).single()
    if (qData) setQuarter(qData)

    const { data: iData } = await supabase.from('catalogue_items').select('*').eq('quarter_id', quarterId)
    
    // Map existing or initialize empty 
    const initialItems = CATEGORIES.map(cat => {
      const existing = iData?.find(i => i.category === cat)
      return {
        id: existing?.id,
        category: cat,
        price: existing?.price || 0,
        stock_quantity: existing?.stock_quantity || 0,
        quarter_id: quarterId
      }
    })
    
    setItems(initialItems)
    setLoading(false)
  }

  const handleSave = async () => {
    setSaving(true)
    for (const item of items) {
      if (item.id) {
        await supabase.from('catalogue_items').update({
          price: item.price,
          stock_quantity: item.stock_quantity
        }).eq('id', item.id)
      } else {
        await supabase.from('catalogue_items').insert({
          quarter_id: item.quarter_id,
          category: item.category,
          price: item.price,
          stock_quantity: item.stock_quantity
        })
      }
    }
    await fetchData()
    setSaving(false)
    alert('Catalogue saved successfully!')
  }

  const updateItem = (index: number, field: string, value: number) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    setItems(newItems)
  }

  if (loading) return <div>Loading catalogue...</div>

  // Prices locked once quarter is published
  const isLocked = quarter?.status === 'published' || quarter?.status === 'closed'

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow">
        <div>
          <h1 className="text-2xl font-bold">{quarter?.name} - Catalogue</h1>
          <p className="text-gray-600 mt-1">
            Status: <span className="uppercase font-semibold">{quarter?.status}</span>
            {isLocked && " (Pricing is locked)"}
          </p>
        </div>
        <Link href="/admin/catalogue" className="text-blue-600 hover:underline">
          &larr; Back to select quarter
        </Link>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lesson Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price (KES)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Quantity</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item, idx) => (
              <tr key={item.category}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input type="number" min="0" step="0.01"
                    disabled={isLocked}
                    className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 sm:text-sm disabled:bg-gray-100 disabled:text-gray-500"
                    value={item.price}
                    onChange={e => updateItem(idx, 'price', parseFloat(e.target.value) || 0)}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input type="number" min="0" step="1"
                    className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 sm:text-sm"
                    value={item.stock_quantity}
                    onChange={e => updateItem(idx, 'stock_quantity', parseInt(e.target.value) || 0)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave} disabled={saving}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 font-medium disabled:opacity-50">
          {saving ? 'Saving...' : 'Save Catalogue'}
        </button>
      </div>
    </div>
  )
}
