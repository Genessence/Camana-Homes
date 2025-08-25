-- CreateTable
CREATE TABLE "public"."agencies" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "logoUrl" TEXT,

    CONSTRAINT "agencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."agents" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "phoneNumber" TEXT,
    "email" TEXT,
    "agencyId" INTEGER,

    CONSTRAINT "agents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."properties" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "priceAmount" DECIMAL(65,30) NOT NULL,
    "priceCurrency" TEXT NOT NULL,
    "pricePerSqft" DECIMAL(65,30),
    "propertyType" TEXT NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "areaValue" INTEGER NOT NULL,
    "areaUnit" TEXT NOT NULL,
    "locationLabel" TEXT NOT NULL,
    "totalStories" INTEGER,
    "fullBathrooms" INTEGER,
    "halfBathrooms" INTEGER,
    "lotSize" TEXT,
    "permitNumber" TEXT,
    "dedNumber" TEXT,
    "mlsId" TEXT,
    "interiorFeatures" JSONB,
    "appliances" JSONB,
    "floorDescription" TEXT,
    "fireplace" BOOLEAN,
    "fireplaceDescription" TEXT,
    "cooling" BOOLEAN,
    "coolingDescription" TEXT,
    "heating" BOOLEAN,
    "heatingDescription" TEXT,
    "basement" BOOLEAN,
    "exteriorFeatures" JSONB,
    "lotFeatures" TEXT,
    "sewer" TEXT,
    "patioPorch" TEXT,
    "highSchool" TEXT,
    "elementarySchool" TEXT,
    "taxes" TEXT,
    "taxFrequency" TEXT,
    "daysOnMarket" INTEGER,
    "accessibility" TEXT,
    "garage" BOOLEAN,
    "garageSpaces" INTEGER,
    "parking" TEXT,
    "parkingTotal" INTEGER,
    "view" TEXT,
    "county" TEXT,
    "waterSource" TEXT,
    "newConstruction" BOOLEAN,
    "pool" BOOLEAN,
    "poolFeatures" TEXT,
    "utilities" JSONB,
    "outdoorFeatures" JSONB,
    "indoorFeatures" JSONB,
    "viewDescription" TEXT,
    "yearBuilt" INTEGER,
    "description" TEXT,
    "savesCount" INTEGER NOT NULL DEFAULT 0,
    "completionDate" TEXT,
    "paymentOptions" TEXT,
    "keyAmenities" JSONB,
    "locationDistances" JSONB,
    "developer" TEXT,
    "hasVideo" BOOLEAN NOT NULL DEFAULT false,
    "hasVirtualTour" BOOLEAN NOT NULL DEFAULT false,
    "viewsCount" INTEGER NOT NULL DEFAULT 0,
    "trendingScore" INTEGER NOT NULL DEFAULT 0,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "agentId" INTEGER,

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."property_images" (
    "id" SERIAL NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "altText" TEXT,

    CONSTRAINT "property_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."hero_slides" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "title" TEXT,
    "subtitle" TEXT,
    "propertyId" INTEGER,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "hero_slides_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tour_requests" (
    "id" SERIAL NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "visitorName" TEXT NOT NULL,
    "visitorEmail" TEXT NOT NULL,
    "visitorPhone" TEXT,
    "preferredDate" TIMESTAMP(3) NOT NULL,
    "preferredTime" TEXT NOT NULL,
    "message" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tour_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."mortgage_inquiries" (
    "id" SERIAL NOT NULL,
    "propertyId" INTEGER,
    "inquirerName" TEXT NOT NULL,
    "inquirerEmail" TEXT NOT NULL,
    "inquirerPhone" TEXT,
    "contentSumInsured" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "message" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mortgage_inquiries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."articles" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT,
    "imageUrl" TEXT NOT NULL,
    "category" TEXT,
    "authorName" TEXT,
    "authorAvatarUrl" TEXT,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorBio" TEXT,
    "authorWebsiteUrl" TEXT,
    "authorInstagramUrl" TEXT,
    "authorLinkedinUrl" TEXT,
    "authorYoutubeUrl" TEXT,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."recently_viewed" (
    "id" SERIAL NOT NULL,
    "visitorId" TEXT NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "viewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recently_viewed_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "properties_slug_key" ON "public"."properties"("slug");

-- CreateIndex
CREATE INDEX "properties_trendingScore_idx" ON "public"."properties"("trendingScore");

-- CreateIndex
CREATE UNIQUE INDEX "articles_slug_key" ON "public"."articles"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "recently_viewed_visitorId_propertyId_key" ON "public"."recently_viewed"("visitorId", "propertyId");

-- AddForeignKey
ALTER TABLE "public"."agents" ADD CONSTRAINT "agents_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "public"."agencies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."properties" ADD CONSTRAINT "properties_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "public"."agents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."property_images" ADD CONSTRAINT "property_images_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "public"."properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."hero_slides" ADD CONSTRAINT "hero_slides_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "public"."properties"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tour_requests" ADD CONSTRAINT "tour_requests_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "public"."properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."recently_viewed" ADD CONSTRAINT "recently_viewed_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "public"."properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;
