import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  console.log('Test webhook received')
  return NextResponse.json({ received: true })
} 
