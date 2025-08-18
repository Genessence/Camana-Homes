import React from "react";

// Replace broken localhost URLs with working placeholder images
const imgGroup12FigureGallery1Jpg =
  "https://api.builder.io/api/v1/image/assets/TEMP/1c586a2bf796f43887671486f52e771a180c6321?width=800";
const imgBgVideoJpg =
  "https://api.builder.io/api/v1/image/assets/TEMP/b2aaf4ab7fe943123c831e8c3b0baabf8cb2f86e?width=600";
const imgElements =
  "https://api.builder.io/api/v1/image/assets/TEMP/56cbf0ba5ca3f6afb6d89b14b20678c2c6f63047?width=800";

// Simple SVG icons for navigation and play button
const LeftArrowIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const RightArrowIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const PlayIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

type Props = {};

const StayInTheKnow = (props: Props) => {
  return (
    <div className="mb-[80px]">
      <h2 className="font-dm-sans text-[35px] font-semibold text-black leading-normal mb-[30px]">
        Stay in the Know
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] items-start">
        {/* Left column: gallery on top, followers + video on bottom */}
        <div className="flex flex-col gap-[20px]">
          <div className="relative overflow-hidden h-[334.5px] rounded-lg">
            <img
              src={imgGroup12FigureGallery1Jpg}
              alt="Gallery"
              className="w-full h-full object-cover"
            />
            <button
              aria-label="Previous"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 h-[46px] w-[70px] rounded-[50px] backdrop-blur-[25px] bg-[rgba(26,26,26,0.2)] grid place-items-center border border-white/10 hover:bg-[rgba(26,26,26,0.3)] transition-colors"
            >
              <LeftArrowIcon />
            </button>
            <button
              aria-label="Next"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 h-[46px] w-[70px] rounded-[50px] backdrop-blur-[25px] bg-[rgba(26,26,26,0.2)] grid place-items-center border border-white/10 hover:bg-[rgba(26,26,26,0.3)] transition-colors"
            >
              <RightArrowIcon />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px]">
            <div className="bg-black text-white p-[24px] h-[268px] relative rounded-lg">
              <div className="text-[40px] font-serif leading-[52px]">
                280k +
              </div>
              <div className="text-[19px] mt-1">Followers</div>
              <div className="text-[15px] mt-4 max-w-[247px]">
                Join us at Our Social handles to get updated soon.
              </div>
              <div className="flex items-center gap-3 mt-4 text-[15px]">
                <span className="text-white/90">Follow Us:</span>
                <span className="text-white">📱</span>
                <span className="text-[#fd2d15]">🐦</span>
                <span className="text-white">📷</span>
                <span className="text-white">💼</span>
              </div>
            </div>
            <div className="relative h-[268px] overflow-hidden rounded-lg">
              <img
                src={imgBgVideoJpg}
                alt="Video"
                className="w-full h-full object-cover"
              />
              <button
                aria-label="Play"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[56.6px] h-[56.6px] rounded-[35px] bg-black/20 border border-white/10 grid place-items-center hover:bg-black/30 transition-colors"
              >
                <PlayIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Right column: single large promo image */}
        <div
          className="relative overflow-hidden rounded-lg"
          style={{ height: "622.5px" }}
        >
          <img
            src={imgElements}
            alt="Promo"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default StayInTheKnow;
