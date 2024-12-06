CREATE TABLE IF NOT EXISTS "breaks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"provider_id" uuid NOT NULL,
	"start_time" timestamp NOT NULL,
	"end_time" timestamp NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "availability" ALTER COLUMN "start_time" SET DATA TYPE time;--> statement-breakpoint
ALTER TABLE "availability" ALTER COLUMN "end_time" SET DATA TYPE time;--> statement-breakpoint
ALTER TABLE "availability" ADD COLUMN "is_available" boolean DEFAULT true NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "breaks" ADD CONSTRAINT "breaks_provider_id_users_id_fk" FOREIGN KEY ("provider_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "availability" DROP COLUMN IF EXISTS "enabled";