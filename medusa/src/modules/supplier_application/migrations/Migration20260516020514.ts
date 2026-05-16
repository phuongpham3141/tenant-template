import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260516020514 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "supplier_application" ("id" text not null, "company_name" text not null, "tax_id" text null, "business_type" text check ("business_type" in ('factory', 'manufacturer', 'trading_company', 'distributor')) not null, "established_year" integer null, "employee_count" text null, "address" text null, "province" text null, "district" text null, "country" text check ("country" in ('VN', 'CN')) not null default 'CN', "contact_name" text not null, "contact_phone" text null, "contact_email" text not null, "contact_role" text null, "contact_im" text null, "industries" text[] not null default '{}', "capacity_monthly" text null, "certifications" text[] not null default '{}', "factory_area_m2" integer null, "moq" text null, "lead_time_days" text null, "export_year" integer null, "annual_revenue" text null, "website" text null, "status" text check ("status" in ('submitted', 'under_review', 'needs_info', 'approved', 'rejected')) not null default 'submitted', "admin_notes" text null, "rejection_reason" text null, "reviewed_by" text null, "reviewed_at" timestamptz null, "approved_supplier_id" text null, "tenant_id" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "supplier_application_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_supplier_application_deleted_at" ON "supplier_application" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "supplier_application" cascade;`);
  }

}
