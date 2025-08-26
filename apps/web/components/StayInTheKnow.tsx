import React from "react";
import post1 from "../assets/post 1.jpg"
import post2 from "../assets/post 2.jpg"
import post3 from "../assets/post3.jpg"

const INSTAGRAM_POSTS: Array<{ url: string; id: string; imageUrl: string }> = [
  {
    url: "https://www.instagram.com/p/DGV5rZxBtZm/?igsh=MXh4Z3o1N2V6NXZz",
    id: "DGV5rZxBtZm",
    imageUrl: post1,
  },
  {
    url: "https://www.instagram.com/p/DF8QhqBB_VJ/?igsh=eWZrZnZwZ2gzdzdi",
    id: "DF8QhqBB_VJ",
    imageUrl: post2,
  },
  {
    url: "https://www.instagram.com/p/DGlhXB1B5Oc/?igsh=NGI5cG90eThpbW5h&img_index=2",
    id: "DGlhXB1B5Oc",
    imageUrl: post3,
  },
];

function getInstagramImage(shortcode: string): string {
  // Public redirect endpoint that returns the media image
  return `https://www.instagram.com/p/${shortcode}/media/?size=l`;
}

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="56" height="56" fill="none" stroke="white" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="18" cy="6" r="1.2" fill="white" stroke="none"/>
  </svg>
);

export default function StayInTheKnow() {
  return (
    <div className="mb-[80px]">
      <div className="flex items-center justify-between mb-[20px]">
        <div>
          <h2 className="font-dm-sans text-[35px] font-semibold text-black leading-none mb-[8px]">Stay In The Know</h2>
          <div className="text-[18px] text-black/70">Join our Community on Instagram</div>
        </div>
        <a
          href="https://www.instagram.com/camanahomes"
          target="_blank"
          rel="noreferrer"
          className="hidden sm:inline-flex items-center gap-3 bg-black text-white px-6 py-3 hover:bg-gray-900 transition-colors"
        >
          FOLLOW <span aria-hidden>→</span>
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px]">
        {INSTAGRAM_POSTS.map((p) => (
          <a
            key={p.id}
            href={p.url}
            target="_blank"
            rel="noreferrer"
            className="relative group block h-[300px] sm:h-[340px] overflow-hidden"
          >
            <img
              src={p.imageUrl}
              alt="Instagram Post"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <div className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="w-[94px] h-[94px] rounded-full bg-white/10 border border-white/30 grid place-items-center">
                <InstagramIcon />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}