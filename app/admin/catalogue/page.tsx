'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function SelectCatalogueQuarterPage() {
  const [quarters, setQuarters] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchQuarters()
  }, [])

  const fetchQuarters = async () => {
    const { data } = await supabase
      .from('quarters')
      .select('*')
      .order('open_date', { ascending: false })
    
    if (data) setQuarters(data)
    setLoading(false)
  }

  if (loading) return <div>Loading quarters...</div>

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Catalogue Management</h1>
      <p className="text-gray-600">Select a quarter to manage catalogue pricing and stock.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {quarters.map((q) => (
          <Link key={q.id} href={`/admin/catalogue/${q.id}`} 
            className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition duration-150">
            <h3 className="text-xl font-bold text-blue-600">{q.name}</h3>
            <p className="text-sm text-gray-500 uppercase mt-2 font-semibold">Status: {q.status}</p>
            <p className="text-sm text-gray-500 mt-1">Open: {new Date(q.open_date).toLocaleDateString()}</p>
            <p className="text-sm text-gray-500">Deadline: {new Date(q.deadline_date).toLocaleDateString()}</p>
          </Link>
        ))}
        {quarters.length === 0 && (
          <div className="col-span-full p-4 text-gray-500 text-center bg-white rounded shadow">
            No quarters found. Create one first.
          </div>
        )}
      </div>
    </div>
  )
}
