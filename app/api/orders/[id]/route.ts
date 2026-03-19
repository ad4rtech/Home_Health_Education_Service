import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params
    const orderId = resolvedParams.id
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { items: newItems } = await request.json()

    const { data: order } = await supabase.from('orders').select('*, quarter:quarters(*)').eq('id', orderId).single()
    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })

    const { data: org } = await supabase.from('organisations').select('id, status').eq('user_id', user.id).single()
    if (!org || org.id !== order.organisation_id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    if (order.status === 'collected' || order.status === 'cancelled') {
      return NextResponse.json({ error: 'Order cannot be amended in its current status' }, { status: 400 })
    }

    const { data: override } = await supabase.from('deadline_overrides')
      .select('new_deadline')
      .eq('quarter_id', order.quarter_id)
      .eq('organisation_id', org.id)
      .maybeSingle()

    const deadline = override ? new Date(override.new_deadline) : new Date(order.quarter.deadline_date)
    if (new Date() > deadline) {
      return NextResponse.json({ error: 'Deadline has passed for amendments' }, { status: 400 })
    }

    await supabase.from('order_items').delete().eq('order_id', orderId)
    
    const orderItems = newItems.filter((i: any) => i.quantity > 0).map((i: any) => ({
      order_id: orderId,
      catalogue_item_id: i.catalogue_item_id,
      quantity: i.quantity
    }))

    if (orderItems.length > 0) {
      await supabase.from('order_items').insert(orderItems)
    }

    await supabase.from('order_logs').insert({
      order_id: orderId,
      changed_by: user.id,
      previous_status: order.status,
      new_status: order.status,
      reason: 'Order amended by representative'
    })

    await supabase.from('orders').update({ updated_at: new Date().toISOString() }).eq('id', orderId)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}
