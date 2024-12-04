import { 
    pgTable, 
    text, 
    timestamp, 
    uuid, 
    varchar, 
    integer, 
    decimal, 
     
  } from 'drizzle-orm/pg-core'
  
  export const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    clerkId: text('clerk_id').unique().notNull(),
    role: text('role', { enum: ['CUSTOMER', 'PROVIDER', 'ADMIN'] }).default('CUSTOMER').notNull(),
    email: text('email').unique().notNull(),
    name: text('name'),
    businessName: text('business_name'),
    description: text('description'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
  })
  
  export const services = pgTable('services', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name', { length: 256 }).notNull(),
    description: text('description'),
    price: decimal('price', { precision: 10, scale: 2 }).notNull(),
    duration: integer('duration').notNull(),
    providerId: uuid('provider_id').references(() => users.id).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
  })
  
  export const bookings = pgTable('bookings', {
    id: uuid('id').defaultRandom().primaryKey(),
    serviceId: uuid('service_id').references(() => services.id).notNull(),
    providerId: uuid('provider_id').references(() => users.id).notNull(),
    customerId: uuid('customer_id').references(() => users.id).notNull(),
    date: timestamp('date').notNull(),
    status: text('status', { 
      enum: ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'] 
    }).default('PENDING').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
  })