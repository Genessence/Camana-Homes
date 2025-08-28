-- AlterTable
ALTER TABLE "public"."articles" ADD COLUMN     "featuredPropertyId" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."articles" ADD CONSTRAINT "articles_featuredPropertyId_fkey" FOREIGN KEY ("featuredPropertyId") REFERENCES "public"."properties"("id") ON DELETE SET NULL ON UPDATE CASCADE;
