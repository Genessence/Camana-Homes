import React from "react";
import JournalHeader from "@/components/JournalHeader";
import { Mail, Facebook, Instagram, Linkedin, Youtube, ArrowLeft, ArrowRight } from "lucide-react";
import { API } from "@shared/api";
import type { ArticleCard } from "@/shared/api.types";

const Article = () => {
  const [article, setArticle] = React.useState<ArticleCard | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let mounted = true;
    API.articles
      .list(1)
      .then((items) => {
        if (!mounted) return;
        setArticle(items?.[0] ?? null);
      })
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  const renderHeader = () => {
    if (loading || !article) {
      return (
        <div className="flex flex-col items-center gap-[20px] w-full">
          <div className="h-[40px] w-[180px] bg-gray-200 animate-pulse" />
          <div className="h-[38px] lg:h-[56px] w-[90%] max-w-[1190px] bg-gray-200 animate-pulse" />
          <div className="h-[18px] w-[90%] max-w-[900px] bg-gray-200 animate-pulse" />
          <div className="h-[18px] w-[70%] max-w-[700px] bg-gray-200 animate-pulse" />
          <div className="h-[16px] w-[220px] bg-gray-200 animate-pulse" />
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center gap-[20px] w-full">
        {article.category && (
          <div className="flex items-center justify-center px-[10px] py-[10px] bg-red-accent">
            <span className="text-white text-center font-dm-sans text-[20px] font-bold leading-normal">
              {article.category}
            </span>
          </div>
        )}
        <h1 className="text-black text-center font-dm-sans text-[35px] lg:text-[47px] font-bold leading-normal uppercase max-w-[1190px]">
          {article.title}
        </h1>
        {article.excerpt && (
          <p className="text-black text-center font-dm-sans text-[16px] font-normal leading-[24px] tracking-[-0.32px] max-w-[1190px]">
            {article.excerpt}
          </p>
        )}
        <div className="font-dm-sans text-[17px] text-black">
          {article.author_name ? (
            <>
              <span className="font-bold">By {article.author_name}</span>
              {article.published_at && (
                <span className="font-normal"> — {new Date(article.published_at).toLocaleDateString()}</span>
              )}
            </>
          ) : (
            <span className="font-normal">&nbsp;</span>
          )}
        </div>
      </div>
    );
  };

  const renderHero = () => {
    if (loading || !article) {
      return <div className="w-full max-w-[1460px] h-[400px] lg:h-[725px] bg-gray-200 animate-pulse" />;
    }
    return (
      <img
        src={article.image_url}
        alt={article.title}
        className="w-full max-w-[1460px] h-[400px] lg:h-[725px] object-cover"
      />
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <JournalHeader />

      {/* Article Content */}
      <div className="flex flex-col items-center w-full px-4 lg:px-[70px] py-[40px] gap-[20px]">
        <div className="flex flex-col items-center w-full max-w-[1460px] gap-[20px]">
          {/* Header or Skeleton */}
          {renderHeader()}

          {/* Hero or Skeleton */}
          {renderHero()}
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

          {/* Skeleton body blocks instead of static article */}
          <div className="flex-1 flex flex-col gap-[20px]">
            <div className="h-[120px] bg-gray-100 animate-pulse" />
            <div className="h-[240px] bg-gray-100 animate-pulse" />
            <div className="h-[18px] bg-gray-100 animate-pulse w-4/5" />
            <div className="h-[18px] bg-gray-100 animate-pulse w-3/5" />
            <div className="h-[18px] bg-gray-100 animate-pulse w-2/5" />
            {/* Property Card and Sidebar (hidden placeholder for now) */}
            <div className="flex flex-col lg:flex-row gap-[20px]">
              {/* Property Card */}
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-[10px]">
                <div className="border border-gray-light bg-white p-[10px]">
                  <div className="relative h-[316px] mb-[10px] bg-gray-100 animate-pulse" />
                  <div className="h-[18px] w-1/2 bg-gray-100 animate-pulse mb-2" />
                  <div className="h-[14px] w-3/5 bg-gray-100 animate-pulse" />
                </div>

                {/* Second Property Image */}
                <div className="border border-gray-light">
                  <div className="w-full h-[475px] bg-gray-100 animate-pulse" />
                </div>
              </div>

              {/* Reading Time Sidebar */}
              <div className="w-full lg:w-[247px] flex flex-col gap-[17px]">
                <div className="bg-[#F5F5F5] p-[20px] h-[60px]" />
                <div className="px-[10px] space-y-3">
                  <div className="h-[16px] bg-gray-100 animate-pulse w-full" />
                  <div className="h-[16px] bg-gray-100 animate-pulse w-5/6" />
                  <div className="h-[16px] bg-gray-100 animate-pulse w-3/4" />
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
            {/* Avatar or skeleton */}
            {loading || !article ? (
              <div className="w-[200px] lg:w-[325px] h-[300px] lg:h-[527px] bg-white/10 animate-pulse" />
            ) : (
              <img
                src={article.author_avatar_url || ""}
                alt={article.author_name || "Author"}
                className="w-[200px] lg:w-[325px] h-[300px] lg:h-[527px] object-cover"
              />
            )}

            {/* Details */}
            <div className="flex flex-col gap-[20px] text-white w-full">
              {loading || !article ? (
                <>
                  <div className="h-[28px] w-[240px] bg-white/20 animate-pulse" />
                  <div className="h-[16px] w-full bg-white/10 animate-pulse" />
                  <div className="h-[16px] w-5/6 bg-white/10 animate-pulse" />
                  <div className="h-[16px] w-2/3 bg-white/10 animate-pulse" />
                  <div className="flex items-center gap-[15px] mt-[20px]">
                    {[0,1,2,3].map((i) => (
                      <div key={i} className="w-[40px] h-[40px] rounded-full bg-white/20 animate-pulse" />
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h2 className="font-montserrat text-[24px] lg:text-[28px] font-bold">
                    {article.author_name ? `Written by ${article.author_name}` : "Author"}
                  </h2>
                  {/* Optional author bio if provided in backend later */}
                  <p className="font-dm-sans text-[17px] font-medium leading-[25px] opacity-70">
                    {(article as any)?.author_bio || ""}
                  </p>
                  {/* Social links if present */}
                  <div className="flex items-center gap-[15px] mt-[20px]">
                    {((article as any)?.author_website_url) && (
                      <a href={(article as any).author_website_url} target="_blank" rel="noreferrer" className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center">🌐</a>
                    )}
                    {((article as any)?.author_instagram_url) && (
                      <a href={(article as any).author_instagram_url} target="_blank" rel="noreferrer" className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center">📷</a>
                    )}
                    {((article as any)?.author_linkedin_url) && (
                      <a href={(article as any).author_linkedin_url} target="_blank" rel="noreferrer" className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center">in</a>
                    )}
                    {((article as any)?.author_youtube_url) && (
                      <a href={(article as any).author_youtube_url} target="_blank" rel="noreferrer" className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center">▶</a>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Trending Articles Section */}
      {/* <div className="w-full bg-[#F5F5F5] py-[40px] px-4 lg:px-[70px]">
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
      </div> */}

      {/* Read More Section */}
      {/* <div className="w-full bg-white py-[40px] px-4 lg:px-[70px]">
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
      </div> */}

      {/* Footer removed (global Footer renders from App.tsx) */}
    </div>
  );
};

export default Article;
