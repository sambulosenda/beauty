// lib/emails.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

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
      from: 'BeautyBook <bookings@yourdomain.com>',
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
      from: 'BeautyBook <bookings@yourdomain.com>',
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