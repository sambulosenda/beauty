ALTER TABLE "availability" ALTER COLUMN "start_time" SET DATA TYPE time;--> statement-breakpoint
ALTER TABLE "availability" ALTER COLUMN "end_time" SET DATA TYPE time;--> statement-breakpoint
ALTER TABLE "availability" ADD COLUMN "is_available" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "availability" DROP COLUMN IF EXISTS "enabled";