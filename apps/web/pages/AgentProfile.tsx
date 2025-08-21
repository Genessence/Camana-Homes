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
      {/* Top Agents Section */}
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
