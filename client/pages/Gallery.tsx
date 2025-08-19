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
        {/* Top row: 2 big images side-by-side (or fewer if not enough) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center mb-8">
          {images.slice(0, 2).map((url, idx) => (
            <div key={idx} className="w-full flex justify-center">
              <img
                src={url}
                alt={`Image ${idx + 1}`}
                className="w-full h-auto object-contain max-h-[65vh]"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Remaining images: 3-column grid that continues for all additional photos */}
        {images.length > 2 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
            {images.slice(2).map((url, idx) => (
              <div key={idx + 2} className="w-full flex justify-center">
                <img
                  src={url}
                  alt={`Image ${idx + 3}`}
                  className="w-full h-auto object-contain max-h-[50vh]"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


