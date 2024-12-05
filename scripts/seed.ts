// scripts/seed.ts
import 'dotenv/config'
import { db } from '@/db'
import { services, users } from '@/db/schema'

async function main() {
  console.log('Starting to seed database...')
  
  try {
    // First, delete existing data
    console.log('Cleaning existing data...')
    await db.delete(services)
    await db.delete(users)

    // Create a test provider
    console.log('Creating test provider...')
    const provider = await db.insert(users).values({
      name: 'Test Provider',
      email: 'provider@test.com',
      role: 'PROVIDER',
      clerkId: 'test-clerk-id'
    }).returning()

    console.log('Created provider:', provider[0].id)

    // Create test services
    console.log('Creating test services...')
    const testServices = await db.insert(services).values([
      {
        name: 'Haircut & Style',
        description: 'Professional haircut and styling service',
        price: '50.00',
        duration: 60,
        providerId: provider[0].id,
        category: 'Hair'
      },
      {
        name: 'Manicure',
        description: 'Professional nail care service',
        price: '35.00',
        duration: 45,
        providerId: provider[0].id,
        category: 'Nails'
      },
      {
        name: 'Facial Treatment',
        description: 'Relaxing facial with deep cleansing',
        price: '75.00',
        duration: 90,
        providerId: provider[0].id,
        category: 'Skincare'
      }
    ]).returning()

    console.log('Created services:', testServices.length)
    console.log('Database seeded successfully!')

  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    // If needed, add cleanup code here
    process.exit(0)
  })