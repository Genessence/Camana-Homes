import React from "react";
const footerLogo =
  "https://api.builder.io/api/v1/image/assets/TEMP/5a19f6126fa6dcda25d289130b048916b16fa621?width=310";
const icInstagram =
  "http://localhost:3845/assets/1c45c9e522b90e19cd001a345a815d7fb0db24de.svg";
const icTwitter =
  "http://localhost:3845/assets/409fa5612de14840eee2c8c821e15c45908754b1.svg";
const icFacebook =
  "http://localhost:3845/assets/78f04ac2508a8725f010b608cc2ea66c48144638.svg";
const icLinkedIn =
  "http://localhost:3845/assets/f6e4631f73e0a991e45fb12a0f53356503a8d791.svg";
const icPinterest =
  "http://localhost:3845/assets/0d62b73783527f4a2228669bc1f5b90748828065.svg";
const icTiktok =
  "http://localhost:3845/assets/06020643c6c78d090d8fe664c2bef71f0c99dc08.svg";
const icYoutube =
  "http://localhost:3845/assets/54794c8882b11e8892e9c033eabccec9a7fef134.svg";

export default function Footer() {
  return (
    <footer className="bg-[#EDEDED] text-black" data-name="Footer">
      {/* Top columns */}
      <div className="max-w-[1460px] mx-auto px-[63px] py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Explore */}
        <div>
          <h4 className="font-dm-sans text-[24px] font-bold mb-4">Explore</h4>
          <ul className="space-y-3 text-[16px]">
            <li>
              <a href="#" className="hover:underline">
                Become a host
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Partnerships
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Affiliate program
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Journal
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Camana vs Airbnb
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-dm-sans text-[24px] font-bold mb-4">Support</h4>
          <ul className="space-y-3 text-[16px]">
            <li>
              <a href="#" className="hover:underline">
                Help centre
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Get in touch
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Travel experts
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Cancellation Policies
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Reviews
              </a>
            </li>
          </ul>
        </div>

        {/* About Camana */}
        <div>
          <h4 className="font-dm-sans text-[24px] font-bold mb-4">
            About Camana
          </h4>
          <ul className="space-y-3 text-[16px]">
            <li>
              <a href="#" className="hover:underline">
                About us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Our story
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Camana Guide for business
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                The Camana Test
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Careers
              </a>
            </li>
          </ul>
        </div>

        {/* Right column: rating, payments, selects */}
        <div>
          {/* Rating */}
          <div className="mb-6">
            <div className="text-[#6a6a6a] text-[12px]">Google Rating</div>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-[#fea500] font-extrabold text-[18px]">
                4.9
              </span>
              <div className="flex items-center gap-1" aria-label="rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    viewBox="0 0 24 24"
                    className="w-[22px] h-[22px]"
                    aria-hidden="true"
                  >
                    <path
                      fill="#FEA500"
                      d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                    />
                  </svg>
                ))}
              </div>
            </div>
          </div>

          {/* Payment options */}
          <div className="mb-6">
            <div className="font-dm-sans text-[21px] font-bold mb-2">
              Payment options
            </div>
            <div className="flex items-center gap-3 flex-wrap text-[12px] text-[#666]">
              <span className="px-2 py-1 border border-[#cacaca]">Stripe</span>
              <span className="px-2 py-1 border border-[#cacaca]">VISA</span>
              <span className="px-2 py-1 border border-[#cacaca]">
                Mastercard
              </span>
              <span className="px-2 py-1 border border-[#cacaca]">PayPal</span>
              <span className="px-2 py-1 border border-[#cacaca]">Amex</span>
            </div>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-1 gap-4 max-w-[223px]">
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
      </div>

      {/* Divider and bottom row */}
      <div className="border-t border-[#cacaca]">
        <div className="max-w-[1460px] mx-auto px-[63px] py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={footerLogo}
              alt="Camana Homes"
              className="h-[43px] w-[155px]"
            />
          </div>
          <div className="text-center text-[16px]">
            © Copyright <span className="font-semibold">Camana Homes</span>{" "}
            2025. All Right Reserved
          </div>
          <div className="flex items-center gap-4 text-[#222]">
            <a
              href="#"
              aria-label="Instagram"
              title="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={icInstagram}
                alt="Instagram"
                className="w-[26px] h-[26px]"
              />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              title="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={icFacebook}
                alt="Facebook"
                className="w-[26px] h-[26px]"
              />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              title="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={icLinkedIn}
                alt="LinkedIn"
                className="w-[26px] h-[26px]"
              />
            </a>
            <a
              href="#"
              aria-label="X"
              title="X"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={icTwitter} alt="X" className="w-[26px] h-[26px]" />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              title="YouTube"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={icYoutube}
                alt="YouTube"
                className="w-[26px] h-[26px]"
              />
            </a>
            <a
              href="#"
              aria-label="TikTok"
              title="TikTok"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={icTiktok} alt="TikTok" className="w-[26px] h-[26px]" />
            </a>
            <a
              href="#"
              aria-label="Pinterest"
              title="Pinterest"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={icPinterest}
                alt="Pinterest"
                className="w-[26px] h-[26px]"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Copy detail */}
      <div className="max-w-[1460px] mx-auto px-[63px] py-6 text-[16px] leading-[24px] text-[#000]">
        <p className="mb-3">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </p>
        <p>
          It was popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem
          Ipsum.
        </p>
      </div>
    </footer>
  );
}
