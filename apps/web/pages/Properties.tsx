import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  Eye,
  Heart,
  Bed,
  Bath,
  MapPin,
  Menu,
  ArrowLeft,
  ArrowRight,
  Filter,
  Search,
} from "lucide-react";
import { propertiesApiService, PropertyListingFilters } from "../services/propertiesApi";
import type { PropertyCard } from "../services/propertiesApi";

// Types for the component
interface PaginationInfo {
  current_page: number;
  total_pages: number;
  total_count: number;
  limit: number;
  has_next: boolean;
  has_prev: boolean;
}

const Properties = () => {
  const [properties, setProperties] = useState<PropertyCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationInfo>({
    current_page: 1,
    total_pages: 1,
    total_count: 0,
    limit: 12,
    has_next: false,
    has_prev: false,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyType, setPropertyType] = useState("Buy");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Fetch properties from API
  const fetchProperties = useCallback(
    async (page: number = 1) => {
      setLoading(true);
      setError(null);

      try {
        const filters: PropertyListingFilters = {
          search: searchQuery || undefined,
          // Don't filter by property_type for now to see all properties
          // property_type: propertyType === "Buy" ? "sale" : propertyType === "Rent" ? "rent" : undefined,
          sort_by: sortBy as any,
          sort_order: sortOrder,
        };

        console.log("Fetching properties with filters:", filters);
        const response = await propertiesApiService.getProperties(
          page,
          12,
          filters,
        );
        console.log("API Response:", response);
        console.log("Properties count:", response.properties.length);
        setProperties(response.properties);
        setPagination(response.pagination);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to load properties. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [searchQuery, propertyType, sortBy, sortOrder],
  );

  // Load properties on component mount and when filters change
  useEffect(() => {
    fetchProperties(currentPage);
  }, [fetchProperties, currentPage]);

  // Handle search
  const handleSearch = () => {
    setCurrentPage(1);
    fetchProperties(1);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-4 lg:px-[70px] py-[30px]">
        {/* Search Section */}
        <div className="mb-[30px]">
          {/* Search Bar */}
          <div className="mb-5">
            <div className="flex items-center border-b border-[#cacaca] h-14 px-4">
              <input
                type="text"
                placeholder="Search By location (Country, State, City)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 font-dm-sans text-[18px] font-medium text-[#848484] bg-transparent outline-none"
              />
              <Search className="w-7 h-7 text-[#848484]" />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="w-full">
            <div className="w-full flex justify-center items-center">
              
              {/* Buy/Rent Toggle */}
              <div className="flex mr-[10px] flex-[1]">
                <button
                  className={`h-[50px] w-1/2 px-[21px] py-[8px] font-dm-sans text-[17px] font-medium transition-colors border border-black rounded-l ${
                    propertyType === "Buy"
                      ? "bg-black text-white"
                      : "bg-transparent text-black hover:bg-black hover:text-white"
                  }`}
                  onClick={() => setPropertyType("Buy")}
                  style={{ borderRight: "none" }}
                >
                  Buy
                </button>
                <button
                  className={`h-[50px] w-1/2 px-[21px] py-[8px] font-dm-sans text-[17px] font-medium transition-colors border border-black rounded-r ${
                    propertyType === "Rent"
                      ? "bg-black text-white"
                      : "bg-transparent text-black hover:bg-black hover:text-white"
                  }`}
                  onClick={() => setPropertyType("Rent")}
                >
                  Rent
                </button>
              </div>

              {/* Individual Filter Buttons */}
              <div className="flex mr-[10px] flex-[2]">
                {["Type", "Price", "Beds", "Filters"].map((filter) => (
                  <button
                    key={filter}
                    className="h-[50px] w-full px-[21px] py-[8px] bg-transparent text-black border border-black font-dm-sans text-[17px] font-medium hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2"
                  >
                    {filter}
                    {filter === "Filters" && <Filter className="w-4 h-4" />}
                  </button>
                ))}
              </div>

              {/* Search Button */}
              <div className="flex flex-[1]">
                <button
                  onClick={handleSearch}
                  className="h-[50px] w-full px-[21px] py-[8px] bg-black text-white font-dm-sans text-[17px] font-medium hover:bg-gray-800 transition-colors"
                >
                  Search
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Breadcrumb and Title */}
        <div className="mb-[30px]">
          <div className="mb-5">
            <div className="font-dm-sans text-[18px] font-medium text-[#8c8c8c] tracking-[-0.36px]">
              Home {">"}{" "}
              <span className="text-[#fd2d15]">Search: Luxury homes</span>
            </div>
          </div>

          <div className="mb-5">
            <h1 className="font-dm-sans text-[35px] font-semibold text-black leading-normal">
              Luxury Homes for Sale
            </h1>
          </div>

          <div className="flex items-center justify-between">
            <div className="font-dm-sans text-[18px] font-medium text-black tracking-[-0.36px]">
              {pagination.total_count.toLocaleString()} listings
            </div>
            <div className="flex items-center gap-2">
              <span className="font-dm-sans text-[18px] font-medium text-black tracking-[-0.36px]">
                Sort by:{" "}
                {sortBy === "created_at"
                  ? "Latest"
                  : sortBy === "price"
                    ? "Price"
                    : sortBy === "bedrooms"
                      ? "Bedrooms"
                      : "Views"}
              </span>
              <ChevronDown className="w-3 h-3 text-black" />
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="mb-[30px]">
          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[18px]">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white border border-[#e9e9e9] p-[13px] animate-pulse"
                >
                  <div className="h-[425px] bg-gray-200 mb-[15px]"></div>
                  <div className="space-y-[15px]">
                    <div className="flex justify-between">
                      <div className="h-8 bg-gray-200 w-24"></div>
                      <div className="h-10 bg-gray-200 w-28"></div>
                    </div>
                    <div className="h-6 bg-gray-200 w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500 font-dm-sans text-lg">{error}</p>
              <button
                onClick={() => fetchProperties(currentPage)}
                className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 font-dm-sans text-lg">
                No properties found matching your criteria.
              </p>
              <p className="text-gray-400 font-dm-sans text-sm mt-2">
                Debug: Properties array length: {properties.length}
              </p>
              <p className="text-gray-400 font-dm-sans text-sm">
                Debug: Loading: {loading.toString()}
              </p>
              <p className="text-gray-400 font-dm-sans text-sm">
                Debug: Error: {error || "none"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[18px]">
              {properties.map((property) => (
                <PropertyCardItem key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {!loading && !error && properties.length > 0 && (
          <div className="flex justify-center">
            <Pagination
              currentPage={pagination.current_page}
              totalPages={pagination.total_pages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Property Card Component
const PropertyCardItem = ({ property }: { property: PropertyCard }) => {
  return (
    <Link
      to={`/listing/${property.slug}`}
      className="bg-white border border-[#e9e9e9] p-[13px] block hover:shadow-lg transition-shadow"
    >
      <div className="relative h-[425px] mb-[15px] overflow-hidden">
        <img
          src={
            property.primary_image_url ||
            "https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=Property+Image"
          }
          alt={property.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src =
              "https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=Property+Image";
          }}
        />

        {/* Overlay badges */}
        <div className="absolute top-[13px] left-[13px] flex gap-[10px]">
          <div className="backdrop-blur-[11px] bg-black/10 border border-white px-[13px] py-[11px] rounded flex items-center gap-[8px]">
            <Eye className="w-6 h-6 text-white" />
            <span className="text-white font-dm-sans text-[18px] font-medium">
              {property.views_count.toLocaleString()}
            </span>
          </div>

          {property.has_video && (
            <div className="backdrop-blur-[11px] bg-black/10 border border-white px-[11px] py-[12px] rounded">
              <span className="text-white font-dm-sans text-[18px] font-medium">
                Video
              </span>
            </div>
          )}

          {property.has_virtual_tour && (
            <div className="backdrop-blur-[11px] bg-black/10 border border-white px-[11px] py-[12px] rounded">
              <span className="text-white font-dm-sans text-[18px] font-medium">
                Virtual Tour
              </span>
            </div>
          )}
        </div>

        {/* Property details - positioned at bottom of image */}
        <div className="absolute bottom-[18px] left-[19px] flex items-center gap-[7px]">
          <div className="bg-white/20 backdrop-blur-sm px-[10px] py-[6px] rounded flex items-center gap-[2px]">
            <Bed className="w-4 h-4 text-white" />
            <span className="text-white font-plus-jakarta text-[16px]">
              {property.bedrooms}
            </span>
            <span className="text-white font-plus-jakarta text-[16px]">
              bed
            </span>
          </div>

          <div className="bg-white/20 backdrop-blur-sm px-[10px] py-[6px] rounded flex items-center gap-[2px]">
            <Bath className="w-4 h-4 text-white" />
            <span className="text-white font-plus-jakarta text-[16px]">
              {property.bathrooms}
            </span>
            <span className="text-white font-plus-jakarta text-[16px]">
              bath
            </span>
          </div>

          <div className="bg-white/20 backdrop-blur-sm px-[10px] py-[6px] rounded flex items-center gap-[2px]">
            <MapPin className="w-4 h-4 text-white" />
            <span className="text-white font-plus-jakarta text-[16px]">
              {property.area_value.toLocaleString()}
            </span>
            <span className="text-white font-plus-jakarta text-[16px]">
              {property.area_unit}
            </span>
          </div>
        </div>

        {/* Navigation arrows */}
        <div className="absolute bottom-[18px] right-[19px] flex gap-[10px]">
          <div className="backdrop-blur-[11px] bg-black/10 border border-white w-[47px] h-[47px] rounded flex items-center justify-center">
            <ArrowLeft className="w-6 h-6 text-white" />
          </div>
          <div className="backdrop-blur-[11px] bg-black/10 border border-white w-[47px] h-[47px] rounded flex items-center justify-center">
            <ArrowRight className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      <div className="space-y-[15px]">
        {/* Price and Agent */}
        <div className="flex items-center justify-between">
          <div className="font-dm-sans text-[32px] font-semibold text-black tracking-[-0.63px]">
            {/* {property.price_currency} {property.price_amount.toLocaleString()} */}
            {property.price_amount && property.price_amount > 0
            ? new Intl.NumberFormat(undefined, {
                style: "currency",
                currency: property.price_currency,
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(property.price_amount)
            : "Price on Request"}
          </div>
          {property.agent && (
            <img
              src={
                property.agent.avatar_url ||
                "https://via.placeholder.com/113x40/f3f4f6/9ca3af?text=Agent"
              }
              alt={property.agent.name}
              className="w-[113px] h-[40px] object-contain"
              onError={(e) => {
                e.currentTarget.src =
                  "https://via.placeholder.com/113x40/f3f4f6/9ca3af?text=Agent";
              }}
            />
          )}
        </div>

        {/* Title */}
        <div className="font-dm-sans text-[24px] font-semibold text-black tracking-[-0.48px]">
          {property.title}
        </div>
      </div>
    </Link>
  );
};

// Pagination Component
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  return (
    <div className="flex items-center gap-[7px]">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-white px-[5px] py-[14px] rounded-[11px] font-dm-sans text-[18px] font-semibold text-[#cccccc] disabled:cursor-not-allowed"
      >
        Prev
      </button>

      {[1, 2, 3].map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-[44px] h-[44px] px-[14px] py-[14px] rounded-[11px] font-dm-sans text-[18px] font-semibold transition-colors ${
            page === currentPage
              ? "bg-[#fd2d15] text-white"
              : "bg-white text-[#333333] border border-[#f1f1f1]"
          }`}
        >
          {page}
        </button>
      ))}

      <button className="w-[44px] h-[44px] px-[14px] py-[14px] rounded-[11px] bg-white font-dm-sans text-[18px] font-semibold text-[#333333]">
        ...
      </button>

      <button
        onClick={() => onPageChange(totalPages)}
        className="w-[44px] h-[44px] px-[14px] py-[14px] rounded-[11px] bg-white font-dm-sans text-[18px] font-semibold text-[#333333] border border-[#f1f1f1]"
      >
        {totalPages}
      </button>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-white px-[5px] py-[14px] rounded-[11px] font-dm-sans text-[18px] font-semibold text-[#333333] disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Properties;
