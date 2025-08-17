export function BenefitsSection() {
    const benefits = [
      {
        icon: (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15.625 7.5H15V5C15 2.2425 12.7575 0 10 0C7.2425 0 5 2.2425 5 5V7.5H4.375C3.34167 7.5 2.5 8.34083 2.5 9.375V18.125C2.5 19.1592 3.34167 20 4.375 20H15.625C16.6583 20 17.5 19.1592 17.5 18.125V9.375C17.5 8.34083 16.6583 7.5 15.625 7.5ZM6.66667 5C6.66667 3.16167 8.16167 1.66667 10 1.66667C11.8383 1.66667 13.3333 3.16167 13.3333 5V7.5H6.66667V5ZM10.8333 13.935V15.8333C10.8333 16.2933 10.4608 16.6667 10 16.6667C9.53917 16.6667 9.16667 16.2933 9.16667 15.8333V13.935C8.67083 13.6458 8.33333 13.1142 8.33333 12.5C8.33333 11.5808 9.08083 10.8333 10 10.8333C10.9192 10.8333 11.6667 11.5808 11.6667 12.5C11.6667 13.1142 11.3292 13.6458 10.8333 13.935Z" fill="white"/>
          </svg>
        ),
        title: "Gain access to projects 5-7 days before the public"
      },
      {
        icon: (
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <g clipPath="url(#clip0_3072_24690)">
              <path d="M7.937 8.12999C8.027 8.54399 8.165 8.81199 8.326 8.97899C8.709 11.645 11.102 13.917 13.024 13.822C15.469 13.702 17.202 11.067 17.591 8.97899C17.752 8.81299 17.907 8.45799 18 8.04099C18.104 7.56199 18.216 6.83999 17.928 6.45799C17.911 6.43799 17.801 6.33699 17.782 6.31999C18.057 5.32799 18.661 3.55799 17.157 1.96699C16.342 1.10499 15.21 0.671994 14.187 0.329994C11.167 -0.679006 9.035 0.735994 8.051 3.08899C7.98 3.25599 7.521 4.31299 8.077 6.31999C8.023 6.35599 7.974 6.40199 7.933 6.45799C7.644 6.83899 7.832 7.65099 7.937 8.12999Z" fill="white"/>
              <path d="M23.5565 22.792C23.4725 20.957 23.3685 18.049 21.7655 15.67C21.7655 15.67 21.3085 15.047 20.2245 14.633C20.2245 14.633 17.8705 13.916 16.7865 13.141L16.2915 13.48L16.3465 16.698L13.3745 24.632C13.3095 24.806 13.1435 24.921 12.9585 24.921C12.7735 24.921 12.6075 24.806 12.5425 24.632L9.57154 16.698C9.57154 16.698 9.62654 13.49 9.62554 13.48C9.63254 13.507 9.12954 13.141 9.12954 13.141C8.04754 13.916 5.69254 14.633 5.69254 14.633C4.60854 15.047 4.15154 15.67 4.15154 15.67C2.54954 18.049 2.44354 20.957 2.35954 22.792C2.30154 24.06 2.56754 24.533 2.90154 24.668C7.04754 26.332 18.8665 26.332 23.0135 24.668C23.3495 24.534 23.6135 24.06 23.5565 22.792Z" fill="white"/>
              <path d="M13.0648 14.847L12.9308 14.85C12.4988 14.85 12.0628 14.766 11.6348 14.618L12.8128 16.421L11.7558 17.441L12.8438 24.048C12.8528 24.105 12.9018 24.146 12.9598 24.146C13.0168 24.146 13.0658 24.105 13.0758 24.048L14.1638 17.441L13.1058 16.421L14.2668 14.645C13.8878 14.756 13.4868 14.83 13.0648 14.847Z" fill="white"/>
            </g>
            <defs>
              <clipPath id="clip0_3072_24690">
                <rect width="25.916" height="25.916" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        ),
        title: "Book project in 30 minutes via your personal broker"
      },
      {
        icon: (
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M16.6895 1.74884H19.9766V17.6344H16.6895V1.74884Z" fill="white"/>
            <path d="M11.7988 4.39572H15.0859V17.6301H11.7988V4.39572Z" fill="white"/>
            <path d="M6.91016 7.0426H10.1973V17.6301H6.91016V7.0426Z" fill="white"/>
            <path d="M2.01953 9.68945H5.30664V17.6301H2.01953V9.68945Z" fill="white"/>
          </svg>
        ),
        title: "Enjoy up to 15% higher ROI"
      }
    ];
  
    const logos = [
      "https://api.builder.io/api/v1/image/assets/TEMP/c169f044480d8104cdc91772c3c20759b88075bc?width=168",
      "https://api.builder.io/api/v1/image/assets/TEMP/bec2364d7c1727297065489d2db0f7bd23b6d58c?width=166",
      "https://api.builder.io/api/v1/image/assets/TEMP/5a37d9ca80ea48304073233d4a5a45b26c81940b?width=148",
      "https://api.builder.io/api/v1/image/assets/TEMP/c169f044480d8104cdc91772c3c20759b88075bc?width=168",
      "https://api.builder.io/api/v1/image/assets/TEMP/5ad0166a352a3d5b3b035e2ed3374e39c35c3801?width=244",
      "https://api.builder.io/api/v1/image/assets/TEMP/55174d442d0795aebcb678baa6eb22a0101d9ca3?width=164",
      "https://api.builder.io/api/v1/image/assets/TEMP/a0d03977eec27533eac424e9562cf69da1417490?width=198",
      "https://api.builder.io/api/v1/image/assets/TEMP/c169f044480d8104cdc91772c3c20759b88075bc?width=168"
    ];
  
    return (
      <>
        {/* Benefits Section */}
        <section className="py-5">
          <div className="container mx-auto px-16">
            <div className="grid grid-cols-3 divide-x divide-white">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex flex-col p-8 bg-gray-100/20 h-52 justify-between">
                  <div className="w-10 h-10 bg-white/10 flex items-center justify-center">
                    {benefit.icon}
                  </div>
                  <h3 className="text-white text-[25px] font-bold leading-normal uppercase max-w-[404px]">
                    {benefit.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>
  
        {/* Partner Logos */}
        <section className="py-3">
          <div className="container mx-auto px-16">
            <div className="flex items-center justify-center gap-32 py-2.5">
              {logos.map((logo, index) => (
                <img 
                  key={index}
                  src={logo}
                  alt=""
                  className="h-6 md:h-7 lg:h-8 object-contain opacity-70 hover:opacity-100 transition-opacity"
                />
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }
  