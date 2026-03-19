'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function RepDashboardPage() {
  const [activeQuarter, setActiveQuarter] = useState<any>(null)
  const [currentOrder, setCurrentOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [org, setOrg] = useState<any>(null)
  
  const supabase = createClient()

  useEffect(() => {
    fetchDashboard()
  }, [])

  const fetchDashboard = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)

    if (user) {
      const { data: orgData } = await supabase.from('organisations').select('*').eq('user_id', user.id).single()
      setOrg(orgData)

      const { data: qData } = await supabase.from('quarters').select('*').eq('status', 'published').maybeSingle()
      setActiveQuarter(qData)

      if (qData && orgData) {
        const { data: oData } = await supabase.from('orders')
          .select('*')
          .eq('quarter_id', qData.id)
          .eq('organisation_id', orgData.id)
          .maybeSingle()
        setCurrentOrder(oData)
      }
    }
    
    setLoading(false)
  }

  if (loading) return <div>Loading dashboard...</div>

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome, {org?.org_name}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border-t-4 border-blue-500">
          <h2 className="text-xl font-bold mb-2">Active Quarter</h2>
          {activeQuarter ? (
            <>
              <p className="text-lg font-medium text-gray-900">{activeQuarter.name}</p>
              <p className="text-sm text-gray-600 mt-2">Open: {new Date(activeQuarter.open_date).toLocaleDateString()}</p>
              <p className="text-sm font-semibold text-red-600 mt-1">Deadline: {new Date(activeQuarter.deadline_date).toLocaleDateString()}</p>
              
              {!currentOrder && (
                <div className="mt-4">
                  <Link href="/rep/order/place" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 block text-center">
                    Place Lesson Order
                  </Link>
                </div>
              )}
            </>
          ) : (
            <p className="text-gray-500">No quarter is currently open for ordering.</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-t-4 border-green-500">
          <h2 className="text-xl font-bold mb-2">Current Order Status</h2>
          {currentOrder ? (
            <>
              <p className="text-lg font-medium">Order ID: #{currentOrder.id.split('-')[0]}</p>
              <div className="mt-3 inline-flex px-3 py-1 rounded-full text-sm font-semibold uppercase bg-blue-100 text-blue-800">
                {currentOrder.status.replace(/_/g, ' ')}
              </div>
              
              <div className="mt-4 space-x-4">
                <Link href={`/rep/order/${currentOrder.id}`} className="text-blue-600 hover:underline text-sm">
                  View Order
                </Link>
                {currentOrder.status === 'submitted' && (
                  <Link href={`/rep/order/${currentOrder.id}/edit`} className="text-gray-600 hover:underline text-sm">
                    Amend Order
                  </Link>
                )}
              </div>
            </>
          ) : (
            <p className="text-gray-500">You have not placed an order for the current quarter.</p>
          )}
        </div>
      </div>
    </div>
  )
}
