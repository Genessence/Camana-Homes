import React from "react";
import { API } from "@shared/api";
import type { HeroSlide, PropertyCard, ArticleCard } from "@shared/api.types";
import {
  ChevronDown,
  Eye,
  Heart,
  ArrowLeft,
  ArrowRight,
  Bed,
  Bath,
  MapPin,
  Menu,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import TrendingPropertyCard from "@/components/ui/TrendingPropertyCard";
import StayInTheKnow from "@/components/StayInTheKnow";
import beyond from "../assets/beyond.png";
import logoWhite from "../assets/Camana-white.png";
import palm from "../assets/palm.jpg";
import { Header } from "@/components/layout";
import JoinClubForm from "@/components/JoinClubForm";

// MCP export assets for Coastal Real Estate Views section (node 3072:6218)
const imgDivElementorElement =
  "http://localhost:3845/assets/8efd6fc947b7d2281a19507c61d35636cf482d03.png";
const imgDivElementorElement1 =
  "http://localhost:3845/assets/60ce1ce2d0b32b58eb6b4d9aa832e29ceb60cef1.png";

// MCP assets for Stay in the Know (node 3072:6983)
const imgGroup12FigureGallery1Jpg =
  "http://localhost:3845/assets/c357de5cce6baf6e4fd62c7ea0c3c0eb1bcc724d.png";
const imgBgVideoJpg =
  "http://localhost:3845/assets/b452397dd79f21d383175dd81978fa658d189b03.png";
const imgElements =
  "http://localhost:3845/assets/e0644fcd9e29f44547287311e630a76b9d3682f8.png";
const imgIcon =
  "http://localhost:3845/assets/7a858b2f99a09639c8f555d058dfe46d61924497.svg";
const imgIcon1 =
  "http://localhost:3845/assets/1afa6adefe1add9c1a52bdf187d94e20d07fba1d.svg";
const imgSvg =
  "http://localhost:3845/assets/c217a521b74c0a1cf7ee28610d185936dbf7d128.svg";

function timeAgo(dateString: string): string {
  try {
    const date = new Date(dateString);
    const diffMs = Date.now() - date.getTime();
    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) return days === 1 ? "1 day ago" : `${days} days ago`;
    if (hours > 0) return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    if (minutes > 0) return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    return "Just now";
  } catch {
    return "";
  }
}

