/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `agents` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."agents" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "instagramUrl" TEXT,
ADD COLUMN     "licenseNumber" TEXT,
ADD COLUMN     "linkedinUrl" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "slug" TEXT,
ADD COLUMN     "websiteUrl" TEXT,
ADD COLUMN     "youtubeUrl" TEXT;

-- AlterTable
ALTER TABLE "public"."properties" ADD COLUMN     "developerLogoUrl" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "agents_slug_key" ON "public"."agents"("slug");
