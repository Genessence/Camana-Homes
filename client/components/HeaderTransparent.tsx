import { ChevronDown, Menu } from 'lucide-react'
import logoWhite from "../assets/Camana-white.png";
import React from 'react'
import { useNavigate } from 'react-router-dom';

type Props = {}

const HeaderTransparent = (props: Props) => {
    const navigate = useNavigate();
  return (
    <>
      <div className="absolute top-0 left-0 right-0 z-10">
          {/* Main Navigation */}
          <div className="flex items-center justify-center h-[66px] px-4 lg:px-[70px] border-b border-white/20">
            <div className="flex items-center justify-between w-full max-w-[1466px]">
              {/* Logo */}
              <div className="flex items-center h-[66px] py-[14px]">
                <img
                  src={logoWhite}
                  alt="Camana Homes"
                  className="object-contain drop-shadow"
                  style={{ width: "155px", cursor: 'pointer'}}
                  onClick={() => navigate('/')}
                />
              </div>

              {/* Center Navigation - Hidden on mobile */}
              {/* <div className="hidden lg:flex items-center gap-[15px]">
                {["Buy", "Sell", "Rent", "Mortgage"].map((item) => (
                  <button
                    key={item}
                    className="flex items-center justify-center h-[50px] px-[21px] py-[8px] border border-white bg-transparent text-white font-dm-sans text-[17px] font-medium hover:bg-white/10 transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div> */}

              {/* Right Navigation */}
              <div className="flex items-center gap-[12px]">
                <button className="hidden md:flex items-center justify-center h-[50px] px-[21px] py-[8px] border border-white bg-white/14 text-white font-dm-sans text-[14px] font-medium tracking-[-0.48px] hover:bg-white/20 transition-colors backdrop-blur-sm">
                  Get Connected
                </button>
                {/* <button className="hidden sm:flex items-center justify-center h-[50px] px-[20px] py-[8px] bg-white text-black font-dm-sans text-[14px] font-medium hover:bg-gray-100 transition-colors">
                  Agent Login
                </button> */}
                <Menu className="w-5 h-5 text-white cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Country Navigation - Hidden on mobile */}
          <div className="hidden lg:flex items-center justify-center h-[46px] px-4 xl:px-[315px] border-t border-white/20 border-b border-white/20 bg-white/15 backdrop-blur-[8.5px]">
            <div className="flex items-center gap-[24px] py-[12px] overflow-x-auto">
              {[
                "Dubai",
                "Italy",
                "Switzerland",
                "Mexico",
                "Australia",
                "South Africa",
                "Germany",
                "Greece",
                "United States",
              ].map((country) => (
                <span
                  key={country}
                  className="text-white text-center font-inter text-[17px] font-medium leading-[19.2px] hover:text-white/80 cursor-pointer transition-colors whitespace-nowrap"
                >
                  {country}
                </span>
              ))}
              <div className="flex items-center gap-[10px]">
                <span className="text-white text-center font-inter text-[17px] font-medium leading-[19.2px]">
                  More
                </span>
                <ChevronDown className="w-[11px] h-[6px] text-white" />
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default HeaderTransparent;