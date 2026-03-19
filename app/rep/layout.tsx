import RepNavbar from '@/components/layout/RepNavbar'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function RepLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <RepNavbar user={user} />
      <div className="flex">
        <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  )
}
