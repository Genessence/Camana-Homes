import React from "react";
import {
  ChevronDown,
  Menu,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const Article = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-[#EAEAEA] bg-white">
        {/* Main Navigation */}
        <div className="flex items-center justify-center h-[66px] px-4 lg:px-[70px]">
          <div className="flex items-center justify-between w-full max-w-[1460px]">
            {/* Logo */}
            <div className="flex items-center h-[66px] py-[14px]">
              <Link to="/">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/5a19f6126fa6dcda25d289130b048916b16fa621?width=310"
                  alt="Logo"
                  className="h-[43px] w-[155px]"
                />
              </Link>
            </div>

            {/* Center Navigation */}
            <div className="hidden lg:flex items-center gap-[15px]">
              {["Buy", "Sell", "Rent", "Mortgage"].map((item) => (
                <button
                  key={item}
                  className="flex items-center justify-center h-[50px] px-[21px] py-[8px] border border-black bg-transparent text-black font-dm-sans text-[17px] font-medium hover:bg-gray-100 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Right Navigation */}
            <div className="flex items-center gap-[12px]">
              <button className="hidden md:flex items-center justify-center h-[50px] px-[21px] py-[8px] border border-black bg-gray-light/14 text-black font-dm-sans text-[14px] font-medium tracking-[-0.48px] hover:bg-gray-100 transition-colors">
                Get Connected
              </button>
              <button className="flex items-center justify-center h-[50px] px-[20px] py-[8px] bg-black text-white font-dm-sans text-[14px] font-medium hover:bg-gray-800 transition-colors">
                Agent Login
              </button>
              <Menu className="w-5 h-5 text-black cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="hidden lg:flex items-center justify-center h-[46px] px-4 xl:px-[315px] border-t border-white border-b border-white bg-gray-light/15 backdrop-blur-[8.5px]">
          <div className="flex items-center gap-[24px] py-[12px] overflow-x-auto">
            {[
              "Luxury homes",
              "Branded Residences",
              "New Developments",
              "Camana trips",
              "Vacations",
            ].map((item) => (
              <span
                key={item}
                className="text-black text-center font-inter text-[17px] font-medium leading-[19.2px] hover:text-black/80 cursor-pointer transition-colors whitespace-nowrap"
              >
                {item}
              </span>
            ))}
            <div className="flex items-center gap-[10px]">
              <span className="text-black text-center font-inter text-[17px] font-medium leading-[19.2px]">
                More
              </span>
              <ChevronDown className="w-[11px] h-[6px] text-black" />
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <div className="flex flex-col items-center w-full px-4 lg:px-[70px] py-[40px] gap-[20px]">
        <div className="flex flex-col items-center w-full max-w-[1460px] gap-[20px]">
          {/* Article Header */}
          <div className="flex flex-col items-center gap-[20px] w-full">
            <div className="flex items-center justify-center px-[10px] py-[10px] bg-red-accent">
              <span className="text-white text-center font-dm-sans text-[20px] font-bold leading-normal">
                Celebrity Homes
              </span>
            </div>

            <h1 className="text-black text-center font-dm-sans text-[35px] lg:text-[47px] font-bold leading-normal uppercase max-w-[1190px]">
              Mary Tyler Moore's Sells for a Reduced $16.9 Million
            </h1>

            <p className="text-black text-center font-dm-sans text-[16px] font-normal leading-[24px] tracking-[-0.32px] max-w-[1190px]">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p>

            <div className="font-dm-sans text-[17px] text-black">
              <span className="font-bold">By Tori Latham</span>
              <span className="font-normal"> - 12 hours ago</span>
            </div>
          </div>

          {/* Main Article Image */}
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/c71766067e647968b2f89dacbbc200b0690ef6bb?width=2920"
            alt="Mary Tyler Moore's home"
            className="w-full max-w-[1460px] h-[400px] lg:h-[725px] object-cover"
          />

          {/* Property Link */}
          <div className="w-full text-left">
            <a
              href="#"
              className="text-red-accent font-dm-sans text-[20px] font-bold italic underline"
            >
              Semi Detached Villas | Dubai
            </a>
          </div>
        </div>
      </div>

      {/* Article Body */}
      <div className="flex justify-center px-4 lg:px-[70px] py-[40px] gap-[20px]">
        <div className="flex flex-col lg:flex-row w-full max-w-[1460px] gap-[20px]">
          {/* Social Share Sidebar */}
          <div className="flex flex-row lg:flex-col items-center lg:items-start gap-[20px] w-full lg:w-[145px] lg:sticky lg:top-[20px] lg:h-fit">
            <h3 className="font-inter text-[18px] font-bold text-black">
              Share to:
            </h3>
            <div className="flex flex-row lg:flex-col gap-[7px]">
              {[
                { icon: Mail, label: "Email" },
                { icon: Facebook, label: "Facebook" },
                { icon: Instagram, label: "Instagram" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Youtube, label: "YouTube" },
              ].map((social, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center w-[56px] h-[56px] rounded-full border border-black/16 hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  <social.icon className="w-[23px] h-[23px] text-black" />
                </div>
              ))}
            </div>
          </div>

          {/* Article Content */}
          <div className="flex-1 flex flex-col gap-[20px]">
            <div className="font-dm-sans text-[16px] font-normal leading-[24px] tracking-[-0.32px] text-black">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
              <br />
              <br />
              It was popularised in the 1960s with the release of Letraset
              sheets containing Lorem Ipsum passages, and more recently with
              desktop publishing software like Aldus PageMaker including
              versions of Lorem Ipsum.
              <br />
              <br />
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
            </div>

            {/* Article Image with Navigation */}
            <div className="relative w-full">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/2295be99b3590e5d117db932230149bd0c1ac201?width=2056"
                alt="Property interior"
                className="w-full h-[300px] lg:h-[470px] object-cover"
              />
              <div className="absolute bottom-[20px] right-[20px] flex gap-[7px]">
                <button className="flex items-center justify-center w-[50px] h-[50px] border border-white bg-black/10 backdrop-blur-[11px] hover:bg-black/20 transition-colors">
                  <ArrowLeft className="w-4 h-4 text-white" />
                </button>
                <button className="flex items-center justify-center w-[50px] h-[50px] border border-white bg-black/10 backdrop-blur-[11px] hover:bg-black/20 transition-colors">
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
              <div className="absolute bottom-[20px] left-[20px] text-white font-dm-sans text-[14px] font-normal leading-[17px]">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </div>
            </div>

            <div className="h-[1px] bg-gray-light"></div>

            <div className="font-dm-sans text-[16px] font-normal leading-[24px] tracking-[-0.32px] text-black">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
              <br />
              <br />
              It was popularised in the 1960s with the release of Letraset
              sheets containing Lorem Ipsum passages, and more recently with
              desktop publishing software like Aldus PageMaker including
              versions of Lorem Ipsum.
              <br />
              <br />
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
            </div>

            {/* Property Card and Sidebar */}
            <div className="flex flex-col lg:flex-row gap-[20px]">
              {/* Property Card */}
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-[10px]">
                <div className="border border-gray-light bg-white p-[10px]">
                  <div className="relative h-[316px] mb-[10px]">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/TEMP/b2aaf4ab7fe943123c831e8c3b0baabf8cb2f86e?width=1032"
                      alt="Property"
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute top-[10px] left-[9px] flex gap-[10px]">
                      <div className="flex items-center gap-[6px] px-[9px] py-[8px] border border-white bg-black/10 backdrop-blur-[8px]">
                        <span className="text-white font-dm-sans text-[13px] font-medium">
                          1,14K
                        </span>
                      </div>
                    </div>

                    <div className="absolute bottom-[34px] left-[9px]">
                      <div className="flex items-center gap-[5px] px-[7px] py-[6px] border border-white bg-black/10 backdrop-blur-[8px]">
                        <span className="text-white font-dm-sans text-[16px] font-medium tracking-[-0.32px]">
                          Save
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-[11px]">
                    <div className="flex items-center justify-between">
                      <div className="font-dm-sans text-[24px] font-semibold text-black">
                        $1,300,000
                      </div>
                      <div className="flex items-center gap-[5px]">
                        <span className="font-dm-sans text-[14px] font-semibold text-black">
                          Contact Agent
                        </span>
                      </div>
                    </div>

                    <h3 className="font-dm-sans text-[18px] font-bold text-black">
                      Residential Villa Rica | New York City
                    </h3>

                    <div className="flex items-center gap-[10px] text-[12px] font-normal text-white">
                      <span>4 bed</span>
                      <span>4 bath</span>
                      <span>2,000 sq ft</span>
                    </div>

                    <div className="h-[1px] bg-gray-light"></div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-[5px]">
                        <img
                          src="https://api.builder.io/api/v1/image/assets/TEMP/21584c4a5fb695a4f53c9f609c46424507f3b08c?width=98"
                          alt="Agent"
                          className="w-[49px] h-[49px] rounded-full"
                        />
                        <div>
                          <div className="font-dm-sans text-[14px] font-bold italic text-black">
                            Shopie Dsouza
                          </div>
                          <div className="font-dm-sans text-[12px] font-bold italic text-black">
                            Camana Technologies LLC
                          </div>
                        </div>
                      </div>
                      <img
                        src="https://api.builder.io/api/v1/image/assets/TEMP/b69a8ad654149a58105e1fcba5d408a8585535b9?width=146"
                        alt="Company Logo"
                        className="w-[73px] h-[26px]"
                      />
                    </div>
                  </div>
                </div>

                {/* Second Property Image */}
                <div className="border border-gray-light">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/7724a288e3c6605f887636a71a384eebf0fad5e3?width=958"
                    alt="Property"
                    className="w-full h-[475px] object-cover"
                  />
                </div>
              </div>

              {/* Reading Time Sidebar */}
              <div className="w-full lg:w-[247px] flex flex-col gap-[17px]">
                <div className="bg-[#F5F5F5] p-[20px]">
                  <h3 className="font-inter text-[19px] font-bold text-black">
                    10 Minute read
                  </h3>
                </div>
                <div className="px-[10px]">
                  <p className="text-[#848484] font-dm-sans text-[16px] font-normal leading-[24px] tracking-[-0.32px]">
                    Lorem Ipsum is simply dummy text of the printing
                    <br />
                    <br />
                    Lorem Ipsum is simply dummy text of the printing
                    <br />
                    <br />
                    Lorem Ipsum is simply dummy text of the printing
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Author Bio Section */}
      <div className="w-full bg-black py-[40px] px-4 lg:px-[70px]">
        <div className="max-w-[1460px] mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-[40px] p-[30px] lg:p-[50px] border border-white/20">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/9c5fa00d5041dea3555611f87579c245a8c69a1c?width=650"
              alt="Tori Latham"
              className="w-[200px] lg:w-[325px] h-[300px] lg:h-[527px] object-cover"
            />
            <div className="flex flex-col gap-[20px] text-white">
              <h2 className="font-montserrat text-[24px] lg:text-[28px] font-bold">
                Written by Tori Latham
              </h2>
              <p className="font-dm-sans text-[17px] font-medium leading-[25px] opacity-70">
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words, consectetur, from a Lorem
                Ipsum passage, and going through the cites of the word in
                classical literature, discovered the undoubtable source. Lorem
                Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus
                Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,
                written in 45 BC. This book is a treatise on the theory of
                ethics, very popular during the Renaissance. The first line of
                Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line
                in section 1.10.32
              </p>
              <div className="flex items-center gap-[10px]">
                <a
                  href="#"
                  className="text-red-accent font-dm-sans text-[16px] font-bold italic underline"
                >
                  Read More articles by Tori Latham
                </a>
                <ArrowRight className="w-[10px] h-[5px] text-red-accent transform -rotate-90" />
              </div>
              <div className="flex items-center gap-[15px] mt-[20px]">
                {[
                  { icon: "globe", size: "w-[40px] h-[40px]" },
                  { icon: "instagram", size: "w-[40px] h-[40px]" },
                  { icon: "linkedin", size: "w-[40px] h-[40px]" },
                  { icon: "youtube", size: "w-[40px] h-[40px]" },
                ].map((social, index) => (
                  <div
                    key={index}
                    className={`${social.size} bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors`}
                  >
                    <div className="w-[20px] h-[20px] bg-black"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Articles Section */}
      <div className="w-full bg-[#F5F5F5] py-[40px] px-4 lg:px-[70px]">
        <div className="max-w-[1460px] mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start mb-[30px]">
            <h2 className="font-dm-sans text-[35px] font-bold text-black mb-[20px] lg:mb-0">
              Trending articles
            </h2>
            <button className="bg-black text-white font-dm-sans text-[16px] font-medium px-[35px] py-[8px] h-[50px] hover:bg-gray-800 transition-colors">
              View all
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
            {[...Array(9)].map((_, index) => (
              <div
                key={index}
                className="flex gap-[20px] pb-[20px] border-b border-[#C9C9C9]"
              >
                <img
                  src={`https://api.builder.io/api/v1/image/assets/TEMP/a7b18e8c34c859a06a0c84dd3b3bcb6778becbbb?width=354`}
                  alt="Article thumbnail"
                  className="w-[177px] h-[95px] object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <p className="font-dm-sans text-[16px] font-medium leading-[25px] text-black">
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text.
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-[30px]">
            <button className="bg-black text-white font-dm-sans text-[16px] font-medium px-[35px] py-[8px] h-[50px] hover:bg-gray-800 transition-colors">
              View all
            </button>
          </div>
        </div>
      </div>

      {/* Read More Section */}
      <div className="w-full bg-white py-[40px] px-4 lg:px-[70px]">
        <div className="max-w-[1460px] mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start mb-[30px]">
            <h2 className="font-dm-sans text-[35px] font-bold text-black mb-[20px] lg:mb-0">
              Read More
            </h2>
            <button className="bg-black text-white font-dm-sans text-[16px] font-medium px-[35px] py-[8px] h-[50px] hover:bg-gray-800 transition-colors">
              View all
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[30px]">
            {[
              {
                image:
                  "https://api.builder.io/api/v1/image/assets/TEMP/38c8637db4c55785cf2315831fdfb0654f1da9fe?width=1072",
                category: "Homes for Sale",
                title: "This $1.9 Million William Kesling Home in Pasadena",
                author: "By Tori Latham - 12 hours ago",
              },
              {
                image:
                  "https://api.builder.io/api/v1/image/assets/TEMP/1b3568bdc2c8d6ca446dd36419f11fcb367b0373?width=1072",
                category: "Product Recommendations",
                title: "From Your Own Sonoma Wine to a Custom Portrait",
                author: "By Tori Latham - 12 hours ago",
              },
              {
                image:
                  "https://api.builder.io/api/v1/image/assets/TEMP/39c75c49a51a17ed90d2ee6ab01285cf10c2d211?width=1072",
                category: "Celebrity Homes",
                title: "Mary Tyler Moore's Sells for a Reduced $16.9 Million",
                author: "By Tori Latham - 12 hours ago",
              },
            ].map((article, index) => (
              <div
                key={index}
                className="border border-gray-light overflow-hidden bg-white"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-[286px] object-cover"
                />
                <div className="p-[26px] text-center">
                  <span className="text-red-accent font-dm-sans text-[18px] font-normal">
                    {article.category}
                  </span>
                  <h3 className="font-dm-sans text-[30px] font-bold leading-[35px] text-black my-[20px]">
                    {article.title}
                  </h3>
                  <p className="text-[#3D3E3F] font-dm-sans text-[16px] font-normal">
                    {article.author}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-[30px]">
            <button className="bg-black text-white font-dm-sans text-[16px] font-medium px-[35px] py-[8px] h-[50px] hover:bg-gray-800 transition-colors">
              View all
            </button>
            <div className="flex gap-[10px]">
              <button className="flex items-center justify-center w-[40px] h-[40px] border border-white hover:bg-gray-100 transition-colors">
                <ArrowLeft className="w-4 h-4 text-black" />
              </button>
              <button className="flex items-center justify-center w-[40px] h-[40px] border border-white hover:bg-gray-100 transition-colors">
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer removed (global Footer renders from App.tsx) */}
    </div>
  );
};

export default Article;
