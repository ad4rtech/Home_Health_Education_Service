import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { org_name, contact_name, email, password, org_type } = body

    // Create user in Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        full_name: contact_name
      }
    })

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    const userId = authData.user.id

    // Insert Profile 
    const { error: profileError } = await supabaseAdmin.from('profiles').insert({
      id: userId,
      role: 'org_rep',
      full_name: contact_name
    })

    if (profileError) {
      return NextResponse.json({ error: profileError.message }, { status: 400 })
    }

    // Insert Organisation
    const { error: orgError } = await supabaseAdmin.from('organisations').insert({
      user_id: userId,
      org_name,
      contact_name,
      email,
      org_type,
      status: 'pending_approval'
    })

    if (orgError) {
      return NextResponse.json({ error: orgError.message }, { status: 400 })
    }
    
    return NextResponse.json({ success: true, message: 'Registration submitted for approval' })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
