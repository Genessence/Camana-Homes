import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

export default function StayInTheKnow() {
  return (
    <section className="w-full bg-white py-10 md:py-[40px]">
      <div className="max-w-[1600px] mx-auto px-4 md:px-[70px]">
        {/* Section Title */}
        <h2 className="text-black font-dm-sans text-[28px] md:text-[35px] font-semibold mb-[79px]">
          Stay in the know
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-0">
          {/* Left Side - Image Carousel */}
          <div className="lg:w-[685px] relative">
            {/* Main Image */}
            <div className="relative h-[270px] md:h-[335px] overflow-hidden">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/e1dc3c0200242ea858c39ecbb6de275ba67c6a48?width=1370"
                alt="Luxury Property"
                className="w-full h-full object-cover"
              />
              
              {/* Navigation Arrows */}
              <button className="absolute left-[10px] top-1/2 transform -translate-y-1/2 w-[70px] h-[46px] rounded-full bg-black/20 backdrop-blur-[25px] flex items-center justify-center hover:bg-black/30 transition-colors">
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>
              <button className="absolute right-[10px] top-1/2 transform -translate-y-1/2 w-[70px] h-[46px] rounded-full bg-black/20 backdrop-blur-[25px] flex items-center justify-center hover:bg-black/30 transition-colors">
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
          
          {/* Right Side - Social Stats and Video */}
          <div className="flex-1 flex flex-col gap-8 lg:ml-8">
            {/* Social Stats Card */}
            <div className="bg-black p-8 text-white h-[268px] flex flex-col justify-between">
              <div>
                <div className="mb-6">
                  <div className="text-[32px] md:text-[40px] font-dm-serif leading-[52px] mb-2">
                    280k +
                  </div>
                  <div className="text-white font-dm-sans text-[19px]">
                    Followers
                  </div>
                </div>
                
                <p className="text-white font-dm-sans text-[15px] leading-normal mb-6">
                  Join us at Our Social handles to get updated soon.
                </p>
              </div>
              
              {/* Social Icons */}
              <div className="flex items-center gap-4">
                <span className="text-white font-dm-sans text-[15px] font-medium">
                  Follow Us:
                </span>
                <div className="flex items-center gap-4">
                  {/* Facebook */}
                  <div className="w-4 h-4 text-white">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  {/* Instagram */}
                  <div className="w-4 h-4 text-brand-red">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  {/* Twitter */}
                  <div className="w-4 h-4 text-white">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </div>
                  {/* LinkedIn */}
                  <div className="w-4 h-4 text-white">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Video Preview */}
            <div className="relative h-[268px] overflow-hidden">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/47f6310cddff516bf00f6b7f62297289cfaa29ab?width=651"
                alt="Video Preview"
                className="w-full h-full object-cover"
              />
              
              {/* Play Button */}
              <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[57px] h-[57px] rounded-full border border-white/10 bg-black/17 backdrop-blur-sm flex items-center justify-center hover:bg-black/30 transition-colors">
                <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
              </button>
            </div>
          </div>
          
          {/* Far Right - Large Image */}
          <div className="lg:w-[745px] lg:ml-8 mt-8 lg:mt-0">
            <div className="relative h-[400px] lg:h-[566px] overflow-hidden">
              {/* Background Image */}
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/07e600b34e6023cc18698b909f4787a9662b96e0?width=1490"
                alt="Luxury Development"
                className="w-full h-full object-cover"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/10 to-black/80" />
              
              {/* Copy Icon */}
              <button className="absolute top-5 right-5 w-9 h-9 text-white hover:text-gray-300 transition-colors">
                <svg viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path d="M35.1211 23.1068H31.8263V26.9481C31.8263 27.514 31.4327 27.9727 30.9474 27.9727H27.6525V31.8137C27.6525 32.3797 27.259 32.8384 26.7735 32.8384H6.87891C6.39345 32.8384 6 32.3797 6 31.8137V15.5946C6 15.0287 6.39345 14.57 6.87891 14.57H10.1737V10.729C10.1737 10.163 10.5671 9.70432 11.0526 9.70432H14.3475V5.86301C14.3475 5.29733 14.741 4.83838 15.2265 4.83838H35.1211C35.6066 4.83838 36 5.29733 36 5.86301V22.0821C36 22.6481 35.6066 23.1068 35.1211 23.1068Z" fill="white"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
