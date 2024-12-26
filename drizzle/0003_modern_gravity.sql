ALTER TABLE "users" ADD COLUMN "latitude" numeric(10, 8) DEFAULT '51.5074' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "longitude" numeric(11, 8) DEFAULT '-0.1278' NOT NULL;