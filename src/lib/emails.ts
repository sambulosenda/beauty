// lib/emails.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const from = process.env.NODE_ENV === 'production'
  ? 'BeautyBook <bookings@yourdomain.com>'
  : 'BeautyBook <onboarding@resend.dev>'

export async function sendBookingConfirmation({
  customerEmail,
  customerName,
  serviceName,
  date,
  providerName,
  bookingId
}: {
  customerEmail: string
  customerName: string
  serviceName: string
  date: Date
  providerName: string
  bookingId: string
}) {
  try {
    await resend.emails.send({
      from,
      to: customerEmail,
      subject: 'Booking Confirmation',
      html: `
        <h1>Booking Confirmation</h1>
        <p>Hi ${customerName},</p>
        <p>Your booking for ${serviceName} has been confirmed.</p>
        <p>
          <strong>Date:</strong> ${date.toLocaleDateString()}<br/>
          <strong>Time:</strong> ${date.toLocaleTimeString()}<br/>
          <strong>Provider:</strong> ${providerName}<br/>
          <strong>Booking ID:</strong> ${bookingId}
        </p>
        <p>View your booking details <a href="${process.env.NEXT_PUBLIC_APP_URL}/bookings/${bookingId}">here</a></p>
      `
    })
  } catch (error) {
    console.error('Failed to send confirmation email:', error)
  }
}

export async function sendProviderNotification({
  providerEmail,
  customerName,
  serviceName,
  date,
  bookingId
}: {
  providerEmail: string
  customerName: string
  serviceName: string
  date: Date
  bookingId: string
}) {
  try {
    await resend.emails.send({
      from,
      to: providerEmail,
      subject: 'New Booking',
      html: `
        <h1>New Booking</h1>
        <p>You have a new booking!</p>
        <p>
          <strong>Customer:</strong> ${customerName}<br/>
          <strong>Service:</strong> ${serviceName}<br/>
          <strong>Date:</strong> ${date.toLocaleDateString()}<br/>
          <strong>Time:</strong> ${date.toLocaleTimeString()}<br/>
          <strong>Booking ID:</strong> ${bookingId}
        </p>
        <p>View booking details <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/bookings/${bookingId}">here</a></p>
      `
    })
  } catch (error) {
    console.error('Failed to send provider notification:', error)
  }
}


export async function sendBookingUpdate({
    customerEmail,
    customerName,
    serviceName,
    bookingId,
    status,
    date,
  }: {
    customerEmail: string
    customerName: string
    serviceName: string
    bookingId: string
    status: string
    date: Date
  }) {
    try {
      await resend.emails.send({
        from,
        to: customerEmail,
        subject: `Booking Update - ${status}`,
        html: `
          <h1>Booking Status Update</h1>
          <p>Hi ${customerName},</p>
          <p>Your booking for ${serviceName} has been ${status.toLowerCase()}.</p>
          <p>
            <strong>Booking ID:</strong> ${bookingId}<br/>
            <strong>Date:</strong> ${date.toLocaleDateString()}<br/>
            <strong>Time:</strong> ${date.toLocaleTimeString()}<br/>
            <strong>New Status:</strong> ${status}<br/>
          </p>
          <p>View your booking details <a href="${process.env.NEXT_PUBLIC_APP_URL}/bookings/${bookingId}">here</a></p>
        `
      })
    } catch (error) {
      console.error('Failed to send booking update email:', error)
    }
  }

export async function sendServiceUpdateEmail({
  customerEmails,
  serviceName,
  updateType,
  serviceId,
}: {
  customerEmails: string[]
  serviceName: string
  updateType: 'updated' | 'cancelled'
  serviceId: string
}) {
  try {
    const promises = customerEmails.map(email =>
      resend.emails.send({
        from,
        to: email,
        subject: `Service ${updateType} - ${serviceName}`,
        html: `
          <h1>Service ${updateType}</h1>
          <p>The service "${serviceName}" has been ${updateType}.</p>
          ${updateType === 'updated' 
            ? `<p>View the updated service details <a href="${process.env.NEXT_PUBLIC_APP_URL}/services/${serviceId}">here</a></p>`
            : '<p>We apologize for any inconvenience caused.</p>'
          }
        `
      })
    )

    await Promise.all(promises)
  } catch (error) {
    console.error('Failed to send service update emails:', error)
  }
}
