CREATE SCHEMA "portfolio";
--> statement-breakpoint
CREATE TYPE "portfolio"."content_status" AS ENUM('draft', 'published', 'archived');--> statement-breakpoint
CREATE TYPE "portfolio"."media_mode" AS ENUM('collage', 'slider', 'gallery');--> statement-breakpoint
CREATE TABLE "portfolio"."footer_links" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"label" text NOT NULL,
	"url" text NOT NULL,
	"icon_key" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"visible" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "footer_links_label_not_empty" CHECK ("portfolio"."footer_links"."label" <> ''),
	CONSTRAINT "footer_links_url_not_empty" CHECK ("portfolio"."footer_links"."url" <> ''),
	CONSTRAINT "footer_links_icon_key_not_empty" CHECK ("portfolio"."footer_links"."icon_key" <> ''),
	CONSTRAINT "footer_links_sort_order_non_negative" CHECK ("portfolio"."footer_links"."sort_order" >= 0)
);
--> statement-breakpoint
CREATE TABLE "portfolio"."media" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"provider" text NOT NULL,
	"bucket" text,
	"path" text NOT NULL,
	"filename" text NOT NULL,
	"mime_type" text NOT NULL,
	"size_bytes" integer NOT NULL,
	"width" integer,
	"height" integer,
	"alt" text,
	"caption" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "media_path_not_empty" CHECK ("portfolio"."media"."path" <> ''),
	CONSTRAINT "media_filename_not_empty" CHECK ("portfolio"."media"."filename" <> ''),
	CONSTRAINT "media_mime_type_not_empty" CHECK ("portfolio"."media"."mime_type" <> ''),
	CONSTRAINT "media_size_non_negative" CHECK ("portfolio"."media"."size_bytes" >= 0),
	CONSTRAINT "media_width_positive" CHECK ("portfolio"."media"."width" IS NULL OR "portfolio"."media"."width" > 0),
	CONSTRAINT "media_height_positive" CHECK ("portfolio"."media"."height" IS NULL OR "portfolio"."media"."height" > 0)
);
--> statement-breakpoint
CREATE TABLE "portfolio"."pages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" text NOT NULL,
	"title" text NOT NULL,
	"content" jsonb NOT NULL,
	"status" "portfolio"."content_status" DEFAULT 'draft' NOT NULL,
	"published_at" timestamp with time zone,
	"seo_title" text,
	"seo_description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "pages_key_unique" UNIQUE("key"),
	CONSTRAINT "pages_key_not_empty" CHECK ("portfolio"."pages"."key" <> ''),
	CONSTRAINT "pages_published_requires_date" CHECK ("portfolio"."pages"."status" <> 'published' OR "portfolio"."pages"."published_at" IS NOT NULL)
);
--> statement-breakpoint
CREATE TABLE "portfolio"."post_media" (
	"post_id" uuid NOT NULL,
	"media_id" uuid NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "post_media_post_id_media_id_pk" PRIMARY KEY("post_id","media_id"),
	CONSTRAINT "post_media_sort_order_non_negative" CHECK ("portfolio"."post_media"."sort_order" >= 0)
);
--> statement-breakpoint
CREATE TABLE "portfolio"."posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text,
	"excerpt" text,
	"content" jsonb NOT NULL,
	"status" "portfolio"."content_status" DEFAULT 'draft' NOT NULL,
	"published_at" timestamp with time zone,
	"media_mode" "portfolio"."media_mode" DEFAULT 'collage' NOT NULL,
	"seo_title" text,
	"seo_description" text,
	"og_media_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "posts_slug_unique" UNIQUE("slug"),
	CONSTRAINT "posts_slug_not_empty" CHECK ("portfolio"."posts"."slug" <> '')
);
--> statement-breakpoint
CREATE TABLE "portfolio"."project_media" (
	"project_id" uuid NOT NULL,
	"media_id" uuid NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "project_media_project_id_media_id_pk" PRIMARY KEY("project_id","media_id"),
	CONSTRAINT "project_media_sort_order_non_negative" CHECK ("portfolio"."project_media"."sort_order" >= 0)
);
--> statement-breakpoint
CREATE TABLE "portfolio"."project_relations" (
	"project_id" uuid NOT NULL,
	"related_project_id" uuid NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "project_relations_project_id_related_project_id_pk" PRIMARY KEY("project_id","related_project_id"),
	CONSTRAINT "project_relations_not_self" CHECK ("portfolio"."project_relations"."project_id" <> "portfolio"."project_relations"."related_project_id"),
	CONSTRAINT "project_relations_sort_order_non_negative" CHECK ("portfolio"."project_relations"."sort_order" >= 0)
);
--> statement-breakpoint
CREATE TABLE "portfolio"."project_technologies" (
	"project_id" uuid NOT NULL,
	"technology_id" uuid NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "project_technologies_project_id_technology_id_pk" PRIMARY KEY("project_id","technology_id"),
	CONSTRAINT "project_technologies_sort_order_non_negative" CHECK ("portfolio"."project_technologies"."sort_order" >= 0)
);
--> statement-breakpoint
CREATE TABLE "portfolio"."projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"summary" jsonb,
	"content" jsonb,
	"role" text,
	"domain" text,
	"period_start" date,
	"period_end" date,
	"status" "portfolio"."content_status" DEFAULT 'draft' NOT NULL,
	"published_at" timestamp with time zone,
	"github_url" text,
	"demo_url" text,
	"media_mode" "portfolio"."media_mode" DEFAULT 'collage' NOT NULL,
	"seo_title" text,
	"seo_description" text,
	"og_media_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "projects_slug_unique" UNIQUE("slug"),
	CONSTRAINT "projects_slug_not_empty" CHECK ("portfolio"."projects"."slug" <> ''),
	CONSTRAINT "projects_period_order" CHECK ("portfolio"."projects"."period_end" IS NULL OR "portfolio"."projects"."period_start" IS NULL OR "portfolio"."projects"."period_end" >= "portfolio"."projects"."period_start")
);
--> statement-breakpoint
CREATE TABLE "portfolio"."site_profile" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"singleton_key" text DEFAULT 'default' NOT NULL,
	"name" text NOT NULL,
	"headline" text,
	"bio" jsonb,
	"birthday" date,
	"location" text,
	"avatar_media_id" uuid,
	"banner_media_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "site_profile_singleton_key_unique" UNIQUE("singleton_key"),
	CONSTRAINT "site_profile_singleton_only" CHECK ("portfolio"."site_profile"."singleton_key" = 'default')
);
--> statement-breakpoint
CREATE TABLE "portfolio"."site_settings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"singleton_key" text DEFAULT 'default' NOT NULL,
	"site_name" text NOT NULL,
	"site_description" text,
	"default_seo_title" text,
	"default_seo_description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "site_settings_singleton_key_unique" UNIQUE("singleton_key"),
	CONSTRAINT "site_settings_singleton_only" CHECK ("portfolio"."site_settings"."singleton_key" = 'default')
);
--> statement-breakpoint
CREATE TABLE "portfolio"."technologies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"category" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "technologies_slug_unique" UNIQUE("slug"),
	CONSTRAINT "technologies_slug_not_empty" CHECK ("portfolio"."technologies"."slug" <> ''),
	CONSTRAINT "technologies_name_not_empty" CHECK ("portfolio"."technologies"."name" <> ''),
	CONSTRAINT "technologies_sort_order_non_negative" CHECK ("portfolio"."technologies"."sort_order" >= 0)
);
--> statement-breakpoint
ALTER TABLE "portfolio"."post_media" ADD CONSTRAINT "post_media_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "portfolio"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "portfolio"."post_media" ADD CONSTRAINT "post_media_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "portfolio"."media"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "portfolio"."posts" ADD CONSTRAINT "posts_og_media_id_media_id_fk" FOREIGN KEY ("og_media_id") REFERENCES "portfolio"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "portfolio"."project_media" ADD CONSTRAINT "project_media_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "portfolio"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "portfolio"."project_media" ADD CONSTRAINT "project_media_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "portfolio"."media"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "portfolio"."project_relations" ADD CONSTRAINT "project_relations_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "portfolio"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "portfolio"."project_relations" ADD CONSTRAINT "project_relations_related_project_id_projects_id_fk" FOREIGN KEY ("related_project_id") REFERENCES "portfolio"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "portfolio"."project_technologies" ADD CONSTRAINT "project_technologies_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "portfolio"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "portfolio"."project_technologies" ADD CONSTRAINT "project_technologies_technology_id_technologies_id_fk" FOREIGN KEY ("technology_id") REFERENCES "portfolio"."technologies"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "portfolio"."projects" ADD CONSTRAINT "projects_og_media_id_media_id_fk" FOREIGN KEY ("og_media_id") REFERENCES "portfolio"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "portfolio"."site_profile" ADD CONSTRAINT "site_profile_avatar_media_id_media_id_fk" FOREIGN KEY ("avatar_media_id") REFERENCES "portfolio"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "portfolio"."site_profile" ADD CONSTRAINT "site_profile_banner_media_id_media_id_fk" FOREIGN KEY ("banner_media_id") REFERENCES "portfolio"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "footer_links_sort_order_idx" ON "portfolio"."footer_links" USING btree ("sort_order");--> statement-breakpoint
CREATE INDEX "posts_status_published_at_idx" ON "portfolio"."posts" USING btree ("status","published_at");--> statement-breakpoint
CREATE INDEX "projects_status_published_at_idx" ON "portfolio"."projects" USING btree ("status","published_at");--> statement-breakpoint
REVOKE ALL ON SCHEMA "portfolio" FROM anon, authenticated;--> statement-breakpoint
REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA "portfolio" FROM anon, authenticated;--> statement-breakpoint
REVOKE ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA "portfolio" FROM anon, authenticated;--> statement-breakpoint
ALTER DEFAULT PRIVILEGES IN SCHEMA "portfolio" REVOKE ALL ON TABLES FROM anon, authenticated;--> statement-breakpoint
ALTER DEFAULT PRIVILEGES IN SCHEMA "portfolio" REVOKE ALL ON SEQUENCES FROM anon, authenticated;--> statement-breakpoint
ALTER DEFAULT PRIVILEGES IN SCHEMA "portfolio" REVOKE ALL ON FUNCTIONS FROM anon, authenticated;--> statement-breakpoint
ALTER TABLE "portfolio"."footer_links" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "portfolio"."media" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "portfolio"."pages" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "portfolio"."post_media" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "portfolio"."posts" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "portfolio"."project_media" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "portfolio"."project_relations" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "portfolio"."project_technologies" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "portfolio"."projects" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "portfolio"."site_profile" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "portfolio"."site_settings" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "portfolio"."technologies" ENABLE ROW LEVEL SECURITY;