const Index = () => {
  const [currentHeroIndex, setCurrentHeroIndex] = React.useState<number>(0);
  const [slides, setSlides] = React.useState<HeroSlide[] | null>(null);
  const [buyType, setBuyType] = React.useState<'Buy' | 'Rent'>('Buy');
  const [buyOpen, setBuyOpen] = React.useState(false);
  const buyRef = React.useRef<HTMLDivElement | null>(null);
  const [locationValue, setLocationValue] = React.useState<string>('Dubai');
  const [locationOpen, setLocationOpen] = React.useState<boolean>(false);
  const locationRef = React.useRef<HTMLDivElement | null>(null);
  const [priceValue, setPriceValue] = React.useState<string>('Price');
  const [priceOpen, setPriceOpen] = React.useState<boolean>(false);
  const priceRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    let isMounted = true;
    console.log("Fetching hero slides...");
    API.heroSlides
      .list()
      .then((data) => {
        console.log("Hero slides response:", data);
        if (isMounted && Array.isArray(data) && data.length > 0) {
          console.log("Setting slides:", data);
          setSlides(data);
          setCurrentHeroIndex(0);
        } else {
          console.log("No slides data or empty array");
        }
      })
      .catch((error) => {
        console.error("Error fetching hero slides:", error);
        // swallow; fallback will be used
      });
    return () => {
      isMounted = false;
    };
  }, []);

  React.useEffect(() => {
    if (!slides || slides.length === 0) return;
    const intervalId = window.setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(intervalId);
  }, [slides?.length]);

  React.useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (buyRef.current && !buyRef.current.contains(target)) setBuyOpen(false);
      if (locationRef.current && !locationRef.current.contains(target)) setLocationOpen(false);
      if (priceRef.current && !priceRef.current.contains(target)) setPriceOpen(false);
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  const currentSlide = slides?.[currentHeroIndex];
  console.log("Current slide:", currentSlide);
  console.log("Slides state:", slides);
  console.log("Current hero index:", currentHeroIndex);

  const currentHeroImage = currentSlide?.property?.image_urls?.[0] || "";
  const heroTitle = currentSlide?.title ?? "Connecting The World";
  const heroSubtitle =
    currentSlide?.subtitle ??
    "Making cross border real estate investments accessible.";

  return (
    <div className="min-h-screen bg-background" style={{position: 'relative'}}>
      {/* Hero Section with Header */}
      <div className="relative w-full h-[640px] md:h-[700px] lg:h-[760px]">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.45) 100%), url('${currentHeroImage}')`,
          }}
        />

        {/* Header */}
       <Header variant="transparent" />

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center px-4 sm:px-8 lg:px-[80px] gap-[10px]">
          {/* Hero Text */}
          <div className="text-center mb-[20px]">
            <h1 className="font-plus-jakarta text-[32px] sm:text-[48px] lg:text-[64px] font-semibold leading-[1.2] lg:leading-[76.8px] text-white mb-[2px]">
              Connecting The World
            </h1>
            <p className="font-dm-sans text-[16px] sm:text-[20px] lg:text-[24px] font-normal leading-normal text-white tracking-[-0.32px] max-w-[800px]">
              Making cross border real estate investments accessible.
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white rounded-[10px] overflow-visible p-0 sm:pl-2.5 w-full max-w-[860px] min-h-[55px] shadow-lg">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center w-full divide-y sm:divide-y-0">
              {/* Buy Dropdown */}
              <div
                ref={buyRef}
                className="relative flex items-center justify-between border-[#d9d9d9] sm:border-r pr-[15px] w-full sm:w-[116px] hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => setBuyOpen((o) => !o)}
              >
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setBuyOpen((o) => !o); }}
                  className="flex-1 text-left font-dm-sans text-[16px] font-normal text-black px-[12px] py-[12px] sm:py-0"
                  aria-haspopup="listbox"
                  aria-expanded={buyOpen}
                >
                  {buyType}
                </button>
                <div className="w-[38px] h-[55px] hidden sm:flex items-center justify-center">
                  <ChevronDown className="w-4 h-4 text-[#999999]" />
                </div>
                {buyOpen && (
                  <div
                    className="absolute left-0 top-full mt-1 z-[50] bg-white border border-gray-200 shadow-lg w-[160px]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() => { setBuyType('Buy'); setBuyOpen(false); }}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 text-[14px]"
                      role="option"
                    >
                      Buy
                    </button>
                    <div className="w-full px-3 py-2 text-[14px] text-gray-400 cursor-not-allowed flex items-center justify-between select-none">
                      <span>Rent</span>
                      <span className="text-[10px] uppercase tracking-wider bg-gray-100 text-gray-500 px-2 py-[2px] rounded-full">Soon</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Location */}
              <div
                ref={locationRef}
                className="relative flex items-center justify-between border-[#d9d9d9] sm:border-r pr-[15px] w-full sm:w-[264px] hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => setLocationOpen((o) => !o)}
              >
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setLocationOpen((o) => !o); }}
                  className="flex items-center gap-[5px] px-[12px] py-[12px] sm:py-0 w-full text-left"
                  aria-haspopup="listbox"
                  aria-expanded={locationOpen}
                >
                  <MapPin className="w-[18px] h-[18px] text-black" />
                  <span className="font-dm-sans text-[16px] font-normal text-black">
                    {locationValue}
                  </span>
                </button>
                <div className="w-[38px] h-[55px] hidden sm:flex items-center justify-center">
                  <ChevronDown className="w-4 h-4 text-[#999999]" />
                </div>
                {locationOpen && (
                  <div
                    className="absolute left-0 top-full mt-1 z-[50] bg-white border border-gray-200 shadow-lg w-[220px] max-h-[260px] overflow-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {['Dubai','Abu Dhabi','Thailand','Maldives','Indonesia','India'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => { setLocationValue(opt); setLocationOpen(false); }}
                        className={`w-full text-left px-3 py-2 text-[14px] hover:bg-gray-100 ${locationValue===opt ? 'bg-gray-50 font-medium' : ''}`}
                        role="option"
                        aria-selected={locationValue===opt}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Beds & Bath */}
              <div className="flex items-center justify-between border-[#d9d9d9] sm:border-r pr-[15px] w-full sm:w-[162px] cursor-pointer hover:bg-gray-50 transition-colors">
                <span className="font-dm-sans text-[16px] font-normal text-black px-[12px] py-[12px] sm:px-[8px] sm:py-0">
                  Beds & Bath
                </span>
                <div className="w-[38px] h-[55px] hidden sm:flex items-center justify-center">
                  <ChevronDown className="w-4 h-4 text-[#999999]" />
                </div>
              </div>

              {/* Price */}
              <div
                ref={priceRef}
                className="relative flex items-center justify-between w-full sm:w-[160px] hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => setPriceOpen((o) => !o)}
              >
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setPriceOpen((o) => !o); }}
                  className="font-dm-sans text-[16px] font-normal text-black px-[12px] py-[12px] sm:py-0 flex-1 text-left"
                  aria-haspopup="listbox"
                  aria-expanded={priceOpen}
                >
                  {priceValue}
                </button>
                <div className="w-[38px] h-[55px] hidden sm:flex items-center justify-center">
                  <ChevronDown className="w-4 h-4 text-[#999999]" />
                </div>
                {priceOpen && (
                  <div
                    className="absolute left-0 top-full mt-1 z-[50] bg-white border border-gray-200 shadow-lg w-[200px] max-h-[260px] overflow-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {['Price','$500,000','$1,000,000','$ 2,000,000','$3,000,000','$4,000,000','$5,000,000+'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => { setPriceValue(opt); setPriceOpen(false); }}
                        className={`w-full text-left px-3 py-3 text-[14px] hover:bg-gray-100 ${priceValue===opt ? 'bg-gray-50 font-medium' : ''}`}
                        role="option"
                        aria-selected={priceValue===opt}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Search Button */}
            <button className="bg-red-accent text-white font-dm-sans text-[16px] font-bold leading-[22.4px] tracking-[-0.48px] px-[15px] h-[55px] w-full sm:w-[126px] hover:bg-red-accent/90 transition-colors mt-0 flex items-center justify-center rounded-b-[10px] sm:rounded-b-none sm:rounded-r-[10px]">
              Search
            </button>
          </div>

          {/* Featured Property */}
          {currentSlide?.property && (
            <div className="absolute bottom-[24px] sm:bottom-[32px] left-4 lg:left-[80px] block">
              <Link
                to={`/listing/${currentSlide.property.slug}`}
                className="block"
              >
                <div className="w-[80vw] max-w-[360px] sm:w-[300px] md:w-[330px] lg:w-[350px] cursor-pointer hover:opacity-90 transition-opacity">
                  <h3 className="font-dm-sans text-[16px] font-normal text-white leading-[21.246px] tracking-[0.02em] mb-2" style={{lineHeight: "1.1"}}>
                    {currentSlide.property.title}
                  </h3>
                  {/* <div className="flex items-center gap-[10px] mb-[8px] w-[300px]">
                    <span className="font-dm-sans text-[18.001px] font-normal text-white leading-[21.618px] tracking-[-0.288px] whitespace-normal">
                      By {currentSlide.property.developer || "Developer"},{" "}
                      {currentSlide.property.location_label}
                    </span>
                    <ArrowRight className="w-[11px] h-[6px] text-white transform -rotate-90" />
                  </div> */}
                  <div className="font-dm-sans text-[16px] font-bold text-white leading-[23.857px]">
                  {currentSlide.property.price_amount && currentSlide.property.price_amount > 0
                    ? new Intl.NumberFormat(undefined, {
                        style: "currency",
                        currency: currentSlide.property.price_currency,
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(currentSlide.property.price_amount)
                    : "Price on Request"}
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div
        className="pt-[60px] px-4 sm:px-8 lg:px-[70px] max-w-[1466.83px] mx-auto"
        style={{ marginBottom: "50px" }}
      >
        {/* Welcome Section */}
        {/* <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-[20px] lg:gap-[30px] mb-[40px] lg:mb-[80px] px-0">
          <h2 className="font-dm-sans text-[32px] lg:text-[55px] font-semibold text-black leading-normal">
            Welcome Back Mr. Vijay
          </h2>
          <p className="font-dm-sans text-[16px] lg:text-[18px] font-normal text-gray-medium leading-[24px] lg:leading-[28px] w-full lg:w-[611px] lg:text-justify">
            Explore an exclusive selection of premium properties, meticulously
            curated to provide you with the best in luxury living and prime real
            estate investment options, tailored to your needs
          </p>
        </div> */}

        {/* Trending Properties */}
        <div className="mb-[60px] lg:mb-[100px]">
          <div className="flex items-center justify-between mb-[30px] lg:mb-[40px]">
            <h2 className="font-dm-sans text-[28px] lg:text-[35px] font-semibold text-black leading-normal">
              Trending Properties
            </h2>
            <Link
              to="/properties"
              className="bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors font-dm-sans text-[16px] font-medium shadow-lg"
            >
              View All
            </Link>
          </div>

          <TrendingPropertiesCarousel />
        </div>

        {/* Statistics Section */}
        <div className="mb-[48px] lg:mb-[48px] bg-white">
          <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start gap-8">
            {/* Left Side - Text Content */}
            <div className="space-y-[40px]">
              {/* Main Heading */}
              <div className="font-dm-sans text-[35px] lg:text-[42px] font-semibold text-black leading-[1.2]">
                BEYOND BORDERS, SEAMLESS CONNECTIONS
              </div>

              {/* Descriptive Paragraph */}
              <div className="font-dm-sans text-[16px] lg:text-[18px] font-normal text-[#8c8c8c] leading-[1.6] max-w-[600px]">
                At Camana Homes, we believe luxury real estate should be
                borderless—accessible, verified, and effortless. Whether you're
                investing in a beachfront villa, a city penthouse, or a private
                island retreat, we connect you to the world's most exclusive
                properties with trust, transparency, and technology.
              </div>

              {/* Metrics Boxes */}
              <div className="flex flex-col sm:flex-row gap-[30px]">
                <div className="bg-neutral-100 px-8 lg:px-10 py-8 lg:py-10 flex flex-col gap-2.5">
                  <div className="font-dm-sans text-[36px] lg:text-[42px] font-bold text-red-accent leading-[1]">
                    $100 M +
                  </div>
                  <div className="font-dm-sans text-[16px] lg:text-[18px] font-medium text-black leading-[1.3]">
                    Verified listings
                  </div>
                </div>

                <div className="bg-neutral-100 px-8 lg:px-10 py-8 lg:py-10 flex flex-col gap-2.5">
                  <div className="font-dm-sans text-[36px] lg:text-[42px] font-bold text-red-accent leading-[1]">
                    10 +
                  </div>
                  <div className="font-dm-sans text-[16px] lg:text-[18px] font-medium text-black leading-[1.3]">
                    Global Markets
                  </div>
                </div>

                <div className="bg-neutral-100 px-8 lg:px-10 py-8 lg:py-10 flex flex-col gap-2.5">
                  <div className="font-dm-sans text-[36px] lg:text-[42px] font-bold text-red-accent leading-[1]">
                    100 +
                  </div>
                  <div className="font-dm-sans text-[16px] lg:text-[18px] font-medium text-black leading-[1.3]">
                    Elite agents
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Abstract Graphic */}
            <div className="relative hidden sm:flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[592px] h-[320px] sm:h-[420px] lg:h-[565px]">
                <img
                  src={beyond}
                  alt="Abstract geometric pattern"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/*         
         <div className="mb-[80px]">
          <div className="text-center">
            <h2 className="font-dm-sans text-[35px] font-semibold text-black mb-[30px]">
              Trusted Partners
            </h2>
            <div className="flex justify-center gap-[130px] px-[66px] py-[10px] flex-wrap">
              {[...Array(8)].map((_, i) => (
                <img
                  key={i}
                  src="https://api.builder.io/api/v1/image/assets/TEMP/b69a8ad654149a58105e1fcba5d408a8585535b9?width=146"
                  alt="Partner Logo"
                  className="h-[26px] w-auto opacity-60 hover:opacity-100 transition-opacity duration-300"
                />
              ))}
            </div>
          </div>
        </div>  */}

        {/* Recently Viewed */}
        <div className="mb-[80px]">
          <h2 className="font-dm-sans text-[35px] font-semibold text-black leading-normal mb-[30px]">
            Recently Viewed
          </h2>

          <RecentlyViewedCarousel />
        </div>
      </div>

      {/* Featured Section - Full Width */}
      <FeaturedSection />

      {/* Main Content Continued */}
      <div className="pt-[60px] px-4 sm:px-8 lg:px-[70px] max-w-[1466.83px] mx-auto">
        {/* Latest Journal */}
        <div className="mb-[80px]">
          {/* Header with View All button */}
          <div className="flex items-center justify-between mb-[30px]">
            <h2 className="font-dm-sans text-[35px] font-semibold text-black leading-normal">
              Latest Journal
            </h2>
            <Link
              to="/journal"
              className="bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors font-dm-sans text-[16px] font-medium shadow-lg"
            >
              View all
            </Link>
          </div>

          {/* Journal Articles Carousel */}
          <JournalCarousel />
        </div>
      </div>
      {/* Newsletter Signup (CTA) - Full Width */}
      <div className="overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-black px-4 sm:px-8 lg:px-[70px] py-[50px]">
          {/* Left: Image with overlay text */}
          <div className="relative h-[320px] sm:h-[420px] lg:h-[494px]">
            <img
              src={palm}
              alt="Development"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/35" />
            <div className="relative z-10 h-full flex flex-col justify-center gap-4 p-6 sm:p-10 text-white">
              <div className="font-dm-sans text-[14px] font-semibold tracking-[2px] uppercase text-[#c0c0c0]">
                Coming in October
              </div>
              <h3 className="font-dm-sans text-[28px] sm:text-[32px] lg:text-[35px] font-bold leading-[1.2] max-w-[520px]">
                New luxury Development on Palm Jumeirah
              </h3>
              <p className="font-dm-sans text-[16px] lg:text-[23px] text-white/85 max-w-[520px]">
                The last new high-end project on the palm!
              </p>
              <p className="font-dm-sans text-[16px] lg:text-[23px] text-white/85 max-w-[520px]">
                Members will get project details 5 days before the official
                reveal
              </p>
            </div>
          </div>

          {/* Right: Form panel */}
          <JoinClubForm />
        </div>
      </div>

      <div className="pt-[60px] px-4 sm:px-8 lg:px-[70px] max-w-[1466.83px] mx-auto">
        {/* Agent Testimonials */}
        {/* <div className="mb-[80px]">
          <h2 className="font-dm-sans text-[35px] font-semibold text-black leading-normal mb-[30px]">
            Agents Testimonials
          </h2>

          <div className="grid grid-cols-3 gap-[20px]">
            {[
              {
                quote:
                  "Working with this platform has transformed my international real estate business. The seamless connections and quality leads are unmatched.",
                name: "Emma Rodriguez",
                title: "Senior Real Estate Agent",
              },
              {
                quote:
                  "The global reach and professional network have opened doors to opportunities I never thought possible. Highly recommended for serious agents.",
                name: "James Mitchell",
                title: "Luxury Property Specialist",
              },
              {
                quote:
                  "The technology and support provided make cross-border transactions smooth and efficient. It's revolutionized how I work with international clients.",
                name: "Lisa Thompson",
                title: "International Property Consultant",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="border border-gray-light rounded-lg bg-white p-[30px]"
              >
                <p className="font-dm-sans text-[16px] font-normal leading-[24px] italic text-[#333] mb-[20px]">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-[15px]">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/21584c4a5fb695a4f53c9f609c46424507f3b08c?width=98"
                    alt={testimonial.name}
                    className="w-[50px] h-[50px] rounded-full"
                  />
                  <div>
                    <div className="font-dm-sans text-[16px] font-semibold text-black">
                      {testimonial.name}
                    </div>
                    <div className="font-dm-sans text-[14px] font-normal text-[#666]">
                      {testimonial.title}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Stay in the Know (completed via MCP 3072:6983) */}
        <StayInTheKnow />
      </div>

      {/* Footer removed (global Footer renders from App.tsx) */}
    </div>
  );
};

export default Index;

// (removed HeroListingsCarousel)

function TrendingPropertiesGrid() {
  const [items, setItems] = React.useState<PropertyCard[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  React.useEffect(() => {
    API.properties
      .trending(3)
      .then(setItems)
      .catch((e) => setError(String(e)));
  }, []);

  if (error) return <TrendingPropertiesPlaceholder />;
  if (!items) return <TrendingPropertiesPlaceholder />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px]">
      {items.map((p) => (
        <Link
          key={p.id}
          to={`/listing/${p.slug}`}
          className="w-full bg-white border-[8px] border-white block overflow-hidden group shadow hover:shadow-lg transition-shadow"
        >
          <div className="relative h-[240px] w-full">
            <img
              src={p.primary_image_url}
              alt={p.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-[10px] left-[9px] flex gap-[10px]">
              <div className="flex items-center gap-[6px] px-[9.681px] py-[8.471px] border border-white bg-black/10 backdrop-blur-[8px]">
                <Eye className="w-[18px] h-[18px] text-white" />
                <span className="text-white font-dm-sans text-[13.391px] font-medium leading-[17.14px]">
                  {new Intl.NumberFormat().format(p.views_count)}
                </span>
              </div>
              {p.has_video && (
                <div className="px-[9.681px] py-[8.471px] border border-white bg-black/10 backdrop-blur-[8px] text-white font-dm-sans text-[13.391px] font-medium leading-[17.14px]">
                  Video
                </div>
              )}
              {p.has_virtual_tour && (
                <div className="px-[9.681px] py-[8.471px] border border-white bg-black/10 backdrop-blur-[8px] text-white font-dm-sans text-[13.391px] font-medium leading-[17.14px]">
                  Virtual Tours
                </div>
              )}
            </div>
          </div>
          <div className="p-4 flex flex-col gap-[11px]">
            <div className="flex items-center justify-between">
              <div className="font-dm-sans text-[23.607px] font-semibold text-black leading-[28.328px] tracking-[-0.472px]">
                {p.price_amount && p.price_amount > 0
                  ? new Intl.NumberFormat(undefined, { style: 'currency', currency: p.price_currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(p.price_amount)
                  : 'Price on Request'}
              </div>
              <div className="flex items-center gap-[5px]">
                <span className="font-dm-sans text-[14px] font-semibold text-black">
                  Contact Agent
                </span>
                <ArrowRight className="w-[10px] h-[5px] text-[#999] transform -rotate-90" />
              </div>
            </div>
            <h3 className="font-dm-sans text-[17.705px] font-bold text-black leading-[21.246px] tracking-[-0.354px]">
              {p.title}
            </h3>
            <div className="flex items-center gap-[10px] text-[12.8px] font-normal text-black">
              <span>{p.property_type}</span>
              <span>|</span>
              <div className="flex items-center gap-[2px]">
                <Bed className="w-[17.705px] h-[17.705px]" />
                <span className="font-plus-jakarta text-[11.803px] leading-[17.705px] tracking-[-0.236px]">
                  {p.bedrooms}
                </span>
              </div>
              <div className="flex items-center gap-[2px]">
                <Bath className="w-[17.705px] h-[17.705px]" />
                <span className="font-plus-jakarta text-[11.803px] leading-[17.705px] tracking-[-0.236px]">
                  {p.bathrooms}
                </span>
              </div>
              <span>|</span>
              <span>
                Area : {p.area_value} {p.area_unit}
              </span>
            </div>
            <div className="h-[1px] bg-gray-light"></div>
            <div className="flex items-center justify-between">
              {p.agent ? (
                <div className="flex items-center gap-[5px]">
                  <img
                    src={
                      p.agent?.avatar_url ||
                      "https://api.builder.io/api/v1/image/assets/TEMP/21584c4a5fb695a4f53c9f609c46424507f3b08c?width=98"
                    }
                    alt={p.agent?.name || "Agent"}
                    className="w-[49px] h-[49px] rounded-full"
                  />
                  <div>
                    <div className="font-dm-sans text-[16px] font-semibold italic text-black">
                      {p.agent?.name}
                    </div>
                    <div className="font-dm-sans text-[12px] font-normal italic text-[#666]">
                      {p.agent?.agency?.name}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-[5px]">
                  <img
                    src={
                      p.developer_logo_url ||
                      "https://via.placeholder.com/98x98/f3f4f6/9ca3af?text=Dev"
                    }
                    alt={p.developer || "Developer"}
                    className="w-[49px] h-[49px] rounded-full object-contain bg-white"
                  />
                  <div>
                    <div className="font-dm-sans text-[16px] font-semibold italic text-black">
                      Direct from Developer
                    </div>
                    <div className="font-dm-sans text-[12px] font-normal italic text-[#666]">
                      {p.developer || ""}
                    </div>
                  </div>
                </div>
              )}
              {p.agent?.agency?.logo_url ? (
                <img
                  src={p.agent.agency.logo_url}
                  alt="Company Logo"
                  className="w-[73px] h-[26px]"
                />
              ) : null}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function TrendingPropertiesCarousel() {
  const [items, setItems] = React.useState<PropertyCard[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [itemsPerSlide, setItemsPerSlide] = React.useState(3);

  React.useEffect(() => {
    API.properties
      .trending(9) // Fetch more items for carousel
      .then(setItems)
      .catch((e) => setError(String(e)));
  }, []);

  React.useEffect(() => {
    const computeItemsPerSlide = () => {
      const width = window.innerWidth;
      if (width < 640) return 1; // < sm
      if (width < 1024) return 2; // < lg
      return 3;
    };
    const update = () => setItemsPerSlide(computeItemsPerSlide());
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  if (error) return <TrendingPropertiesPlaceholder />;
  if (!items) return <TrendingPropertiesPlaceholder />;

  const totalSlides = Math.ceil(items.length / itemsPerSlide);
  const canGoLeft = currentIndex > 0;
  const canGoRight = currentIndex < totalSlides - 1;

  const goToPrevious = () => {
    if (canGoLeft) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (canGoRight) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const startIndex = currentIndex * itemsPerSlide;
  const visibleItems = items.slice(startIndex, startIndex + itemsPerSlide);

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px]">
        {visibleItems.map((p) => (
          <Link
            key={p.id}
            to={`/listing/${p.slug}`}
            className="w-full bg-white border-[8px] border-white block overflow-hidden shadow hover:shadow-lg transition-shadow"
          >
            <div className="relative h-[240px] w-full overflow-hidden">
              <img
                src={p.primary_image_url}
                alt={p.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-[10px] left-[9px] flex gap-[10px]">
                <div className="flex items-center gap-[6px] px-[9.681px] py-[8.471px] border border-white bg-black/10 backdrop-blur-[8px]">
                  <Eye className="w-[18px] h-[18px] text-white" />
                  <span className="text-white font-dm-sans text-[13.391px] font-medium leading-[17.14px]">
                    {new Intl.NumberFormat().format(p.views_count)}
                  </span>
                </div>
                {/* {p.has_video && (
                  <div className="px-[9.681px] py-[8.471px] border border-white bg-black/10 backdrop-blur-[8px] text-white font-dm-sans text-[13.391px] font-medium leading-[17.14px]">
                    Video
                  </div>
                )} */}
                {p.has_virtual_tour && (
                  <div className="px-[9.681px] py-[8.471px] border border-white bg-black/10 backdrop-blur-[8px] text-white font-dm-sans text-[13.391px] font-medium leading-[17.14px]">
                    Virtual Tours
                  </div>
                )}
              </div>
            </div>
            <div className="p-4 flex flex-col gap-[11px]">
              <div className="flex items-center justify-between">
                <div className="font-dm-sans text-[23.607px] font-semibold text-black leading-[28.328px] tracking-[-0.472px]">
                  {p.price_amount && p.price_amount > 0
                    ? new Intl.NumberFormat(undefined, { style: 'currency', currency: p.price_currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(p.price_amount)
                    : 'Price on Request'}
                </div>
                <div className="flex items-center gap-[5px]">
                  <span className="font-dm-sans text-[14px] font-semibold text-black">
                    {/* Contact Agent */}
                  </span>
                  <ArrowRight className="w-[10px] h-[5px] text-[#999] transform -rotate-90" />
                </div>
              </div>
              <h3 className="font-dm-sans text-[17.705px] font-normal text-black leading-[21.246px] tracking-[-0.354px]">
                {p.title}
              </h3>
              <div className="flex items-center gap-[10px] text-[12.8px] font-normal text-black">
                <span>{p.property_type}</span>
                <span>|</span>
                <div className="flex items-center gap-[2px]">
                  <Bed className="w-[17.705px] h-[17.705px]" />
                  <span className="font-plus-jakarta text-[11.803px] leading-[17.705px] tracking-[-0.236px]">
                    {p.bedrooms}
                  </span>
                </div>
                <div className="flex items-center gap-[2px]">
                  <Bath className="w-[17.705px] h-[17.705px]" />
                  <span className="font-plus-jakarta text-[11.803px] leading-[17.705px] tracking-[-0.236px]">
                    {p.bathrooms}
                  </span>
                </div>
                <span>|</span>
                <span>
                  Area : {p.area_value} {p.area_unit}
                </span>
              </div>
              <div className="h-[1px] bg-gray-light"></div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[5px]">
                  {p.agent ? (
                    <>
                      <img
                        src={
                          p.agent?.avatar_url ||
                          "https://api.builder.io/api/v1/image/assets/TEMP/21584c4a5fb695a4f53c9f609c46424507f3b08c?width=98"
                        }
                        alt={p.agent?.name || "Agent"}
                        className="w-[49px] h-[49px] rounded-full"
                      />
                      <div>
                        <div className="font-dm-sans text-[16px] font-semibold italic text-black">
                          {p.agent?.name}
                        </div>
                        <div className="font-dm-sans text-[12px] font-normal italic text-[#666]">
                          {p.agent?.agency?.name}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <img
                        src={
                          p.developer_logo_url ||
                          "https://via.placeholder.com/98x98/f3f4f6/9ca3af?text=Dev"
                        }
                        alt={p.developer || "Developer"}
                        className="w-[49px] h-[49px] rounded-full object-contain bg-white"
                      />
                      <div>
                        <div className="font-dm-sans text-[16px] font-semibold italic text-black">
                          Direct from Developer
                        </div>
                        <div className="font-dm-sans text-[12px] font-normal italic text-[#666]">
                          {p.developer || ""}
                        </div>
                      </div>
                    </>
                  )}
                </div>
                {p.agent?.agency?.logo_url ? (
                  <img
                    src={p.agent.agency.logo_url}
                    alt="Company Logo"
                    className="w-[73px] h-[26px]"
                  />
                ) : null}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Navigation Arrows */}
      {totalSlides > 1 && (
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={goToPrevious}
            disabled={!canGoLeft}
            className={`flex items-center justify-center w-14 h-14 rounded-full border-2 transition-all ${
              canGoLeft
                ? "border-black text-black hover:bg-black hover:text-white shadow-lg"
                : "border-gray-300 text-gray-300 cursor-not-allowed"
            }`}
            aria-label="Previous properties"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          <div className="flex gap-3">
            {Array.from({ length: totalSlides }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-4 h-4 rounded-full transition-all ${
                  i === currentIndex
                    ? "bg-black scale-110"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            disabled={!canGoRight}
            className={`flex items-center justify-center w-14 h-14 rounded-full border-2 transition-all ${
              canGoRight
                ? "border-black text-black hover:bg-black hover:text-white shadow-lg"
                : "border-gray-300 text-gray-300 cursor-not-allowed"
            }`}
            aria-label="Next properties"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}

function NewToMarketGrid() {
  const [items, setItems] = React.useState<ArticleCard[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  React.useEffect(() => {
    API.articles
      .list(3)
      .then(setItems)
      .catch((e) => setError(String(e)));
  }, []);

  if (error) return <NewToMarketPlaceholder />;
  if (!items) return <NewToMarketPlaceholder />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
      {items.map((a) => (
        <Link
          key={a.id}
          to={`/news/${a.slug}`}
          className="border border-gray-light overflow-hidden bg-white hover:shadow-lg transition-shadow"
        >
          <div className="h-[200px] overflow-hidden">
            <img
              src={a.image_url}
              alt={a.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-[20px]">
            <h3 className="font-dm-sans text-[20px] font-bold leading-[24px] text-black mb-[15px]">
              {a.title}
            </h3>
            {a.excerpt && (
              <p className="font-dm-sans text-[14px] font-normal leading-[20px] text-[#666] mb-[25px]">
                {a.excerpt}
              </p>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[10px]">
                <img
                  src={
                    a.author_avatar_url ||
                    "https://api.builder.io/api/v1/image/assets/TEMP/21584c4a5fb695a4f53c9f609c46424507f3b08c?width=98"
                  }
                  alt={a.author_name || "Author"}
                  className="w-[32px] h-[32px] rounded-full"
                />
                <div>
                  <div className="font-dm-sans text-[12px] font-semibold text-black">
                    {a.author_name}
                  </div>
                  <div className="font-dm-sans text-[10px] font-normal text-[#666]">
                    {a.category}
                  </div>
                </div>
              </div>
              <div className="font-dm-sans text-[12px] font-normal text-[#999]">
                {new Date(a.published_at).toLocaleDateString()}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function NewToMarketPlaceholder() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="border border-gray-light overflow-hidden bg-white"
        >
          <div className="h-[200px] overflow-hidden">
            <div className="w-full h-full animate-pulse bg-gray-200" />
          </div>
          <div className="p-[20px]">
            <div className="h-[24px] w-3/4 animate-pulse bg-gray-200 mb-[15px]" />
            <div className="h-[14px] w-full animate-pulse bg-gray-200 mb-[8px]" />
            <div className="h-[14px] w-4/5 animate-pulse bg-gray-200 mb-[20px]" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[10px]">
                <div className="w-[32px] h-[32px] rounded-full animate-pulse bg-gray-200" />
                <div>
                  <div className="h-[12px] w-[90px] animate-pulse bg-gray-200" />
                  <div className="h-[10px] w-[70px] animate-pulse bg-gray-200 mt-1" />
                </div>
              </div>
              <div className="h-[12px] w-[80px] animate-pulse bg-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
function TrendingPropertiesPlaceholder() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-[18px]">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-full border border-gray-light bg-white p-[10px] rounded-lg"
        >
          <div className="relative h-[316px] mb-[10px] rounded-lg overflow-hidden">
            <div className="w-full h-full animate-pulse bg-gradient-to-br from-gray-200 to-gray-300" />
          </div>
          <div className="flex flex-col gap-[11px]">
            <div className="flex items-center justify-between">
              <div className="h-[24px] w-[130px] animate-pulse bg-gradient-to-r from-gray-200 to-gray-300 rounded" />
              <div className="h-[18px] w-[110px] animate-pulse bg-gradient-to-r from-gray-200 to-gray-300 rounded" />
            </div>
            <div className="h-[18px] w-3/4 animate-pulse bg-gradient-to-r from-gray-200 to-gray-300 rounded" />
            <div className="flex items-center gap-[10px] text-[12.8px] text-black">
              <div className="h-[18px] w-[70px] animate-pulse bg-gradient-to-r from-gray-200 to-gray-300 rounded" />
              <span>|</span>
              <div className="h-[18px] w-[30px] animate-pulse bg-gradient-to-r from-gray-200 to-gray-300 rounded" />
              <div className="h-[18px] w-[30px] animate-pulse bg-gradient-to-r from-gray-200 to-gray-300 rounded" />
              <span>|</span>
              <div className="h-[18px] w-[90px] animate-pulse bg-gradient-to-r from-gray-200 to-gray-300 rounded" />
            </div>
            <div className="h-[1px] bg-gray-light"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[5px]">
                <div className="w-[49px] h-[49px] rounded-full animate-pulse bg-gradient-to-br from-gray-200 to-gray-300" />
                <div>
                  <div className="h-[16px] w-[120px] animate-pulse bg-gradient-to-r from-gray-200 to-gray-300 rounded" />
                  <div className="h-[12px] w-[160px] mt-1 animate-pulse bg-gradient-to-r from-gray-200 to-gray-300 rounded" />
                </div>
              </div>
              <div className="h-[26px] w-[73px] animate-pulse bg-gradient-to-r from-gray-200 to-gray-300 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function useVisitorId(): string | null {
  const [vid, setVid] = React.useState<string | null>(null);
  React.useEffect(() => {
    const key = "camana_vid";
    let v = null as string | null;
    try {
      v = localStorage.getItem(key);
    } catch {}
    if (!v) {
      try {
        v = crypto.randomUUID();
        try {
          localStorage.setItem(key, v);
        } catch {}
        try {
          document.cookie = `${key}=${v}; path=/; max-age=${60 * 60 * 24 * 365}`;
        } catch {}
      } catch {
        v = null;
      }
    }
    setVid(v);
  }, []);
  return vid;
}

function RecentlyViewedGrid() {
  const visitorId = useVisitorId();
  const [items, setItems] = React.useState<PropertyCard[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!visitorId) return;
    API.properties
      .recentlyViewed(3, visitorId)
      .then(setItems)
      .catch((e) => setError(String(e)));
  }, [visitorId]);

  if (error) return <TrendingPropertiesPlaceholder />;
  if (!items) return <TrendingPropertiesPlaceholder />;
  if (items.length === 0)
    return <div className="text-[#666]">No recent views yet.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px]">
      {items.map((p) => (
        <Link
          key={p.id}
          to={`/listing/${p.slug}`}
          className="w-full bg-white border-[8px] border-white block overflow-hidden group shadow hover:shadow-lg transition-shadow"
        >
          <div className="relative h-[240px] w-full">
            <img
              src={p.primary_image_url}
              alt={p.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-[10px] left-[9px] flex gap-[10px]">
              <div className="flex items-center gap-[6px] px-[9.681px] py-[8.471px] border border-white bg-black/10 backdrop-blur-[8px]">
                <Eye className="w-[18px] h-[18px] text-white" />
                <span className="text-white font-dm-sans text-[13.391px] font-medium leading-[17.14px]">
                  {new Intl.NumberFormat().format(p.views_count)}
                </span>
              </div>
              {/* {p.has_video && (
                <div className="px-[9.681px] py-[8.471px] border border-white bg-black/10 backdrop-blur-[8px] text-white font-dm-sans text-[13.391px] font-medium leading-[17.14px]">
                  Video
                </div>
              )} */}
              {p.has_virtual_tour && (
                <div className="px-[9.681px] py-[8.471px] border border-white bg-black/10 backdrop-blur-[8px] text-white font-dm-sans text-[13.391px] font-medium leading-[17.14px]">
                  Virtual Tours
                </div>
              )}
            </div>
          </div>
          <div className="p-4 flex flex-col gap-[11px]">
            <div className="flex items-center justify-between">
              <div className="font-dm-sans text-[23.607px] font-semibold text-black leading-[28.328px] tracking-[-0.472px]">
                {(() => {
                  const amount = p.price_amount ?? 0;
                  const currency = p.price_currency || 'USD';
                  try { return new Intl.NumberFormat(undefined, { style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount); }
                  catch { return `${currency} ${Math.round(amount).toLocaleString()}`; }
                })()}
              </div>
              <div className="flex items-center gap-[5px]">
                <span className="font-dm-sans text-[14px] font-semibold text-black">
                  {/* Contact Agent */}
                </span>
                <ArrowRight className="w-[10px] h-[5px] text-[#999] transform -rotate-90" />
              </div>
            </div>
            <h3 className="font-dm-sans text-[17.705px] font-normal text-black leading-[21.246px] tracking-[-0.354px]">
              {p.title}
            </h3>
            <div className="flex items-center gap-[10px] text-[12.8px] font-normal text-black">
              <span>{p.property_type}</span>
              <span>|</span>
              <div className="flex items-center gap-[2px]">
                <Bed className="w-[17.705px] h-[17.705px]" />
                <span className="font-plus-jakarta text-[11.803px] leading-[17.705px] tracking-[-0.236px]">
                  {p.bedrooms}
                </span>
              </div>
              <div className="flex items-center gap-[2px]">
                <Bath className="w-[17.705px] h-[17.705px]" />
                <span className="font-plus-jakarta text-[11.803px] leading-[17.705px] tracking-[-0.236px]">
                  {p.bathrooms}
                </span>
              </div>
              <span>|</span>
              <span>
                Area : {p.area_value} {p.area_unit}
              </span>
            </div>
            <div className="h-[1px] bg-gray-light"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[5px]">
                {p.agent ? (
                  <>
                    <img
                      src={
                        p.agent?.avatar_url ||
                        "https://api.builder.io/api/v1/image/assets/TEMP/21584c4a5fb695a4f53c9f609c46424507f3b08c?width=98"
                      }
                      alt={p.agent?.name || "Agent"}
                      className="w-[49px] h-[49px] rounded-full"
                    />
                    <div>
                      <div className="font-dm-sans text-[16px] font-semibold italic text-black">
                        {p.agent?.name}
                      </div>
                      <div className="font-dm-sans text-[12px] font-normal italic text-[#666]">
                        {p.agent?.agency?.name}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <img
                      src={
                        p.developer_logo_url ||
                        "https://via.placeholder.com/98x98/f3f4f6/9ca3af?text=Dev"
                      }
                      alt={p.developer || "Developer"}
                      className="w-[49px] h-[49px] rounded-full object-contain bg-white"
                    />
                    <div>
                      <div className="font-dm-sans text-[16px] font-semibold italic text-black">
                        Direct from Developer
                      </div>
                      <div className="font-dm-sans text-[12px] font-normal italic text-[#666]">
                        {p.developer || ""}
                      </div>
                    </div>
                  </>
                )}
              </div>
              {p.agent?.agency?.logo_url ? (
                <img
                  src={p.agent.agency.logo_url}
                  alt="Company Logo"
                  className="w-[73px] h-[26px]"
                />
              ) : null}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function RecentlyViewedCarousel() {
  const visitorId = useVisitorId();
  const [items, setItems] = React.useState<PropertyCard[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [itemsPerSlide, setItemsPerSlide] = React.useState(3);

  React.useEffect(() => {
    if (!visitorId) return;
    API.properties
      .recentlyViewed(12, visitorId)
      .then(setItems)
      .catch((e) => setError(String(e)));
  }, [visitorId]);

  React.useEffect(() => {
    const computeItemsPerSlide = () => {
      const width = window.innerWidth;
      if (width < 640) return 1; // < sm
      if (width < 1024) return 2; // < lg
      return 3;
    };
    const update = () => setItemsPerSlide(computeItemsPerSlide());
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  if (error) return <TrendingPropertiesPlaceholder />;
  if (!items) return <TrendingPropertiesPlaceholder />;
  if (items.length === 0)
    return <div className="text-[#666]">No recent views yet.</div>;

  const totalSlides = Math.ceil(items.length / itemsPerSlide);
  const canGoLeft = currentIndex > 0;
  const canGoRight = currentIndex < totalSlides - 1;

  const goToPrevious = () => {
    if (canGoLeft) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (canGoRight) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const startIndex = currentIndex * itemsPerSlide;
  const visibleItems = items.slice(startIndex, startIndex + itemsPerSlide);

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px]">
        {visibleItems.map((p) => (
          <Link
            key={p.id}
            to={`/listing/${p.slug}`}
            className="w-full bg-white border-[8px] border-white block overflow-hidden shadow hover:shadow-lg transition-shadow"
          >
            <div className="relative h-[240px] w-full overflow-hidden">
              <img
                src={p.primary_image_url}
                alt={p.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-[10px] left-[9px] flex gap-[10px]">
                <div className="flex items-center gap-[6px] px-[9.681px] py-[8.471px] border border-white bg-black/10 backdrop-blur-[8px]">
                  <Eye className="w-[18px] h-[18px] text-white" />
                  <span className="text-white font-dm-sans text-[13.391px] font-medium leading-[17.14px]">
                    {new Intl.NumberFormat().format(p.views_count)}
                  </span>
                </div>
                {p.has_virtual_tour && (
                  <div className="px-[9.681px] py-[8.471px] border border-white bg-black/10 backdrop-blur-[8px] text-white font-dm-sans text-[13.391px] font-medium leading-[17.14px]">
                    Virtual Tours
                  </div>
                )}
              </div>
            </div>
            <div className="p-4 flex flex-col gap-[11px]">
              <div className="flex items-center justify-between">
                <div className="font-dm-sans text-[23.607px] font-semibold text-black leading-[28.328px] tracking-[-0.472px]">
                  {(() => {
                    const amount = p.price_amount ?? 0;
                    if (!amount || amount <= 0) return 'Price on Request';
                    const currency = p.price_currency || 'USD';
                    try { return new Intl.NumberFormat(undefined, { style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount); }
                    catch { return `${currency} ${Math.round(amount).toLocaleString()}`; }
                  })()}
                </div>
                <div className="flex items-center gap-[5px]">
                  <span className="font-dm-sans text-[14px] font-semibold text-black">
                    {/* Contact Agent */}
                  </span>
                  <ArrowRight className="w-[10px] h-[5px] text-[#999] transform -rotate-90" />
                </div>
              </div>
              <h3 className="font-dm-sans text-[17.705px] font-normal text-black leading-[21.246px] tracking-[-0.354px]">
                {p.title}
              </h3>
              <div className="flex items-center gap-[10px] text-[12.8px] font-normal text-black">
                <span>{p.property_type}</span>
                <span>|</span>
                <div className="flex items-center gap-[2px]">
                  <Bed className="w-[17.705px] h-[17.705px]" />
                  <span className="font-plus-jakarta text-[11.803px] leading-[17.705px] tracking-[-0.236px]">
                    {p.bedrooms}
                  </span>
                </div>
                <div className="flex items-center gap-[2px]">
                  <Bath className="w-[17.705px] h-[17.705px]" />
                  <span className="font-plus-jakarta text-[11.803px] leading-[17.705px] tracking-[-0.236px]">
                    {p.bathrooms}
                  </span>
                </div>
                <span>|</span>
                <span>
                  Area : {p.area_value} {p.area_unit}
                </span>
              </div>
              <div className="h-[1px] bg-gray-light"></div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[5px]">
                  {p.agent ? (
                    <>
                      <img
                        src={
                          p.agent?.avatar_url ||
                          "https://api.builder.io/api/v1/image/assets/TEMP/21584c4a5fb695a4f53c9f609c46424507f3b08c?width=98"
                        }
                        alt={p.agent?.name || "Agent"}
                        className="w-[49px] h-[49px] rounded-full"
                      />
                      <div>
                        <div className="font-dm-sans text-[16px] font-semibold italic text-black">
                          {p.agent?.name}
                        </div>
                        <div className="font-dm-sans text-[12px] font-normal italic text-[#666]">
                          {p.agent?.agency?.name}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <img
                        src={
                          p.developer_logo_url ||
                          "https://via.placeholder.com/98x98/f3f4f6/9ca3af?text=Dev"
                        }
                        alt={p.developer || "Developer"}
                        className="w-[49px] h-[49px] rounded-full object-contain bg-white"
                      />
                      <div>
                        <div className="font-dm-sans text-[16px] font-semibold italic text-black">
                          Direct from Developer
                        </div>
                        <div className="font-dm-sans text-[12px] font-normal italic text-[#666]">
                          {p.developer || ""}
                        </div>
                      </div>
                    </>
                  )}
                </div>
                {p.agent?.agency?.logo_url ? (
                  <img
                    src={p.agent.agency.logo_url}
                    alt="Company Logo"
                    className="w-[73px] h-[26px]"
                  />
                ) : null}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Navigation Arrows */}
      {totalSlides > 1 && (
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={goToPrevious}
            disabled={!canGoLeft}
            className={`flex items-center justify-center w-14 h-14 rounded-full border-2 transition-all ${
              canGoLeft
                ? "border-black text-black hover:bg-black hover:text-white shadow-lg"
                : "border-gray-300 text-gray-300 cursor-not-allowed"
            }`}
            aria-label="Previous recently viewed"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          <div className="flex gap-3">
            {Array.from({ length: totalSlides }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-4 h-4 rounded-full transition-all ${
                  i === currentIndex
                    ? "bg-black scale-110"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to recently slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            disabled={!canGoRight}
            className={`flex items-center justify-center w-14 h-14 rounded-full border-2 transition-all ${
              canGoRight
                ? "border-black text-black hover:bg-black hover:text-white shadow-lg"
                : "border-gray-300 text-gray-300 cursor-not-allowed"
            }`}
            aria-label="Next recently viewed"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}

function FeaturedSection() {
  const [items, setItems] = React.useState<PropertyCard[] | null>(null);
  const [idx, setIdx] = React.useState(0);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    API.properties
      .featured(5)
      .then((res) => {
        setItems(res);
        setIdx(0);
      })
      .catch((e) => setError(String(e)));
  }, []);

  // Skeleton placeholder for featured section
  const renderSkeleton = (
    <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse">
      {/* Skeleton for title and pill container */}
      <div className="absolute left-4 sm:left-8 lg:left-16 bottom-6 sm:bottom-8 right-4 sm:right-16 lg:right-32">
        <div className="mb-[30px]">
          <div className="w-40 h-10 animate-pulse bg-white/20 rounded-md" />
        </div>
        <div className="w-96 h-12 animate-pulse bg-white/20 rounded mb-3" />
        <div className="w-80 h-8 animate-pulse bg-white/20 rounded" />
      </div>
      {/* Skeleton for navigation buttons */}
      <div className="absolute right-4 sm:right-8 lg:right-16 bottom-6 sm:bottom-8 flex gap-3">
        <div className="w-12 h-12 animate-pulse bg-white/20 rounded-full" />
        <div className="w-12 h-12 animate-pulse bg-white/20 rounded-full" />
      </div>
    </div>
  );

  if (error) return renderSkeleton;
  if (!items || items.length === 0) return renderSkeleton;

  const current = items[idx];

  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
      <img
        src={current.primary_image_url}
        alt={current.title}
        className="w-full h-full object-cover"
      />
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* title + pill + price container */}
      <div className="absolute left-4 sm:left-8 lg:left-16 bottom-6 sm:bottom-8 right-4 sm:right-16 lg:right-32 text-white z-10">
        {/* glass morphism pill 30px above title */}
        <div className="mb-[30px]">
          <div className="backdrop-blur-md bg-white/15 border border-white/20 text-white px-6 py-3 inline-flex items-center rounded-md">
            <span className="font-dm-sans text-[16px] font-semibold">
              Featured listings
            </span>
          </div>
        </div>
        <Link to={`/listing/${current.slug}`} className="block">
          <div className="font-dm-sans text-[28px] sm:text-[32px] lg:text-[36px] font-bold mb-3 hover:underline">
            {current.title}
          </div>
        </Link>
        <div className="flex items-center gap-4 text-[16px] lg:text-[18px]">
          <span className="opacity-90">
          {current.price_amount && current.price_amount > 0
            ? new Intl.NumberFormat(undefined, {
                style: "currency",
                currency: current.price_currency,
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(current.price_amount)
            : "Price on Request"}
          </span>
        </div>
      </div>
      {/* nav buttons bottom-right */}
      <div className="absolute right-4 sm:right-8 lg:right-16 bottom-6 sm:bottom-8 flex gap-3 z-10">
        <button
          aria-label="Previous"
          onClick={() =>
            setIdx((i) => (items ? (i - 1 + items.length) % items.length : 0))
          }
          className="size-12 grid place-items-center rounded-full backdrop-blur-md bg-white/20 border border-white/20 text-white hover:bg-white/30 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button
          aria-label="Next"
          onClick={() => setIdx((i) => (items ? (i + 1) % items.length : 0))}
          className="size-12 grid place-items-center rounded-full backdrop-blur-md bg-white/20 border border-white/20 text-white hover:bg-white/30 transition-colors"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

function JournalCarousel() {
  const [articles, setArticles] = React.useState<ArticleCard[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [canGoLeft, setCanGoLeft] = React.useState(false);
  const [canGoRight, setCanGoRight] = React.useState(false);

  React.useEffect(() => {
    API.articles
      .list(9)
      .then(setArticles)
      .catch((e) => setError(String(e)));
  }, []);

  React.useEffect(() => {
    const updateButtons = () => {
      const el = containerRef.current;
      if (!el) return;
      // Use small tolerance to account for fractional pixels and image load shifts
      const tol = 5;
      setCanGoLeft(el.scrollLeft > 0);
      setCanGoRight(el.scrollLeft + el.clientWidth < el.scrollWidth - tol);
    };
    updateButtons();
    // Re-run after layout/images settle
    const t1 = setTimeout(updateButtons, 100);
    const t2 = setTimeout(updateButtons, 300);
    window.addEventListener('resize', updateButtons);
    const el = containerRef.current;
    if (el) el.addEventListener('scroll', updateButtons, { passive: true });
    return () => {
      clearTimeout(t1); clearTimeout(t2);
      window.removeEventListener('resize', updateButtons);
      if (el) el.removeEventListener('scroll', updateButtons as any);
    };
  }, [articles]);

  const CARD_WIDTH = 470;
  const GAP_PX = 30;

  const goToPrevious = () => {
    const el = containerRef.current;
    if (!el) return;
    const period = CARD_WIDTH + GAP_PX;
    const remainder = el.scrollLeft % period;
    const delta = remainder === 0 ? period : remainder;
    el.scrollBy({ left: -delta, behavior: 'smooth' });
  };

  const goToNext = () => {
    const el = containerRef.current;
    if (!el) return;
    const period = CARD_WIDTH + GAP_PX;
    const remainder = (el.scrollLeft + el.clientWidth) % period;
    const delta = remainder === 0 ? period : (period - remainder);
    el.scrollBy({ left: delta, behavior: 'smooth' });
  };

  if (error || !articles) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[30px]">
        {[0,1,2].map((i) => (
          <div key={i} className="w-[537px] bg-white border border-[#e9e9e9] overflow-hidden">
            <div className="h-[286px] bg-gray-200 animate-pulse" />
            <div className="p-5">
              <div className="h-5 w-24 bg-gray-200 animate-pulse mb-2" />
              <div className="h-6 w-3/4 bg-gray-200 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div ref={containerRef} className="flex gap-[30px] overflow-x-auto scrollbar-hide snap-x snap-mandatory">
          {(articles || []).map((a, index) => (
            <div key={index} className="bg-white border border-[#e9e9e9] flex-shrink-0 overflow-hidden snap-start" style={{ width: "470px", height: "394px" }}>
              <Link to={`/article-v2/${a.slug}`} className="block">
                <div className="flex flex-col">
                  <div className="h-[224px] overflow-hidden w-full">
                    <img
                      src={a.image_url}
                      alt={a.title}
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://camana-homes.s3.ap-south-1.amazonaws.com/properties/dubai-marina/2200xxs%20(1).webp'; }}
                    />
                  </div>
                  <div className="p-4 flex flex-col items-center text-center gap-[12px] min-h-0">
                    {a.category && (
                      <div className="bg-[#fd2d15] px-[10px] py-[5px]">
                        <span className="font-dm-sans text-[18px] font-extrabold text-white truncate block max-w-full">{a.category}</span>
                      </div>
                    )}
                    <h3 className="font-dm-sans text-[24px] lg:text-[26px] font-bold text-black text-center leading-[30px] line-clamp-3">{a.title}</h3>
                    <div className="font-dm-sans text-[14px] lg:text-[16px] font-normal text-black text-center flex items-center justify-center gap-3">
                      {/* {a.author_name && ( */}
                      <span className="font-semibold italic">By Sudoku Capital</span>
                      {/* )} */}
                      {/* {a.published_at && ( */}
                      <span className="text-[#666]"> - 12 hours ago</span>
                      {/* )} */}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mt-[30px]">
        <div></div>
        <div className="flex gap-2.5">
          <button onClick={goToPrevious} disabled={!canGoLeft} aria-label="Previous journal articles" className={`w-[36.5px] h-10 flex items-center justify-center bg-white border border-gray-300 rounded transition-colors ${canGoLeft ? "hover:bg-gray-50 cursor-pointer" : "opacity-50 cursor-not-allowed"}`}>
            <ArrowLeft className="w-5 h-5 text-black" />
          </button>
          <button onClick={goToNext} disabled={!canGoRight} aria-label="Next journal articles" className={`w-[36.5px] h-10 flex items-center justify-center bg-white border border-gray-300 rounded transition-colors ${canGoRight ? "hover:bg-gray-50 cursor-pointer" : "opacity-50 cursor-not-allowed"}`}>
            <ArrowRight className="w-5 h-5 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
}
