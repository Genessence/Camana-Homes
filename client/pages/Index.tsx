import React from "react";
import { API } from "@shared/api";
import type { HeroSlide, PropertyCard, ArticleCard } from "@/shared/api.types";
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
import StayInTheKnow from "@/components/StayInTheKnow";

// 5-image hero carousel (using existing assets as placeholders). Later we can fetch these from FastAPI.
const FALLBACK_HERO_IMAGES: string[] = [
  "https://api.builder.io/api/v1/image/assets/TEMP/150215d44c18f289f544dd9db57e5320bbc85d85?width=3200",
  "https://api.builder.io/api/v1/image/assets/TEMP/1c586a2bf796f43887671486f52e771a180c6321?width=3200",
  "https://api.builder.io/api/v1/image/assets/TEMP/b2aaf4ab7fe943123c831e8c3b0baabf8cb2f86e?width=3200",
  "https://api.builder.io/api/v1/image/assets/TEMP/56cbf0ba5ca3f6afb6d89b14b20678c2c6f63047?width=3200",
  "https://api.builder.io/api/v1/image/assets/TEMP/0ce93c9c3de7d61f7409992098980621d89f14ce?width=3200",
];

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

const Index = () => {
  const [currentHeroIndex, setCurrentHeroIndex] = React.useState<number>(0);
  const [slides, setSlides] = React.useState<HeroSlide[] | null>(null);

  React.useEffect(() => {
    let isMounted = true;
    API.heroSlides
      .list()
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setSlides(data);
        }
      })
      .catch(() => {
        // swallow; fallback will be used
      });
    return () => {
      isMounted = false;
    };
  }, []);

  React.useEffect(() => {
    const intervalId = window.setInterval(() => {
      const total = slides?.length || FALLBACK_HERO_IMAGES.length;
      setCurrentHeroIndex((prev) => (prev + 1) % total);
    }, 5000);
    return () => window.clearInterval(intervalId);
  }, []);

  const currentHeroImage =
    slides?.[currentHeroIndex]?.image_url ||
    FALLBACK_HERO_IMAGES[currentHeroIndex % FALLBACK_HERO_IMAGES.length];
  const heroTitle = slides?.[currentHeroIndex]?.title ?? "Connecting The World";
  const heroSubtitle =
    slides?.[currentHeroIndex]?.subtitle ??
    "Making cross border real estate investments accessible.";

  return (
    <div className="min-h-screen bg-background">
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
        <div className="absolute top-0 left-0 right-0 z-10">
          {/* Main Navigation */}
          <div className="flex items-center justify-center h-[66px] px-4 lg:px-[70px] border-b border-white/20">
            <div className="flex items-center justify-between w-full max-w-[1466px]">
              {/* Logo (single image + filter) */}
              <div className="flex items-center h-[66px] py-[14px]">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/5a19f6126fa6dcda25d289130b048916b16fa621?width=310"
                  alt="Camana Homes"
                  className="h-[43px] w-[155px] object-contain filter invert sepia saturate-[10000%] hue-rotate-[320deg] brightness-[1.1] contrast-[1.2] drop-shadow"
                />
              </div>

              {/* Center Navigation - Hidden on mobile */}
              {/* <div className="hidden lg:flex items-center gap-[15px]">
                {["Buy", "Sell", "Rent", "Mortgage"].map((item) => (
                  <button
                    key={item}
                    className="flex items-center justify-center h-[50px] px-[21px] py-[8px] border border-white bg-transparent text-white font-dm-sans text-[17px] font-medium hover:bg-white/10 transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div> */}

              {/* Right Navigation */}
              <div className="flex items-center gap-[12px]">
                <button className="hidden md:flex items-center justify-center h-[50px] px-[21px] py-[8px] border border-white bg-white/14 text-white font-dm-sans text-[14px] font-medium tracking-[-0.48px] hover:bg-white/20 transition-colors backdrop-blur-sm">
                  Get Connected
                </button>
                <button className="hidden sm:flex items-center justify-center h-[50px] px-[20px] py-[8px] bg-white text-black font-dm-sans text-[14px] font-medium hover:bg-gray-100 transition-colors">
                  Agent Login
                </button>
                <Menu className="w-5 h-5 text-white cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Country Navigation - Hidden on mobile */}
          <div className="hidden lg:flex items-center justify-center h-[46px] px-4 xl:px-[315px] border-t border-white/20 border-b border-white/20 bg-white/15 backdrop-blur-[8.5px]">
            <div className="flex items-center gap-[24px] py-[12px] overflow-x-auto">
              {[
                "Spain",
                "Italy",
                "Switzerland",
                "Mexico",
                "Australia",
                "South Africa",
                "Germany",
                "Greece",
                "United States",
              ].map((country) => (
                <span
                  key={country}
                  className="text-white text-center font-inter text-[17px] font-medium leading-[19.2px] hover:text-white/80 cursor-pointer transition-colors whitespace-nowrap"
                >
                  {country}
                </span>
              ))}
              <div className="flex items-center gap-[10px]">
                <span className="text-white text-center font-inter text-[17px] font-medium leading-[19.2px]">
                  More
                </span>
                <ChevronDown className="w-[11px] h-[6px] text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center px-4 sm:px-8 lg:px-[80px] pt-[200px] lg:pt-[300px] pb-[50px] gap-[10px]">
          {/* Hero Text */}
          <div className="text-center mb-[30px] lg:mb-[54px]">
            <h1 className="font-plus-jakarta text-[32px] sm:text-[48px] lg:text-[64px] font-semibold leading-[1.2] lg:leading-[76.8px] text-white mb-[2px]">
              {heroTitle}
            </h1>
            <p className="font-dm-sans text-[16px] sm:text-[20px] lg:text-[24px] font-normal leading-normal text-white tracking-[-0.32px] max-w-[600px]">
              {heroSubtitle}
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex flex-row items-center bg-white rounded-[10px] overflow-hidden p-0 pl-2.5 w-full max-w-[860px] min-h-[55px]">
            <div className="flex flex-row items-center w-full">
              {/* Buy Dropdown */}
              <div className="flex items-center justify-between border-r border-[#d9d9d9] pr-[15px] w-[116px]">
                <span className="font-dm-sans text-[16px] font-normal text-black px-[12px]">
                  Buy
                </span>
                <div className="w-[38px] h-[55px] flex items-center justify-center">
                  <ChevronDown className="w-4 h-4 text-[#999999]" />
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center justify-between border-r border-[#d9d9d9] pr-[15px] w-[264px]">
                <div className="flex items-center gap-[5px] px-[12px]">
                  <MapPin className="w-[18px] h-[18px] text-black" />
                  <span className="font-dm-sans text-[16px] font-normal text-black">
                    Los Angeles
                  </span>
                </div>
                <div className="w-[38px] h-[55px] flex items-center justify-center">
                  <ChevronDown className="w-4 h-4 text-[#999999]" />
                </div>
              </div>

              {/* Beds & Bath */}
              <div className="flex items-center justify-between border-r border-[#d9d9d9] pr-[15px] w-[162px]">
                <span className="font-dm-sans text-[16px] font-normal text-black px-[12px]">
                  Beds & Bath
                </span>
                <div className="w-[38px] h-[55px] flex items-center justify-center">
                  <ChevronDown className="w-4 h-4 text-[#999999]" />
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between w-[160px]">
                <span className="font-dm-sans text-[16px] font-normal text-black px-[12px]">
                  $500,000
                </span>
                <div className="w-[38px] h-[55px] flex items-center justify-center">
                  <ChevronDown className="w-4 h-4 text-[#999999]" />
                </div>
              </div>
            </div>

            {/* Search Button */}
            <button className="bg-red-accent text-white font-dm-sans text-[16px] font-bold leading-[22.4px] tracking-[-0.48px] px-[15px] h-[55px] w-[126px] hover:bg-red-accent/90 transition-colors mt-0">
              Search
            </button>
          </div>

          {/* Featured Property */}
          <div className="absolute bottom-[50px] left-4 lg:left-[80px] hidden lg:block">
            <div className="w-[168px]">
              <h3 className="font-dm-sans text-[17.705px] font-bold text-black leading-[21.246px] tracking-[-0.354px] mb-[5px]">
                Bugatti Branded Residences
              </h3>
              <div className="flex items-center gap-[10px] mb-[6px]">
                <span className="font-dm-sans text-[18.001px] font-normal text-white leading-[21.618px] tracking-[-0.288px]">
                  By Binghatti, Dubai
                </span>
                <ArrowRight className="w-[11px] h-[6px] text-white transform -rotate-90" />
              </div>
              <div className="font-dm-sans text-[21.284px] font-bold text-white leading-[23.857px]">
                $5,197,386
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-[40px] px-4 sm:px-8 lg:px-[70px] max-w-[1466.83px] mx-auto">
        {/* Welcome Section */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-[20px] lg:gap-[30px] mb-[40px] lg:mb-[80px] px-0">
          <h2 className="font-dm-sans text-[32px] lg:text-[55px] font-semibold text-black leading-normal">
            Welcome Back Mr. Vijay
          </h2>
          <p className="font-dm-sans text-[16px] lg:text-[18px] font-normal text-gray-medium leading-[24px] lg:leading-[28px] w-full lg:w-[611px] lg:text-right">
            Explore an exclusive selection of premium properties, meticulously
            curated to provide you with the best in luxury living and prime real
            estate investment options, tailored to your needs
          </p>
        </div>

        {/* Trending Properties */}
        <div className="mb-[40px] lg:mb-[80px]">
          <div className="flex items-center justify-between mb-[20px] lg:mb-[30px]">
            <h2 className="font-dm-sans text-[28px] lg:text-[35px] font-semibold text-black leading-normal">
              Trending Properties
            </h2>
            <Link
              to="/properties"
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-dm-sans text-[16px] font-medium"
            >
              View All
            </Link>
          </div>

          <TrendingPropertiesCarousel />
        </div>

        {/* New to the Market */}
        <div className="mb-[40px] lg:mb-[80px]">
          <h2 className="font-dm-sans text-[35px] font-semibold text-black leading-normal mb-[30px]">
            New to the Market
          </h2>

          <NewToMarketGrid />
        </div>

        {/* Statistics Section */}
        <div className="mb-[40px] lg:mb-[80px] py-[40px] lg:py-[60px] bg-[#f8f9fa] rounded-lg">
          <div className="text-center">
            <div className="font-dm-sans text-[12px] lg:text-[14px] font-semibold tracking-[2px] uppercase text-black mb-[30px] lg:mb-[40px]">
              BEYOND BORDERS, SEAMLESS CONNECTIONS
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-[40px] lg:gap-[80px]">
              <div className="text-center">
                <div className="font-dm-sans text-[36px] lg:text-[48px] font-bold leading-[1] text-red-accent mb-[10px]">
                  $100 M +
                </div>
                <div className="font-dm-sans text-[14px] lg:text-[16px] font-normal text-[#666]">
                  Verified listings
                </div>
              </div>
              <div className="text-center">
                <div className="font-dm-sans text-[36px] lg:text-[48px] font-bold leading-[1] text-red-accent mb-[10px]">
                  20 +
                </div>
                <div className="font-dm-sans text-[14px] lg:text-[16px] font-normal text-[#666]">
                  Global Markets
                </div>
              </div>
              <div className="text-center">
                <div className="font-dm-sans text-[36px] lg:text-[48px] font-bold leading-[1] text-red-accent mb-[10px]">
                  5000 +
                </div>
                <div className="font-dm-sans text-[14px] lg:text-[16px] font-normal text-[#666]">
                  Elite agents
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trusted Partners */}
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
        </div>

        {/* Recently Viewed */}
        <div className="mb-[80px]">
          <h2 className="font-dm-sans text-[35px] font-semibold text-black leading-normal mb-[30px]">
            Recently Viewed
          </h2>

          <RecentlyViewedGrid />
        </div>

        {/* Featured Section (carousel of featured properties with left/right buttons) */}
        <FeaturedSection />

        {/* The Boldest New Developments */}
        <div className="mb-[80px]">
          <h2 className="font-dm-sans text-[35px] font-semibold text-black leading-normal mb-[30px]">
            The Boldest New Developments
          </h2>

          <div className="grid grid-cols-5 gap-[20px] justify-start">
            {[
              {
                image:
                  "https://api.builder.io/api/v1/image/assets/TEMP/1c586a2bf796f43887671486f52e771a180c6321?width=1032",
                label: "Closing May",
              },
              {
                image:
                  "https://api.builder.io/api/v1/image/assets/TEMP/b2aaf4ab7fe943123c831e8c3b0baabf8cb2f86e?width=1032",
                label: "New York",
              },
              {
                image:
                  "https://api.builder.io/api/v1/image/assets/TEMP/56cbf0ba5ca3f6afb6d89b14b20678c2c6f63047?width=1032",
                label: "Waterfront LA",
              },
              {
                image:
                  "https://api.builder.io/api/v1/image/assets/TEMP/0ce93c9c3de7d61f7409992098980621d89f14ce?width=1032",
                label: "Prospect Point",
              },
              {
                image:
                  "https://api.builder.io/api/v1/image/assets/TEMP/1c586a2bf796f43887671486f52e771a180c6321?width=1032",
                label: "Residential LA",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="relative overflow-hidden group cursor-pointer transition duration-300 ease-out transform-gpu will-change-transform hover:scale-[1.02] hover:shadow-lg"
                style={{ height: "566px" }}
              >
                <img
                  src={item.image}
                  alt={item.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute bottom-[20px] left-[20px] right-[20px] text-center">
                  <div
                    className="font-dm-sans text-[16px] font-semibold text-white"
                    style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
                  >
                    {item.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Agents */}
        <div className="mb-[80px]">
          <h2 className="font-dm-sans text-[35px] font-semibold text-black leading-normal mb-[30px]">
            Top Agents
          </h2>

          <div className="grid grid-cols-4 gap-[20px]">
            {[
              {
                name: "Shopie Dsouza",
                company: "Camana Technologies LLC",
                rating: "4.9",
              },
              {
                name: "Michael Johnson",
                company: "Global Properties Inc",
                rating: "4.8",
              },
              {
                name: "Sarah Williams",
                company: "Elite Realty Group",
                rating: "4.9",
              },
              {
                name: "David Chen",
                company: "International Properties",
                rating: "4.7",
              },
            ].map((agent, index) => {
              // Make Camana Technologies LLC clickable to agency profile
              const isAgentProfile =
                agent.company === "Camana Technologies LLC";

              const content = (
                <div
                  className={`border border-gray-light bg-white p-[20px] text-center ${isAgentProfile ? "hover:shadow-lg transition-shadow cursor-pointer" : ""}`}
                >
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/21584c4a5fb695a4f53c9f609c46424507f3b08c?width=98"
                    alt={agent.name}
                    className="w-[80px] h-[80px] rounded-full mx-auto mb-[15px]"
                  />
                  <div className="font-dm-sans text-[16px] font-semibold italic text-black mb-[5px]">
                    {agent.name}
                  </div>
                  <div className="font-dm-sans text-[12px] font-normal italic text-[#666] mb-[5px]">
                    {agent.company}
                  </div>
                  <div className="font-dm-sans text-[14px] font-medium text-red-accent">
                    ★★★★★ {agent.rating}
                  </div>
                  {isAgentProfile && (
                    <div className="mt-[10px] text-sm text-blue-600 hover:text-blue-800">
                      View Agent Profile →
                    </div>
                  )}
                </div>
              );

              if (isAgentProfile) {
                return (
                  <Link key={index} to="/AgentProfile" className="block">
                    {content}
                  </Link>
                );
              }

              return <div key={index}>{content}</div>;
            })}
          </div>
        </div>

        {/* Latest Journal */}
        <div className="mb-[80px]">
          <h2 className="font-dm-sans text-[35px] font-semibold text-black leading-normal mb-[30px]">
            Latest Journal
          </h2>

          <div className="grid grid-cols-3 gap-[20px]">
            {[
              {
                image:
                  "https://api.builder.io/api/v1/image/assets/TEMP/1c586a2bf796f43887671486f52e771a180c6321?width=1032",
                title: "MEET TYLER MOORE'S $100 MILLION COMPOUND IN LA",
                description:
                  "An exclusive look inside one of Los Angeles' most spectacular luxury estates.",
              },
              {
                image:
                  "https://api.builder.io/api/v1/image/assets/TEMP/b2aaf4ab7fe943123c831e8c3b0baabf8cb2f86e?width=1032",
                title: "THIS $115 MILLION WILLIAM HAINES ESTATE IS A MONUMENT",
                description:
                  "Discover the architectural masterpiece that defines luxury living in Beverly Hills.",
              },
              {
                image:
                  "https://api.builder.io/api/v1/image/assets/TEMP/56cbf0ba5ca3f6afb6d89b14b20678c2c6f63047?width=1032",
                title: "PEEK YOUR MIND INTO A MODERN MANSION",
                description:
                  "Contemporary design meets timeless elegance in this stunning modern estate.",
              },
            ].map((article, index) => (
              <Link
                key={index}
                to="/journal"
                className="overflow-hidden bg-white hover:shadow-lg transition-shadow"
              >
                <div className="h-[220px] overflow-hidden">
                  <img
                    src={article.image}
                    alt="Article"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-[20px]">
                  <h3 className="font-dm-sans text-[18px] font-bold leading-[24px] text-black uppercase mb-[10px]">
                    {article.title}
                  </h3>
                  <p className="font-dm-sans text-[14px] font-normal leading-[20px] text-[#666]">
                    {article.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter Signup (CTA) */}
        <div className="mb-[80px] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 bg-black">
            {/* Left: Image with overlay text */}
            <div className="relative h-[420px]">
              <img
                src={imgGroup12FigureGallery1Jpg}
                alt="Development"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/35" />
              <div className="relative z-10 h-full flex flex-col justify-center gap-4 p-6 sm:p-10 text-white">
                <div className="font-dm-sans text-[14px] font-semibold tracking-[2px] uppercase">
                  Coming in April
                </div>
                <h3 className="font-dm-sans text-[28px] sm:text-[32px] lg:text-[35px] font-bold leading-[1.2] max-w-[520px]">
                  New luxury Development on palm Jumeirah
                </h3>
                <p className="font-dm-sans text-[16px] text-white/85 max-w-[520px">
                  The last new high-end project on the palm!
                </p>
                <p className="font-dm-sans text-[16px] text-white/85 max-w-[520px">
                  Members will get project details 5 days before the official
                  reveal
                </p>
              </div>
            </div>

            {/* Right: Form panel */}
            <div className="p-6 sm:p-8 lg:p-10 text-white">
              <h3 className="font-dm-sans text-[24px] sm:text-[28px] font-semibold mb-2">
                Secure you unit before it hits the market
              </h3>
              <p className="font-dm-sans text-[14px] text-white/80 mb-6">
                don't miss this unique opportunity
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  aria-label="Your Name"
                  className="px-4 py-3 bg-transparent border border-white/25 text-white placeholder-white/60 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Your Name"
                  aria-label="Your Name"
                  className="px-4 py-3 bg-transparent border border-white/25 text-white placeholder-white/60 focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Phone Number"
                  aria-label="Phone Number"
                  className="w-full px-4 py-3 bg-transparent border border-white/25 text-white placeholder-white/60 focus:outline-none"
                />
              </div>

              <div className="space-y-2 mb-6">
                <label className="flex items-start gap-2 text-[12px] sm:text-[13px] text-white/85">
                  <input type="checkbox" defaultChecked className="mt-[2px]" />
                  <span>
                    Lorem Ipsum is simply dummy text of the printing and
                  </span>
                </label>
                <label className="flex items-start gap-2 text-[12px] sm:text-[13px] text-white/85">
                  <input type="checkbox" className="mt-[2px]" />
                  <span>
                    Lorem Ipsum is simply dummy text of the printing and
                  </span>
                </label>
              </div>

              <button className="w-full bg-red-accent hover:bg-red-accent/90 text-white font-dm-sans font-semibold py-[12px] px-4">
                Join our Club
              </button>
            </div>
          </div>
        </div>

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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-[18px]">
      {items.map((p) => (
        <Link
          key={p.id}
          to={`/listing/${p.slug}`}
          className="w-full border border-gray-light bg-white p-[10px] block hover:shadow-lg transition-shadow"
        >
          <div className="relative h-[316px] mb-[10px]">
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
          <div className="flex flex-col gap-[11px]">
            <div className="flex items-center justify-between">
              <div className="font-dm-sans text-[23.607px] font-semibold text-black leading-[28.328px] tracking-[-0.472px]">
                {new Intl.NumberFormat(undefined, {
                  style: "currency",
                  currency: p.price_currency,
                }).format(p.price_amount)}
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
              <img
                src={
                  p.agent?.agency?.logo_url ||
                  "https://api.builder.io/api/v1/image/assets/TEMP/b69a8ad654149a58105e1fcba5d408a8585535b9?width=146"
                }
                alt="Company Logo"
                className="w-[73px] h-[26px]"
              />
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

  React.useEffect(() => {
    API.properties
      .trending(9) // Fetch more items for carousel
      .then(setItems)
      .catch((e) => setError(String(e)));
  }, []);

  if (error) return <TrendingPropertiesPlaceholder />;
  if (!items) return <TrendingPropertiesPlaceholder />;

  const totalSlides = Math.ceil(items.length / 3);
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

  const startIndex = currentIndex * 3;
  const visibleItems = items.slice(startIndex, startIndex + 3);

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[18px]">
        {visibleItems.map((p) => (
          <Link
            key={p.id}
            to={`/listing/${p.slug}`}
            className="w-full border border-gray-light bg-white p-[10px] block hover:shadow-lg transition-shadow"
          >
            <div className="relative h-[316px] mb-[10px]">
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
            <div className="flex flex-col gap-[11px]">
              <div className="flex items-center justify-between">
                <div className="font-dm-sans text-[23.607px] font-semibold text-black leading-[28.328px] tracking-[-0.472px]">
                  {new Intl.NumberFormat(undefined, {
                    style: "currency",
                    currency: p.price_currency,
                  }).format(p.price_amount)}
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
                <img
                  src={
                    p.agent?.agency?.logo_url ||
                    "https://api.builder.io/api/v1/image/assets/TEMP/b69a8ad654149a58105e1fcba5d408a8585535b9?width=146"
                  }
                  alt="Company Logo"
                  className="w-[73px] h-[26px]"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Navigation Arrows */}
      {totalSlides > 1 && (
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={goToPrevious}
            disabled={!canGoLeft}
            className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
              canGoLeft
                ? "border-black text-black hover:bg-black hover:text-white"
                : "border-gray-300 text-gray-300 cursor-not-allowed"
            }`}
            aria-label="Previous properties"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalSlides }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === currentIndex ? "bg-black" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            disabled={!canGoRight}
            className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
              canGoRight
                ? "border-black text-black hover:bg-black hover:text-white"
                : "border-gray-300 text-gray-300 cursor-not-allowed"
            }`}
            aria-label="Next properties"
          >
            <ArrowRight className="w-5 h-5" />
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
          className="w-full border border-gray-light bg-white p-[10px]"
        >
          <div className="relative h-[316px] mb-[10px]">
            <div className="w-full h-full animate-pulse bg-gray-200" />
          </div>
          <div className="flex flex-col gap-[11px]">
            <div className="flex items-center justify-between">
              <div className="h-[24px] w-[130px] animate-pulse bg-gray-200" />
              <div className="h-[18px] w-[110px] animate-pulse bg-gray-200" />
            </div>
            <div className="h-[18px] w-3/4 animate-pulse bg-gray-200" />
            <div className="flex items-center gap-[10px] text-[12.8px] text-black">
              <div className="h-[18px] w-[70px] animate-pulse bg-gray-200" />
              <span>|</span>
              <div className="h-[18px] w-[30px] animate-pulse bg-gray-200" />
              <div className="h-[18px] w-[30px] animate-pulse bg-gray-200" />
              <span>|</span>
              <div className="h-[18px] w-[90px] animate-pulse bg-gray-200" />
            </div>
            <div className="h-[1px] bg-gray-light"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[5px]">
                <div className="w-[49px] h-[49px] rounded-full animate-pulse bg-gray-200" />
                <div>
                  <div className="h-[16px] w-[120px] animate-pulse bg-gray-200" />
                  <div className="h-[12px] w-[160px] mt-1 animate-pulse bg-gray-200" />
                </div>
              </div>
              <div className="h-[26px] w-[73px] animate-pulse bg-gray-200" />
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">
      {items.map((p) => (
        <Link
          key={p.id}
          to={`/listing/${p.slug}`}
          className="border border-gray-light overflow-hidden bg-white hover:shadow-lg transition-shadow"
        >
          <div className="h-[180px] overflow-hidden">
            <img
              src={p.primary_image_url}
              alt={p.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-[15px]">
            <h3 className="font-dm-sans text-[16px] font-semibold text-black mb-[8px]">
              {p.title}
            </h3>
            <div className="font-dm-sans text-[18px] font-bold text-red-accent mb-[8px]">
              {new Intl.NumberFormat(undefined, {
                style: "currency",
                currency: p.price_currency,
              }).format(p.price_amount)}
            </div>
            <div className="font-dm-sans text-[12px] font-normal text-[#666]">
              {p.bedrooms} bed • {p.bathrooms} bath • {p.area_value}{" "}
              {p.area_unit}
            </div>
          </div>
        </Link>
      ))}
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

  const renderFallback = (
    <div className="relative mb-[100px] overflow-hidden">
      <img
        src={imgDivElementorElement1}
        alt="Featured"
        className="w-full h-auto block"
      />
    </div>
  );

  if (error) return renderFallback;
  if (!items || items.length === 0) return renderFallback;

  const current = items[idx];

  return (
    <div className="relative mb-[100px] overflow-hidden">
      <img
        src={current.primary_image_url}
        alt={current.title}
        className="w-full h-auto block"
      />
      {/* glass morphism pill */}
      <div className="absolute left-4 bottom-[110px]">
        <div className="backdrop-blur-md bg-white/15 border border-white/20 text-white px-4 py-2 inline-flex items-center rounded-md">
          <span className="font-dm-sans text-[14px] font-semibold">
            Featured listings
          </span>
        </div>
      </div>
      {/* title + price */}
      <div className="absolute left-4 bottom-6 right-24 text-white">
        <Link to={`/listing/${current.slug}`} className="block">
          <div className="font-dm-sans text-[22px] sm:text-[26px] font-bold mb-2 hover:underline">
            {current.title}
          </div>
        </Link>
        <div className="flex items-center gap-4 text-[14px]">
          <span className="opacity-90">
            {new Intl.NumberFormat(undefined, {
              style: "currency",
              currency: current.price_currency,
            }).format(current.price_amount)}
          </span>
        </div>
      </div>
      {/* nav buttons bottom-right */}
      <div className="absolute right-4 bottom-6 flex gap-2">
        <button
          aria-label="Previous"
          onClick={() =>
            setIdx((i) => (items ? (i - 1 + items.length) % items.length : 0))
          }
          className="size-10 grid place-items-center rounded-md backdrop-blur-md bg-black/25 border border-white/20 text-white"
        >
          ‹
        </button>
        <button
          aria-label="Next"
          onClick={() => setIdx((i) => (items ? (i + 1) % items.length : 0))}
          className="size-10 grid place-items-center rounded-md backdrop-blur-md bg-black/25 border border-white/20 text-white"
        >
          ›
        </button>
      </div>
    </div>
  );
}
