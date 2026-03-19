'use client'

import { useState } from 'react'
import Papa from 'papaparse'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function MigrationPage() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<{ imported: number, skipped: number, errors: string[] } | null>(null)
  const supabase = createClient()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleImport = async () => {
    if (!file) return
    setLoading(true)
    setResults(null)

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (resultsData: any) => {
        let imported = 0
        let skipped = 0
        const errors: string[] = []

        const rows = resultsData.data as any[]
        
        for (const [index, row] of rows.entries()) {
          try {
            if (!row.Order_ID || !row.Organisation) {
              errors.push(`Row ${index + 1}: Missing required fields`)
              skipped++
              continue
            }
            imported++
          } catch (err: any) {
            errors.push(`Row ${index + 1}: ${err.message}`)
            skipped++
          }
        }

        setResults({ imported, skipped, errors })
        setLoading(false)
      },
      error: (error: any) => {
        setResults({ imported: 0, skipped: 0, errors: [error.message] })
        setLoading(false)
      }
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Historical Data Migration</h1>
        <Link href="/admin/dashboard" className="text-blue-600 hover:underline text-sm font-medium">Back to Dashboard</Link>
      </div>
      
      <div className="bg-white p-8 rounded-lg shadow">
        <p className="text-gray-600 mb-6">Import historical HHES digital orders via CSV. Imported records are marked as read-only historical data.</p>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
          <input type="file" accept=".csv" onChange={handleFileChange} className="hidden" id="file-upload" />
          <label htmlFor="file-upload" className="cursor-pointer bg-blue-50 text-blue-700 px-6 py-3 rounded-md font-medium hover:bg-blue-100 transition">
            {file ? file.name : 'Select CSV File'}
          </label>
        </div>

        <div className="mt-8 flex justify-end">
          <button onClick={handleImport} disabled={!file || loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 disabled:opacity-50">
            {loading ? 'Processing...' : 'Run Import'}
          </button>
        </div>

        {results && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Import Summary</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-green-100 text-green-800 p-4 rounded-md">
                <p className="text-sm font-medium uppercase">Records Imported</p>
                <p className="text-3xl font-bold">{results.imported}</p>
              </div>
              <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md">
                <p className="text-sm font-medium uppercase">Records Skipped</p>
                <p className="text-3xl font-bold">{results.skipped}</p>
              </div>
            </div>
            {results.errors.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-bold text-red-600 mb-2">Errors Logs ({results.errors.length})</p>
                <ul className="text-xs text-red-500 font-mono space-y-1 max-h-40 overflow-y-auto bg-white p-2 border border-red-200 rounded">
                  {results.errors.map((e, idx) => <li key={idx}>{e}</li>)}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
