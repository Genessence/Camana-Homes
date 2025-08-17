import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const countries = [
    "Spain", "Italy", "Switzerland", "Mexico", "Australia", 
    "South Africa", "Germany", "Greece", "United States"
  ];

  return (
    <header className="relative border-b border-white/20">
      {/* Top Navigation */}
      <div className="relative h-20 bg-black/15 backdrop-blur-sm border-t border-b border-white">
        <div className="container mx-auto px-16 h-full flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/5a19f6126fa6dcda25d289130b048916b16fa621?width=310"
              alt="Camana Homes"
              className="h-11"
            />
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-0">
            <Button 
              variant="outline" 
              className="bg-transparent border-white text-white hover:bg-white/10 rounded-none h-[50px] px-5"
            >
              Buy
            </Button>
            <Button 
              variant="outline" 
              className="bg-transparent border-white text-white hover:bg-white/10 rounded-none h-[50px] px-5 border-l-0"
            >
              Sell
            </Button>
            <Button 
              variant="outline" 
              className="bg-transparent border-white text-white hover:bg-white/10 rounded-none h-[50px] px-5 border-l-0"
            >
              Rent
            </Button>
            <Button 
              variant="outline" 
              className="bg-transparent border-white text-white hover:bg-white/10 rounded-none h-[50px] px-7 border-l-0"
            >
              Mortgage
            </Button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-0">
            <Button 
              variant="outline" 
              className="bg-white/14 border-white text-white hover:bg-white/20 rounded-none h-[50px] px-5 text-sm"
            >
              Get Connected
            </Button>
            <Button 
              className="bg-white text-black hover:bg-gray-100 rounded-none h-[50px] px-5 text-sm font-medium"
            >
              Agent Login
            </Button>
            <button className="ml-6 p-3">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M0 16.0444H20" stroke="white" strokeWidth="1.6"/>
                <path d="M0 10.0444H20" stroke="white" strokeWidth="1.6"/>
                <path d="M0 4.04443H20" stroke="white" strokeWidth="1.6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Country Navigation */}
      <div className="relative h-12 bg-black/15 backdrop-blur-sm border-t border-b border-white">
        <div className="container mx-auto px-16 h-full">
          <div className="flex items-center justify-center gap-6 h-full">
            {countries.map((country) => (
              <button
                key={country}
                className="text-white text-[17px] font-medium hover:text-white/80 transition-colors"
              >
                {country}
              </button>
            ))}
            <div className="relative">
              <button
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className="flex items-center gap-2 text-white text-[17px] font-medium hover:text-white/80 transition-colors"
              >
                More
                <svg width="11" height="6" viewBox="0 0 11 6" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.84086 5.85979C5.74711 5.95342 5.62003 6.00601 5.48753 6.00601C5.35503 6.00601 5.22794 5.95342 5.13419 5.85979L0.134195 0.859786C0.0458745 0.765002 -0.00220758 0.639638 7.7898e-05 0.510104C0.00236338 0.38057 0.054838 0.25698 0.146447 0.165371C0.238055 0.0737625 0.361645 0.021288 0.491179 0.0190025C0.620714 0.0167171 0.746078 0.064799 0.840861 0.153119L5.48753 4.79979L10.1342 0.153119C10.18 0.103994 10.2352 0.064593 10.2965 0.0372651C10.3578 0.0099371 10.424 -0.00475725 10.4912 -0.00594178C10.5583 -0.0071263 10.625 0.0052233 10.6873 0.0303706C10.7495 0.055518 10.8061 0.0929477 10.8536 0.140427C10.901 0.187906 10.9385 0.244462 10.9636 0.306721C10.9888 0.368979 11.0011 0.435665 10.9999 0.502801C10.9987 0.569936 10.984 0.636145 10.9567 0.697478C10.9294 0.758811 10.89 0.814011 10.8409 0.859786L5.84086 5.85979Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
