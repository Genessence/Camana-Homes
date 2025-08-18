import Header from "@/components/Header";
import React from "react";

export default function Journal() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header strip (matches site chrome spacing) */}

      {/* Featured article block */}
      <section className="max-w-[1600px] mx-auto px-4 lg:px-[70px] py-10">
        <div className="flex flex-col lg:flex-row gap-[15px] lg:gap-[30px] items-start">
          {/* Main article */}
          <article className="bg-white w-full lg:w-[931px] border border-gray-200">
            <div
              className="h-[575px] bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('http://localhost:3845/assets/bc51edd598080ad9d7582562e1fd4c4b65414b9f.png')",
              }}
            />
            <div className="px-6 py-6 text-center">
              <span className="inline-block bg-red-accent text-white px-2.5 py-[5px] text-[16px] font-extrabold">
                Celebrity Homes
              </span>
              <h1 className="mt-5 text-[35px] lg:text-[40px] font-black uppercase text-black leading-[1.15]">
                Mary Tyler Moore's Sells for a Reduced $16.9 Million
              </h1>
              <p className="mt-4 mx-auto max-w-[852px] text-[16px] leading-[24px] text-black">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. It has survived not only five centuries, but also the
                leap into electronic typesetting.
              </p>
              <p className="mt-3 text-[18px]">By Tori Latham - 12 hours ago</p>
            </div>
          </article>

          {/* Sidebar cards */}
          <div className="grid grid-cols-1 gap-[15px] w-full lg:w-[499px]">
            {[1, 2].map((i) => (
              <article key={i} className="border border-gray-200 bg-white">
                <div
                  className="h-[266px] bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('http://localhost:3845/assets/bc51edd598080ad9d7582562e1fd4c4b65414b9f.png')",
                  }}
                />
                <div className="px-5 py-5 text-center">
                  <span className="inline-block bg-red-accent text-white px-2 py-[5px] text-[14px] font-extrabold">
                    Homes for Sale
                  </span>
                  <h3 className="mt-3 text-[24px] font-black uppercase text-black leading-[1.2]">
                    This $1.9 Million William Kesling Home in Pasadena
                  </h3>
                  <p className="mt-2 text-[15px]">
                    By Tori Latham - 12 hours ago
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Top News Section */}
      <section className="bg-neutral-100 py-[30px]">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-[70px]">
          <div className="flex flex-col lg:flex-row gap-[30px] items-start">
            {/* Large article card on the left */}
            <article className="bg-white border border-gray-200 w-full lg:w-[402px] h-[940px]">
              <div
                className="h-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('http://localhost:3845/assets/b0cee3a7d5287437eec019fd019bd97cc7216d32.png')",
                }}
              />
            </article>

            {/* Right side content */}
            <div className="flex-1">
              {/* Section title */}
              <h2 className="text-[35px] font-semibold text-black mb-[30px]">
                Top News
              </h2>

              {/* 2x2 grid of cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-[18px]">
                {/* Card 1 - Homes for Sale */}
                <article className="bg-white border border-gray-200">
                  <div
                    className="h-[266px] bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('http://localhost:3845/assets/08b9d36d8a14579b37ac7b47913bd04e73ddfd23.png')",
                    }}
                  />
                  <div className="px-5 py-5 text-center">
                    <span className="inline-block bg-red-accent text-white px-2 py-[5px] text-[16px] font-extrabold">
                      Homes for Sale
                    </span>
                    <h3 className="mt-3 text-[28px] font-black uppercase text-black leading-[32px]">
                      This $1.9 Million William Kesling Home in Pasadena
                    </h3>
                    <p className="mt-2 text-[15px]">
                      <span className="font-bold italic">By Tori Latham</span> -
                      12 hours ago
                    </p>
                  </div>
                </article>

                {/* Card 2 - Product Recommendations */}
                <article className="bg-white border border-gray-200">
                  <div
                    className="h-[266px] bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('http://localhost:3845/assets/ef30f4718043896d312186b2989f3d7d7f3352a1.png')",
                    }}
                  />
                  <div className="px-5 py-5 text-center">
                    <span className="inline-block bg-red-accent text-white px-2 py-[5px] text-[16px] font-extrabold">
                      Product Recommendations
                    </span>
                    <h3 className="mt-3 text-[28px] font-black uppercase text-black leading-[32px]">
                      From Your Own Sonoma Wine to a Custom Portrait
                    </h3>
                    <p className="mt-2 text-[15px]">
                      <span className="font-bold italic">By Tori Latham</span> -
                      12 hours ago
                    </p>
                  </div>
                </article>

                {/* Card 3 - Product Recommendations (duplicate) */}
                <article className="bg-white border border-gray-200">
                  <div
                    className="h-[266px] bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('http://localhost:3845/assets/ef30f4718043896d312186b2989f3d7d7f3352a1.png')",
                    }}
                  />
                  <div className="px-5 py-5 text-center">
                    <span className="inline-block bg-red-accent text-white px-2 py-[5px] text-[16px] font-extrabold">
                      Product Recommendations
                    </span>
                    <h3 className="mt-3 text-[28px] font-black uppercase text-black leading-[32px]">
                      From Your Own Sonoma Wine to a Custom Portrait
                    </h3>
                    <p className="mt-2 text-[15px]">
                      <span className="font-bold italic">By Tori Latham</span> -
                      12 hours ago
                    </p>
                  </div>
                </article>

                {/* Card 4 - Homes for Sale (duplicate) */}
                <article className="bg-white border border-gray-200">
                  <div
                    className="h-[266px] bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('http://localhost:3845/assets/08b9d36d8a14579b37ac7b47913bd04e73ddfd23.png')",
                    }}
                  />
                  <div className="px-5 py-5 text-center">
                    <span className="inline-block bg-red-accent text-white px-2 py-[5px] text-[16px] font-extrabold">
                      Homes for Sale
                    </span>
                    <h3 className="mt-3 text-[28px] font-black uppercase text-black leading-[32px]">
                      This $1.9 Million William Kesling Home in Pasadena
                    </h3>
                    <p className="mt-2 text-[15px]">
                      <span className="font-bold italic">By Tori Latham</span> -
                      12 hours ago
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </div>

          {/* View all button */}
          <div className="mt-[30px]">
            <button className="bg-black text-white px-[35px] py-2 text-[16px] font-medium tracking-[-0.32px]">
              View all
            </button>
          </div>
        </div>
      </section>

      {/* Latest Journal Section */}
      <section className="max-w-[1600px] mx-auto px-4 lg:px-[70px] py-10">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-[30px] mb-[30px]">
          <h2 className="text-[35px] font-semibold text-black">
            Latest Journal
          </h2>
          <button className="bg-black text-white px-[35px] py-2 text-[16px] font-medium tracking-[-0.32px] h-[50px]">
            View all
          </button>
        </div>

        {/* Horizontal carousel container */}
        <div className="relative overflow-hidden">
          <div className="flex gap-[30px] overflow-x-auto pb-4">
            {/* Card 1 - Celebrity Homes */}
            <article className="bg-white border border-gray-200 w-full lg:w-[537px] flex-shrink-0">
              <div
                className="h-[286px] bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('http://localhost:3845/assets/bc51edd598080ad9d7582562e1fd4c4b65414b9f.png')",
                }}
              />
              <div className="px-5 py-5 text-center">
                <span className="inline-block bg-red-accent text-white px-2 py-[5px] text-[18px] font-extrabold">
                  Celebrity Homes
                </span>
                <h3 className="mt-3 text-[30px] font-black uppercase text-black leading-[35px]">
                  Mary Tyler Moore's Sells for a Reduced $16.9..
                </h3>
                <p className="mt-2 text-[16px]">
                  <span className="font-bold italic">By Tori Latham</span> - 12
                  hours ago
                </p>
              </div>
            </article>

            {/* Card 2 - Homes for Sale */}
            <article className="bg-white border border-gray-200 w-full lg:w-[537px] flex-shrink-0">
              <div
                className="h-[286px] bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('http://localhost:3845/assets/08b9d36d8a14579b37ac7b47913bd04e73ddfd23.png')",
                }}
              />
              <div className="px-5 py-5 text-center">
                <span className="inline-block bg-red-accent text-white px-2 py-[5px] text-[18px] font-extrabold">
                  Homes for Sale
                </span>
                <h3 className="mt-3 text-[30px] font-black uppercase text-black leading-[35px]">
                  This $1.9 Million William Kesling Home in Pasadena
                </h3>
                <p className="mt-2 text-[16px]">
                  <span className="font-bold italic">By Tori Latham</span> - 12
                  hours ago
                </p>
              </div>
            </article>

            {/* Card 3 - Product Recommendations */}
            <article className="bg-white border border-gray-200 w-full lg:w-[537px] flex-shrink-0">
              <div
                className="h-[286px] bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('http://localhost:3845/assets/ef30f4718043896d312186b2989f3d7d7f3352a1.png')",
                }}
              />
              <div className="px-5 py-5 text-center">
                <span className="inline-block bg-red-accent text-white px-2 py-[5px] text-[18px] font-extrabold">
                  Product Recommendations
                </span>
                <h3 className="mt-3 text-[30px] font-black uppercase text-black leading-[35px]">
                  From Your Own Sonoma Wine to a Custom Portrait
                </h3>
                <p className="mt-2 text-[16px]">
                  <span className="font-bold italic">By Tori Latham</span> - 12
                  hours ago
                </p>
              </div>
            </article>
          </div>

          {/* Navigation arrows */}
          <div className="flex justify-end gap-2 mt-[30px]">
            <button
              className="w-[36.5px] h-10 flex items-center justify-center rotate-180"
              title="Previous articles"
              aria-label="Navigate to previous articles"
            >
              <svg
                width="37"
                height="40"
                viewBox="0 0 37 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18.5 0L37 20L18.5 40L0 20L18.5 0Z" fill="#D1D5DB" />
              </svg>
            </button>
            <button
              className="w-[36.5px] h-10 flex items-center justify-center"
              title="Next articles"
              aria-label="Navigate to next articles"
            >
              <svg
                width="37"
                height="40"
                viewBox="0 0 37 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18.5 0L37 20L18.5 40L0 20L18.5 0Z" fill="#D1D5DB" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Second Latest Journal Section */}
      <section className="bg-neutral-100 py-10">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-[70px]">
          <div className="flex flex-col lg:flex-row gap-[30px] items-start">
            {/* Left side - Article list */}
            <div className="flex-1">
              {/* Section title */}
              <h2 className="text-[35px] font-semibold text-black mb-[30px]">
                Latest Journal
              </h2>

              {/* Stacked article cards */}
              <div className="space-y-[30px]">
                {/* Article 1 */}
                <article className="flex flex-col lg:flex-row gap-[25px] items-start">
                  <div
                    className="w-full lg:w-[360px] h-[245px] bg-cover bg-center rounded-lg flex-shrink-0"
                    style={{
                      backgroundImage:
                        "url('http://localhost:3845/assets/4788538ca0c9ce2876b9fbfcf7daa9c9d5cf1860.png')",
                    }}
                  />
                  <div className="flex-1">
                    <span className="inline-block bg-red-accent text-white px-2 py-[5px] text-[18px] font-bold uppercase mb-3">
                      Exclusive
                    </span>
                    <h3 className="text-[28px] font-bold uppercase leading-[1.3] text-black mb-3">
                      10 Hilarious Cartoons That Depict Real-Life Problems of
                      Programmers
                    </h3>
                    <p className="text-[18px] text-black leading-[1.5] mb-3 max-w-[610px]">
                      Redefined the user acquisition and redesigned the
                      onboarding experience, all within 3 working weeks.
                    </p>
                    <div className="bg-white px-3 py-2 rounded-tr-[6px] rounded-br-[6px] inline-block">
                      <span className="text-[16px] font-bold italic uppercase text-black">
                        By Larisha Paul
                      </span>
                    </div>
                  </div>
                </article>

                {/* Article 2 */}
                <article className="flex flex-col lg:flex-row gap-[25px] items-start">
                  <div
                    className="w-full lg:w-[360px] h-[245px] bg-cover bg-center rounded-lg flex-shrink-0"
                    style={{
                      backgroundImage:
                        "url('http://localhost:3845/assets/4788538ca0c9ce2876b9fbfcf7daa9c9d5cf1860.png')",
                    }}
                  />
                  <div className="flex-1">
                    <span className="inline-block bg-red-accent text-white px-2 py-[5px] text-[18px] font-bold uppercase mb-3">
                      Exclusive
                    </span>
                    <h3 className="text-[28px] font-bold uppercase leading-[1.3] text-black mb-3">
                      10 Hilarious Cartoons That Depict Real-Life Problems of
                      Programmers
                    </h3>
                    <p className="text-[18px] text-black leading-[1.5] mb-3 max-w-[610px]">
                      Redefined the user acquisition and redesigned the
                      onboarding experience, all within 3 working weeks.
                    </p>
                    <div className="bg-white px-3 py-2 rounded-tr-[6px] rounded-br-[6px] inline-block">
                      <span className="text-[16px] font-bold italic uppercase text-black">
                        By Larisha Paul
                      </span>
                    </div>
                  </div>
                </article>

                {/* Article 3 */}
                <article className="flex flex-col lg:flex-row gap-[25px] items-start">
                  <div
                    className="w-full lg:w-[360px] h-[245px] bg-cover bg-center rounded-lg flex-shrink-0"
                    style={{
                      backgroundImage:
                        "url('http://localhost:3845/assets/4788538ca0c9ce2876b9fbfcf7daa9c9d5cf1860.png')",
                    }}
                  />
                  <div className="flex-1">
                    <span className="inline-block bg-red-accent text-white px-2 py-[5px] text-[18px] font-bold uppercase mb-3">
                      Exclusive
                    </span>
                    <h3 className="text-[28px] font-bold uppercase leading-[1.3] text-black mb-3">
                      10 Hilarious Cartoons That Depict Real-Life Problems of
                      Programmers
                    </h3>
                    <p className="text-[18px] text-black leading-[1.5] mb-3 max-w-[610px]">
                      Redefined the user acquisition and redesigned the
                      onboarding experience, all within 3 working weeks.
                    </p>
                    <div className="bg-white px-3 py-2 rounded-tr-[6px] rounded-br-[6px] inline-block">
                      <span className="text-[16px] font-bold italic uppercase text-black">
                        By Larisha Paul
                      </span>
                    </div>
                  </div>
                </article>
              </div>

              {/* View all button */}
              <div className="mt-[30px]">
                <button className="bg-black text-white px-[35px] py-2 text-[16px] font-medium tracking-[-0.32px] h-[50px]">
                  View all
                </button>
              </div>
            </div>

            {/* Right side - Large image */}
            <div className="w-full lg:w-[405px] h-[751px] bg-cover bg-center flex-shrink-0">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('http://localhost:3845/assets/4b1b6a9b52c58b03055f9a8aa5be8d27106b110e.png')",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Recommends Section */}
      <section className="max-w-[1600px] mx-auto px-4 lg:px-[70px] py-10">
        {/* Section title */}
        <h2 className="text-[35px] font-semibold text-black mb-[30px]">
          Recommends
        </h2>

        {/* Horizontal carousel of circular cards */}
        <div className="relative">
          <div className="flex gap-[30px] overflow-x-auto pb-4">
            {/* Card 1 */}
            <article className="flex flex-col items-center w-full lg:w-[280px] flex-shrink-0">
              <div
                className="w-[200px] h-[200px] rounded-full bg-cover bg-center mb-4"
                style={{
                  backgroundImage:
                    "url('http://localhost:3845/assets/ef30f4718043896d312186b2989f3d7d7f3352a1.png')",
                }}
              />
              <span className="inline-block bg-red-accent text-white px-2 py-[5px] text-[16px] font-bold uppercase mb-3">
                Exclusive
              </span>
              <h3 className="text-[20px] font-bold uppercase text-black text-center leading-[1.3]">
                From Your Own Sonoma Wine to a Custom Portrait
              </h3>
            </article>

            {/* Card 2 */}
            <article className="flex flex-col items-center w-full lg:w-[280px] flex-shrink-0">
              <div
                className="w-[200px] h-[200px] rounded-full bg-cover bg-center mb-4"
                style={{
                  backgroundImage:
                    "url('http://localhost:3845/assets/ef30f4718043896d312186b2989f3d7d7f3352a1.png')",
                }}
              />
              <span className="inline-block bg-red-accent text-white px-2 py-[5px] text-[16px] font-bold uppercase mb-3">
                Exclusive
              </span>
              <h3 className="text-[20px] font-bold uppercase text-black text-center leading-[1.3]">
                From Your Own Sonoma Wine to a Custom Portrait
              </h3>
            </article>

            {/* Card 3 */}
            <article className="flex flex-col items-center w-full lg:w-[280px] flex-shrink-0">
              <div
                className="w-[200px] h-[200px] rounded-full bg-cover bg-center mb-4"
                style={{
                  backgroundImage:
                    "url('http://localhost:3845/assets/ef30f4718043896d312186b2989f3d7d7f3352a1.png')",
                }}
              />
              <span className="inline-block bg-red-accent text-white px-2 py-[5px] text-[16px] font-bold uppercase mb-3">
                Exclusive
              </span>
              <h3 className="text-[20px] font-bold uppercase text-black text-center leading-[1.3]">
                From Your Own Sonoma Wine to a Custom Portrait
              </h3>
            </article>

            {/* Card 4 */}
            <article className="flex flex-col items-center w-full lg:w-[280px] flex-shrink-0">
              <div
                className="w-[200px] h-[200px] rounded-full bg-cover bg-center mb-4"
                style={{
                  backgroundImage:
                    "url('http://localhost:3845/assets/ef30f4718043896d312186b2989f3d7d7f3352a1.png')",
                }}
              />
              <span className="inline-block bg-red-accent text-white px-2 py-[5px] text-[16px] font-bold uppercase mb-3">
                Exclusive
              </span>
              <h3 className="text-[20px] font-bold uppercase text-black text-center leading-[1.3]">
                From Your Own Sonoma Wine to a Custom Portrait
              </h3>
            </article>

            {/* Card 5 */}
            <article className="flex flex-col items-center w-full lg:w-[280px] flex-shrink-0">
              <div
                className="w-[200px] h-[200px] rounded-full bg-cover bg-center mb-4"
                style={{
                  backgroundImage:
                    "url('http://localhost:3845/assets/ef30f4718043896d312186b2989f3d7d7f3352a1.png')",
                }}
              />
              <span className="inline-block bg-red-accent text-white px-2 py-[5px] text-[16px] font-bold uppercase mb-3">
                Exclusive
              </span>
              <h3 className="text-[20px] font-bold uppercase text-black text-center leading-[1.3]">
                From Your Own Sonoma Wine to a Custom Portrait
              </h3>
            </article>
          </div>

          {/* Navigation arrows */}
          <div className="flex justify-center gap-2 mt-[30px]">
            <button
              className="w-[36.5px] h-10 flex items-center justify-center rotate-180"
              title="Previous recommendations"
              aria-label="Navigate to previous recommendations"
            >
              <svg
                width="37"
                height="40"
                viewBox="0 0 37 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18.5 0L37 20L18.5 40L0 20L18.5 0Z" fill="#D1D5DB" />
              </svg>
            </button>
            <button
              className="w-[36.5px] h-10 flex items-center justify-center"
              title="Next recommendations"
              aria-label="Navigate to next recommendations"
            >
              <svg
                width="37"
                height="40"
                viewBox="0 0 37 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18.5 0L37 20L18.5 40L0 20L18.5 0Z" fill="#D1D5DB" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Luxury Resort Image Section */}
      <section className="w-full h-[600px] bg-cover bg-center bg-no-repeat">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('http://localhost:3845/assets/4b1b6a9b52c58b03055f9a8aa5be8d27106b110e.png')",
          }}
        />
      </section>

      {/* Luxury Homes Section */}
      <section className="max-w-[1600px] mx-auto px-4 lg:px-[70px] py-10">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-[30px] mb-[30px]">
          <h2 className="text-[35px] font-bold text-black">Luxury Homes</h2>
        </div>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row gap-[15px] items-start">
          {/* Main article card */}
          <article className="bg-white border border-gray-200 w-full lg:w-[931px]">
            <div
              className="h-[575px] bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('http://localhost:3845/assets/bc51edd598080ad9d7582562e1fd4c4b65414b9f.png')",
              }}
            />
            <div className="px-6 py-6 text-center">
              <span className="inline-block bg-red-accent text-white px-2.5 py-[5px] text-[25px] font-extrabold">
                Celebrity Homes
              </span>
              <h3 className="mt-5 text-[35px] font-black uppercase text-black leading-[40px]">
                Mary Tyler Moore's Sells for a Reduced
                <br />
                $16.9 Million
              </h3>
              <p className="mt-4 mx-auto max-w-[852px] text-[16px] leading-[24px] text-black tracking-[-0.32px]">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries.
              </p>
              <p className="mt-3 text-[18px]">
                <span className="font-bold italic">By Tori Latham</span> - 12
                hours ago
              </p>
            </div>
          </article>

          {/* Sidebar cards */}
          <div className="grid grid-cols-1 gap-[15px] w-full lg:w-[499px]">
            {/* Card 1 - Product Recommendations */}
            <article className="border border-gray-200 bg-white">
              <div
                className="h-[266px] bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('http://localhost:3845/assets/ef30f4718043896d312186b2989f3d7d7f3352a1.png')",
                }}
              />
              <div className="px-5 py-5 text-center">
                <span className="inline-block bg-red-accent text-white px-2 py-[5px] text-[18px] font-extrabold">
                  Product Recommendations
                </span>
                <h3 className="mt-3 text-[28px] font-black uppercase text-black leading-[32px]">
                  From Your Own Sonoma Wine
                  <br />
                  to a Custom Portrait
                </h3>
                <p className="mt-2 text-[15px]">
                  <span className="font-bold italic">By Tori Latham</span> - 12
                  hours ago
                </p>
              </div>
            </article>

            {/* Card 2 - Homes for Sale */}
            <article className="border border-gray-200 bg-white">
              <div
                className="h-[266px] bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('http://localhost:3845/assets/08b9d36d8a14579b37ac7b47913bd04e73ddfd23.png')",
                }}
              />
              <div className="px-5 py-5 text-center">
                <span className="inline-block bg-red-accent text-white px-2 py-[5px] text-[18px] font-extrabold">
                  Homes for Sale
                </span>
                <h3 className="mt-3 text-[28px] font-black uppercase text-black leading-[32px]">
                  This $1.9 Million William
                  <br />
                  Kesling Home in Pasadena
                </h3>
                <p className="mt-2 text-[15px]">
                  <span className="font-bold italic">By Tori Latham</span> - 12
                  hours ago
                </p>
              </div>
            </article>
          </div>
        </div>

        {/* View all button */}
        <div className="mt-[30px]">
          <button className="bg-black text-white px-[35px] py-2 text-[16px] font-medium tracking-[-0.32px] h-[50px]">
            View all
          </button>
        </div>
      </section>

      {/* Videos Section */}
      <section className="bg-black py-10">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-[70px]">
          {/* Section header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-[30px] mb-[30px]">
            <h2 className="text-[35px] font-semibold text-white">Videos</h2>
          </div>

          {/* Main content */}
          <div className="flex flex-col lg:flex-row gap-[10px] items-start">
            {/* Main video thumbnail */}
            <article className="bg-white bg-opacity-10 border border-white border-opacity-10 w-full lg:w-[585px] p-[10px]">
              <div className="relative">
                <div
                  className="h-[368px] bg-cover bg-center bg-black bg-opacity-80"
                  style={{
                    backgroundImage:
                      "url('http://localhost:3845/assets/bc51edd598080ad9d7582562e1fd4c4b65414b9f.png')",
                  }}
                >
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white bg-opacity-25 rounded-full w-[50px] h-[50px] flex items-center justify-center border border-white shadow-lg">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.25 5.5L15.125 11L8.25 16.5V5.5Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <h3 className="text-[28px] font-bold text-white leading-[40px]">
                    Mary Tyler Moore's Sells for a Reduced
                    <br />
                    $16.9 Million
                  </h3>
                </div>
              </div>
            </article>

            {/* Smaller video thumbnails grid */}
            <div className="grid grid-cols-3 gap-5 w-full lg:w-auto">
              {/* Generate 6 smaller video cards */}
              {Array.from({ length: 6 }, (_, i) => (
                <article
                  key={i}
                  className="bg-white bg-opacity-10 border border-white border-opacity-10 w-full lg:w-[275px] p-[5px]"
                >
                  <div className="relative">
                    <div
                      className="h-[170px] bg-cover bg-center bg-black bg-opacity-80"
                      style={{
                        backgroundImage:
                          "url('http://localhost:3845/assets/bc51edd598080ad9d7582562e1fd4c4b65414b9f.png')",
                      }}
                    >
                      {/* Play button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white bg-opacity-25 rounded-full w-[25px] h-[25px] flex items-center justify-center border border-white shadow-lg">
                          <svg
                            width="11"
                            height="11"
                            viewBox="0 0 11 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.125 2.75L7.5625 5.5L4.125 8.25V2.75Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <h3 className="text-[16px] font-bold text-white leading-tight">
                        Mary Tyler Moore's Sells for a
                        <br />
                        Reduced $16.9 Million
                      </h3>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* View all button */}
          <div className="mt-[30px]">
            <button className="bg-white text-black px-[35px] py-2 text-[16px] font-medium tracking-[-0.32px] h-[50px]">
              View all
            </button>
          </div>
        </div>
      </section>

      {/* Luxury Resort Panoramic Image Section */}
      <section className="w-full h-[600px] bg-cover bg-center bg-no-repeat">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('http://localhost:3845/assets/c0dd2418424b5eea14cbbbca444afb66f4b84504.png')",
          }}
        />
      </section>

      {/* Coming in April - Secure Your Unit Section */}
      <section className="bg-black py-[50px]">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-[70px]">
          <div className="flex flex-col lg:flex-row gap-[38px] items-center">
            {/* Left side - Coming in April announcement */}
            <div className="relative w-full lg:w-[708px] h-[494px]">
              <div
                className="w-full h-full bg-cover bg-center bg-black bg-opacity-70"
                style={{
                  backgroundImage:
                    "url('http://localhost:3845/assets/b0cee3a7d5287437eec019fd019bd97cc7216d32.png')",
                }}
              >
                <div className="absolute inset-0 flex flex-col justify-center px-8">
                  <div className="text-center">
                    <p className="text-[#c0c0c0] text-[30px] font-semibold mb-4">
                      Coming in April
                    </p>
                    <h2 className="text-white text-[35px] font-semibold mb-4">
                      New luxury Development on palm Jumeirah
                    </h2>
                    <p className="text-white text-[23px] font-normal mb-8">
                      The last new high-end project on the palm!
                    </p>
                    <p className="text-white text-[30px] font-semibold">
                      Members will get project details 5 days before the
                      official reveal
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Secure your unit form */}
            <div className="w-full lg:w-[713px]">
              <div className="mb-[30px]">
                <h2 className="text-white text-[35px] font-semibold mb-4">
                  Secure you unit before it hits the market
                </h2>
                <p className="text-white text-[23px] font-normal">
                  don't miss this unique opportunity
                </p>
              </div>

              <div className="space-y-8">
                {/* Input fields */}
                <div className="space-y-8">
                  {/* Two name fields side by side */}
                  <div className="flex flex-col lg:flex-row gap-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="flex-1 p-[10px] border border-[#cacaca] bg-transparent text-[#848484] text-[18px] font-medium leading-[36px]"
                    />
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="flex-1 p-[10px] border border-[#cacaca] bg-transparent text-[#848484] text-[18px] font-medium leading-[36px]"
                    />
                  </div>

                  {/* Phone number field */}
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full p-[10px] border border-[#cacaca] bg-transparent text-[#848484] text-[18px] font-medium leading-[36px]"
                  />

                  {/* Checkboxes */}
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <div className="bg-[#fd2d15] w-5 h-5 flex items-center justify-center mt-1">
                        <svg
                          width="17"
                          height="17"
                          viewBox="0 0 17 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.8542 4.14583L6.5 11.5L3.14583 8.14583L4.35417 6.9375L6.5 9.08333L12.6458 2.9375L13.8542 4.14583Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                      <p className="text-white text-[14px] font-normal tracking-[-0.32px] leading-[24px]">
                        Lorem Ipsum is simply dummy text of the printing and
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="border border-white w-5 h-5 mt-1"></div>
                      <p className="text-white text-[14px] font-normal tracking-[-0.32px] leading-[24px]">
                        Lorem Ipsum is simply dummy text of the printing and
                      </p>
                    </div>
                  </div>
                </div>

                {/* Join our Club button */}
                <button className="w-full bg-[#fd2d15] text-white px-5 py-[18px] h-[50px] flex items-center justify-center gap-[5px] text-[20px] font-extrabold">
                  <svg
                    width="25"
                    height="26"
                    viewBox="0 0 25 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.5 0L25 13L12.5 26L0 13L12.5 0Z" fill="white" />
                  </svg>
                  Join our Club
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stay in the Know Section */}
      <section className="py-10">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-[70px]">
          {/* Section title */}
          <h2 className="text-[35px] font-semibold text-black mb-[30px]">
            Stay in the know
          </h2>

          {/* Main content - Using exact homepage layout */}
          <div className="grid grid-cols-2 gap-[20px] items-start">
            {/* Left column: gallery on top, followers + video on bottom */}
            <div className="flex flex-col gap-[20px]">
              <div className="relative overflow-hidden h-[334.5px]">
                <img
                  src="http://localhost:3845/assets/c357de5cce6baf6e4fd62c7ea0c3c0eb1bcc724d.png"
                  alt="Gallery"
                  className="w-full h-full object-cover"
                />
                <button
                  aria-label="Previous"
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 h-[46px] w-[70px] rounded-[50px] backdrop-blur-[25px] bg-[rgba(26,26,26,0.2)] grid place-items-center border border-white/10"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 12L6 8L10 4"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  aria-label="Next"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 h-[46px] w-[70px] rounded-[50px] backdrop-blur-[25px] bg-[rgba(26,26,26,0.2)] grid place-items-center border border-white/10"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 4L10 8L6 12"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
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
                    <span className="text-white">📘</span>
                    <span className="text-[#fd2d15]">🐦</span>
                    <span className="text-white">📷</span>
                    <span className="text-white">💼</span>
                  </div>
                </div>
                <div className="relative h-[268px] overflow-hidden">
                  <img
                    src="http://localhost:3845/assets/b452397dd79f21d383175dd81978fa658d189b03.png"
                    alt="Video"
                    className="w-full h-full object-cover"
                  />
                  <button
                    aria-label="Play"
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[56.6px] h-[56.6px] rounded-[35px] bg-black/20 border border-white/10 grid place-items-center"
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.25 5.5L15.125 11L8.25 16.5V5.5Z"
                        fill="white"
                      />
                    </svg>
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
                src="http://localhost:3845/assets/e0644fcd9e29f44547287311e630a76b9d3682f8.png"
                alt="Promo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
