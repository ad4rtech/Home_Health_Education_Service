'use client'

import { useEffect, useState, use } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function QuarterDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const quarterId = resolvedParams.id
  const [quarter, setQuarter] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    fetchQuarter()
  }, [])

  const fetchQuarter = async () => {
    const { data } = await supabase.from('quarters').select('*').eq('id', quarterId).single()
    if (data) setQuarter(data)
  }

  if (!quarter) return <div>Loading...</div>

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold">{quarter.name}</h1>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <span className="text-gray-500 text-sm">Status</span>
            <p className="font-medium text-lg uppercase">{quarter.status}</p>
          </div>
          <div>
            <span className="text-gray-500 text-sm">Dates</span>
            <p className="font-medium">Open: {new Date(quarter.open_date).toLocaleDateString()}</p>
            <p className="font-medium text-red-600">Deadline: {new Date(quarter.deadline_date).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <h2 className="text-2xl font-bold mb-4">Deadline Overrides</h2>
        <p className="text-gray-600 text-sm mb-4">
          Create and view deadline overrides for specific active organisations overriding the {new Date(quarter.deadline_date).toLocaleDateString()} deadline.
        </p>
        
        {/* Further Override UI Implementation here */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded text-center text-gray-500">
          No overrides configured yet.
        </div>
      </div>
    </div>
  )
}
