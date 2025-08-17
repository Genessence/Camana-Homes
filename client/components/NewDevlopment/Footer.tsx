import { Link } from 'react-router-dom';
import { Star, ChevronDown } from 'lucide-react';

export default function Footer() {
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
              {/* Instagram */}
              <a href="#" className="w-[35px] h-[35px] text-black hover:text-gray-600 transition-colors">
                <svg viewBox="0 0 36 36" fill="currentColor" className="w-full h-full">
                  <path d="M35.1211 23.1068H31.8263V26.9481C31.8263 27.514 31.4327 27.9727 30.9474 27.9727H27.6525V31.8137C27.6525 32.3797 27.259 32.8384 26.7735 32.8384H6.87891C6.39345 32.8384 6 32.3797 6 31.8137V15.5946C6 15.0287 6.39345 14.57 6.87891 14.57H10.1737V10.729C10.1737 10.163 10.5671 9.70432 11.0526 9.70432H14.3475V5.86301C14.3475 5.29733 14.741 4.83838 15.2265 4.83838H35.1211C35.6066 4.83838 36 5.29733 36 5.86301V22.0821C36 22.6481 35.6066 23.1068 35.1211 23.1068ZM7.75781 30.7891H25.8946V16.6193H7.75781V30.7891ZM11.9315 14.57H26.7735C27.259 14.57 27.6525 15.0287 27.6525 15.5946V25.9234H30.0685V11.7533H11.9315V14.57ZM34.2422 6.88765H16.1054V9.70406H30.9474C31.4329 9.70406 31.8263 10.163 31.8263 10.7287V21.0575H34.2422V6.88765Z"/>
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" className="w-[35px] h-[35px] text-black hover:text-gray-600 transition-colors">
                <svg viewBox="0 0 36 36" fill="currentColor" className="w-full h-full">
                  <path fillRule="evenodd" clipRule="evenodd" d="M23.8417 9.96046L21.6307 9.96193C19.8972 9.96193 19.5611 10.7889 19.5611 12.002V14.6789H23.6973L23.1578 18.8725H19.5611V29.63H15.2496V18.8725H11.6426V14.6789H15.2496V11.5878C15.2481 7.99851 17.4297 6.04541 20.6195 6.04541C22.1466 6.04541 23.4599 6.15891 23.8432 6.2105V9.96046H23.8417Z"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="w-[35px] h-[35px] text-black hover:text-gray-600 transition-colors">
                <svg viewBox="0 0 37 36" fill="currentColor" className="w-full h-full">
                  <path d="M11.0205 31.103H5.51639V13.388H11.0205V31.103ZM8.264 10.9721C6.50695 10.9721 5.08008 9.51571 5.08008 7.75571C5.08008 6.91089 5.41568 6.10067 6.01306 5.50329C6.61044 4.90592 7.42065 4.57031 8.26547 4.57031C9.11029 4.57031 9.92051 4.90592 10.5179 5.50329C11.1153 6.10067 11.4509 6.91089 11.4509 7.75571C11.4509 9.51571 10.024 10.9721 8.26695 10.9721H8.264ZM31.6069 31.103H26.1175V22.4799C26.1175 20.4251 26.0763 17.7895 23.2579 17.7895C20.3983 17.7895 19.959 20.0212 19.959 22.331V31.103H14.4653V13.3895H19.7409V15.8069H19.8175C20.5516 14.4154 22.3455 12.9473 25.0209 12.9473C30.5898 12.9473 31.6128 16.6117 31.6128 21.3729V31.103H31.6069Z"/>
                </svg>
              </a>
              {/* Twitter */}
              <a href="#" className="w-[35px] h-[35px] text-black hover:text-gray-600 transition-colors">
                <svg viewBox="0 0 36 36" fill="currentColor" className="w-full h-full">
                  <path d="M19.2037 16.1811L26.8062 7.34375H25.0046L18.4034 15.0171L13.1309 7.34375H7.0498L15.0228 18.9472L7.0498 28.2145H8.85147L15.8226 20.1112L21.3907 28.2145H27.4718L19.2032 16.1811H19.2037ZM16.736 19.0494L15.9282 17.894L9.50063 8.70001H12.2679L17.455 16.1198L18.2628 17.2753L25.0055 26.9199H22.2383L16.736 19.0499V19.0494Z"/>
                </svg>
              </a>
              {/* YouTube */}
              <a href="#" className="w-[35px] h-[35px] text-black hover:text-gray-600 transition-colors">
                <svg viewBox="0 0 36 36" fill="currentColor" className="w-full h-full">
                  <path d="M34.3154 7.52651C33.0383 6.00841 30.6805 5.38916 26.1776 5.38916H9.83192C5.22592 5.38916 2.82814 6.04835 1.55586 7.6646C0.31543 9.24045 0.31543 11.5623 0.31543 14.7759V20.9009C0.31543 27.1266 1.7872 30.2875 9.83192 30.2875H26.1777C30.0826 30.2875 32.2464 29.7411 33.6463 28.4014C35.0819 27.0275 35.6944 24.7844 35.6944 20.9009V14.7759C35.6944 11.3869 35.5984 9.05134 34.3154 7.52651ZM23.0288 18.684L15.6063 22.5633C15.4404 22.65 15.2589 22.693 15.0777 22.693C14.8725 22.693 14.6678 22.6378 14.4864 22.528C14.145 22.3211 13.9364 21.951 13.9364 21.5518V13.8181C13.9364 13.4196 14.1444 13.0498 14.4852 12.8428C14.8261 12.6358 15.25 12.6216 15.6037 12.8054L23.0262 16.6596C23.4039 16.8557 23.641 17.2456 23.6416 17.6709C23.642 18.0966 23.4059 18.487 23.0288 18.684Z"/>
                </svg>
              </a>
              {/* TikTok */}
              <a href="#" className="w-[28px] h-[28px] text-black hover:text-gray-600 transition-colors">
                <svg viewBox="0 0 29 29" fill="currentColor" className="w-full h-full">
                  <path d="M27.1034 7.8102C25.4941 7.8102 24.0093 7.27709 22.817 6.37773C21.4495 5.34675 20.467 3.83442 20.12 2.09133C20.0341 1.66065 19.9878 1.2162 19.9834 0.760742H15.3864V13.322L15.3809 20.2024C15.3809 22.0419 14.1831 23.6016 12.5226 24.1501C12.0407 24.3092 11.5202 24.3847 10.9783 24.355C10.2866 24.317 9.63835 24.1082 9.07495 23.7712C7.87599 23.0541 7.0631 21.7533 7.04107 20.2652C7.00637 17.9394 8.88659 16.0432 11.2107 16.0432C11.6695 16.0432 12.1101 16.1181 12.5226 16.2541V12.8208V11.5866C12.0875 11.5222 11.6447 11.4886 11.1969 11.4886C8.65308 11.4886 6.27389 12.546 4.5732 14.451C3.28778 15.8907 2.51674 17.7274 2.39778 19.6533C2.24192 22.1834 3.16772 24.5885 4.96313 26.363C5.22693 26.6235 5.50395 26.8652 5.79364 27.0883C7.33296 28.2729 9.21483 28.9151 11.1969 28.9151C11.6447 28.9151 12.0875 28.882 12.5226 28.8176C14.3742 28.5433 16.0826 27.6957 17.4308 26.363C19.0874 24.7256 20.0027 22.5518 20.0126 20.2382L19.9889 9.9636C20.7793 10.5733 21.6434 11.0777 22.5708 11.4693C24.0132 12.0779 25.5426 12.3863 27.1166 12.3857V9.04772V7.8091C27.1177 7.8102 27.1045 7.8102 27.1034 7.8102Z"/>
                </svg>
              </a>
              {/* Pinterest */}
              <a href="#" className="w-[28px] h-[28px] text-black hover:text-gray-600 transition-colors">
                <svg viewBox="0 0 29 29" fill="currentColor" className="w-full h-full">
                  <path d="M15.2847 0.739258C7.55495 0.740433 3.44629 5.69268 3.44629 11.0926C3.44629 13.5963 4.84561 16.7204 7.08616 17.7108C7.72531 17.9987 7.64072 17.6474 8.19058 15.5443C8.23405 15.3692 8.21173 15.2177 8.07074 15.0544C4.86793 11.3499 7.44568 3.7341 14.8276 3.7341C25.5111 3.7341 23.5149 18.5168 16.6864 18.5168C14.9263 18.5168 13.6151 17.1351 14.0299 15.4256C14.5327 13.3895 15.5173 11.2007 15.5173 9.7332C15.5173 6.03458 10.007 6.58326 10.007 11.4838C10.007 12.9983 10.5427 14.0204 10.5427 14.0204C10.5427 14.0204 8.76981 21.1827 8.44083 22.5209C7.88393 24.7861 8.51603 28.453 8.57125 28.7691C8.60532 28.943 8.80036 28.9982 8.90962 28.8549C9.08468 28.6258 11.2277 25.5686 11.8281 23.3586C12.0466 22.5538 12.9431 19.2876 12.9431 19.2876C13.5341 20.3544 15.2377 21.2473 17.0529 21.2473C22.4528 21.2473 26.3559 16.5007 26.3559 10.6109C26.3371 4.96424 21.5047 0.739258 15.2847 0.739258Z"/>
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
