import React, { useState, useEffect, useMemo, useRef } from "react";
import { Heart } from "lucide-react";
import LeadModal from "@/components/ui/LeadModal";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { apiService, PropertyDetail, PropertyStats } from "../services/api";
import {
  ListingPageSkeleton,
  PropertyTitleSkeleton,
  PropertyStatsSkeleton,
  ImageGallerySkeleton,
  PropertyDetailsSkeleton,
  RightSidebarSkeleton,
  ActionButtonsSkeleton,
  PropertyDescriptionSkeleton,
  MapSkeleton,
} from "../components/PropertySkeleton";

// Image constants from Figma design
const imgNewProject91 =
  "http://localhost:3845/assets/b2ed1c6e5ecfba86f70b01788fadeaccf46f7964.png";
const img =
  "http://localhost:3845/assets/8bdd0f9006a48ba49e921731754f11cfa10eb5c7.svg";
const img2 =
  "http://localhost:3845/assets/28c724de1637d12b824e27d5a5254e8a972186d7.svg";

export default function ListingPage() {
  const { slug } = useParams<{ slug: string }>();
  const [property, setProperty] = useState<PropertyDetail | null>(null);
  const [stats, setStats] = useState<PropertyStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [tourDates, setTourDates] = useState<Array<{ date: Date; weekday: string; day: number; monthShort: string; iso: string }>>([]);
  const [selectedTourDate, setSelectedTourDate] = useState<string | null>(null);
  const dateScrollRef = useRef<HTMLDivElement | null>(null);

  const [isSaved, setIsSaved] = useState(false);

  const [leadOpen, setLeadOpen] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadLocation, setLeadLocation] = useState("");

  const openLeadModal = () => setLeadOpen(true);
  const closeLeadModal = () => {
    setLeadOpen(false);
  };
  const submitLead = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire backend submit if/when endpoint is ready
    console.log({ leadName, leadEmail, leadPhone, leadLocation, propertyId: property?.id, selectedTourDate });
    setLeadOpen(false);
  };

  const handleScrollToStats = () => {
    const target = document.getElementById("property-stats");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleScrollToInterior = () => {
    const target = document.getElementById("interior-features");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleScrollToOtherDetails = () => {
    const target = document.getElementById("other-property-details");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const openSingleImage = (url: string) => {
    setLightboxImages([url]);
    setLightboxIndex(0);
    setLightboxOpen(true);
  };

  const openAllImages = () => {
    const urls = ((property?.images || []).map((i) => i?.url).filter(Boolean) as string[]) || [];
    const withPrimary = urls.length > 0 ? urls : (property?.primary_image_url ? [property.primary_image_url] : []);
    setLightboxImages(withPrimary);
    setLightboxIndex(0);
    setGalleryOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);
  const goPrev = () => setLightboxIndex((i) => (i - 1 + lightboxImages.length) % lightboxImages.length);
  const goNext = () => setLightboxIndex((i) => (i + 1) % lightboxImages.length);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        setError(null);

        // Fetch property details and stats in parallel
        const [propertyData, statsData] = await Promise.all([
          apiService.getPropertyDetail(slug),
          apiService.getPropertyStats(slug),
        ]);

        setProperty(propertyData);
        setStats(statsData);

        // Track the view
        await apiService.trackPropertyView(slug);
      } catch (err) {
        console.error("Error fetching property data:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load property",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyData();
  }, [slug]);

  useEffect(() => {
    const now = new Date();
    const next8: Array<{ date: Date; weekday: string; day: number; monthShort: string; iso: string }> = [];
    for (let i = 0; i < 8; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() + i);
      const weekday = d.toLocaleDateString("en-US", { weekday: "long" });
      const day = d.getDate();
      const monthShort = d.toLocaleDateString("en-US", { month: "short" });
      const iso = d.toISOString().slice(0, 10);
      next8.push({ date: d, weekday, day, monthShort, iso });
    }
    setTourDates(next8);
    setSelectedTourDate(next8[0]?.iso || null);
  }, []);

  const scrollDates = (dir: "left" | "right") => {
    const el = dateScrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
  };

  // Show skeleton while loading
  if (loading) {
    return <ListingPageSkeleton />;
  }

  // Show error state
  if (error || !property) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Property Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            {error || "The property you're looking for doesn't exist."}
          </p>
          <Link
            to="/"
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header Section - Figma node 3072:11462 */}

      {/* Property ID/Reference Section */}
      <section className="max-w-[1600px] mx-auto px-12 py-6">
        {/* <div className="inline-block bg-blue-50 border border-blue-200 px-3 py-2 rounded">
          <span className="text-blue-800 text-sm font-medium">#{slug}</span>
        </div> */}
      </section>

      {/* Main Content Container */}
      <main className="max-w-[1600px] mx-auto px-12 py-6 relative">
        <div className="flex flex-col gap-5 mt-[-50px]">
          {/* Breadcrumb Navigation Section */}
          <div className="text-[18px] font-medium text-[#8c8c8c] tracking-[-0.36px] leading-[27px]">
            <Link
              to="/"
              className="text-[#8c8c8c] hover:text-[#fd2d15] transition-colors"
            >
              Homepage
            </Link>
            <span className="mx-2 text-[#8c8c8c]">{">"}</span>
            <span className="text-[#fd2d15]">Property Listings</span>
          </div>

          {/* Image Gallery Section */}
          <div className="grid grid-cols-1 lg:grid-cols-[664px_1fr] gap-4">
            {/* Main Large Image */}
            <div className="relative w-full h-[445.72px] bg-gray-200 cursor-zoom-in" onClick={() => openSingleImage(
              property.images[0]?.url || property.primary_image_url || "https://via.placeholder.com/664x446/f3f4f6/9ca3af?text=Property+Image"
            )}>
              <img
                src={
                  property.images[0]?.url ||
                  property.primary_image_url ||
                  "https://via.placeholder.com/664x446/f3f4f6/9ca3af?text=Property+Image"
                }
                alt={property.images[0]?.alt_text || "Main property image"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  e.currentTarget.src =
                    "https://via.placeholder.com/664x446/f3f4f6/9ca3af?text=Property+Image";
                }}
              />
              {/* Save button overlay */}
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setIsSaved((v) => !v); }}
                aria-pressed={isSaved}
                className="absolute bottom-4 left-4 z-10 flex items-center gap-2 px-4 py-2 bg-black/40 text-white border border-white rounded-md backdrop-blur-sm hover:bg-black/50 transition-colors"
                title={isSaved ? "Saved" : "Save"}
              >
                <Heart className="w-5 h-5" strokeWidth={2} fill={isSaved ? "currentColor" : "none"} />
                <span className="text-sm font-medium">{isSaved ? "Saved" : "Save"}</span>
              </button>
            </div>

            {/* Small Images Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-[328px_328px] gap-2">
              {/* Small Image 1 */}
              <div className="relative w-full lg:w-[328px] h-[218.86px] lg:h-[218.86px] bg-gray-200 cursor-zoom-in" onClick={() => property.images[1]?.url && openSingleImage(property.images[1].url)}>
                <img
                  src={
                    property.images[1]?.url ||
                    "https://via.placeholder.com/328x219/f3f4f6/9ca3af?text=Image+2"
                  }
                  alt={property.images[1]?.alt_text || "Property image 2"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/328x219/f3f4f6/9ca3af?text=Image+2";
                  }}
                />
              </div>

              {/* Small Image 2 */}
              <div className="relative w-full lg:w-[328px] h-[218.86px] lg:h-[218.86px] bg-gray-200 cursor-zoom-in" onClick={() => property.images[2]?.url && openSingleImage(property.images[2].url)}>
                <img
                  src={
                    property.images[2]?.url ||
                    "https://via.placeholder.com/328x219/f3f4f6/9ca3af?text=Image+3"
                  }
                  alt={property.images[2]?.alt_text || "Property image 3"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/328x219/f3f4f6/9ca3af?text=Image+3";
                  }}
                />
              </div>

              {/* Small Image 3 */}
              <div className="relative w-full lg:w-[328px] h-[218.86px] lg:h-[218.86px] bg-gray-200 cursor-zoom-in" onClick={() => property.images[3]?.url && openSingleImage(property.images[3].url)}>
                <img
                  src={
                    property.images[3]?.url ||
                    "https://via.placeholder.com/328x219/f3f4f6/9ca3af?text=Image+4"
                  }
                  alt={property.images[3]?.alt_text || "Property image 4"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/328x219/f3f4f6/9ca3af?text=Image+4";
                  }}
                />
              </div>

              {/* Small Image 4 */}
              <div className="relative w-full lg:w-[328px] h-[218.86px] lg:h-[218.86px] bg-gray-200">
                <img
                  src={
                    property.images[4]?.url ||
                    "https://via.placeholder.com/328x219/f3f4f6/9ca3af?text=Image+5"
                  }
                  alt={property.images[4]?.alt_text || "Property image 5"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/328x219/f3f4f6/9ca3af?text=Image+5";
                  }}
                />
                {/* "View All Photos" overlay */}
                <button type="button" onClick={() => window.location.href = `/listing/${slug}/gallery`} className="absolute inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center rounded-lg text-center text-white drop-shadow-lg hover:bg-white/20 transition-colors">
                  <div>
                    <div className="text-[24px] font-semibold mb-2">View All</div>
                    <div className="text-[18px]">Photos</div>
                  </div>
                </button>

              </div>
            </div>
          </div>

          {/* Action Buttons Section */}
          <div className="flex flex-wrap gap-[15px]">
            {/* Detailed Property Description Button */}
            <button className="h-[50px] px-[25px] py-[15px] bg-black text-white text-[16px] font-semibold tracking-[-0.32px] leading-[20px] hover:bg-gray-800 transition-colors">
              Detailed Property Description
            </button>

            {/* Area & lot Button */}
            <button onClick={handleScrollToStats} className="h-[50px] px-[25px] py-[15px] border border-[#d9d9d9] bg-white text-black text-[16px] font-semibold tracking-[-0.32px] leading-[20px] hover:bg-gray-50 transition-colors">
              Area & lot
            </button>

            {/* Features and amenities Button */}
            <button onClick={handleScrollToInterior} className="h-[50px] px-[25px] py-[15px] border border-[#d9d9d9] bg-white text-black text-[16px] font-semibold tracking-[-0.32px] leading-[20px] hover:bg-gray-50 transition-colors">
              Features and amenities
            </button>

            {/* Financials Button */}
            <button onClick={handleScrollToOtherDetails} className="h-[50px] px-[25px] py-[15px] border border-[#d9d9d9] bg-white text-black text-[16px] font-semibold tracking-[-0.32px] leading-[20px] hover:bg-gray-50 transition-colors">
              Financials
            </button>

            {/* Video Button */}
            <button className="h-[50px] px-[25px] py-[15px] border border-[#d9d9d9] bg-white text-black text-[16px] font-semibold tracking-[-0.32px] leading-[20px] hover:bg-gray-50 transition-colors">
              Video
            </button>

            {/* Like Button */}
            <button className="h-[50px] px-[25px] py-[15px] border border-[#d9d9d9] bg-white text-black text-[16px] font-semibold tracking-[-0.32px] leading-[20px] hover:bg-gray-50 transition-colors">
              Like
            </button>

            {/* Share Button */}
            <button className="h-[50px] px-[25px] py-[15px] border border-[#d9d9d9] bg-white text-black text-[16px] font-semibold tracking-[-0.32px] leading-[20px] hover:bg-gray-50 transition-colors">
              Share
            </button>
          </div>

          {/* Two-Column Layout: Property Details + Right Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-10">
            {/* Left Column: Property Details */}
            <div className="flex flex-col gap-6">
              {/* Title + Price + Location with tighter spacing */}
              <div className="flex flex-col gap-1.5">
                {/* Property Title */}
                <h1 className="text-[28px] lg:text-[30px] font-bold text-black leading-[1.2] tracking-[-0.56px]">
                  {property.title}
                </h1>

                {/* Property Price */}
                <div className="text-[30px] lg:text-[32px] font-bold text-black leading-[1.2] tracking-[-0.64px]">
                  {property.price_amount && property.price_amount > 0
                    ? `${property.price_currency} ${property.price_amount.toLocaleString()}`
                    : 'Price on Request'}
                </div>

                {/* Property Location */}
                <div className="flex items-center gap-2 text-[16px]">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 0C4.686 0 2 2.686 2 6c0 4 6 10 6 10s6-6 6-10c0-3.314-2.686-6-6-6zm0 9c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"
                      fill="#fd2d15"
                    />
                  </svg>
                  <span className="text-black">{property.location_label}</span>
                </div>
              </div>

              {/* Property Statistics Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4" id="property-stats">
                {/* Price per sqft */}
                <div className="bg-white border border-[#e5e5e5] p-4 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="2"
                        stroke="#666"
                        strokeWidth="2"
                      />
                      <path
                        d="M12 6v12M8 10h8"
                        stroke="#666"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className="text-center">
                    <div className="text-[14px] text-[#8c8c8c] mb-1">
                      Price per sqft
                    </div>
                    <div className="text-[16px] font-semibold text-black">
                      {property.price_per_sqft
                        ? `${property.price_currency} ${property.price_per_sqft.toLocaleString()}`
                        : "N/A"}
                    </div>
                  </div>
                </div>

                {/* Built in */}
                <div className="bg-white border border-[#e5e5e5] p-4 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
                        stroke="#666"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="text-center">
                    <div className="text-[14px] text-[#8c8c8c] mb-1">
                      Built in
                    </div>
                    <div className="text-[16px] font-semibold text-black">
                      {property.year_built || "-"}
                    </div>
                  </div>
                </div>

                {/* Property size */}
                <div className="bg-white border border-[#e5e5e5] p-4 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M3 3h18v18H3z" stroke="#666" strokeWidth="2" />
                      <path d="M3 9h18M9 21V9" stroke="#666" strokeWidth="2" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <div className="text-[14px] text-[#8c8c8c] mb-1">
                      Property size
                    </div>
                    <div className="text-[16px] font-semibold text-black">
                      {property.area_value
                        ? `${property.area_value.toLocaleString()} ${property.area_unit}`
                        : "-"}
                    </div>
                  </div>
                </div>

                {/* Property type */}
                <div className="bg-white border border-[#e5e5e5] p-4 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                        stroke="#666"
                        strokeWidth="2"
                      />
                      <polyline
                        points="9,22 9,12 15,12 15,22"
                        stroke="#666"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div className="text-center">
                    <div className="text-[14px] text-[#8c8c8c] mb-1">
                      Property type
                    </div>
                    <div className="text-[16px] font-semibold text-black">
                      {property.property_type || "-"}
                    </div>
                  </div>
                </div>

                {/* Garages */}
                <div className="bg-white border border-[#e5e5e5] p-4 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 17h2c.6 0 1-.4 1-1v-3c0-.6-.4-1-1-1h-1l-2-2V6c0-.6-.4-1-1-1H6c-.6 0-1 .4-1 1v3l-2 2H2c-.6 0-1 .4-1 1v3c0 .6.4 1 1 1h2"
                        stroke="#666"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="7"
                        cy="17"
                        r="2"
                        stroke="#666"
                        strokeWidth="2"
                      />
                      <circle
                        cx="17"
                        cy="17"
                        r="2"
                        stroke="#666"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div className="text-center">
                    <div className="text-[14px] text-[#8c8c8c] mb-1">
                      Garages
                    </div>
                    <div className="text-[16px] font-semibold text-black">
                      {property.garage_spaces || 0}
                    </div>
                  </div>
                </div>

                {/* Bedrooms */}
                <div className="bg-white border border-[#e5e5e5] p-4 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 4v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2z"
                        stroke="#666"
                        strokeWidth="2"
                      />
                      <path d="M2 8h20M6 1v6" stroke="#666" strokeWidth="2" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <div className="text-[14px] text-[#8c8c8c] mb-1">
                      Bedrooms
                    </div>
                    <div className="text-[16px] font-semibold text-black">
                      {property.bedrooms || "-"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Property Description */}
              {/* <div className="text-[16px] text-[#8c8c8c] leading-[24px]">
                {property.description || "-"}
              </div> */}

              {/* Detailed Property Description */}
              <div className="space-y-8">
                {/* Property Description Blocks */}
                <div className="space-y-4">
                  {property.description ? (
                    <p className="text-[16px] text-[#8c8c8c] leading-[24px]">
                      {property.description}
                    </p>
                  ) : (
                    <p className="text-[16px] text-[#8c8c8c] leading-[24px]">
                      No detailed description available for this property.
                    </p>
                  )}
                </div>

                {/* Property Overview Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[20px] font-bold text-black">
                      Property Overview
                    </h3>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 12L10 8L6 4"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 4v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2z"
                          stroke="#666"
                          strokeWidth="2"
                        />
                        <path d="M2 8h20M6 1v6" stroke="#666" strokeWidth="2" />
                      </svg>
                      <span className="text-[16px] text-black">
                        {property.bedrooms || "-"} Bedrooms
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M4 4h12v12H4z" stroke="#666" strokeWidth="2" />
                        <path
                          d="M4 8h12M8 20V8"
                          stroke="#666"
                          strokeWidth="2"
                        />
                        <circle
                          cx="10"
                          cy="12"
                          r="2"
                          stroke="#666"
                          strokeWidth="2"
                        />
                      </svg>
                      <span className="text-[16px] text-black">
                        {property.bathrooms || "-"} Bathrooms
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="14"
                          height="14"
                          rx="2"
                          stroke="#666"
                          strokeWidth="2"
                        />
                        <path d="M7 7h6v6H7z" stroke="#666" strokeWidth="2" />
                      </svg>
                      <span className="text-[16px] text-black">
                        {property.area_value
                          ? `${property.area_value.toLocaleString()} ${property.area_unit}`
                          : "-"}
                      </span>
                    </div>
                  </div>

                  <div className="text-[14px] text-[#8c8c8c]">
                    Last Update:{" "}
                    {property.updated_at
                      ? new Date(property.updated_at).toLocaleDateString()
                      : "-"}{" "}
                    - Views{" "}
                    {property.views_count
                      ? property.views_count.toLocaleString()
                      : "0"}{" "}
                    - Saved by {property.saves_count || "0"} - Report Listing
                  </div>
                </div>

                {/* Regulatory Information Section */}
                <div className="space-y-4">
                  <h3 className="text-[20px] font-bold text-black">
                    Regulatory information
                  </h3>
                  <div className="space-y-2">
                    <div className="flex">
                      <span className="text-[16px] text-black w-1/3">
                        Permit no.
                      </span>
                      <span className="text-[16px] text-black">
                        {property.permit_number || "-"}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-[16px] text-black w-1/3">DED</span>
                      <span className="text-[16px] text-black">
                        {property.ded_number || "-"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Additional Information Section */}
                <div className="space-y-4">
                  <h3 className="text-[20px] font-bold text-black">
                    Additional information
                  </h3>
                  <div className="flex">
                    <span className="text-[16px] text-black w-1/3">
                      MLS® ID
                    </span>
                    <span className="text-[16px] text-black">
                      {property.mls_id || "-"}
                    </span>
                  </div>
                </div>

                {/* Interior Features Section */}
                <div className="space-y-4" id="interior-features">
                  <h3 className="text-[20px] font-bold text-black">
                    Interior features
                  </h3>
                  <div className="space-y-2">
                    <div className="flex">
                      <span className="text-[16px] text-black w-1/3">
                        Total Stories
                      </span>
                      <span className="text-[16px] text-black">
                        {property.total_stories || "-"}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-[16px] text-black w-1/3">
                        Bedrooms
                      </span>
                      <span className="text-[16px] text-black">
                        {property.bedrooms || "-"}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-[16px] text-black w-1/3">
                        Total Bathrooms
                      </span>
                      <span className="text-[16px] text-black">
                        {property.bathrooms || "-"}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-[16px] text-black w-1/3">
                        Full Bathrooms
                      </span>
                      <span className="text-[16px] text-black">
                        {property.full_bathrooms || "-"}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-[16px] text-black w-1/3">
                        Half Bathrooms
                      </span>
                      <span className="text-[16px] text-black">
                        {property.half_bathrooms || "-"}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-[16px] text-black w-1/3">
                        Interior Features
                      </span>
                      <span className="text-[16px] text-black flex-1">
                        {property.interior_features &&
                        property.interior_features.length > 0
                          ? property.interior_features.join(", ")
                          : property.indoor_features &&
                              property.indoor_features.length > 0
                            ? property.indoor_features.join(", ")
                            : "-"}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-[16px] text-black w-1/3">
                        Appliances
                      </span>
                      <span className="text-[16px] text-black flex-1">
                        {property.appliances && property.appliances.length > 0
                          ? property.appliances.join(", ")
                          : "-"}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-[16px] text-black w-1/3">
                        Floor Description
                      </span>
                      <span className="text-[16px] text-black flex-1">
                        {property.floor_description || "-"}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-[16px] text-black w-1/3">
                        Fireplace
                      </span>
                      <span className="text-[16px] text-black">
                        {property.fireplace ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-[16px] text-black w-1/3">
                        Fireplace Description
                      </span>
                      <span className="text-[16px] text-black flex-1">
                        {property.fireplace_description || "-"}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-[16px] text-black w-1/3">
                        Cooling
                      </span>
                      <span className="text-[16px] text-black">
                        {property.cooling ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-[16px] text-black w-1/3">
                        Cooling Description
                      </span>
                      <span className="text-[16px] text-black flex-1">
                        {property.cooling_description || "-"}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-[16px] text-black w-1/3">
                        Heating
                      </span>
                      <span className="text-[16px] text-black">
                        {property.heating ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-[16px] text-black w-1/3">
                        Heating Description
                      </span>
                      <span className="text-[16px] text-black flex-1">
                        {property.heating_description || "-"}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-[16px] text-black w-1/3">
                        Basement
                      </span>
                      <span className="text-[16px] text-black">
                        {property.basement ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Exterior Features Section */}
                <div className="space-y-4">
                  <h3 className="text-[20px] font-bold text-black">
                    Exterior features
                  </h3>
                  <div className="space-y-2">
                    <div className="flex">
                      <span className="text-[16px] text-black w-1/3">
                        Lot Size
                      </span>
                      <span className="text-[16px] text-black">
                        {property.lot_size || "-"}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-[16px] text-black w-1/3">
                        Exterior Features
                      </span>
                      <span className="text-[16px] text-black flex-1">
                        {property.exterior_features &&
                        property.exterior_features.length > 0
                          ? property.exterior_features.join(", ")
                          : property.outdoor_features &&
                              property.outdoor_features.length > 0
                            ? property.outdoor_features.join(", ")
                            : "-"}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-[16px] text-black w-1/3">
                        Lot Features
                      </span>
                      <span className="text-[16px] text-black">
                        {property.lot_features || "-"}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-[16px] text-black w-1/3">
                        Sewer
                      </span>
                      <span className="text-[16px] text-black">
                        {property.sewer || "-"}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-[16px] text-black w-1/3">
                        Patio And Porch
                      </span>
                      <span className="text-[16px] text-black">
                        {property.patio_porch || "-"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* School Information Section */}
                <div className="space-y-4">
                  <h3 className="text-[20px] font-bold text-black">
                    School information
                  </h3>
                  <div className="space-y-2">
                    <div className="flex">
                      <span className="text-[16px] text-black w-1/3">
                        High School
                      </span>
                      <span className="text-[16px] text-black">
                        {property.high_school || "-"}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-[16px] text-black w-1/3">
                        Elementary School
                      </span>
                      <span className="text-[16px] text-black">
                        {property.elementary_school || "-"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Other Property Details Section */}
                <div className="space-y-4" id="other-property-details">
                  <h3 className="text-[20px] font-bold text-black">
                    Other property details
                  </h3>
                  <div className="space-y-2">
                    <div className="flex">
                      <span className="text-[16px] text-black w-1/3">
                        Taxes
                      </span>
                      <span className="text-[16px] text-black">
                        {property.taxes || "-"}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-[16px] text-black w-1/3">
                        Tax Frequency
                      </span>
                      <span className="text-[16px] text-black">
                        {property.tax_frequency || "-"}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-[16px] text-black w-1/3">
                        Days on Market
                      </span>
                      <span className="text-[16px] text-black">
                        {property.days_on_market || "-"}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-[16px] text-black w-1/3">
                        Accessibility
                      </span>
                      <span className="text-[16px] text-black">
                        {property.accessibility || "-"}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-[16px] text-black w-1/3">
                        Garage
                      </span>
                      <span className="text-[16px] text-black">
                        {property.garage ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-[16px] text-black w-1/3">
                        Garage Spaces
                      </span>
                      <span className="text-[16px] text-black">
                        {property.garage_spaces || "-"}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-[16px] text-black w-1/3">
                        Parking
                      </span>
                      <span className="text-[16px] text-black">
                        {property.parking || "-"}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-[16px] text-black w-1/3">
                        Parking Total
                      </span>
                      <span className="text-[16px] text-black">
                        {property.parking_total || "-"}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-[16px] text-black w-1/3">View</span>
                      <span className="text-[16px] text-black">
                        {property.view || "-"}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-[16px] text-black w-1/3">
                        County
                      </span>
                      <span className="text-[16px] text-black">
                        {property.county || "-"}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-[16px] text-black w-1/3">
                        Water Source
                      </span>
                      <span className="text-[16px] text-black">
                        {property.water_source || "-"}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-[16px] text-black w-1/3">
                        New Construction
                      </span>
                      <span className="text-[16px] text-black">
                        {property.new_construction ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-[16px] text-black w-1/3">Pool</span>
                      <span className="text-[16px] text-black">
                        {property.pool ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-[16px] text-black w-1/3">
                        Pool Features
                      </span>
                      <span className="text-[16px] text-black">
                        {property.pool_features || "-"}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-[16px] text-black w-1/3">
                        Utilities
                      </span>
                      <span className="text-[16px] text-black">
                        {property.utilities && property.utilities.length > 0
                          ? property.utilities.join(", ")
                          : "-"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Sidebar */}
            <div className="lg:sticky lg:top-10 lg:self-start">
              {/* Agent/Developer Card */}
              <div className="bg-[#f8f8f8] p-4 rounded-lg mb-4 flex items-center gap-3">
                <div className="w-[56px] h-[56px] rounded-full overflow-hidden bg-white flex items-center justify-center">
                  <img
                    src={property.agent?.avatar_url || property.developer_logo_url || "https://via.placeholder.com/112x112/f3f4f6/9ca3af?text=Logo"}
                    alt={property.agent?.name || property.developer || "Developer"}
                    className={property.agent?.avatar_url ? "w-full h-full object-cover" : "w-[36px] h-[36px] object-contain"}
                    onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/112x112/f3f4f6/9ca3af?text=Logo"; }}
                  />
                </div>
                <div className="flex flex-col">
                  <div className="text-[18px] font-bold text-black">
                    {property.agent?.name || "Direct from Developer"}
                  </div>
                  <div className="text-[14px] text-[#8c8c8c]">
                    {property.agent?.agency?.name || property.developer || ""}
                  </div>
                </div>
              </div>
              {/* Top Action Buttons */}
              <div className="flex gap-3 mb-6">
                <button onClick={openLeadModal} className="h-[50px] px-[25px] py-[15px] bg-black text-white text-[16px] font-semibold tracking-[-0.32px] leading-[20px] hover:bg-gray-800 transition-colors">
                  Book the Tour
                </button>
                <button onClick={openLeadModal} className="h-[50px] px-[25px] py-[15px] bg-black text-white text-[16px] font-semibold tracking-[-0.32px] leading-[20px] hover:bg-gray-800 transition-colors">
                  Contact Agent
                </button>
              </div>

              {/* Request a Tour Sidebar */}
              <div className="bg-[#f8f8f8] p-6 rounded-lg">
                {/* Sidebar Title */}
                <h3 className="text-[20px] font-bold text-black mb-6">
                  Request a Tour
                </h3>

                {/* Date Selection */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <button
                      className="p-2 hover:bg-gray-200 rounded transition-colors"
                      title="Previous dates"
                      aria-label="Navigate to previous dates"
                      onClick={() => scrollDates("left")}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 12L6 8L10 4"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <div ref={dateScrollRef} className="flex gap-2 overflow-x-auto no-scrollbar">
                      {tourDates.map((d) => (
                        <button
                          key={d.iso}
                          type="button"
                          onClick={() => setSelectedTourDate(d.iso)}
                          className={`bg-white p-3 rounded border min-w-[80px] text-center ${selectedTourDate === d.iso ? 'border-black' : 'border-[#e5e5e5]'}`}
                          aria-pressed={selectedTourDate === d.iso}
                        >
                          <div className="text-[12px] text-[#8c8c8c] mb-1">{d.weekday}</div>
                          <div className="text-[18px] font-bold text-black">{d.day}</div>
                          <div className="text-[12px] text-[#8c8c8c]">{d.monthShort}</div>
                        </button>
                      ))}
                    </div>
                    <button
                      className="p-2 hover:bg-gray-200 rounded transition-colors"
                      title="Next dates"
                      aria-label="Navigate to next dates"
                      onClick={() => scrollDates("right")}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 12L10 8L6 4"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Time Selection */}
                <div className="mb-6">
                  <label className="block text-[14px] font-medium text-black mb-2">
                    Choose a time
                  </label>
                  <div className="relative">
                    <select
                      className="w-full h-[50px] px-4 py-2 border border-[#d9d9d9] bg-white text-black text-[16px] font-medium appearance-none rounded"
                      title="Select tour time"
                      aria-label="Select tour time"
                    >
                      <option>Select</option>
                      <option>9:00 AM</option>
                      <option>10:00 AM</option>
                      <option>11:00 AM</option>
                      <option>12:00 PM</option>
                      <option>1:00 PM</option>
                      <option>2:00 PM</option>
                      <option>3:00 PM</option>
                      <option>4:00 PM</option>
                      <option>5:00 PM</option>
                    </select>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg
                        width="12"
                        height="8"
                        viewBox="0 0 12 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 1L6 6L11 1"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Continue Button */}
                <button onClick={openLeadModal} className="w-full h-[50px] bg-black text-white text-[16px] font-semibold tracking-[-0.32px] leading-[20px] hover:bg-gray-800 transition-colors rounded">
                  Continue
                </button>
              </div>

              {/* Mortgage Calculator Section */}
              <div className="bg-[#f8f8f8] p-6 rounded-lg mt-6">
                {/* Calculator Title */}
                <h3 className="text-[20px] font-bold text-black mb-6">
                  Mortgage Calculator
                </h3>

                {/* Content sum insured */}
                <div className="mb-4">
                  <label className="block text-[14px] font-medium text-black mb-2">
                    Content sum insured
                  </label>
                  <div className="relative">
                    <select
                      className="w-full h-[50px] px-4 py-2 border border-[#d9d9d9] bg-white text-black text-[16px] font-medium appearance-none rounded"
                      title="Select content sum insured"
                      aria-label="Select content sum insured"
                    >
                      <option>$2,00,000</option>
                      <option>$3,00,000</option>
                      <option>$4,00,000</option>
                      <option>$5,00,000</option>
                    </select>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg
                        width="12"
                        height="8"
                        viewBox="0 0 12 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 1L6 6L11 1"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="mb-4">
                  <label className="block text-[14px] font-medium text-black mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <select
                      className="w-full h-[50px] px-4 py-2 border border-[#d9d9d9] bg-white text-black text-[16px] font-medium appearance-none rounded"
                      title="Select location"
                      aria-label="Select location"
                    >
                      <option>Los Angels</option>
                      <option>New York</option>
                      <option>Chicago</option>
                      <option>Houston</option>
                    </select>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg
                        width="12"
                        height="8"
                        viewBox="0 0 12 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 1L6 6L11 1"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Your age */}
                <div className="mb-6">
                  <label className="block text-[14px] font-medium text-black mb-2">
                    Your age
                  </label>
                  <div className="relative">
                    <select
                      className="w-full h-[50px] px-4 py-2 border border-[#d9d9d9] bg-white text-black text-[16px] font-medium appearance-none rounded"
                      title="Select your age"
                      aria-label="Select your age"
                    >
                      <option>52</option>
                      <option>45</option>
                      <option>60</option>
                      <option>35</option>
                    </select>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg
                        width="12"
                        height="8"
                        viewBox="0 0 12 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 1L6 6L11 1"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Continue Button */}
                <button className="w-full h-[50px] bg-black text-white text-[16px] font-semibold tracking-[-0.32px] leading-[20px] hover:bg-gray-800 transition-colors rounded">
                  Continue
                </button>
              </div>
            </div>
          </div>

          {/* Property Location Section */}
          <div className="space-y-6">
            <h3 className="text-[20px] font-bold text-black">
              <span className="text-black">Property </span>
              <span className="text-[#fd2d15]">Location</span>
            </h3>

            {/* Map Component - Based on Figma design specifications */}
            <div className="w-[900px] h-[400px] bg-gray-100 rounded-lg relative overflow-hidden">
              {/* Map container with exact dimensions from Figma */}
              <div
                className="w-full h-full bg-center bg-cover bg-no-repeat relative"
                style={{
                  backgroundImage: `url('http://localhost:3845/assets/bddb111f0130e4f6b9858d9de64c7144826178be.png')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Property Location Pin - positioned according to Figma specs */}
                <div
                  className="absolute"
                  style={{
                    left: "102.55px",
                    top: "111.41px",
                    width: "14.342px",
                    height: "17.416px",
                  }}
                >
                  <img
                    src="http://localhost:3845/assets/26a2b0516ab00526400fbb296a8b9aa0475d2408.svg"
                    alt="Property Location Pin"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Map overlay text */}
                <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 px-3 py-2 rounded text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#fd2d15] rounded-full"></div>
                    <span className="font-medium">Property Location</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Lightbox Modal (single image or next/prev) */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center" onClick={closeLightbox}>
          <div className="relative max-w-[90vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightboxImages[lightboxIndex]}
              alt="Property"
              style={{ width: "auto", height: "auto", maxWidth: "90vw", maxHeight: "90vh" }}
              className="object-contain"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <button aria-label="Close" className="absolute -top-10 right-0 text-white text-2xl" onClick={closeLightbox}>×</button>
            {lightboxImages.length > 1 && (
              <>
                <button aria-label="Previous" className="absolute left-[-48px] top-1/2 -translate-y-1/2 text-white text-3xl" onClick={goPrev}>‹</button>
                <button aria-label="Next" className="absolute right-[-48px] top-1/2 -translate-y-1/2 text-white text-3xl" onClick={goNext}>›</button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Gallery Modal (grid of all images) */}
      {galleryOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center" onClick={() => setGalleryOpen(false)}>
          <div className="relative w-[92vw] max-w-[1200px] max-h-[90vh] bg-black/0" onClick={(e) => e.stopPropagation()}>
            <button aria-label="Close" className="absolute -top-10 right-0 text-white text-2xl" onClick={() => setGalleryOpen(false)}>×</button>
            <div className="overflow-y-auto max-h-[90vh] p-2">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {lightboxImages.map((url, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="bg-black/20"
                    onClick={() => { setGalleryOpen(false); openSingleImage(url); }}
                    aria-label={`Open image ${idx + 1}`}
                  >
                    <img
                      src={url}
                      alt={`Property ${idx + 1}`}
                      className="w-full h-auto object-contain"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <LeadModal
        open={leadOpen}
        onOpenChange={setLeadOpen}
        onSubmit={submitLead}
        leadName={leadName}
        setLeadName={setLeadName}
        leadEmail={leadEmail}
        setLeadEmail={setLeadEmail}
        leadPhone={leadPhone}
        setLeadPhone={setLeadPhone}
        leadLocation={leadLocation}
        setLeadLocation={setLeadLocation}
      />
    </div>
  );
}

// LeadModal component moved to reusable component in components/ui/LeadModal
