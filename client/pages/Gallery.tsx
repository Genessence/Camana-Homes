import React from "react";
import { useParams, Link } from "react-router-dom";
import { apiService } from "../services/api";

export default function Gallery() {
  const { slug } = useParams<{ slug: string }>();
  const [images, setImages] = React.useState<string[]>([]);
  const [title, setTitle] = React.useState<string>("");
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const run = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        setError(null);
        const detail = await apiService.getPropertyDetail(slug);
        const urls = (detail.images || []).map((i) => i.url).filter(Boolean);
        setImages(urls.length ? urls : (detail.primary_image_url ? [detail.primary_image_url] : []));
        setTitle(detail.title);
      } catch (e: any) {
        setError(e?.message || "Failed to load images");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading gallery…</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-[70px] py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[24px] lg:text-[32px] font-bold">{title} — Gallery</h1>
          <Link to={`/listing/${slug}`} className="text-black underline">Back to listing</Link>
        </div>
        <div className="grid grid-cols-1 gap-8 place-items-center">
          {images.map((url, idx) => (
            <div key={idx} className="w-full flex justify-center">
              <img
                src={url}
                alt={`Image ${idx + 1}`}
                className="max-w-[90vw] max-h-[85vh] h-auto object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


