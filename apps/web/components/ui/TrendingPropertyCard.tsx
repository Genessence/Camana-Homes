import React from "react";
import type { PropertyCard } from "@shared/api.types";
import { Link } from "react-router-dom";
import { Eye, Bed, Bath, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TrendingPropertyCardProps {
  property: PropertyCard;
  className?: string;
  imageHeightClass?: string; // e.g. "h-[240px]", defaults to 240px
  showVirtualTourBadge?: boolean;
  showVideoBadge?: boolean;
  showContactCta?: boolean;
  compact?: boolean; // For smaller cards like in ArticleV2
}

const DEFAULT_IMAGE_HEIGHT = "h-[240px]";

export const TrendingPropertyCard: React.FC<TrendingPropertyCardProps> = ({
  property: p,
  className,
  imageHeightClass = DEFAULT_IMAGE_HEIGHT,
  showVirtualTourBadge = true,
  showVideoBadge = false,
  showContactCta = false,
  compact = false,
}) => {
  // Handle different data structures and provide fallbacks
  const viewsCount = p.views_count || 0;
  const hasValidViews = !isNaN(viewsCount) && viewsCount > 0;
  
  // Handle different property data structures
  const propertyData = p as any;
  const imageUrl = propertyData.primary_image_url || propertyData.image_url || "";
  const priceAmount = propertyData.price_amount || 0;
  const priceCurrency = propertyData.price_currency || "USD";
  const propertyType = propertyData.property_type || "";
  const locationLabel = propertyData.location_label || "";
  const bedrooms = propertyData.bedrooms || 0;
  const bathrooms = propertyData.bathrooms || 0;
  const areaValue = propertyData.area_value || "";
  const areaUnit = propertyData.area_unit || "";
  const developer = propertyData.developer || "";
  const developerLogoUrl = propertyData.developer_logo_url || "";
  
  // Format price safely
  const formattedPrice = priceAmount && priceAmount > 0
    ? new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: priceCurrency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(priceAmount)
    : "Price on Request";

  return (
    <Link
      to={`/listing/${p.slug}`}
      className={cn(
        "w-full bg-white border-[8px] border-white block overflow-hidden shadow hover:shadow-lg transition-shadow",
        compact && "border-[4px]", // Smaller border for compact cards
        className
      )}
    >
      <div className={cn("relative w-full overflow-hidden", imageHeightClass)}>
        <img src={imageUrl} alt={p.title} className="w-full h-full object-cover" />
        <div className="absolute top-[10px] left-[9px] flex gap-[10px]">
          {hasValidViews && (
            <div className="flex items-center gap-[6px] px-[9.681px] py-[8.471px] border border-white bg-black/10 backdrop-blur-[8px]">
              <Eye className="w-[18px] h-[18px] text-white" />
              <span className="text-white font-dm-sans text-[13.391px] font-medium leading-[17.14px]">
                {new Intl.NumberFormat().format(viewsCount)}
              </span>
            </div>
          )}
          {showVideoBadge && propertyData.has_video && (
            <div className="px-[9.681px] py-[8.471px] border border-white bg-black/10 backdrop-blur-[8px] text-white font-dm-sans text-[13.391px] font-medium leading-[17.14px]">
              Video
            </div>
          )}
          {showVirtualTourBadge && propertyData.has_virtual_tour && (
            <div className="px-[9.681px] py-[8.471px] border border-white bg-black/10 backdrop-blur-[8px] text-white font-dm-sans text-[13.391px] font-medium leading-[17.14px]">
              Virtual Tours
            </div>
          )}
        </div>
      </div>
      <div className={cn("flex flex-col gap-[11px]", compact ? "p-3" : "p-4")}>
        <div className="flex items-center justify-between">
          <div className={cn(
            "font-dm-sans font-semibold text-black",
            compact ? "text-[18px] leading-[22px]" : "text-[23.607px] leading-[28.328px] tracking-[-0.472px]"
          )}>
            {formattedPrice}
          </div>
          <div className="flex items-center gap-[5px]">
            {showContactCta && (
              <span className="font-dm-sans text-[14px] font-semibold text-black">Contact Agent</span>
            )}
            <ArrowRight className="w-[10px] h-[5px] text-[#999] transform -rotate-90" />
          </div>
        </div>
        <h3 className={cn(
          "font-dm-sans font-bold text-black",
          compact ? "text-[16px] leading-[20px]" : "text-[17.705px] leading-[21.246px] tracking-[-0.354px]"
        )}>
          {p.title}
        </h3>
        <div className="flex items-center gap-[10px] text-[12.8px] font-normal text-black">
          {propertyType && <span>{propertyType}</span>}
          {propertyType && locationLabel && <span>|</span>}
          {locationLabel && <span>{locationLabel}</span>}
          {(bedrooms || bathrooms) && <span>|</span>}
          {bedrooms > 0 && (
            <div className="flex items-center gap-[2px]">
              <Bed className="w-[17.705px] h-[17.705px]" />
              <span className="font-plus-jakarta text-[11.803px] leading-[17.705px] tracking-[-0.236px]">
                {bedrooms}
              </span>
            </div>
          )}
          {bathrooms > 0 && (
            <div className="flex items-center gap-[2px]">
              <Bath className="w-[17.705px] h-[17.705px]" />
              <span className="font-plus-jakarta text-[11.803px] leading-[17.705px] tracking-[-0.236px]">
                {bathrooms}
              </span>
            </div>
          )}
          {(areaValue && areaUnit) && (
            <>
              <span>|</span>
              <span>Area: {areaValue} {areaUnit}</span>
            </>
          )}
        </div>
        <div className="h-[1px] bg-gray-light"></div>
        <div className="flex items-center justify-between">
          {p.agent ? (
            <div className="flex items-center gap-[5px]">
              <img
                src={p.agent?.avatar_url || "https://api.builder.io/api/v1/image/assets/TEMP/21584c4a5fb695a4f53c9f609c46424507f3b08c?width=98"}
                alt={p.agent?.name || "Agent"}
                className="w-[49px] h-[49px] rounded-full"
              />
              <div>
                <div className="font-dm-sans text-[16px] font-semibold italic text-black">{p.agent?.name}</div>
                <div className="font-dm-sans text-[12px] font-normal italic text-[#666]">{p.agent?.agency?.name}</div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-[5px]">
              <img
                src={developerLogoUrl || "https://via.placeholder.com/98x98/f3f4f6/9ca3af?text=Dev"}
                alt={developer || "Developer"}
                className="w-[49px] h-[49px] rounded-full object-contain bg-white"
              />
              <div>
                <div className="font-dm-sans text-[16px] font-semibold italic text-black">
                  {developer ? `By ${developer}` : "Direct from Developer"}
                </div>
                <div className="font-dm-sans text-[12px] font-normal italic text-[#666]">
                  {developer || "Developer"}
                </div>
              </div>
            </div>
          )}
          {p.agent?.agency?.logo_url ? (
            <img src={p.agent.agency.logo_url} alt="Company Logo" className="w-[73px] h-[26px]" />
          ) : null}
        </div>
      </div>
    </Link>
  );
};

export default TrendingPropertyCard;
