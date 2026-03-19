'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function OrganisationsPage() {
  const [organisations, setOrganisations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchOrganisations()
  }, [])

  const fetchOrganisations = async () => {
    const { data } = await supabase
      .from('organisations')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (data) setOrganisations(data)
    setLoading(false)
  }

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    await supabase.from('organisations').update({ status: newStatus }).eq('id', id)
    fetchOrganisations() // refresh list
  }

  if (loading) return <div>Loading organisations...</div>

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Organisations</h1>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {organisations.map((org) => (
            <li key={org.id} className="p-4 flex items-center justify-between">
              <div>
                <Link href={`/admin/organisations/${org.id}`} className="text-lg font-medium text-blue-600 hover:text-blue-800">
                  {org.org_name}
                </Link>
                <div className="text-sm text-gray-500">
                  {org.org_type} • Contact: {org.contact_name} ({org.email})
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  org.status === 'approved' ? 'bg-green-100 text-green-800' :
                  org.status === 'pending_approval' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {org.status}
                </span>

                {org.status === 'pending_approval' && (
                  <div className="space-x-2">
                    <button onClick={() => handleStatusUpdate(org.id, 'approved')} className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">Approve</button>
                    <button onClick={() => handleStatusUpdate(org.id, 'rejected')} className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">Reject</button>
                  </div>
                )}
                {org.status === 'approved' && (
                  <button onClick={() => handleStatusUpdate(org.id, 'deactivated')} className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700">Deactivate</button>
                )}
                {org.status === 'deactivated' && (
                  <button onClick={() => handleStatusUpdate(org.id, 'approved')} className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">Re-activate</button>
                )}
              </div>
            </li>
          ))}
          {organisations.length === 0 && (
            <div className="p-4 text-gray-500 text-center">No organisations found.</div>
          )}
        </ul>
      </div>
    </div>
  )
}
