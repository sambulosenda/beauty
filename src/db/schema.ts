// db/schema.ts
import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  integer,
  decimal,
  time,
  boolean
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const serviceCategories = [
  'Hair',
  'Nails',
  'Makeup',
  'Skincare',
  'Massage',
  'Spa',
  'Other'
] as const

// Users Table
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: text('slug').unique(),
  clerkId: text('clerk_id').unique().notNull(),
  role: text('role', { enum: ['CUSTOMER', 'PROVIDER', 'ADMIN'] }).default('CUSTOMER').notNull(),
  email: text('email').unique().notNull(),
  name: text('name'),
  businessName: text('business_name'),
  description: text('description'),
  address: text('address'),
  phone: text('phone'),
  logo: text('logo'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  stripeCustomerId: text('stripe_customer_id').unique(),
  stripeConnectAccountId: text('stripe_connect_account_id').unique(),
  stripeAccountEnabled: boolean('stripe_account_enabled').default(false),
  gallery: text('gallery').array(),
  rating: decimal('rating', { precision: 3, scale: 2 }).notNull().default('5.00'),
  reviewCount: integer('review_count').notNull().default(0),
})

export const availability = pgTable('availability', {
  id: uuid('id').defaultRandom().primaryKey(),
  providerId: uuid('provider_id').references(() => users.id).notNull(),
  dayOfWeek: text('day_of_week', {
    enum: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']
  }).notNull(),
  startTime: text('start_time').notNull(),
  endTime: text('end_time').notNull(),
  isAvailable: boolean('is_available').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const breaks = pgTable('breaks', {
  id: uuid('id').defaultRandom().primaryKey(),
  providerId: uuid('provider_id').references(() => users.id).notNull(),
  startTime: timestamp('start_time').notNull(),
  endTime: timestamp('end_time').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

// Services Table
export const services = pgTable('services', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  duration: integer('duration').notNull(),
  providerId: uuid('provider_id').references(() => users.id).notNull(),
  category: text('category').notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

// Bookings Table
export const bookings = pgTable('bookings', {
  id: uuid('id').defaultRandom().primaryKey(),
  serviceId: uuid('service_id').references(() => services.id).notNull(),
  providerId: uuid('provider_id').references(() => users.id).notNull(),
  customerId: uuid('customer_id').references(() => users.id).notNull(),
  startTime: timestamp('start_time').notNull(),
  endTime: timestamp('end_time').notNull(),
  status: text('status', {
    enum: ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']
  }).default('PENDING').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  stripePaymentIntentId: text('stripe_payment_intent_id').unique(),
  stripePaymentStatus: text('stripe_payment_status', {
    enum: ['pending', 'processing', 'succeeded', 'failed']
  }).default('pending'),
  amount: decimal('amount', { precision: 10, scale: 2 }),
  currency: text('currency').default('usd'),
  
})

// Reviews Table
export const reviews = pgTable('reviews', {
  id: uuid('id').defaultRandom().primaryKey(),
  bookingId: uuid('booking_id').references(() => bookings.id).notNull(),
  customerId: uuid('customer_id').references(() => users.id).notNull(),
  providerId: uuid('provider_id').references(() => users.id).notNull(),
  rating: integer('rating').notNull(),
  comment: text('comment'),
  response: text('response'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

// Define Relations
export const usersRelations = relations(users, ({ many }) => ({
  services: many(services),
  providerBookings: many(bookings, { relationName: 'bookingProvider' }),
  customerBookings: many(bookings, { relationName: 'bookingCustomer' }),
  providerReviews: many(reviews, { relationName: 'reviewProvider' }),
  customerReviews: many(reviews, { relationName: 'reviewCustomer' }),
  availability: many(availability)
}))

export const servicesRelations = relations(services, ({ one }) => ({
  provider: one(users, {
    fields: [services.providerId],
    references: [users.id]
  })
}))

export const bookingsRelations = relations(bookings, ({ one }) => ({
  service: one(services, {
    fields: [bookings.serviceId],
    references: [services.id]
  }),
  provider: one(users, {
    fields: [bookings.providerId],
    references: [users.id],
    relationName: 'bookingProvider'
  }),
  customer: one(users, {
    fields: [bookings.customerId],
    references: [users.id],
    relationName: 'bookingCustomer'
  })
}))

export const reviewsRelations = relations(reviews, ({ one }) => ({
  booking: one(bookings, {
    fields: [reviews.bookingId],
    references: [bookings.id]
  }),
  provider: one(users, {
    fields: [reviews.providerId],
    references: [users.id],
    relationName: 'reviewProvider'
  }),
  customer: one(users, {
    fields: [reviews.customerId],
    references: [users.id],
    relationName: 'reviewCustomer'
  })
}))

export const availabilityRelations = relations(availability, ({ one }) => ({
  provider: one(users, {
    fields: [availability.providerId],
    references: [users.id]
  })
}))

