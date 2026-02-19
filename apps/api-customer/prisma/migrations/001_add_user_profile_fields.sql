-- AddColumn first_name to users
ALTER TABLE "users" ADD COLUMN "first_name" character varying(100);

-- AddColumn last_name to users
ALTER TABLE "users" ADD COLUMN "last_name" character varying(100);

-- AddColumn full_name to users
ALTER TABLE "users" ADD COLUMN "full_name" character varying(255);

-- AddColumn avatar_url to users
ALTER TABLE "users" ADD COLUMN "avatar_url" text;

-- AddColumn gender to users
ALTER TABLE "users" ADD COLUMN "gender" character varying(20);

-- AddColumn date_of_birth to users
ALTER TABLE "users" ADD COLUMN "date_of_birth" date;

-- AddColumn auth_provider to users
ALTER TABLE "users" ADD COLUMN "auth_provider" character varying(50);

-- AddColumn last_synced_at to users
ALTER TABLE "users" ADD COLUMN "last_synced_at" timestamp with time zone;

-- CreateIndex on first_name
CREATE INDEX "idx_users_first_name" ON "users"("first_name");

-- CreateIndex on last_name
CREATE INDEX "idx_users_last_name" ON "users"("last_name");

-- CreateIndex on full_name
CREATE INDEX "idx_users_full_name" ON "users"("full_name");
