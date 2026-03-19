import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string
  subject: string
  html: string
}) {
  if (!process.env.RESEND_API_KEY) {
    console.log(`[Email Stub] Would have sent to ${to}: ${subject}`)
    return { success: true, stub: true }
  }

  try {
    const data = await resend.emails.send({
      from: 'HHES Ordering <noreply@hhes.vercel.app>',
      to,
      subject,
      html,
    })
    return { success: true, data }
  } catch (error) {
    console.error('Email error:', error)
    return { success: false, error }
  }
}

export const EmailTemplates = {
  registrationReceived: (orgName: string) => `<h2>Registration Received</h2><p>Hi ${orgName}, your registration is pending approval.</p>`,
  orgApproved: (orgName: string, loginUrl: string) => `<h2>Account Approved</h2><p>Hi ${orgName}, you can now log in: <a href="${loginUrl}">Login</a></p>`,
  orgRejected: (orgName: string) => `<h2>Account Rejected</h2><p>Hi ${orgName}, unfortunately your registration was not approved.</p>`,
  quarterOpened: (quarterName: string) => `<h2>New Quarter Open</h2><p>${quarterName} is now open for ordering.</p>`,
  orderSubmitted: (orderId: string) => `<h2>Order Submitted</h2><p>Order #${orderId} was received.</p>`,
  orderAmended: (orderId: string) => `<h2>Order Amended</h2><p>Order #${orderId} has been updated.</p>`,
  orderCancelled: (orderId: string) => `<h2>Order Cancelled</h2><p>Order #${orderId} was cancelled.</p>`,
  readyForPickup: (orderId: string) => `<h2>Ready for Pickup</h2><p>Order #${orderId} is ready. Please collect from HHES Centre during business hours.</p>`,
  collected: (orderId: string) => `<h2>Order Collected</h2><p>Order #${orderId} has been successfully collected. Thank you!</p>`,
}
