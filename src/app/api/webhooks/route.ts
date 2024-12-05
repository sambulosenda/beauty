// app/api/webhooks/clerk/route.ts
import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { db } from '@/db'
import { users } from '@/db/schema'

async function createUser(userData: {
  clerkId: string;
  email: string;
  name: string | null;
  imageUrl?: string | null;
}) {
  try {
    const [user] = await db.insert(users).values({
      clerkId: userData.clerkId,
      email: userData.email,
      name: userData.name,
      role: 'CUSTOMER',
      ...(userData.imageUrl && { logo: userData.imageUrl })
    }).returning();
    return { user };
  } catch (error) {
    console.error('Error creating user:', error);
    return { error };
  }
}

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  
  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

 // Get headers
 const headerPayload = await headers()
 const svix_id = headerPayload.get('svix-id')
 const svix_timestamp = headerPayload.get('svix-timestamp')
 const svix_signature = headerPayload.get('svix-signature')

 
  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    const wh = new Webhook(WEBHOOK_SECRET);
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error: Could not verify webhook:', err);
    return new Response('Error: Verification error', {
      status: 400,
    });
  }

  const eventType = evt.type;

  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;

    if (!id || !email_addresses) {
      return new Response('Error occurred -- missing data', {
        status: 400
      });
    }

    const userData = {
      clerkId: id,
      email: email_addresses[0].email_address,
      name: first_name && last_name ? `${first_name} ${last_name}` : email_addresses[0].email_address,
      ...(image_url && { imageUrl: image_url })
    };

    const { error } = await createUser(userData);
    
    if (error) {
      console.error('Error creating user:', error);
      return new Response('Error creating user', { status: 500 });
    }
  }

  return new Response('Webhook received', { status: 200 });
}