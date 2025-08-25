import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface FooterProps {
  variant?: 'default' | 'members';
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ 
  variant = 'default',
  className 
}) => {
  const navigate = useNavigate();
  const isMembers = variant === 'members';
  
  // Styling based on variant
  const bgColor = isMembers ? 'bg-black' : 'bg-[#EDEDED]';
  const textColor = isMembers ? 'text-white' : 'text-black';
  const borderColor = isMembers ? 'border-[#929292]' : 'border-[#cacaca]';
  
  // Footer links - same for all variants
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

  // Footer logo
  const footerLogo = "https://api.builder.io/api/v1/image/assets/TEMP/5a19f6126fa6dcda25d289130b048916b16fa621?width=310";

  return (
    <footer className={cn("w-full", bgColor, className)}>
      {/* Main Footer Content */}
      <div className={cn(
        "mx-auto py-10",
        isMembers ? "container px-16" : "max-w-[1460px] px-[63px]"
      )}>
        <div className={cn(
          "grid gap-10",
          isMembers ? "flex justify-center" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        )}>
          {/* Footer Links - 3 columns for default variant */}
          <div className={cn(
            "flex gap-5",
            isMembers ? "flex-row" : "lg:col-span-3 flex-col md:flex-row lg:flex-row"
          )}>
            {/* Explore Section */}
            <div className={cn(
              "space-y-4",
              isMembers ? "w-[299px]" : "flex-1"
            )}>
              <h4 className={cn(
                "font-bold mb-4",
                isMembers ? "text-white text-2xl" : "font-dm-sans text-[24px] text-black"
              )}>
                Explore
              </h4>
              <ul className="space-y-3 text-[16px]">
                {footerLinks.explore.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className={cn(
                        "hover:opacity-80 transition-colors",
                        isMembers ? "text-white text-lg" : "text-black hover:underline"
                      )}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Section */}
            <div className={cn(
              "space-y-4",
              isMembers ? "w-[299px]" : "flex-1"
            )}>
              <h4 className={cn(
                "font-bold mb-4",
                isMembers ? "text-white text-2xl" : "font-dm-sans text-[24px] text-black"
              )}>
                Support
              </h4>
              <ul className="space-y-3 text-[16px]">
                {footerLinks.support.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className={cn(
                        "hover:opacity-80 transition-colors",
                        isMembers ? "text-white text-lg" : "text-black hover:underline"
                      )}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* About Camana Section */}
            <div className={cn(
              "space-y-4",
              isMembers ? "w-[299px]" : "flex-1"
            )}>
              <h4 className={cn(
                "font-bold mb-4",
                isMembers ? "text-white text-2xl" : "font-dm-sans text-[24px] text-black"
              )}>
                About Camana
              </h4>
              <ul className="space-y-3 text-[16px]">
                {footerLinks.about.map((link, index) => (
                  <li key={link}>
                    {index === 0 ? (
                      <button 
                        onClick={() => navigate('/about-us')} 
                        className={cn(
                          "hover:opacity-80 transition-colors cursor-pointer",
                          isMembers ? "text-white text-lg" : "text-black hover:underline"
                        )}
                      >
                        {link}
                      </button>
                    ) : (
                      <a 
                        href="#" 
                        className={cn(
                          "hover:opacity-80 transition-colors",
                          isMembers ? "text-white text-lg" : "text-black hover:underline"
                        )}
                      >
                        {link}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Side Content - Property dimensions and Currency for default variant */}
          {!isMembers && (
            <div className="lg:col-span-1">
              <div className="grid grid-cols-1 gap-4 max-w-[223px]">
                {/* Property Dimensions */}
                <div>
                  <div className="font-dm-sans text-[18px] font-bold mb-2">
                    Property dimensions
                  </div>
                  <div className="relative">
                    <select
                      aria-label="Property dimensions"
                      className="w-full border border-[#cacaca] bg-white px-3 py-2 appearance-none pr-8"
                    >
                      <option>SQ. FT.</option>
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#848484]">
                      ▾
                    </span>
                  </div>
                </div>
                
                {/* Currency */}
                <div>
                  <div className="font-dm-sans text-[18px] font-bold mb-2">
                    Currency
                  </div>
                  <div className="relative">
                    <select
                      aria-label="Currency"
                      className="w-full border border-[#cacaca] bg-white px-3 py-2 appearance-none pr-8"
                    >
                      <option>AED</option>
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#848484]">
                      ▾
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className={cn("border-t py-4", borderColor)}>
        <div className={cn(
          "mx-auto flex items-center justify-between gap-4",
          isMembers ? "container px-16" : "max-w-[1460px] px-[63px]"
        )}>
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src={footerLogo}
              alt="Camana Homes"
              className="h-[43px] w-[155px]"
            />
          </div>
          
          {/* Copyright */}
          <div className="text-center text-[16px]">
            <span className={cn(
              "font-semibold",
              isMembers ? "text-white text-lg" : "text-black"
            )}>
              © Copyright <span className="font-semibold">Camana Homes</span> 2025. All Right Reserved
            </span>
          </div>
          
          {/* Empty div for spacing */}
          <div className="w-[155px]"></div>
        </div>
      </div>

      {/* Privacy Section - Only for default variant */}
      {!isMembers && (
        <div className="container mx-auto px-4 lg:px-16 pb-8">
          <div className="pt-6">
            <h4 className="text-black text-lg font-semibold mb-4">Your Privacy & Trust</h4>
            <p className="text-gray-700 text-base leading-relaxed">
              At Camana Homes, your privacy and trust are our top priority. We are committed to protecting your personal information and ensuring a secure experience on our platform. Any data you share with us—whether for property listings, inquiries, or partnerships—is kept confidential and used only to enhance your experience.
            </p>
            <p className="text-gray-700 text-base leading-relaxed">
              We do not sell or misuse your information. Our systems follow strict security protocols to safeguard your data, and we work only with verified partners to ensure transparency and trust.
            </p>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
