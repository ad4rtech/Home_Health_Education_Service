'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function QuartersPage() {
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

  const handleStatusChange = async (id: string, newStatus: string) => {
    if (newStatus === 'published') {
      await supabase.from('quarters').update({ status: 'closed' }).eq('status', 'published')
    }
    
    await supabase.from('quarters').update({ status: newStatus }).eq('id', id)
    fetchQuarters()
  }

  if (loading) return <div>Loading quarters...</div>

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Quarters</h1>
        <Link href="/admin/quarters/new" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Create Quarter
        </Link>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {quarters.map((q) => (
            <li key={q.id} className="p-4 flex items-center justify-between">
              <div>
                <Link href={`/admin/quarters/${q.id}`} className="text-lg font-medium text-blue-600 hover:text-blue-800">
                  {q.name}
                </Link>
                <div className="text-sm text-gray-500">
                  Opens: {new Date(q.open_date).toLocaleDateString()} | Deadline: {new Date(q.deadline_date).toLocaleDateString()}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  q.status === 'published' ? 'bg-green-100 text-green-800' :
                  q.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {q.status}
                </span>

                {q.status === 'draft' && (
                  <button onClick={() => handleStatusChange(q.id, 'published')} className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">Publish</button>
                )}
                {q.status === 'published' && (
                  <button onClick={() => handleStatusChange(q.id, 'closed')} className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700">Close</button>
                )}
              </div>
            </li>
          ))}
          {quarters.length === 0 && (
            <div className="p-4 text-gray-500 text-center">No quarters found.</div>
          )}
        </ul>
      </div>
    </div>
  )
}
