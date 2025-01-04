ALTER TABLE "users" ADD COLUMN "rating" numeric(3, 2) DEFAULT '5.00' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "review_count" integer DEFAULT 0 NOT NULL;