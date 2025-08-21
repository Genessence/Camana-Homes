import { Link } from 'react-router-dom';
import { Star, ChevronDown } from 'lucide-react';

export default function CamanaFooter() {
  return (
    <footer className="w-full bg-[#EDEDED]">
      {/* Main Footer Content */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-[63px] py-[35px]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-[20px]">
          {/* Links Sections */}
          <div className="flex flex-col md:flex-row gap-8 lg:gap-[20px] flex-1">
            {/* Explore Section */}
            <div className="flex-1">
              <h3 className="text-black font-dm-sans text-[24px] font-bold mb-6">
                Explore
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/host" className="text-black font-dm-sans text-[18px] hover:text-gray-600 transition-colors">
                    Become a host
                  </Link>
                </li>
                <li>
                  <Link to="/partnerships" className="text-black font-dm-sans text-[18px] hover:text-gray-600 transition-colors">
                    Partnerships
                  </Link>
                </li>
                <li>
                  <Link to="/affiliate" className="text-black font-dm-sans text-[18px] hover:text-gray-600 transition-colors">
                    Affiliate program
                  </Link>
                </li>
                <li>
                  <Link to="/journal" className="text-black font-dm-sans text-[18px] hover:text-gray-600 transition-colors">
                    Journal
                  </Link>
                </li>
                <li>
                  <Link to="/vs-airbnb" className="text-black font-dm-sans text-[18px] hover:text-gray-600 transition-colors">
                    Camana vs Airbnb
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support Section */}
            <div className="flex-1">
              <h3 className="text-black font-dm-sans text-[24px] font-bold mb-6">
                Support
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/help" className="text-black font-dm-sans text-[18px] hover:text-gray-600 transition-colors">
                    Help centre
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-black font-dm-sans text-[18px] hover:text-gray-600 transition-colors">
                    Get in touch
                  </Link>
                </li>
                <li>
                  <Link to="/experts" className="text-black font-dm-sans text-[18px] hover:text-gray-600 transition-colors">
                    Travel experts
                  </Link>
                </li>
                <li>
                  <Link to="/cancellation" className="text-black font-dm-sans text-[18px] hover:text-gray-600 transition-colors">
                    Cancellation Policies
                  </Link>
                </li>
                <li>
                  <Link to="/reviews" className="text-black font-dm-sans text-[18px] hover:text-gray-600 transition-colors">
                    Reviews
                  </Link>
                </li>
              </ul>
            </div>

            {/* About Camana Section */}
            <div className="flex-1">
              <h3 className="text-black font-dm-sans text-[24px] font-bold mb-6">
                About Camana
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-black font-dm-sans text-[18px] hover:text-gray-600 transition-colors">
                    About us
                  </Link>
                </li>
                <li>
                  <Link to="/story" className="text-black font-dm-sans text-[18px] hover:text-gray-600 transition-colors">
                    Our story
                  </Link>
                </li>
                <li>
                  <Link to="/business" className="text-black font-dm-sans text-[18px] hover:text-gray-600 transition-colors">
                    Camana Guide for business
                  </Link>
                </li>
                <li>
                  <Link to="/test" className="text-black font-dm-sans text-[18px] hover:text-gray-600 transition-colors">
                    The Camana Test
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="text-black font-dm-sans text-[18px] hover:text-gray-600 transition-colors">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px bg-[#929292] mx-4" />

          {/* Right Side Content */}
          <div className="flex flex-col gap-8">
            {/* Google Rating */}
            <div className="bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-[60px] h-[60px]">
                  <svg viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <path d="M56.7568 30.8738C56.7568 28.9325 56.5826 27.0659 56.259 25.2739H30.4746V35.8764H45.2086C44.5615 39.2861 42.6202 42.1732 39.7082 44.1145V51.0086H48.5934C53.7702 46.23 56.7568 39.2115 56.7568 30.8738Z" fill="#4285F4"/>
                    <path d="M30.4746 57.6297C37.8665 57.6297 44.0637 55.1906 48.5934 51.0094L39.7082 44.1153C37.2692 45.7579 34.1581 46.7535 30.4746 46.7535C23.3565 46.7535 17.3086 41.95 15.1433 35.479H6.03418V42.5473C10.539 51.4823 19.7726 57.6297 30.4746 57.6297Z" fill="#34A853"/>
                    <path d="M15.1437 35.4541C14.5961 33.8115 14.2726 32.0693 14.2726 30.2524C14.2726 28.4356 14.5961 26.6934 15.1437 25.0507V17.9824H6.03449C4.16786 21.6659 3.09766 25.8223 3.09766 30.2524C3.09766 34.6826 4.16786 38.8389 6.03449 42.5224L13.1277 36.9972L15.1437 35.4541Z" fill="#FBBC05"/>
                    <path d="M30.4746 13.7752C34.5066 13.7752 38.0905 15.1689 40.9527 17.8569L48.7925 10.017C44.0388 5.58686 37.8665 2.87402 30.4746 2.87402C19.7726 2.87402 10.539 9.02147 6.03418 17.9813L15.1433 25.0496C17.3086 18.5786 23.3565 13.7752 30.4746 13.7752Z" fill="#EA4335"/>
                  </svg>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-brand-gray-700 text-[12px] font-bold">Google Rating</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[#FEA500] text-[19px] font-bold">4.9</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-[22px] h-[22px] text-[#FEA500] fill-current" />
                      ))}
                    </div>
                  </div>
                  <span className="text-[#868686] text-[9px]">See all our reviews</span>
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="flex flex-col gap-3">
              <h4 className="text-black font-dm-sans text-[21px] font-bold">Payment options</h4>
              <div className="flex flex-wrap gap-2">
                <img src="https://api.builder.io/api/v1/image/assets/TEMP/03d9cd049ccc79877b4a1e85fc2aa1aa8bdeec45?width=96" alt="Visa" className="h-[21px] w-[48px]" />
                <img src="https://api.builder.io/api/v1/image/assets/TEMP/59bad0d3358920205688283f8e62268e456ff7f6?width=96" alt="Mastercard" className="h-[21px] w-[48px]" />
                <img src="https://api.builder.io/api/v1/image/assets/TEMP/fb7a2003d7f362dca1edddce94c7d208072fce63?width=96" alt="American Express" className="h-[21px] w-[48px]" />
                <img src="https://api.builder.io/api/v1/image/assets/TEMP/396c3f8d64d797b758e3135c4bd57d15ef66ae23?width=96" alt="PayPal" className="h-[21px] w-[48px]" />
                <img src="https://api.builder.io/api/v1/image/assets/TEMP/31d6b802e8b9fd3855e56b5e6ddd409ff3838c88?width=96" alt="Apple Pay" className="h-[21px] w-[48px]" />
              </div>
            </div>

            {/* Property Dimensions Dropdown */}
            <div className="flex flex-col gap-3">
              <h4 className="text-black font-dm-sans text-[18px] font-bold">Property dimensions</h4>
              <div className="flex items-center justify-between border border-[#CACACA] px-3 py-2 w-[223px]">
                <span className="text-brand-gray-600 font-dm-sans text-[16px]">SQ. FT.</span>
                <ChevronDown className="w-[10px] h-[5px] text-brand-gray-600" />
              </div>
            </div>

            {/* Currency Dropdown */}
            <div className="flex flex-col gap-3">
              <h4 className="text-black font-dm-sans text-[18px] font-bold">Currency</h4>
              <div className="flex items-center justify-between border border-[#CACACA] px-3 py-2 w-[223px]">
                <span className="text-brand-gray-600 font-dm-sans text-[16px]">AED</span>
                <ChevronDown className="w-[10px] h-[5px] text-brand-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-[#929292] bg-[#EDEDED]">
        <div className="max-w-[1600px] mx-auto px-4 md:px-[70px] py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/1969a4286edf6c0d3efdbcea44d846c104d956a6?width=310" 
                alt="Camana Homes" 
                className="h-[43px] w-[155px]"
              />
            </Link>

            {/* Copyright */}
            <div className="text-center">
              <span className="text-black font-dm-sans text-[18px]">
                © Copyright <span className="font-bold">Camana Homes</span> 2025. All Right Reserved
              </span>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center gap-4">
              {/* Instagram, Facebook, LinkedIn, Twitter, YouTube, TikTok, Pinterest icons... */}
              <a href="#" className="w-[35px] h-[35px] text-black hover:text-gray-600 transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Legal Text */}
        <div className="max-w-[1600px] mx-auto px-4 md:px-[70px] pb-5">
          <p className="text-black font-dm-sans text-[16px] leading-[24px] text-center md:text-left">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            <br /><br />
            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
      </div>
    </footer>
  );
}
