'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    org_name: '',
    contact_name: '',
    email: '',
    password: '',
    org_type: 'Church'
  })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed')
      }
      
      setSuccess(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center bg-white p-8 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900">Registration Submitted</h2>
        <p className="mt-4 text-gray-600">
          Your organisation's registration has been received. Our admin team will review it shortly.
          You cannot log in until your account is approved.
        </p>
        <Link href="/login" className="mt-6 inline-block font-medium text-blue-600 hover:text-blue-500">
          Return to login
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Register Organisation
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Create an account to order lesson books
        </p>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label className="sr-only">Organisation Name</label>
            <input name="org_name" type="text" required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Organisation Name"
              value={formData.org_name} onChange={handleChange}
            />
          </div>
          <div>
            <label className="sr-only">Contact Name</label>
            <input name="contact_name" type="text" required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Primary Contact Name"
              value={formData.contact_name} onChange={handleChange}
            />
          </div>
          <div>
            <label className="sr-only">Email address</label>
            <input name="email" type="email" required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Email address"
              value={formData.email} onChange={handleChange}
            />
          </div>
          <div>
            <label className="sr-only">Organisation Type</label>
            <select name="org_type" required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={formData.org_type} onChange={handleChange}
            >
              <option value="Church">Church</option>
              <option value="University">University</option>
              <option value="School">School</option>
            </select>
          </div>
          <div>
            <label className="sr-only">Password</label>
            <input name="password" type="password" required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Password"
              value={formData.password} onChange={handleChange}
            />
          </div>
        </div>

        {error && <div className="text-red-500 text-sm align-center text-center">{error}</div>}

        <div>
          <button type="submit" disabled={loading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
            {loading ? 'Submitting...' : 'Submit Registration'}
          </button>
        </div>
        
        <div className="text-center text-sm mt-4">
          <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Already have an account? Sign in
          </Link>
        </div>
      </form>
    </div>
  )
}
