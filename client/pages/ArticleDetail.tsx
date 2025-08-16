import React from "react";
import { useParams } from "react-router-dom";
import { API } from "@shared/api";
import type { ArticleCard } from "@/shared/api.types";

const ArticleDetail = () => {
  const { slug } = useParams();
  const [data, setData] = React.useState<ArticleCard | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!slug) return;
    API.articles
      .bySlug(slug)
      .then(setData)
      .catch((e) => setError(String(e)));
  }, [slug]);

  if (error) return <div className="p-6">Failed to load article.</div>;
  if (!data) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1200px] mx-auto p-6">
        <h1 className="font-dm-sans text-[28px] lg:text-[35px] font-semibold text-black mb-4">
          {data.title}
        </h1>
        <div className="relative rounded-lg overflow-hidden mb-6">
          <img
            src={data.image_url}
            alt={data.title}
            className="w-full h-[420px] object-cover"
          />
        </div>
        {data.excerpt && (
          <p className="font-dm-sans text-[16px] text-[#333] leading-[24px] mb-4">
            {data.excerpt}
          </p>
        )}
        <div className="flex items-center gap-3">
          <img
            src={
              data.author_avatar_url ||
              "https://api.builder.io/api/v1/image/assets/TEMP/21584c4a5fb695a4f53c9f609c46424507f3b08c?width=98"
            }
            alt={data.author_name || "Author"}
            className="w-[40px] h-[40px] rounded-full"
          />
          <div>
            <div className="font-dm-sans text-[14px] font-semibold text-black">
              {data.author_name}
            </div>
            <div className="font-dm-sans text-[12px] text-[#666]">
              {new Date(data.published_at).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
