'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function NewQuarterPage() {
  const [formData, setFormData] = useState({
    name: '',
    open_date: '',
    deadline_date: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error: insertError } = await supabase.from('quarters').insert({
      name: formData.name,
      open_date: formData.open_date,
      deadline_date: formData.deadline_date,
      status: 'draft'
    })

    if (insertError) {
      setError(insertError.message)
      setLoading(false)
      return
    }

    router.push('/admin/quarters')
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Create New Quarter</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Quarter Name</label>
          <input type="text" required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="e.g. Q1 2026"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Open Date</label>
          <input type="date" required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={formData.open_date}
            onChange={e => setFormData({ ...formData, open_date: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Deadline Date</label>
          <input type="date" required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={formData.deadline_date}
            onChange={e => setFormData({ ...formData, deadline_date: e.target.value })}
          />
        </div>

        {error && <div className="text-red-600 text-sm">{error}</div>}

        <div className="flex space-x-4">
          <button type="submit" disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            {loading ? 'Saving...' : 'Create Quarter'}
          </button>
          <Link href="/admin/quarters" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
