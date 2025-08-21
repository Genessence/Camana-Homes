import { Button } from "@/components/ui/button";

export function PropertiesSection() {
  const properties = [
    {
      id: 1,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/13fb75f7448d0ee8f2d1139448c870ef8bbd182d?width=913",
      price: "$1,008,061",
      title: "Semi Detached Villas",
      location: "Dubai",
      beds: 4,
      baths: 4,
      sqft: "2,000",
      agent: "https://api.builder.io/api/v1/image/assets/TEMP/6a16d6308f66c7bfcf2ecc453dcebc61bfe710e2?width=149"
    },
    {
      id: 2,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/dc7cae12cba183c02a699e29aaa33227e5b52941?width=913",
      price: "$611,131",
      title: "Pool View | 2 Br+Maids",
      location: "New York City",
      beds: 4,
      baths: 4,
      sqft: "2,000",
      agent: "https://api.builder.io/api/v1/image/assets/TEMP/f81f87b885c41040bde8c7ac7dbbffa4ad2657be?width=149"
    },
    {
      id: 3,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/00a217a4ed88a7bd4fda6ff4655a38488ce169ba?width=913",
      price: "$778,909",
      title: "Six Luxurious Ski In",
      location: "LA",
      beds: 4,
      baths: 4,
      sqft: "2,000",
      contactAgent: true
    },
    {
      id: 4,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/00a217a4ed88a7bd4fda6ff4655a38488ce169ba?width=913",
      price: "$778,909",
      title: "Six Luxurious Ski In",
      location: "LA",
      beds: 4,
      baths: 4,
      sqft: "2,000",
      contactAgent: true
    },
    {
      id: 5,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/13fb75f7448d0ee8f2d1139448c870ef8bbd182d?width=913",
      price: "$1,008,061",
      title: "Semi Detached Villas",
      location: "Dubai",
      beds: 4,
      baths: 4,
      sqft: "2,000",
      agent: "https://api.builder.io/api/v1/image/assets/TEMP/6a16d6308f66c7bfcf2ecc453dcebc61bfe710e2?width=149"
    },
    {
      id: 6,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/dc7cae12cba183c02a699e29aaa33227e5b52941?width=913",
      price: "$611,131",
      title: "Pool View | 2 Br+Maids",
      location: "New York City",
      beds: 4,
      baths: 4,
      sqft: "2,000",
      agent: "https://api.builder.io/api/v1/image/assets/TEMP/f81f87b885c41040bde8c7ac7dbbffa4ad2657be?width=149"
    }
  ];

  return (
    <>
      {/* Welcome Section */}
      <section className="py-10">
        <div className="container mx-auto px-16">
          <div className="max-w-6xl mx-auto text-center space-y-5">
            <p className="text-white text-base leading-6 -tracking-[0.32px]">
              Welcome to Camana Homes
            </p>
            <h2 className="text-white text-[122px] font-bold leading-normal uppercase">
              unparalleled passion<br />
              unmatched results
            </h2>
            <p className="text-white text-base leading-6 -tracking-[0.32px] max-w-[956px] mx-auto">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            </p>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section className="bg-white/10 py-8">
        <div className="container mx-auto px-16">
          <div className="text-center mb-8">
            <h3 className="text-white text-[35px] font-semibold leading-normal max-w-[924px] mx-auto">
              Get a curated list of properties and invitation to exclusive developer events
            </h3>
          </div>

          {/* Properties Grid */}
          <div className="space-y-8">
            {/* First Row */}
            <div className="grid grid-cols-3 gap-4">
              {properties.slice(0, 3).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-3 gap-4">
              {properties.slice(3, 6).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>

          {/* View All Button */}
          <div className="flex justify-start mt-8">
            <Button className="bg-white text-black hover:bg-gray-100 h-[50px] px-9 font-medium">
              View all
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

function PropertyCard({ property }: { property: any }) {
  return (
    <div className="bg-white/10 p-2 h-[357px]">
      {/* Property Image */}
      <div className="relative h-70 mb-2 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/67" />
        
        {/* Lock Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" className="drop-shadow-lg">
            <g clipPath="url(#clip0_lock)">
              <path d="M42.0629 21.5063C40.8391 20.2828 39.2121 19.6094 37.482 19.6094H37.0133V13.1703C37.0133 6.59297 31.6625 1.24219 25.0855 1.24219H24.6445C18.0676 1.24219 12.7164 6.59297 12.7164 13.1703V19.609H12.2477C10.5176 19.609 8.89062 20.2828 7.6668 21.5063C6.44336 22.7301 5.76953 24.357 5.76953 26.0875V42.2797C5.76953 44.0102 6.44336 45.6371 7.6668 46.8602C8.89023 48.084 10.5172 48.7578 12.2477 48.7578H37.482C39.2125 48.7578 40.8395 48.084 42.0633 46.8602C43.2867 45.6367 43.9605 44.0098 43.9605 42.2797V26.0875C43.9605 24.3574 43.2867 22.7305 42.0629 21.5063ZM15.8414 13.1703C15.8414 8.31641 19.7902 4.36719 24.6445 4.36719H25.0855C29.9395 4.36719 33.8883 8.31641 33.8883 13.1703V19.609H15.8414V13.1703ZM40.8355 42.2797C40.8355 43.1621 40.4773 44.0262 39.8535 44.6504C39.2199 45.284 38.3777 45.6328 37.482 45.6328H12.2477C11.352 45.6328 10.5102 45.284 9.87617 44.65C9.24297 44.0172 8.89414 43.1754 8.89414 42.2797V26.0875C8.89414 25.1918 9.24297 24.3492 9.87617 23.716C10.5098 23.0828 11.3516 22.734 12.2473 22.734H37.4816C38.3773 22.734 39.2195 23.0828 39.8527 23.7156C40.4863 24.3496 40.8352 25.1918 40.8352 26.0875L40.8355 42.2797Z" fill="white"/>
              <path d="M24.8652 29.8688C24.0023 29.8688 23.3027 30.5684 23.3027 31.4313V36.936C23.3027 37.7989 24.0023 38.4985 24.8652 38.4985C25.7281 38.4985 26.4277 37.7989 26.4277 36.936V31.4313C26.4277 30.5684 25.7281 29.8688 24.8652 29.8688Z" fill="white"/>
            </g>
            <defs>
              <clipPath id="clip0_lock">
                <rect width="50" height="50" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>

      {/* Property Details */}
      <div className="space-y-2">
        {/* Price and Agent */}
        <div className="flex justify-between items-start">
          <h4 className="text-white text-[21px] font-semibold leading-6 -tracking-[0.42px]">
            {property.price}
          </h4>
          {property.contactAgent ? (
            <div className="flex items-center gap-2">
              <span className="text-white text-xs font-semibold">Contact Agent</span>
              <svg width="7" height="11" viewBox="0 0 7 11" fill="none">
                <path d="M1.16016 9.92383L5.50847 5.57551L1.16016 1.2272" stroke="#999999" strokeWidth="1.32725" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          ) : (
            <img src={property.agent} alt="Agent" className="w-19 h-7" />
          )}
        </div>

        {/* Title and Location */}
        <h5 className="text-white text-base font-bold leading-5 -tracking-[0.31px]">
          {property.title} | {property.location}
        </h5>

        {/* Property Stats */}
        <div className="flex items-center gap-4 text-white text-[10px] leading-4 -tracking-[0.21px]">
          <div className="flex items-center gap-1">
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none">
              <path d="M13.9432 7.74173V5.92711C13.9432 4.85008 13.062 3.96887 11.9849 3.96887H9.37395C8.87134 3.96887 8.41441 4.1647 8.06846 4.47801C7.72251 4.1647 7.26558 3.96887 6.76297 3.96887H4.15199C3.07497 3.96887 2.19376 4.85008 2.19376 5.92711V7.74173C1.79559 8.10074 1.54102 8.61641 1.54102 9.19083V13.1073H2.8465V11.8018H13.2904V13.1073H14.5959V9.19083C14.5959 8.61641 14.3413 8.10074 13.9432 7.74173ZM9.37395 5.27436H11.9849C12.3439 5.27436 12.6377 5.5681 12.6377 5.92711V7.23259H8.7212V5.92711C8.7212 5.5681 9.01494 5.27436 9.37395 5.27436ZM3.49925 5.92711C3.49925 5.5681 3.79298 5.27436 4.15199 5.27436H6.76297C7.12198 5.27436 7.41572 5.5681 7.41572 5.92711V7.23259H3.49925V5.92711ZM2.8465 10.4963V9.19083C2.8465 8.83182 3.14024 8.53808 3.49925 8.53808H12.6377C12.9967 8.53808 13.2904 8.83182 13.2904 9.19083V10.4963H2.8465Z" fill="white"/>
            </svg>
            <span>{property.beds} bed</span>
          </div>

          <div className="flex items-center gap-1">
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none">
              <path d="M4.83869 6.57973C5.55969 6.57973 6.14418 5.99524 6.14418 5.27424C6.14418 4.55324 5.55969 3.96875 4.83869 3.96875C4.11769 3.96875 3.5332 4.55324 3.5332 5.27424C3.5332 5.99524 4.11769 6.57973 4.83869 6.57973Z" fill="white"/>
              <path d="M13.3236 9.19056V3.85764C13.3236 2.83936 12.4946 2.01038 11.4764 2.01038C10.9868 2.01038 10.5168 2.2062 10.1709 2.55215L9.35493 3.36808C9.25049 3.33545 9.13953 3.31586 9.02203 3.31586C8.76093 3.31586 8.51942 3.39419 8.31707 3.52474L10.1186 5.32632C10.2492 5.12397 10.3275 4.88245 10.3275 4.62135C10.3275 4.50386 10.3079 4.39942 10.2818 4.28845L11.0978 3.47252C11.1957 3.37461 11.3327 3.31586 11.4764 3.31586C11.7766 3.31586 12.0181 3.55738 12.0181 3.85764V9.19056H7.54683C7.35101 9.05349 7.17477 8.89683 7.01158 8.72059L6.09774 7.70883C5.97372 7.57176 5.81706 7.46079 5.64734 7.38246C5.44499 7.28455 5.22306 7.23233 4.9946 7.23233C4.1852 7.23886 3.53245 7.8916 3.53245 8.70101V9.19056H1.57422V13.107C1.57422 13.825 2.16169 14.4125 2.87971 14.4125C2.87971 14.7715 3.17344 15.0653 3.53245 15.0653H12.6709C13.0299 15.0653 13.3236 14.7715 13.3236 14.4125C14.0416 14.4125 14.6291 13.825 14.6291 13.107V9.19056H13.3236Z" fill="white"/>
            </svg>
            <span>{property.baths} bath</span>
          </div>

          <div className="flex items-center gap-1">
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
              <path d="M13.9875 2.66333L13.883 2.68291L10.3974 4.03409L6.48092 2.66333L2.79944 3.90354C2.66236 3.94924 2.56445 4.06673 2.56445 4.21686V14.0864C2.56445 14.2691 2.70806 14.4127 2.89083 14.4127L2.99526 14.3931L6.48092 13.042L10.3974 14.4127L14.0789 13.1725C14.2159 13.1268 14.3139 13.0093 14.3139 12.8592V2.9897C14.3139 2.80693 14.1703 2.66333 13.9875 2.66333ZM10.3974 13.1072L6.48092 11.73V3.96882L10.3974 5.34611V13.1072Z" fill="white"/>
            </svg>
            <span>{property.sqft} sq ft</span>
          </div>
        </div>
      </div>
    </div>
  );
}
