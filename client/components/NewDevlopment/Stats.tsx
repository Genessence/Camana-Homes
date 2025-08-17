export default function Stats() {
  return (
    <section className="relative w-full py-10 md:py-20 bg-white overflow-hidden">
      {/* Decorative SVG */}
      <div className="absolute top-0 right-0 transform rotate-[-11.572deg]">
        <svg 
          width="409" 
          height="358" 
          viewBox="0 0 409 358" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-[592px] h-[565px] opacity-30"
        >
          <path 
            fillRule="evenodd" 
            clipRule="evenodd" 
            d="M249.445 9.0466L238.018 -46.7669L337.208 -67.0696L348.636 -11.2719C350.635 -1.47882 364.203 1.22383 370.92 -6.82963L408.285 -51.6453L487.388 4.096L450.017 48.9044C389.568 121.387 267.485 97.1282 249.445 9.0466Z" 
            fill="#F5F5F5"
          />
          <path 
            fillRule="evenodd" 
            clipRule="evenodd" 
            d="M444.184 289.112L455.609 344.926L356.418 365.243L344.993 309.43C342.993 299.637 329.425 296.935 322.699 304.995L285.336 349.796L206.239 294.063L243.612 249.254C304.059 176.771 426.134 201.037 444.184 289.112Z" 
            fill="#F5F5F5"
          />
          <path 
            fillRule="evenodd" 
            clipRule="evenodd" 
            d="M210.965 40.8538L152.786 23.6867L119.391 112.975L177.572 130.127C187.773 133.14 189.061 145.994 179.667 151.258L127.441 180.495L177.568 260.187L229.778 230.95C314.258 183.64 302.813 67.9289 210.975 40.8468L210.965 40.8538Z" 
            fill="#F5F5F5"
          />
          <path 
            fillRule="evenodd" 
            clipRule="evenodd" 
            d="M482.739 257.25L540.912 274.425L574.314 185.145L516.125 167.985C505.924 164.972 504.637 152.118 514.03 146.855L566.24 117.617L516.137 37.918L463.919 67.1617C379.448 114.465 390.901 230.168 482.722 257.265L482.739 257.25Z" 
            fill="#F5F5F5"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 md:px-[70px]">
        <div className="max-w-[1148px]">
          {/* Heading */}
          <h2 className="text-black font-dm-sans text-[28px] md:text-[35px] font-semibold leading-tight mb-5">
            BEYOND BORDERS, SEAMLESS CONNECTIONS
          </h2>
          
          {/* Description */}
          <p className="text-brand-gray-500 font-dm-sans text-[16px] md:text-[18px] leading-[28px] mb-[50px] md:mb-[104px] max-w-[1148px]">
            At Camana Homes, we believe luxury real estate should be borderless—accessible, verified, and effortless. Whether you're investing in a beachfront villa, a city penthouse, or a private island retreat, we connect you to the world's most exclusive properties with trust, transparency, and technology.
          </p>
          
          {/* Stats Cards */}
          <div className="flex flex-col md:flex-row gap-[30px] max-w-[880px]">
            {/* Card 1 */}
            <div className="flex-1 bg-brand-gray-50 p-[35px_40px] flex flex-col">
              <div className="text-brand-red text-[32px] md:text-[40px] font-dm-sans font-medium leading-[40px] mb-[10px]">
                $100 M +
              </div>
              <div className="text-black text-[18px] md:text-[21px] font-dm-sans font-medium leading-[27.3px]">
                Verified listings
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="flex-1 bg-brand-gray-50 p-[35px_40px] flex flex-col">
              <div className="text-brand-red text-[32px] md:text-[40px] font-dm-sans font-medium leading-[40px] mb-[10px]">
                20 +
              </div>
              <div className="text-black text-[18px] md:text-[21px] font-dm-sans font-medium leading-[27.3px]">
                Global Markets
              </div>
            </div>
            
            {/* Card 3 */}
            <div className="flex-1 bg-brand-gray-50 p-[35px_40px] flex flex-col">
              <div className="text-brand-red text-[32px] md:text-[40px] font-dm-sans font-medium leading-[40px] mb-[10px]">
                5000 +
              </div>
              <div className="text-black text-[18px] md:text-[21px] font-dm-sans font-medium leading-[27.3px]">
                Elite agents
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
