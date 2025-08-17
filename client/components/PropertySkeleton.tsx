import React from "react";

// Skeleton loading components for Listing Page

export const PropertyTitleSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
    <div className="h-10 bg-gray-200 rounded w-1/2 mb-4"></div>
    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
  </div>
);

export const PropertyStatsSkeleton = () => (
  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 animate-pulse">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="bg-white border border-[#e5e5e5] p-4 rounded-lg">
        <div className="flex items-center justify-center mb-2">
          <div className="w-6 h-6 bg-gray-200 rounded"></div>
        </div>
        <div className="text-center">
          <div className="h-4 bg-gray-200 rounded w-20 mx-auto mb-1"></div>
          <div className="h-5 bg-gray-200 rounded w-16 mx-auto"></div>
        </div>
      </div>
    ))}
  </div>
);

export const ImageGallerySkeleton = () => (
  <div className="animate-pulse">
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      {/* Main large image */}
      <div className="lg:col-span-2 lg:row-span-2">
        <div className="w-full h-[600px] bg-gray-200 rounded-lg"></div>
      </div>
      {/* Small images */}
      {[...Array(3)].map((_, i) => (
        <div key={i} className="w-full h-[287px] bg-gray-200 rounded-lg"></div>
      ))}
    </div>
  </div>
);

export const PropertyDetailsSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    {[...Array(4)].map((_, sectionIndex) => (
      <div key={sectionIndex} className="space-y-4">
        <div className="h-6 bg-gray-200 rounded w-48"></div>
        <div className="space-y-3">
          {[...Array(6)].map((_, itemIndex) => (
            <div key={itemIndex} className="flex">
              <div className="w-1/3 h-4 bg-gray-200 rounded"></div>
              <div className="flex-1 h-4 bg-gray-200 rounded ml-4"></div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export const RightSidebarSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-white border border-[#e5e5e5] rounded-lg p-6 space-y-4">
      {/* Agent info */}
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
          <div className="h-3 bg-gray-200 rounded w-32"></div>
        </div>
      </div>

      {/* Contact form */}
      <div className="space-y-3">
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-20 bg-gray-200 rounded"></div>
        <div className="h-12 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
);

export const ActionButtonsSkeleton = () => (
  <div className="flex flex-wrap gap-[15px] animate-pulse">
    {[...Array(7)].map((_, i) => (
      <div key={i} className="h-[50px] w-32 bg-gray-200 rounded"></div>
    ))}
  </div>
);

export const PropertyDescriptionSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-48"></div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      <div className="h-4 bg-gray-200 rounded w-4/5"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    </div>
  </div>
);

export const MapSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
    <div className="w-full h-[400px] bg-gray-200 rounded-lg"></div>
  </div>
);

// Main skeleton for the entire page
export const ListingPageSkeleton = () => (
  <div className="bg-white min-h-screen">
    {/* Header skeleton */}
    <div className="border-b border-gray-200 bg-white">
      <div className="h-[46px] bg-gray-200"></div>
      <div className="max-w-[1600px] mx-auto px-4 lg:px-[70px] h-[66px] flex items-center justify-between">
        <div className="h-8 bg-gray-200 rounded w-32"></div>
        <div className="h-8 bg-gray-200 rounded w-24"></div>
      </div>
    </div>

    {/* Main content skeleton */}
    <div className="max-w-[1600px] mx-auto px-4 lg:px-[70px] py-8">
      {/* Breadcrumb skeleton */}
      <div className="mb-8 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-64"></div>
      </div>

      {/* Image gallery skeleton */}
      <ImageGallerySkeleton />

      {/* Action buttons skeleton */}
      <div className="mt-8">
        <ActionButtonsSkeleton />
      </div>

      {/* Two column layout skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-10 mt-8">
        {/* Left column */}
        <div className="space-y-8">
          <PropertyTitleSkeleton />
          <PropertyStatsSkeleton />
          <PropertyDetailsSkeleton />
          <PropertyDescriptionSkeleton />
          <MapSkeleton />
        </div>

        {/* Right sidebar */}
        <div>
          <RightSidebarSkeleton />
        </div>
      </div>
    </div>
  </div>
);
