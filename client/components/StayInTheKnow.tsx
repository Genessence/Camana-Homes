import React from 'react'
const imgDivElementorElement =
  "http://localhost:3845/assets/8efd6fc947b7d2281a19507c61d35636cf482d03.png";
const imgDivElementorElement1 =
  "http://localhost:3845/assets/60ce1ce2d0b32b58eb6b4d9aa832e29ceb60cef1.png";

// MCP assets for Stay in the Know (node 3072:6983)
const imgGroup12FigureGallery1Jpg =
  "http://localhost:3845/assets/c357de5cce6baf6e4fd62c7ea0c3c0eb1bcc724d.png";
const imgBgVideoJpg =
  "http://localhost:3845/assets/b452397dd79f21d383175dd81978fa658d189b03.png";
const imgElements =
  "http://localhost:3845/assets/e0644fcd9e29f44547287311e630a76b9d3682f8.png";
const imgIcon =
  "http://localhost:3845/assets/7a858b2f99a09639c8f555d058dfe46d61924497.svg";
const imgIcon1 =
  "http://localhost:3845/assets/1afa6adefe1add9c1a52bdf187d94e20d07fba1d.svg";
const imgSvg =
  "http://localhost:3845/assets/c217a521b74c0a1cf7ee28610d185936dbf7d128.svg";

type Props = {}

const StayInTheKnow = (props: Props) => {
  return (
    <div className='m-[0px]'>
    <h2 className="font-dm-sans text-[35px] font-semibold text-black leading-normal mb-[30px]">
      Stay in the Know
    </h2>

    <div className="grid grid-cols-2 gap-[20px] items-start">
      {/* Left column: gallery on top, followers + video on bottom */}
      <div className="flex flex-col gap-[20px]">
        <div className="relative overflow-hidden h-[334.5px]">
          <img
            src={imgGroup12FigureGallery1Jpg}
            alt="Gallery"
            className="w-full h-full object-cover"
          />
          <button
            aria-label="Previous"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 h-[46px] w-[70px] rounded-[50px] backdrop-blur-[25px] bg-[rgba(26,26,26,0.2)] grid place-items-center border border-white/10"
          >
            <img src={imgIcon} alt="" className="w-4 h-4" />
          </button>
          <button
            aria-label="Next"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 h-[46px] w-[70px] rounded-[50px] backdrop-blur-[25px] bg-[rgba(26,26,26,0.2)] grid place-items-center border border-white/10"
          >
            <img src={imgIcon1} alt="" className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-[20px]">
          <div className="bg-black text-white p-[24px] h-[268px] relative">
            <div className="text-[40px] font-serif leading-[52px]">
              280k +
            </div>
            <div className="text-[19px] mt-1">Followers</div>
            <div className="text-[15px] mt-4 max-w-[247px]">
              Join us at Our Social handles to get updated soon.
            </div>
            <div className="flex items-center gap-3 mt-4 text-[15px]">
              <span className="text-white/90">Follow Us:</span>
              <span className="text-white"></span>
              <span className="text-[#fd2d15]"></span>
              <span className="text-white"></span>
              <span className="text-white"></span>
            </div>
          </div>
          <div className="relative h-[268px] overflow-hidden">
            <img
              src={imgBgVideoJpg}
              alt="Video"
              className="w-full h-full object-cover"
            />
            <button
              aria-label="Play"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[56.6px] h-[56.6px] rounded-[35px] bg-black/20 border border-white/10 grid place-items-center"
            >
              <img
                src={imgSvg}
                alt="Play"
                className="w-[22px] h-[22px]"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Right column: single large promo image */}
      <div
        className="relative overflow-hidden"
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
  )
}

export default StayInTheKnow