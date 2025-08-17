export function Footer() {
  const footerLinks = {
    explore: [
      "Become a host",
      "Partnerships", 
      "Affiliate program",
      "Journal",
      "Camana vs Airbnb"
    ],
    support: [
      "Help centre",
      "Get in touch",
      "Travel experts", 
      "Cancellation Policies",
      "Reviews"
    ],
    about: [
      "About us",
      "Our story",
      "Camana Guide for business",
      "The Camana Test",
      "Careers"
    ]
  };

  const paymentLogos = [
    "https://api.builder.io/api/v1/image/assets/TEMP/9571e7ccfe325631c1352421ae9717f85c62c758?width=96",
    "https://api.builder.io/api/v1/image/assets/TEMP/818fb5ecfca97885420cb001b2bec217578c1d1d?width=96",
    "https://api.builder.io/api/v1/image/assets/TEMP/284df11f08da0a2007b969ea39dc657743bc3199?width=96",
    "https://api.builder.io/api/v1/image/assets/TEMP/e91bbefac1f9b9a5e44d0cf19c7a92192b253223?width=96",
    "https://api.builder.io/api/v1/image/assets/TEMP/2ea5f99725344cd3c6f281a73da73493d75828cc?width=96"
  ];

  const socialIcons = [
    // Instagram
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M17.6922 10.5801C16.6993 10.5787 15.7159 10.7733 14.7984 11.1527C13.8808 11.5322 13.0472 12.0889 12.3453 12.7912C11.6433 13.4934 11.0869 14.3272 10.7078 15.2449C10.3287 16.1626 10.1345 17.1461 10.1363 18.1389C10.1345 19.1318 10.3287 20.1153 10.7078 21.033C11.0869 21.9507 11.6433 22.7845 12.3453 23.4867C13.0472 24.1889 13.8808 24.7457 14.7984 25.1251C15.7159 25.5046 16.6993 25.6992 17.6922 25.6978C18.6853 25.6996 19.669 25.5052 20.5869 25.126C21.5048 24.7467 22.3388 24.19 23.041 23.4878C23.7433 22.7855 24.3 21.9515 24.6792 21.0337C25.0585 20.1158 25.2528 19.1321 25.251 18.1389C25.2526 17.146 25.0582 16.1625 24.679 15.2448C24.2997 14.3271 23.7432 13.4933 23.0411 12.7911C22.339 12.0889 21.5053 11.5321 20.5877 11.1527C19.6701 10.7733 18.6866 10.5787 17.6937 10.5801H17.6922ZM17.6922 23.0534C16.39 23.0503 15.1421 22.5314 14.2216 21.6104C13.3011 20.6893 12.783 19.4411 12.7807 18.1389C12.7819 16.8362 13.2998 15.5871 14.2209 14.6657C15.1419 13.7444 16.3909 13.2261 17.6937 13.2245C18.9962 13.2264 20.2447 13.7449 21.1655 14.6662C22.0862 15.5875 22.604 16.8364 22.6052 18.1389C22.6028 19.4414 22.0845 20.6898 21.1637 21.6109C20.2429 22.532 18.9946 23.0507 17.6922 23.0534ZM27.3206 10.272C27.3206 11.2508 26.532 12.0349 25.5591 12.0349C25.2104 12.0349 24.8696 11.9316 24.5797 11.7378C24.2898 11.5441 24.0638 11.2688 23.9304 10.9466C23.7969 10.6245 23.762 10.27 23.83 9.92806C23.8981 9.58608 24.066 9.27196 24.3125 9.0254C24.5591 8.77885 24.8732 8.61095 25.2152 8.54292C25.5572 8.4749 25.9116 8.50981 26.2338 8.64324C26.5559 8.77668 26.8312 9.00264 27.025 9.29256C27.2187 9.58247 27.3206 9.92332 27.3206 10.272ZM32.3264 12.06C32.2144 9.6986 31.6749 7.60841 29.9459 5.88379C28.2212 4.15916 26.1311 3.62114 23.7696 3.50174C21.3375 3.36465 14.041 3.36465 11.6088 3.50174C9.25479 3.61377 7.16313 4.15326 5.4326 5.87642C3.70356 7.60104 3.17143 9.6927 3.05203 12.0526C2.91495 14.4877 2.91495 21.7828 3.05203 24.2179C3.16406 26.5793 3.70356 28.6695 5.4326 30.3941C7.16313 32.1187 9.24742 32.6567 11.6088 32.7761C14.041 32.9132 21.3375 32.9132 23.7696 32.7761C26.1311 32.6641 28.2212 32.1246 29.9459 30.3941C31.6675 28.6695 32.207 26.5793 32.3264 24.2179C32.4635 21.7828 32.4635 14.4951 32.3264 12.06ZM29.1823 26.8299C28.9321 27.4636 28.5545 28.0392 28.0727 28.5209C27.5909 29.0027 27.0154 29.3804 26.3816 29.6305C24.4403 30.4015 19.8369 30.2231 17.6922 30.2231C15.5489 30.2231 10.9381 30.3941 9.0042 29.632C8.37019 29.3815 7.79444 29.0034 7.31266 28.5211C6.83088 28.0388 6.45336 27.4627 6.20353 26.8284C5.43261 24.8886 5.61096 20.2837 5.61096 18.1389C5.61096 15.9942 5.43997 11.3834 6.20205 9.44948C6.45205 8.81508 6.82979 8.23883 7.31184 7.75654C7.79388 7.27424 8.36992 6.89619 9.0042 6.64586C10.944 5.87642 15.5489 6.05477 17.6922 6.05477C19.8369 6.05477 24.4462 5.88379 26.3802 6.64586C27.0144 6.89619 27.5905 7.27424 28.0725 7.75654C28.5546 8.23883 28.9323 8.81508 29.1823 9.44948C29.9518 11.3893 29.7734 15.9942 29.7734 18.1389C29.7734 20.2837 29.9518 24.8959 29.1823 26.8299Z" fill="white"/>
    </svg>,
    // Facebook
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M23.8417 10.2622L21.6307 10.2637C19.8972 10.2637 19.5611 11.0906 19.5611 12.3038V14.9806H23.6973L23.1578 19.1742H19.5611V29.9318H15.2496V19.1742H11.6426V14.9806H15.2496V11.8896C15.2481 8.30027 17.4297 6.34717 20.6195 6.34717C22.1466 6.34717 23.4599 6.46067 23.8432 6.51226V10.2622H23.8417Z" fill="white"/>
    </svg>,
    // LinkedIn
    <svg width="37" height="36" viewBox="0 0 37 36" fill="none">
      <path d="M11.0205 31.405H5.51639V13.69H11.0205V31.405ZM8.264 11.2741C6.50695 11.2741 5.08008 9.81771 5.08008 8.05771C5.08008 7.21289 5.41568 6.40267 6.01306 5.8053C6.61044 5.20792 7.42065 4.87231 8.26547 4.87231C9.11029 4.87231 9.92051 5.20792 10.5179 5.8053C11.1153 6.40267 11.4509 7.21289 11.4509 8.05771C11.4509 9.81771 10.024 11.2741 8.26695 11.2741H8.264ZM31.6069 31.405H26.1175V22.7819C26.1175 20.7271 26.0763 18.0915 23.2579 18.0915C20.3983 18.0915 19.959 20.3232 19.959 22.633V31.405H14.4653V13.6915H19.7409V16.1089H19.8175C20.5516 14.7174 22.3455 13.2493 25.0209 13.2493C30.5898 13.2493 31.6128 16.9137 31.6128 21.6749V31.405H31.6069Z" fill="white"/>
    </svg>,
    // X (Twitter)
    <svg width="37" height="36" viewBox="0 0 37 36" fill="none">
      <path d="M20.2007 16.4831L27.8033 7.64575H26.0017L19.4004 15.3191L14.128 7.64575H8.04688L16.0198 19.2492L8.04688 28.5165H9.84854L16.8197 20.4132L22.3877 28.5165H28.4689L20.2003 16.4831H20.2007ZM17.7331 19.3514L16.9253 18.196L10.4977 9.00201H13.2649L18.4521 16.4218L19.2599 17.5773L26.0026 27.2219H23.2353L17.7331 19.3519V19.3514Z" fill="white"/>
    </svg>,
    // YouTube
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <g clipPath="url(#clip0_youtube)">
        <path d="M34.3144 7.82826C33.0374 6.31016 30.6795 5.69092 26.1766 5.69092H9.83094C5.22494 5.69092 2.82716 6.35011 1.55489 7.96636C0.314453 9.5422 0.314453 11.8641 0.314453 15.0776V21.2027C0.314453 27.4283 1.78622 30.5893 9.83094 30.5893H26.1767C30.0816 30.5893 32.2455 30.0428 33.6453 28.7031C35.0809 27.3293 35.6934 25.0861 35.6934 21.2027V15.0776C35.6934 11.6887 35.5974 9.3531 34.3144 7.82826ZM23.0279 18.9858L15.6054 22.865C15.4394 22.9517 15.258 22.9948 15.0767 22.9948C14.8715 22.9948 14.6668 22.9395 14.4854 22.8297C14.144 22.6228 13.9355 22.2527 13.9355 21.8535V14.1199C13.9355 13.7214 14.1434 13.3516 14.4842 13.1446C14.8251 12.9376 15.2491 12.9234 15.6027 13.1071L23.0252 16.9614C23.4029 17.1575 23.64 17.5473 23.6406 17.9727C23.6411 18.3984 23.4049 18.7888 23.0279 18.9858Z" fill="white"/>
      </g>
      <defs>
        <clipPath id="clip0_youtube">
          <rect width="35.379" height="35.379" fill="white" transform="translate(0.318359 0.450928)"/>
        </clipPath>
      </defs>
    </svg>,
    // TikTok
    <svg width="29" height="29" viewBox="0 0 29 29" fill="none">
      <g clipPath="url(#clip0_tiktok)">
        <path d="M27.1014 7.11221C25.4922 7.11221 24.0074 6.57909 22.815 5.67973C21.4476 4.64875 20.465 3.13642 20.1181 1.39333C20.0322 0.962652 19.9859 0.518206 19.9815 0.0627441H15.3845V12.624L15.379 19.5044C15.379 21.3439 14.1811 22.9036 12.5206 23.4521C12.0387 23.6113 11.5183 23.6867 10.9763 23.657C10.2846 23.619 9.6364 23.4102 9.07299 23.0732C7.87403 22.3561 7.06114 21.0553 7.03911 19.5672C7.00442 17.2414 8.88464 15.3452 11.2088 15.3452C11.6675 15.3452 12.1081 15.4201 12.5206 15.5561V12.1228V10.8886C12.0855 10.8242 11.6427 10.7906 11.195 10.7906C8.65113 10.7906 6.27193 11.848 4.57125 13.753C3.28582 15.1927 2.51479 17.0294 2.39583 18.9553C2.23997 21.4854 3.16576 23.8905 4.96117 25.665C5.22498 25.9255 5.502 26.1672 5.79169 26.3903C7.331 27.5749 9.21288 28.2171 11.195 28.2171C11.6427 28.2171 12.0855 28.184 12.5206 28.1196C14.3722 27.8453 16.0806 26.9977 17.4288 25.665C19.0854 24.0276 20.0008 21.8538 20.0107 19.5402L19.987 9.2656C20.7773 9.87527 21.6414 10.3797 22.5689 10.7713C24.0112 11.3799 25.5406 11.6883 27.1147 11.6877V8.34972V7.11111C27.1158 7.11221 27.1025 7.11221 27.1014 7.11221Z" fill="white"/>
      </g>
      <defs>
        <clipPath id="clip0_tiktok">
          <rect width="28.1979" height="28.1979" fill="white" transform="translate(0.650391 0.041748)"/>
        </clipPath>
      </defs>
    </svg>,
    // Pinterest
    <svg width="29" height="29" viewBox="0 0 29 29" fill="none">
      <g clipPath="url(#clip0_pinterest)">
        <path d="M15.2837 0.0415039C7.55398 0.0426788 3.44531 4.99493 3.44531 10.3948C3.44531 12.8985 4.84463 16.0226 7.08519 17.0131C7.72434 17.3009 7.63974 16.9496 8.1896 14.8465C8.23307 14.6715 8.21075 14.5199 8.06976 14.3566C4.86695 10.6521 7.44471 3.03635 14.8267 3.03635C25.5101 3.03635 23.514 17.8191 16.6854 17.8191C14.9254 17.8191 13.6142 16.4374 14.0289 14.7279C14.5318 12.6918 15.5163 10.5029 15.5163 9.03544C15.5163 5.33683 10.006 5.88551 10.006 10.7861C10.006 12.3005 10.5418 13.3227 10.5418 13.3227C10.5418 13.3227 8.76883 20.4849 8.43986 21.8232C7.88295 24.0884 8.51505 27.7553 8.57027 28.0713C8.60434 28.2452 8.79938 28.3004 8.90865 28.1571C9.08371 27.928 11.2267 24.8709 11.8271 22.6609C12.0457 21.8561 12.9421 18.5898 12.9421 18.5898C13.5331 19.6566 15.2367 20.5496 17.052 20.5496C22.4518 20.5496 26.3549 15.8029 26.3549 9.9131C26.3361 4.26648 21.5037 0.0415039 15.2837 0.0415039Z" fill="white"/>
      </g>
      <defs>
        <clipPath id="clip0_pinterest">
          <rect width="28.1979" height="28.1979" fill="white" transform="translate(0.800781 0.0415039)"/>
        </clipPath>
      </defs>
    </svg>
  ];

  return (
    <footer className="bg-black">
      {/* Main Footer Content */}
      <div className="container mx-auto px-16 py-9">
        <div className="flex justify-center">
          <div className="flex gap-5">
            {/* Footer Links */}
            <div className="flex gap-5">
              {/* Explore */}
              <div className="w-[299px] space-y-4">
                <h4 className="text-white text-2xl font-bold">Explore</h4>
                <ul className="space-y-2">
                  {footerLinks.explore.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-white text-lg hover:text-white/80 transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support */}
              <div className="w-[299px] space-y-4">
                <h4 className="text-white text-2xl font-bold">Support</h4>
                <ul className="space-y-2">
                  {footerLinks.support.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-white text-lg hover:text-white/80 transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* About Camana */}
              <div className="w-[299px] space-y-4">
                <h4 className="text-white text-2xl font-bold">About Camana</h4>
                <ul className="space-y-2">
                  {footerLinks.about.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-white text-lg hover:text-white/80 transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Separator */}
            <div className="w-px h-64 bg-[#929292] mx-5" />

            {/* Right Side */}
            <div className="flex gap-5">
              {/* Google Rating */}
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-white shadow-lg p-3 rounded">
                  <div className="flex items-center gap-3">
                    <svg width="60" height="60" viewBox="0 0 61 61" fill="none">
                      <path d="M56.7548 31.1758C56.7548 29.2345 56.5806 27.3679 56.2571 25.5759H30.4727V36.1784H45.2066C44.5595 39.5881 42.6182 42.4752 39.7063 44.4165V51.3106H48.5914C53.7682 46.532 56.7548 39.5135 56.7548 31.1758Z" fill="#4285F4"/>
                      <path d="M30.4736 57.9315C37.8655 57.9315 44.0627 55.4924 48.5924 51.3111L39.7073 44.417C37.2682 46.0597 34.1571 47.0552 30.4736 47.0552C23.3556 47.0552 17.3077 42.2518 15.1424 35.7808H6.0332V42.8491C10.538 51.784 19.7716 57.9315 30.4736 57.9315Z" fill="#34A853"/>
                      <path d="M15.1417 35.7559C14.5942 34.1132 14.2706 32.371 14.2706 30.5542C14.2706 28.7373 14.5942 26.9951 15.1417 25.3525V18.2842H6.03254C4.16591 21.9677 3.0957 26.124 3.0957 30.5542C3.0957 34.9843 4.16591 39.1407 6.03254 42.8242L13.1257 37.2989L15.1417 35.7559Z" fill="#FBBC05"/>
                      <path d="M30.4736 14.0769C34.5056 14.0769 38.0895 15.4707 40.9517 18.1586L48.7915 10.3188C44.0378 5.88862 37.8655 3.17578 30.4736 3.17578C19.7716 3.17578 10.538 9.32323 6.0332 18.2831L15.1424 25.3514C17.3077 18.8804 23.3556 14.0769 30.4736 14.0769Z" fill="#EA4335"/>
                    </svg>
                    <div className="space-y-1">
                      <p className="text-[#6A6A6A] text-xs font-bold">Google Rating</p>
                      <div className="flex items-center gap-3">
                        <span className="text-[#FEA500] text-lg font-extrabold">4.9</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} width="22" height="22" viewBox="0 0 23 22" fill="none">
                              <path d="M10.623 1.63861C10.9069 1.06736 11.7217 1.06736 12.0056 1.63861L14.3236 6.30393C14.4359 6.53014 14.6519 6.68705 14.9018 6.72404L20.0551 7.48691C20.6861 7.58032 20.9379 8.35532 20.4823 8.80178L16.7616 12.448C16.5812 12.6248 16.4987 12.8787 16.5407 13.1277L17.4077 18.2645C17.5138 18.8935 16.8545 19.3725 16.2892 19.0772L11.6717 16.6653C11.4478 16.5484 11.1808 16.5484 10.9569 16.6653L6.33944 19.0772C5.77405 19.3725 5.11479 18.8935 5.22094 18.2645L6.08786 13.1277C6.1299 12.8787 6.0474 12.6248 5.86699 12.448L2.1463 8.80178C1.69073 8.35532 1.94254 7.58032 2.57353 7.48691L7.72681 6.72404C7.97669 6.68705 8.19265 6.53014 8.30505 6.30393L10.623 1.63861Z" fill="#FEA500"/>
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-[#868686] text-[9px]">See all our reviews</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Options */}
              <div className="space-y-2">
                <h4 className="text-white text-xl font-bold">Payment options</h4>
                <div className="flex flex-wrap gap-2 max-w-[175px]">
                  {paymentLogos.map((logo, index) => (
                    <img 
                      key={index}
                      src={logo}
                      alt=""
                      className="w-12 h-5 object-contain"
                    />
                  ))}
                </div>
              </div>

              {/* Separator */}
              <div className="w-px h-64 bg-[#929292] mx-5" />

              {/* Currency and Dimensions */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-white text-lg font-bold">Property dimensions</h4>
                  <div className="flex items-center justify-between border border-[#CACACA] px-2.5 py-2 w-56">
                    <span className="text-[#848484] text-base">SQ. FT.</span>
                    <svg width="13" height="8" viewBox="0 0 13 8" fill="none">
                      <path d="M1.56445 1.47046L6.47874 6.38474L11.393 1.47046" stroke="#848484" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-white text-lg font-bold">Currency</h4>
                  <div className="flex items-center justify-between border border-[#CACACA] px-2.5 py-2 w-56">
                    <span className="text-[#848484] text-base">AED</span>
                    <svg width="13" height="7" viewBox="0 0 13 7" fill="none">
                      <path d="M1.56445 0.817627L6.47874 5.73191L11.393 0.817627" stroke="#848484" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-[#929292] py-5">
        <div className="container mx-auto px-16">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div>
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/86016a1903bfbc24eb92076c93ba6b2fa16d76d2?width=310"
                alt="Camana Homes"
                className="h-11"
              />
            </div>

            {/* Copyright and Social */}
            <div className="flex items-center justify-between flex-1 ml-8">
              <p className="text-white text-lg font-medium">
                © Copyright <span className="font-bold">Camana Homes</span> 2025. All Right Reserved
              </p>
              
              {/* Social Icons */}
              <div className="flex items-center gap-4">
                {socialIcons.map((icon, index) => (
                  <button key={index} className="hover:opacity-80 transition-opacity">
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Text */}
      <div className="container mx-auto px-16 pb-5">
        <p className="text-white text-base leading-6 -tracking-[0.32px]">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
          <br /><br />
          It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
      </div>
    </footer>
  );
}
