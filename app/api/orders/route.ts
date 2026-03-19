import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const orderSchema = z.object({
  quarter_id: z.string().uuid(),
  organisation_id: z.string().uuid(),
  items: z.array(z.object({
    catalogue_item_id: z.string().uuid(),
    quantity: z.number().int().min(0)
  }))
})

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const parsed = orderSchema.safeParse(body)
    
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid order data', details: parsed.error }, { status: 400 })
    }

    const { quarter_id, items, organisation_id } = parsed.data

    const { data: org } = await supabase.from('organisations').select('id, status').eq('user_id', user.id).single()
    if (!org || org.id !== organisation_id || org.status !== 'approved') {
      return NextResponse.json({ error: 'Invalid organisation' }, { status: 403 })
    }

    const { data: quarter } = await supabase.from('quarters').select('*').eq('id', quarter_id).single()
    if (!quarter || quarter.status !== 'published') {
      return NextResponse.json({ error: 'Quarter is not open for ordering' }, { status: 400 })
    }

    const { data: override } = await supabase.from('deadline_overrides')
      .select('new_deadline')
      .eq('quarter_id', quarter_id)
      .eq('organisation_id', organisation_id)
      .maybeSingle()

    const deadline = override ? new Date(override.new_deadline) : new Date(quarter.deadline_date)
    if (new Date() > deadline) {
      return NextResponse.json({ error: 'Deadline has passed for this quarter' }, { status: 400 })
    }

    const { data: existingOrder } = await supabase.from('orders')
      .select('id, status')
      .eq('quarter_id', quarter_id)
      .eq('organisation_id', organisation_id)
      .maybeSingle()
      
    if (existingOrder) {
      return NextResponse.json({ error: 'Order already exists for this quarter' }, { status: 400 })
    }

    const { data: newOrder, error: orderError } = await supabase.from('orders').insert({
      quarter_id,
      organisation_id,
      status: 'submitted'
    }).select().single()

    if (orderError) throw orderError

    const orderItems = items.filter(i => i.quantity > 0).map(i => ({
      order_id: newOrder.id,
      catalogue_item_id: i.catalogue_item_id,
      quantity: i.quantity
    }))

    if (orderItems.length > 0) {
      const { error: itemsError } = await supabase.from('order_items').insert(orderItems)
      if (itemsError) throw itemsError
    }

    return NextResponse.json({ success: true, order: newOrder })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}
