import React from "react";

export default function JoinClubForm() {
  return (
    <div className="flex flex-col gap-[24px] p-6 sm:p-8 lg:px-[70px] lg:py-[50px] text-white lg:h-[494px] justify-start lg:justify-center relative z-10">
      <div className="space-y-[30px]">
        <div>
          <h3 className="font-dm-sans text-[24px] sm:text-[28px] lg:text-[35px] font-semibold mb-[30px]">
            Secure your unit before it hits the market
          </h3>
          <p className="font-dm-sans text-[14px] lg:text-[23px] text-white/80">
            Don't miss this unique opportunity
          </p>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <input
              type="text"
              placeholder="Your Name"
              aria-label="Your Name"
              className="px-4 py-3 bg-transparent border border-white/25 text-white placeholder-white/60 focus:outline-none font-dm-sans text-[18px]"
            />
            <input
              type="text"
              placeholder="Email"
              aria-label="Email"
              className="px-4 py-3 bg-transparent border border-white/25 text-white placeholder-white/60 focus:outline-none font-dm-sans text-[18px]"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Phone Number"
              aria-label="Phone Number"
              className="w-full px-4 py-3 bg-transparent border border-white/25 text-white placeholder-white/60 focus:outline-none font-dm-sans text-[18px]"
            />
          </div>

          <div className="space-y-4">
            <label className="flex items-start gap-3 text-[14px] text-white/85">
              <input
                type="checkbox"
                defaultChecked
                className="mt-[2px] w-5 h-5 bg-[#fd2d15] border-[#fd2d15] border-2 rounded-none appearance-none checked:bg-[#fd2d15] checked:border-[#fd2d15] cursor-pointer"
              />
              <span>
                Lorem Ipsum is simply dummy text of the printing and
              </span>
            </label>
            <label className="flex items-start gap-3 text-[14px] text-white/85">
              <input
                type="checkbox"
                className="mt-[2px] w-5 h-5 bg-transparent border-[#ffffff] border-2 rounded-none appearance-none checked:bg-[#fd2d15] checked:border-[#fd2d15] cursor-pointer"
              />
              <span>
                Lorem Ipsum is simply dummy text of the printing and
              </span>
            </label>
          </div>
        </div>

        <button className="w-full bg-[#fd2d15] hover:bg-[#fd2d15]/90 text-white font-dm-sans font-extrabold text-[20px] h-[50px] mt-2">
          Join our Club
        </button>
      </div>
    </div>
  );
}


