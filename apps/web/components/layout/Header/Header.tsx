import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import LeadModal from '@/components/ui/LeadModal';

// Import logos
import logoBlack from '../../../assets/logo-black1.png';
import logoWhite from '../../../assets/Camana-white.png';

interface HeaderProps {
  variant?: 'default' | 'transparent';
  showNavigation?: boolean;
  showCountrySelector?: boolean;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  variant = 'default',
  showNavigation = false,
  showCountrySelector = true,
  className 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [leadOpen, setLeadOpen] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadLocation, setLeadLocation] = useState("");
  const [leadModalType, setLeadModalType] = useState<'list' | 'connect'>('list');

  const openLeadModal = () => {
    setLeadModalType('list');
    setLeadOpen(true);
  };

  const openConnectModal = () => {
    setLeadModalType('connect');
    setLeadOpen(true);
  };
  const submitLead = (e: React.FormEvent) => {
    e.preventDefault();
    setLeadOpen(false);
  };

  // Determine variant based on location if not explicitly set
  const transparentPaths = ['/', '/about-us', '/journal', '/article'];
  const isMembersClub = location.pathname.includes('/members-club');
  
  // For members-club, we want transparent styling but no absolute positioning
  const effectiveVariant = variant === 'default' && 
    (transparentPaths.includes(location.pathname) || isMembersClub)
    ? 'transparent' 
    : variant;

  const isTransparent = effectiveVariant === 'transparent';
  
  // Logo and styling based on variant
  const logo = isTransparent ? logoWhite : logoBlack;
  const textColor = isTransparent ? 'text-white' : 'text-black';
  const borderColor = isTransparent ? 'border-white/20' : 'border-gray-200';
  const bgColor = isTransparent ? 'bg-black/15 backdrop-blur-sm' : 'bg-white';
  
  // Countries list
  const countries = [
    "Dubai", "Abu Dhabi", "Thailand", "Maldives", "Indonesia", "India"
  ];

  return (
    <header className={cn(
      "w-full relative",
      // Only apply absolute positioning for hero pages, not for members-club
      isTransparent && !isMembersClub ? "absolute top-0 left-0 right-0 z-10" : "",
      className
    )}>
      {/* Main Navigation */}
      <div className={cn(
        "flex items-center justify-between h-[66px] px-4 lg:px-[70px]",
        isTransparent ? "border-b border-white/20" : "border-b border-gray-200",
        bgColor
      )}>
        {/* Logo */}
        <div className="flex items-center h-[66px] py-[14px]">
          <img
            src={logo}
            alt="Camana Homes"
            className="object-contain drop-shadow cursor-pointer"
            style={isTransparent ? { width: "155px"} : { width: "125px" }}
            onClick={() => navigate('/')}
          />
        </div>

        {/* Center Navigation - Hidden on mobile */}
        {showNavigation && (
          <div className="hidden lg:flex items-center gap-0">
            {["Buy", "Sell", "Rent", "Mortgage"].map((item, index) => (
              <button
                key={item}
                className={cn(
                  "px-[21px] py-2 border font-dm-sans text-[17px] font-medium transition-colors",
                  isTransparent 
                    ? "border-white bg-transparent text-white hover:bg-white/10" 
                    : "border-black bg-transparent text-black hover:bg-gray-50",
                  index === 0 ? "" : "border-l-0"
                )}
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button 
            onClick={openConnectModal}
            className={cn(
              "hidden md:flex items-center justify-center h-[40px] px-[21px] py-2 border font-dm-sans text-[14px] font-medium transition-colors",
              isTransparent 
                ? "border-white bg-white/14 text-white hover:bg-white/20 backdrop-blur-sm" 
                : "border-black bg-gray-100/20 text-black hover:bg-gray-200/30"
            )}
          >
            Get Connected
          </button>
          
          <div className="relative">
            <button onClick={openLeadModal} className={cn(
              "flex items-center justify-center h-[40px] px-5 py-2 font-dm-sans text-[14px] font-medium transition-colors",
              isTransparent 
                ? "bg-white text-black hover:bg-gray-100" 
                : "bg-black text-white hover:bg-gray-900"
            )}>
              List with us
              {/* <span
                className={cn(
                  "ml-2 px-2 py-[2px] rounded-full text-[10px] uppercase tracking-wider",
                  isTransparent ? "bg-black/80 text-white" : "bg-white/15 text-white"
                )}
              >
                Coming soon
              </span> */}
            </button>
            
            {/* Subtle badge rendered inside button */}
          </div>
          
          <Menu className={cn("w-5 h-5 cursor-pointer", textColor)} />
        </div>
      </div>

      {/* Country Navigation */}
      {showCountrySelector && (
        <div className={cn(
          "flex items-center justify-start lg:justify-center h-[46px] px-4 lg:px-[70px] xl:px-[70px] 2xl:px-[120px]",
          isTransparent 
            ? "border-t border-white/20 border-b border-white/20 bg-white/15 backdrop-blur-[8.5px]" 
            : "bg-gray-50 border-t border-gray-200"
        )}>
          <div className="w-full overflow-x-auto overscroll-x-contain scrollbar-hide">
            <div className="flex w-fit items-center gap-6 py-3 mx-auto">
              {countries.map((country) => (
                <button
                  key={country}
                  className={cn(
                    "text-center font-inter text-[17px] font-medium leading-[19.2px] hover:opacity-80 cursor-pointer transition-colors whitespace-nowrap",
                    isTransparent ? "text-white" : "text-gray-700"
                  )}
                >
                  {country}
                </button>
              ))}
              
              <div className="flex items-center gap-2 flex-shrink-0">
                {/* <span className={cn(
                  "text-center font-inter text-[17px] font-medium leading-[19.2px]",
                  isTransparent ? "text-white" : "text-gray-700"
                )}>
                  More
                </span>
                <ChevronDown className={cn(
                  "w-[11px] h-[6px]",
                  isTransparent ? "text-white" : "text-gray-700"
                )} /> */}
              </div>
            </div>
          </div>
        </div>
      )}
      <LeadModal
        open={leadOpen}
        onOpenChange={setLeadOpen}
        onSubmit={submitLead}
        leadName={leadName}
        setLeadName={setLeadName}
        leadEmail={leadEmail}
        setLeadEmail={setLeadEmail}
        leadPhone={leadPhone}
        setLeadPhone={setLeadPhone}
        leadLocation={leadLocation}
        setLeadLocation={setLeadLocation}
        title={leadModalType === 'connect' ? "Get Connected" : "List with us"}
        description="Tell us about yourself and we’ll get in touch."
      />
    </header>
  );
};

export default Header;
