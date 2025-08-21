import React from "react";
import { useParams, Link } from "react-router-dom";
import { apiService } from "../services/api";

export default function Gallery() {
  const { slug } = useParams<{ slug: string }>();
  const [images, setImages] = React.useState<string[]>([]);
  const [title, setTitle] = React.useState<string>("");
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [viewerOpen, setViewerOpen] = React.useState(false);
  const [viewerIndex, setViewerIndex] = React.useState(0);
  const [scale, setScale] = React.useState(1);
  const [maxScale, setMaxScale] = React.useState(3);
  const [offset, setOffset] = React.useState<{x:number;y:number}>({x:0,y:0});
  const [dragging, setDragging] = React.useState(false);
  const dragStartRef = React.useRef<{x:number;y:number}|null>(null);

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
            <button key={idx} className="w-full flex justify-center" onClick={() => { setViewerIndex(idx); setViewerOpen(true); setScale(1); setOffset({x:0,y:0}); }}>
              <img
                src={url}
                alt={`Image ${idx + 1}`}
                className="w-full h-auto object-contain max-h-[65vh]"
                loading="lazy"
              />
            </button>
          ))}
        </div>

        {/* Remaining images: 3-column grid that continues for all additional photos */}
        {images.length > 2 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
            {images.slice(2).map((url, idx) => (
              <button key={idx + 2} className="w-full flex justify-center" onClick={() => { setViewerIndex(idx + 2); setViewerOpen(true); setScale(1); setOffset({x:0,y:0}); }}>
                <img
                  src={url}
                  alt={`Image ${idx + 3}`}
                  className="w-full h-auto object-contain max-h-[50vh]"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Fullscreen viewer with zoom/pan */}
      {viewerOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center" onClick={() => setViewerOpen(false)}>
          <div className="relative max-w-[90vw] max-h-[90vh] w-[90vw] h-[90vh] overflow-hidden" onClick={(e)=>e.stopPropagation()}>
            <img
              src={images[viewerIndex]}
              alt={`Image ${viewerIndex + 1}`}
              className="select-none pointer-events-none"
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                transformOrigin: 'center center',
                maxWidth: '90vw',
                maxHeight: '90vh',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                display: 'block',
                margin: 'auto',
              }}
              onLoad={(e)=>{
                const el = e.currentTarget as HTMLImageElement;
                const vw = window.innerWidth * 0.9;
                const vh = window.innerHeight * 0.9;
                const scaleW = el.naturalWidth > vw ? el.naturalWidth / vw : 1;
                const scaleH = el.naturalHeight > vh ? el.naturalHeight / vh : 1;
                setMaxScale(Math.max(scaleW, scaleH));
              }}
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
              <button className="px-3 py-2 bg-white/20 text-white" onClick={()=> setViewerIndex((i)=> (i-1+images.length)%images.length)} aria-label="Previous">‹</button>
              <button className="px-3 py-2 bg-white/20 text-white" onClick={()=> setScale((s)=> Math.max(1, +(s-0.25).toFixed(2)))} aria-label="Zoom out">−</button>
              <button className="px-3 py-2 bg-white/20 text-white" onClick={()=> setScale((s)=> Math.min(maxScale, +(s+0.25).toFixed(2)))} aria-label="Zoom in">+</button>
              <button className="px-3 py-2 bg-white/20 text-white" onClick={()=> { setScale(1); setOffset({x:0,y:0}); }} aria-label="Reset">Reset</button>
              <button className="px-3 py-2 bg-white/20 text-white" onClick={()=> setViewerIndex((i)=> (i+1)%images.length)} aria-label="Next">›</button>
            </div>
            <button className="absolute top-3 right-3 text-white text-2xl z-20" onClick={()=> setViewerOpen(false)} aria-label="Close">×</button>
            <div
              className={`absolute inset-0 z-10 ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`}
              onMouseDown={(e)=>{ setDragging(true); dragStartRef.current = {x: e.clientX - offset.x, y: e.clientY - offset.y}; }}
              onMouseMove={(e)=>{ if(!dragging) return; setOffset({ x: e.clientX - (dragStartRef.current?.x||0), y: e.clientY - (dragStartRef.current?.y||0)}); }}
              onMouseUp={()=>{ setDragging(false); dragStartRef.current = null; }}
              onMouseLeave={()=>{ setDragging(false); dragStartRef.current = null; }}
              onWheel={(e)=>{ e.preventDefault(); const delta = e.deltaY > 0 ? -0.25 : 0.25; setScale((s)=>{ const next = Math.min(maxScale, Math.max(1, +(s+delta).toFixed(2))); return next;}); }}
            />
          </div>
        </div>
      )}
    </div>
  );
}


