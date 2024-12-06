ALTER TABLE "availability" ALTER COLUMN "start_time" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "availability" ALTER COLUMN "end_time" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "availability" ADD COLUMN "enabled" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "availability" DROP COLUMN IF EXISTS "is_available";