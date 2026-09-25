CREATE TYPE "portfolio"."admin_role" AS ENUM('owner', 'editor');--> statement-breakpoint
CREATE TABLE "portfolio"."admin_users" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"role" "portfolio"."admin_role" NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "portfolio"."admin_users" ADD CONSTRAINT "admin_users_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "portfolio"."admin_users" ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
REVOKE USAGE ON SCHEMA "portfolio" FROM "anon", "authenticated";
--> statement-breakpoint
REVOKE ALL PRIVILEGES ON TABLE "portfolio"."admin_users" FROM "anon", "authenticated";
--> statement-breakpoint
ALTER DEFAULT PRIVILEGES IN SCHEMA "portfolio" REVOKE ALL ON TABLES FROM "anon", "authenticated";
--> statement-breakpoint
ALTER DEFAULT PRIVILEGES IN SCHEMA "portfolio" REVOKE ALL ON SEQUENCES FROM "anon", "authenticated";
--> statement-breakpoint
ALTER DEFAULT PRIVILEGES IN SCHEMA "portfolio" REVOKE ALL ON FUNCTIONS FROM "anon", "authenticated";
