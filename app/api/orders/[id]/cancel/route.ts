import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params
    const orderId = resolvedParams.id
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: order } = await supabase.from('orders').select('*').eq('id', orderId).single()
    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })

    const { data: org } = await supabase.from('organisations').select('id, status').eq('user_id', user.id).single()
    if (!org || org.id !== order.organisation_id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    if (order.status === 'collected' || order.status === 'cancelled') {
      return NextResponse.json({ error: 'Order cannot be cancelled in its current status' }, { status: 400 })
    }

    await supabase.from('orders').update({ status: 'cancelled', updated_at: new Date().toISOString() }).eq('id', orderId)

    await supabase.from('order_logs').insert({
      order_id: orderId,
      changed_by: user.id,
      previous_status: order.status,
      new_status: 'cancelled',
      reason: 'Order cancelled by representative'
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}
