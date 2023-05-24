CREATE TABLE IF NOT EXISTS "roles" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"permissions" text[],
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"applicationId" uuid
);
--> statement-breakpoint
ALTER TABLE "roles" ADD CONSTRAINT "roles_name_applicationId" PRIMARY KEY("name","applicationId");

CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"password" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"applicationId" uuid
);
--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_applicationId" PRIMARY KEY("email","applicationId");

DO $$ BEGIN
 ALTER TABLE "roles" ADD CONSTRAINT "roles_applicationId_applications_id_fk" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_applicationId_applications_id_fk" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS "roles_id_index" ON "roles" ("id");
CREATE UNIQUE INDEX IF NOT EXISTS "users_id_index" ON "users" ("id");