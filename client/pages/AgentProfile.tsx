import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  Share2,
  Phone,
  Mail,
  Users,
  Calendar,
  Bed,
  Bath,
  Square,
} from "lucide-react";

export default function AgentProfile() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-[70px]">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Navigation */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/5a19f6126fa6dcda25d289130b048916b16fa621?width=310"
                  alt="Camana Homes"
                  className="h-10 w-auto"
                />
              </div>
              <nav className="hidden lg:flex items-center space-x-0">
                <button className="px-5 py-2 border border-black text-black hover:bg-gray-50 transition-colors">
                  Buy
                </button>
                <button className="px-5 py-2 border border-black border-l-0 text-black hover:bg-gray-50 transition-colors">
                  Sell
                </button>
                <button className="px-5 py-2 border border-black border-l-0 text-black hover:bg-gray-50 transition-colors">
                  Rent
                </button>
                <button className="px-5 py-2 border border-black border-l-0 text-black hover:bg-gray-50 transition-colors">
                  Mortgage
                </button>
              </nav>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-3">
              <button className="px-5 py-2 border border-black bg-gray-100 text-black text-sm hover:bg-gray-200 transition-colors">
                Get Connected
              </button>
              <button className="px-5 py-2 bg-black text-white text-sm hover:bg-gray-800 transition-colors">
                Agent Login
              </button>
              <button
                className="lg:hidden"
                title="Open menu"
                aria-label="Open menu"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M0 16.0444H20" stroke="black" strokeWidth="1.6" />
                  <path d="M0 10.0444H20" stroke="black" strokeWidth="1.6" />
                  <path d="M0 4.04443H20" stroke="black" strokeWidth="1.6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* Agent Header (from Figma) */}
      <section className="max-w-[1600px] mx-auto px-[70px] py-[30px] flex flex-col lg:flex-row gap-7">
        {/* Left sticky image */}
        <div
          className="hidden lg:block w-[743px] h-[830px] sticky top-0 bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://api.builder.io/api/v1/image/assets/TEMP/989624fdfd14e872dfbb46d0a37b356568496bef?width=1600')",
          }}
        />
        {/* Right content */}
        <div className="flex-1 min-w-0">
          <div className="inline-flex bg-black text-white px-2.5 py-[5px] text-[14px] font-bold">
            License No: 123456DXB
          </div>
          <h1 className="mt-3 text-[40px] md:text-[56px] lg:text-[68px] font-extrabold text-black leading-[1.05]">
            Khushi Ostwal
          </h1>
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-3 text-[18px] text-black">
              <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12c0 7 10 10 10 10s10-3 10-10c0-5.52-4.48-10-10-10Zm0 13a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"
                  fill="currentColor"
                />
              </svg>
              <span>
                Licensed Real Estate Agent | Luxury Property Specialist | Dubai
              </span>
            </div>
            <div className="flex items-center gap-3 text-[18px] text-black">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0Zm1 10H9V5h2v5Zm0 5H9v-2h2v2Z"
                  fill="currentColor"
                />
              </svg>
              <span>Dubai, UAE</span>
            </div>
            <div className="flex items-center gap-3 text-[17px] font-bold text-black">
              <Phone size={18} />
              <span>+918375017988</span>
            </div>
            <div className="flex items-center gap-3 text-[17px] font-bold text-black">
              <Mail size={18} />
              <span>khushi@camanahomes.com</span>
            </div>
          </div>
          <button className="mt-6 bg-black text-white h-14 w-[171px] inline-flex items-center justify-center">
            Contact Agent
          </button>
          {/* Social round icons */}
          <div className="mt-4 flex items-center gap-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <button
                key={i}
                title="Social link"
                aria-label="Social link"
                className="h-14 w-14 rounded-full border border-black/20 flex items-center justify-center"
              >
                <span className="sr-only">social</span>
              </button>
            ))}
          </div>
          {/* Social Connect strip */}
          <div className="mt-10 flex items-center justify-between">
            <h2 className="text-[35px] font-semibold text-black">
              Social Connect
            </h2>
            <div className="flex items-center gap-2 opacity-60">
              <button className="h-[50px] w-[50px]" aria-label="prev" />
              <button className="h-[50px] w-[50px]" aria-label="next" />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="bg-neutral-100 p-2">
                <div
                  className="h-[178px] bg-center bg-cover"
                  style={{
                    backgroundImage:
                      "url('https://api.builder.io/api/v1/image/assets/TEMP/1c586a2bf796f43887671486f52e771a180c6321?width=600')",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Video banner with centered play */}
      <section className="max-w-[1600px] mx-auto px-[70px] py-[30px]">
        <div
          className="relative h-[460px] md:h-[560px] bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://api.builder.io/api/v1/image/assets/TEMP/3ab0fc1c247d4be7843852d97d25a3c1b2438ab6?width=1600')",
          }}
        >
          <button
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[106px] rounded-full border border-white bg-white/30 backdrop-blur shadow"
            aria-label="Play video"
          />
        </div>
      </section>
      {/* About Section */}
      <section className="max-w-[1600px] mx-auto px-4 lg:px-[70px] py-12">
        <div className="space-y-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-black">About</h2>
          <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p>

            <p>
              It was popularised in the 1960s with the release of Letraset
              sheets containing Lorem Ipsum passages, and more recently with
              desktop publishing software like Aldus PageMaker including
              versions of Lorem Ipsum.
            </p>

            <p>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum
              passage, and going through the cites of the word in classical
              literature, discovered the undoubtable source. Lorem Ipsum comes
              from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
              Malorum" (The Extremes of Good and Evil) by Cicero, written in 45
              BC. This book is a treatise on the theory of ethics, very popular
              during the Renaissance. The first line of Lorem Ipsum, "Lorem
              ipsum dolor sit amet..", comes from a line in section 1.10.32
            </p>

            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p>

            <p>
              It was popularised in the 1960s with the release of Letraset
              sheets containing Lorem Ipsum passages, and more recently with
              desktop publishing software like Aldus PageMaker including
              versions of Lorem Ipsum.
            </p>

            <p>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum
              passage, and going through the cites of the word in classical
              literature, discovered the undoubtable source. Lorem Ipsum comes
              from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
              Malorum" (The Extremes of Good and Evil) by Cicero, written in 45
              BC. This book is a treatise on the theory of ethics, very popular
              during the Renaissance. The first line of Lorem Ipsum, "Lorem
              ipsum dolor sit amet..", comes from a line in section 1.10.32
            </p>
          </div>
        </div>
      </section>
      {/* Social Connect Section */}
      <section className="max-w-[1600px] mx-auto px-4 lg:px-[70px] py-12">
        <div className="space-y-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-black">
            Social Connect
          </h2>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-14 h-14 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
                <g clipPath="url(#clip0_480_1659)">
                  <path
                    d="M20.1308 3.61829C17.9587 1.44618 15.0708 0.25 11.999 0.25C8.92728 0.25 6.03934 1.44618 3.86732 3.61825C1.69521 5.79032 0.499023 8.67826 0.499023 11.75C0.499023 14.8218 1.69521 17.7097 3.86732 19.8818C6.03934 22.0538 8.92728 23.25 11.999 23.25C15.0709 23.25 17.9587 22.0538 20.1308 19.8817C22.3028 17.7097 23.4991 14.8217 23.4991 11.75C23.4991 8.67821 22.3028 5.79032 20.1308 3.61829ZM4.82124 4.57221C5.83247 3.56097 7.01963 2.78966 8.31356 2.28622C7.96892 2.71649 7.64642 3.21103 7.35088 3.76725C7.00763 4.41323 6.71146 5.12269 6.46479 5.88047C5.61029 5.73866 4.81854 5.56427 4.1112 5.3596C4.33289 5.08711 4.5694 4.82404 4.82124 4.57221ZM3.29447 6.52043C4.1218 6.78534 5.06795 7.00873 6.10034 7.18568C5.81284 8.40603 5.64362 9.71924 5.60324 11.0755H1.87076C1.97678 9.44786 2.46562 7.89446 3.29447 6.52043ZM3.22102 16.8549C2.43691 15.5117 1.97359 14.0032 1.87072 12.4245H5.6058C5.64991 13.742 5.81576 15.0179 6.09356 16.2063C5.03996 16.3771 4.07005 16.5949 3.22102 16.8549ZM4.82124 18.9278C4.53463 18.6412 4.26771 18.3402 4.02023 18.0269C4.75349 17.8236 5.57323 17.6514 6.45563 17.5133C6.70405 18.2816 7.00341 19.0005 7.35084 19.6544C7.67293 20.2605 8.02705 20.7931 8.40695 21.2494C7.07681 20.747 5.85678 19.9633 4.82124 18.9278ZM11.3245 21.7279C10.2999 21.4409 9.33068 20.5052 8.54221 19.0214C8.26644 18.5024 8.02422 17.9363 7.81672 17.3329C8.92764 17.2106 10.1098 17.1383 11.3245 17.1213V21.7279ZM11.3245 15.7722C9.97738 15.7906 8.66435 15.8752 7.43471 16.0196C7.16347 14.8983 7.00026 13.6846 6.95548 12.4246H11.3245V15.7722H11.3245ZM11.3245 11.0755H6.95292C6.99384 9.78019 7.15965 8.53267 7.43933 7.38284C8.66112 7.53558 9.9714 7.62848 11.3245 7.65507V11.0755ZM11.3245 6.30584C10.105 6.28127 8.92553 6.20176 7.82247 6.07202C8.02871 5.47492 8.26904 4.91447 8.54221 4.40025C9.33064 2.91639 10.2999 1.98075 11.3245 1.69375V6.30584ZM20.7461 6.59208C21.5491 7.94841 22.0231 9.47603 22.1274 11.0755H18.3949C18.355 9.73482 18.189 8.43635 17.9075 7.22804C18.9467 7.06021 19.9046 6.8467 20.7461 6.59208ZM19.1768 4.57221C19.4476 4.84305 19.7006 5.12695 19.9366 5.42169C19.2146 5.61885 18.4105 5.78618 17.5466 5.92086C17.2974 5.14784 16.9966 4.42473 16.6473 3.76725C16.3517 3.21103 16.0292 2.71649 15.6846 2.28622C16.9784 2.78966 18.1656 3.56097 19.1768 4.57221ZM12.6736 12.4246H17.0427C16.9976 13.6944 16.8322 14.9173 16.5571 16.0458C15.3354 15.8939 14.0257 15.8019 12.6736 15.776V12.4246ZM12.6736 11.0755V7.65956C14.0215 7.64186 15.3355 7.558 16.5664 7.41411C16.8415 8.55526 17.0046 9.79192 17.0452 11.0755H12.6736ZM12.6735 1.69375H12.6736C13.6981 1.98075 14.6674 2.91639 15.4558 4.40025C15.7334 4.92256 15.977 5.49266 16.1854 6.10046C15.073 6.22228 13.8895 6.29403 12.6735 6.31042V1.69375ZM12.6736 21.7279V17.1253C13.8919 17.1491 15.0705 17.2279 16.1732 17.3569C15.9675 17.9513 15.7279 18.5093 15.4559 19.0214C14.6674 20.5052 13.6982 21.4409 12.6736 21.7279ZM19.1768 18.9278C18.1413 19.9633 16.9213 20.747 15.5911 21.2493C15.971 20.7931 16.3251 20.2605 16.6472 19.6544C16.9895 19.0102 17.285 18.3028 17.5313 17.5473C18.4057 17.6916 19.2146 17.8701 19.9353 18.08C19.6997 18.3741 19.4472 18.6574 19.1768 18.9278ZM20.7411 16.9165C19.904 16.6473 18.9443 16.4209 17.8964 16.2422C18.1792 15.0437 18.3478 13.7553 18.3924 12.4246H22.1275C22.0229 14.0273 21.5472 15.558 20.7411 16.9165Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_480_1659">
                    <rect
                      width="23"
                      height="23"
                      fill="white"
                      transform="translate(0.499023 0.25)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </a>
            <a
              href="#"
              className="w-14 h-14 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <svg width="20" height="23" viewBox="0 0 22 24" fill="none">
                <g clipPath="url(#clip0_480_1667)">
                  <path
                    d="M11.0049 6.83379C8.1479 6.83379 5.84341 9.13828 5.84341 11.9953C5.84341 14.8523 8.1479 17.1568 11.0049 17.1568C13.862 17.1568 16.1665 14.8523 16.1665 11.9953C16.1665 9.13828 13.862 6.83379 11.0049 6.83379ZM11.0049 15.351C9.15864 15.351 7.64927 13.8461 7.64927 11.9953C7.64927 10.1445 9.15415 8.63965 11.0049 8.63965C12.8557 8.63965 14.3606 10.1445 14.3606 11.9953C14.3606 13.8461 12.8512 15.351 11.0049 15.351ZM17.5815 6.62266C17.5815 7.29199 17.0424 7.82656 16.3776 7.82656C15.7083 7.82656 15.1737 7.2875 15.1737 6.62266C15.1737 5.95781 15.7127 5.41875 16.3776 5.41875C17.0424 5.41875 17.5815 5.95781 17.5815 6.62266ZM21 7.84453C20.9237 6.23184 20.5553 4.80332 19.3739 3.62637C18.1969 2.44941 16.7684 2.08105 15.1557 2.0002C13.4936 1.90586 8.51177 1.90586 6.84966 2.0002C5.24146 2.07656 3.81294 2.44492 2.63149 3.62187C1.45005 4.79883 1.08618 6.22734 1.00532 7.84004C0.910986 9.50215 0.910986 14.484 1.00532 16.1461C1.08169 17.7588 1.45005 19.1873 2.63149 20.3643C3.81294 21.5412 5.23696 21.9096 6.84966 21.9904C8.51177 22.0848 13.4936 22.0848 15.1557 21.9904C16.7684 21.9141 18.1969 21.5457 19.3739 20.3643C20.5508 19.1873 20.9192 17.7588 21 16.1461C21.0944 14.484 21.0944 9.50664 21 7.84453ZM18.8528 17.9295C18.5024 18.81 17.8241 19.4883 16.9391 19.8432C15.6139 20.3687 12.4694 20.2475 11.0049 20.2475C9.54048 20.2475 6.39145 20.3643 5.07075 19.8432C4.19028 19.4928 3.51196 18.8145 3.15708 17.9295C2.63149 16.6043 2.75278 13.4598 2.75278 11.9953C2.75278 10.5309 2.63599 7.38184 3.15708 6.06113C3.50747 5.18066 4.18579 4.50234 5.07075 4.14746C6.39595 3.62187 9.54048 3.74316 11.0049 3.74316C12.4694 3.74316 15.6184 3.62637 16.9391 4.14746C17.8196 4.49785 18.4979 5.17617 18.8528 6.06113C19.3784 7.38633 19.2571 10.5309 19.2571 11.9953C19.2571 13.4598 19.3784 16.6088 18.8528 17.9295Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_480_1667">
                    <rect
                      width="20.125"
                      height="23"
                      fill="white"
                      transform="translate(0.9375 0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </a>
            <a
              href="#"
              className="w-14 h-14 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21.1996 20.9508V14.2118C21.1996 10.8998 20.4866 8.36975 16.6226 8.36975C14.7596 8.36975 13.5176 9.38175 13.0116 10.3478H12.9656V8.66875H9.30859V20.9508H13.1266V14.8558C13.1266 13.2458 13.4256 11.7048 15.4036 11.7048C17.3586 11.7048 17.3816 13.5218 17.3816 14.9478V20.9278H21.1996V20.9508Z"
                  fill="black"
                />
                <path
                  d="M3.09863 8.6687H6.91663V20.9507H3.09863V8.6687Z"
                  fill="black"
                />
                <path
                  d="M5.0078 2.55054C3.7888 2.55054 2.7998 3.53954 2.7998 4.75854C2.7998 5.97754 3.7888 6.98954 5.0078 6.98954C6.2268 6.98954 7.2158 5.97754 7.2158 4.75854C7.2158 3.53954 6.2268 2.55054 5.0078 2.55054Z"
                  fill="black"
                />
              </svg>
            </a>
            <a
              href="#"
              className="w-14 h-14 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <svg width="23" height="20" viewBox="0 0 24 22" fill="none">
                <path
                  d="M22.4506 5.73344C22.199 4.78709 21.4603 4.04438 20.5219 3.79282C18.8209 3.33362 12.0007 3.33362 12.0007 3.33362C12.0007 3.33362 5.1806 3.33362 3.47956 3.79282C2.54119 4.04438 1.80247 4.78709 1.55091 5.73344C1.0957 7.44647 1.0957 11.0163 1.0957 11.0163C1.0957 11.0163 1.0957 14.586 1.55091 16.2991C1.80247 17.2454 2.54119 17.9562 3.47956 18.2078C5.1806 18.667 12.0007 18.667 12.0007 18.667C12.0007 18.667 18.8209 18.667 20.5219 18.2078C21.4603 17.9562 22.199 17.2414 22.4506 16.2991C22.9058 14.586 22.9058 11.0163 22.9058 11.0163C22.9058 11.0163 22.9058 7.44647 22.4506 5.73344ZM9.77261 14.2586V7.7739L15.4707 11.0163L9.77261 14.2586Z"
                  fill="black"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
      {/* Top Agents Section */}
      <section className="bg-black py-16">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-[70px]">
          <div className="space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Top Agents
            </h2>
            <div className="relative">
              <div className="flex gap-8 overflow-x-auto scrollbar-hide pb-4">
                {/* Agent cards */}
                <div className="flex-shrink-0 opacity-40">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/7a3754b854baf1c9c429e2202e6e785e9f67989c?width=640"
                    alt="Agent"
                    className="w-80 h-[433px] object-cover rounded-md"
                  />
                </div>
                <div className="flex-shrink-0 opacity-40">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/458e678f48d29e0d26a90828ce335d500cedd450?width=640"
                    alt="Agent"
                    className="w-80 h-[433px] object-cover rounded-md"
                  />
                </div>
                <div className="flex-shrink-0 relative">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/989624fdfd14e872dfbb46d0a37b356568496bef?width=640"
                    alt="Isabella Clarke"
                    className="w-80 h-[484px] object-cover rounded-md"
                  />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-semibold">Isabella Clarke</h3>
                    <p className="text-gray-200">
                      Real Estate Negotiation Expert
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0 opacity-40">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/34cb9ee6a5ae50e4ce12041356092194086ea050?width=640"
                    alt="Agent"
                    className="w-80 h-[433px] object-cover rounded-md"
                  />
                </div>
                <div className="flex-shrink-0 opacity-40">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/24d1a5beb81dccdb49778b4821b7acbeafdd42e8?width=640"
                    alt="Agent"
                    className="w-80 h-[433px] object-cover rounded-md"
                  />
                </div>
              </div>
              <div className="flex justify-center gap-2 mt-8">
                <button
                  title="Previous"
                  aria-label="Previous"
                  className="w-10 h-10 flex items-center justify-center border border-gray-400 bg-black/10 backdrop-blur-sm hover:bg-black/20 transition-colors"
                >
                  <ChevronLeft className="text-white" size={16} />
                </button>
                <button
                  title="Next"
                  aria-label="Next"
                  className="w-10 h-10 flex items-center justify-center border border-gray-400 bg-black/10 backdrop-blur-sm hover:bg-black/20 transition-colors"
                >
                  <ChevronRight className="text-white" size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Active Listings Section */}
      <section className="max-w-[1600px] mx-auto px-4 lg:px-[70px] py-16">
        <div className="space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-black">
            Active Listings
          </h2>

          {/* Filter buttons */}
          <div className="flex items-center gap-4">
            <button className="px-5 py-2 border border-black text-black hover:bg-gray-50 transition-colors">
              Buy
            </button>
            <button className="px-5 py-2 border border-black text-black hover:bg-gray-50 transition-colors">
              Rent
            </button>
            <button className="px-5 py-2 border border-black text-black hover:bg-gray-50 transition-colors">
              Sold
            </button>
          </div>

          {/* Property listings grid */}
          <div className="space-y-8">
            {/* First row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Property 1 */}
              <div className="border border-gray-200 bg-white overflow-hidden">
                <div className="relative">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/1c586a2bf796f43887671486f52e771a180c6321?width=1032"
                    alt="Property"
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <div className="flex items-center gap-1 px-3 py-2 bg-black/10 backdrop-blur-sm border border-white text-white text-sm">
                      <Eye size={14} />
                      1,14K
                    </div>
                    <div className="px-3 py-2 bg-black/10 backdrop-blur-sm border border-white text-white text-sm">
                      Video
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      title="Save to favorites"
                      aria-label="Save to favorites"
                      className="p-2 bg-black/10 backdrop-blur-sm border border-white hover:bg-black/20 transition-colors"
                    >
                      <Heart className="text-white" size={16} />
                    </button>
                    <button
                      title="Share"
                      aria-label="Share"
                      className="p-2 bg-black/10 backdrop-blur-sm border border-white hover:bg-black/20 transition-colors"
                    >
                      <Share2 className="text-white" size={14} />
                    </button>
                  </div>
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <button
                      title="Previous"
                      aria-label="Previous"
                      className="w-8 h-8 flex items-center justify-center bg-black/10 backdrop-blur-sm border border-white hover:bg-black/20 transition-colors"
                    >
                      <ChevronLeft className="text-white" size={14} />
                    </button>
                    <button
                      title="Next"
                      aria-label="Next"
                      className="w-8 h-8 flex items-center justify-center bg-black/10 backdrop-blur-sm border border-white hover:bg-black/20 transition-colors"
                    >
                      <ChevronRight className="text-white" size={14} />
                    </button>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="font-bold text-xl text-black">
                      $1,008,061
                    </div>
                    <div className="flex items-center gap-1 text-sm font-semibold text-black">
                      Contact Agent
                      <ChevronRight size={12} className="text-gray-600" />
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900">
                    Semi Detached Villas | Dubai
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-white">
                    <div className="flex items-center gap-1">
                      <Bed size={14} />
                      <span>4 bed</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath size={14} />
                      <span>4 bath</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Square size={14} />
                      <span>2,000 sq ft</span>
                    </div>
                  </div>
                  <hr className="border-gray-200" />
                </div>
              </div>

              {/* Property 2 */}
              <div className="border border-gray-200 bg-white overflow-hidden">
                <div className="relative">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/e7d848c6230cf76dc763f3a9879566254830f187?width=1032"
                    alt="Property"
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-1 px-3 py-2 bg-black/10 backdrop-blur-sm border border-white text-white text-sm">
                      <Eye size={14} />
                      1,14K
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      title="Save to favorites"
                      aria-label="Save to favorites"
                      className="p-2 bg-black/10 backdrop-blur-sm border border-white hover:bg-black/20 transition-colors"
                    >
                      <Heart className="text-white" size={16} />
                    </button>
                    <button
                      title="Share"
                      aria-label="Share"
                      className="p-2 bg-black/10 backdrop-blur-sm border border-white hover:bg-black/20 transition-colors"
                    >
                      <Share2 className="text-white" size={14} />
                    </button>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="font-bold text-xl text-black">$611,131</div>
                    <div className="flex items-center gap-1 text-sm font-semibold text-black">
                      Contact Agent
                      <ChevronRight size={12} className="text-gray-600" />
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900">
                    Pool View | 2 Br+Maids | New York City
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-white">
                    <div className="flex items-center gap-1">
                      <Bed size={14} />
                      <span>4 bed</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath size={14} />
                      <span>4 bath</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Square size={14} />
                      <span>2,000 sq ft</span>
                    </div>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://api.builder.io/api/v1/image/assets/TEMP/44e8c12ce3ae54fcfc11b19fc61cecff2691e8aa?width=98"
                        alt="Agent"
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <div className="font-bold text-sm text-black">
                          David Paul
                        </div>
                        <div className="text-xs font-bold text-black">
                          Camana Technologies LLC
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Property 3 */}
              <div className="border border-gray-200 bg-white overflow-hidden">
                <div className="relative">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/92e4f4a446092d25f1d2c628ab96f497292434ae?width=1032"
                    alt="Property"
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-1 px-3 py-2 bg-black/10 backdrop-blur-sm border border-white text-white text-sm">
                      <Eye size={14} />
                      1,14K
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      title="Save to favorites"
                      aria-label="Save to favorites"
                      className="p-2 bg-black/10 backdrop-blur-sm border border-white hover:bg-black/20 transition-colors"
                    >
                      <Heart className="text-white" size={16} />
                    </button>
                    <button
                      title="Share"
                      aria-label="Share"
                      className="p-2 bg-black/10 backdrop-blur-sm border border-white hover:bg-black/20 transition-colors"
                    >
                      <Share2 className="text-white" size={14} />
                    </button>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="font-bold text-xl text-black">$778,909</div>
                    <div className="flex items-center gap-1 text-sm font-semibold text-black">
                      Contact Agent
                      <ChevronRight size={12} className="text-gray-600" />
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900">
                    Six Luxurious Ski In | LA
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-white">
                    <div className="flex items-center gap-1">
                      <Bed size={14} />
                      <span>4 bed</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath size={14} />
                      <span>4 bath</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Square size={14} />
                      <span>2,000 sq ft</span>
                    </div>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://api.builder.io/api/v1/image/assets/TEMP/bec29182c1fdda9b90e77780c0c0a24679313b57?width=98"
                        alt="Agent"
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <div className="font-bold text-sm text-black">
                          Marrie loose
                        </div>
                        <div className="text-xs font-bold text-black">
                          Camana Technologies LLC
                        </div>
                      </div>
                    </div>
                    <img
                      src="https://api.builder.io/api/v1/image/assets/TEMP/b69a8ad654149a58105e1fcba5d408a8585535b9?width=146"
                      alt="Logo"
                      className="w-16 h-6"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Second row - same structure */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Repeat similar structure for second row with same images and content */}
              <div className="border border-gray-200 bg-white overflow-hidden">
                <div className="relative">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/92e4f4a446092d25f1d2c628ab96f497292434ae?width=1032"
                    alt="Property"
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-1 px-3 py-2 bg-black/10 backdrop-blur-sm border border-white text-white text-sm">
                      <Eye size={14} />
                      1,14K
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      title="Save to favorites"
                      aria-label="Save to favorites"
                      className="p-2 bg-black/10 backdrop-blur-sm border border-white hover:bg-black/20 transition-colors"
                    >
                      <Heart className="text-white" size={16} />
                    </button>
                    <button
                      title="Share"
                      aria-label="Share"
                      className="p-2 bg-black/10 backdrop-blur-sm border border-white hover:bg-black/20 transition-colors"
                    >
                      <Share2 className="text-white" size={14} />
                    </button>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="font-bold text-xl text-black">$778,909</div>
                    <div className="flex items-center gap-1 text-sm font-semibold text-black">
                      Contact Agent
                      <ChevronRight size={12} className="text-gray-600" />
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900">
                    Six Luxurious Ski In | LA
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-white">
                    <div className="flex items-center gap-1">
                      <Bed size={14} />
                      <span>4 bed</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath size={14} />
                      <span>4 bath</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Square size={14} />
                      <span>2,000 sq ft</span>
                    </div>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://api.builder.io/api/v1/image/assets/TEMP/bec29182c1fdda9b90e77780c0c0a24679313b57?width=98"
                        alt="Agent"
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <div className="font-bold text-sm text-black">
                          Marrie loose
                        </div>
                        <div className="text-xs font-bold text-black">
                          Camana Technologies LLC
                        </div>
                      </div>
                    </div>
                    <img
                      src="https://api.builder.io/api/v1/image/assets/TEMP/b69a8ad654149a58105e1fcba5d408a8585535b9?width=146"
                      alt="Logo"
                      className="w-16 h-6"
                    />
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 bg-white overflow-hidden">
                <div className="relative">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/1c586a2bf796f43887671486f52e771a180c6321?width=1032"
                    alt="Property"
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <div className="flex items-center gap-1 px-3 py-2 bg-black/10 backdrop-blur-sm border border-white text-white text-sm">
                      <Eye size={14} />
                      1,14K
                    </div>
                    <div className="px-3 py-2 bg-black/10 backdrop-blur-sm border border-white text-white text-sm">
                      Video
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      title="Save to favorites"
                      aria-label="Save to favorites"
                      className="p-2 bg-black/10 backdrop-blur-sm border border-white hover:bg-black/20 transition-colors"
                    >
                      <Heart className="text-white" size={16} />
                    </button>
                    <button
                      title="Share"
                      aria-label="Share"
                      className="p-2 bg-black/10 backdrop-blur-sm border border-white hover:bg-black/20 transition-colors"
                    >
                      <Share2 className="text-white" size={14} />
                    </button>
                  </div>
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <button
                      title="Previous"
                      aria-label="Previous"
                      className="w-8 h-8 flex items-center justify-center bg-black/10 backdrop-blur-sm border border-white hover:bg-black/20 transition-colors"
                    >
                      <ChevronLeft className="text-white" size={14} />
                    </button>
                    <button
                      title="Next"
                      aria-label="Next"
                      className="w-8 h-8 flex items-center justify-center bg-black/10 backdrop-blur-sm border border-white hover:bg-black/20 transition-colors"
                    >
                      <ChevronRight className="text-white" size={14} />
                    </button>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="font-bold text-xl text-black">
                      $1,008,061
                    </div>
                    <div className="flex items-center gap-1 text-sm font-semibold text-black">
                      Contact Agent
                      <ChevronRight size={12} className="text-gray-600" />
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900">
                    Semi Detached Villas | Dubai
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-white">
                    <div className="flex items-center gap-1">
                      <Bed size={14} />
                      <span>4 bed</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath size={14} />
                      <span>4 bath</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Square size={14} />
                      <span>2,000 sq ft</span>
                    </div>
                  </div>
                  <hr className="border-gray-200" />
                </div>
              </div>

              <div className="border border-gray-200 bg-white overflow-hidden">
                <div className="relative">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/e7d848c6230cf76dc763f3a9879566254830f187?width=1032"
                    alt="Property"
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-1 px-3 py-2 bg-black/10 backdrop-blur-sm border border-white text-white text-sm">
                      <Eye size={14} />
                      1,14K
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      title="Save to favorites"
                      aria-label="Save to favorites"
                      className="p-2 bg-black/10 backdrop-blur-sm border border-white hover:bg-black/20 transition-colors"
                    >
                      <Heart className="text-white" size={16} />
                    </button>
                    <button
                      title="Share"
                      aria-label="Share"
                      className="p-2 bg-black/10 backdrop-blur-sm border border-white hover:bg-black/20 transition-colors"
                    >
                      <Share2 className="text-white" size={14} />
                    </button>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="font-bold text-xl text-black">$611,131</div>
                    <div className="flex items-center gap-1 text-sm font-semibold text-black">
                      Contact Agent
                      <ChevronRight size={12} className="text-gray-600" />
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900">
                    Pool View | 2 Br+Maids | New York City
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-white">
                    <div className="flex items-center gap-1">
                      <Bed size={14} />
                      <span>4 bed</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath size={14} />
                      <span>4 bath</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Square size={14} />
                      <span>2,000 sq ft</span>
                    </div>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://api.builder.io/api/v1/image/assets/TEMP/44e8c12ce3ae54fcfc11b19fc61cecff2691e8aa?width=98"
                        alt="Agent"
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <div className="font-bold text-sm text-black">
                          David Paul
                        </div>
                        <div className="text-xs font-bold text-black">
                          Camana Technologies LLC
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation controls */}
            <div className="flex justify-between items-center">
              <button className="px-8 py-3 bg-black text-white hover:bg-gray-800 transition-colors">
                View all
              </button>
              <div className="flex gap-2">
                <button
                  title="Previous"
                  aria-label="Previous"
                  className="w-12 h-12 flex items-center justify-center border border-white hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  title="Next"
                  aria-label="Next"
                  className="w-12 h-12 flex items-center justify-center border border-white hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      // Footer temporarily removed (uses global footer from App.tsx)
    </div>
  );
}
