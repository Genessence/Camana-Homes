import React from "react";
import { useParams } from "react-router-dom";
import { API } from "@shared/api";
import type { PropertyCard } from "@shared/api.types";

const PropertyDetail = () => {
  const { slug } = useParams();
  const [data, setData] = React.useState<PropertyCard | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [visitorId, setVisitorId] = React.useState<string | null>(null);

  React.useEffect(() => {
    // ensure anonymous visitor id
    const key = "camana_vid";
    let vid = localStorage.getItem(key);
    if (!vid) {
      vid = crypto.randomUUID();
      try {
        localStorage.setItem(key, vid);
      } catch {}
      try {
        document.cookie = `${key}=${vid}; path=/; max-age=${60 * 60 * 24 * 365}`;
      } catch {}
    }
    setVisitorId(vid);
  }, []);

  React.useEffect(() => {
    if (!slug) return;
    API.properties
      .bySlug(slug)
      .then(setData)
      .catch((e) => setError(String(e)));
  }, [slug]);

  React.useEffect(() => {
    if (!slug || !visitorId) return;
    const t = setTimeout(() => {
      API.properties.trackView(slug, visitorId || undefined).catch(() => {});
    }, 2000); // debounce to avoid counting quick bounces
    return () => clearTimeout(t);
  }, [slug, visitorId]);

  if (error) {
    return <div className="p-6">Failed to load property.</div>;
  }

  if (!data) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1200px] mx-auto p-6">
        <h1 className="font-dm-sans text-[28px] lg:text-[35px] font-semibold text-black mb-4">
          {data.title}
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <div className="aspect-[16/9] w-full overflow-hidden bg-gray-100">
              <img
                src={data.primary_image_url}
                alt={data.title}
                className="w-full h-full object-cover"
              />
            </div>
            {data.image_urls.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-2">
                {data.image_urls.slice(1, 5).map((u, i) => (
                  <img
                    key={i}
                    src={u}
                    alt=""
                    className="w-full h-[100px] object-cover"
                  />
                ))}
              </div>
            )}
          </div>
          <div className="space-y-3">
            <div className="text-red-accent font-bold text-2xl">
              {new Intl.NumberFormat(undefined, {
                style: "currency",
                currency: data.price_currency,
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(data.price_amount)}
            </div>
            <div className="text-[#333]">
              {data.property_type} • {data.bedrooms} bed • {data.bathrooms} bath
            </div>
            <div className="text-[#333]">
              Area: {data.area_value} {data.area_unit}
            </div>
            <div className="text-[#333]">Location: {data.location_label}</div>
            {data.agent && (
              <div className="flex items-center gap-3 pt-2">
                <img
                  src={
                    data.agent.avatar_url ||
                    "https://api.builder.io/api/v1/image/assets/TEMP/21584c4a5fb695a4f53c9f609c46424507f3b08c?width=98"
                  }
                  alt={data.agent.name}
                  className="w-[49px] h-[49px] rounded-full"
                />
                <div>
                  <div className="font-semibold">{data.agent.name}</div>
                  {data.agent.agency && (
                    <div className="text-sm text-[#666]">
                      {data.agent.agency.name}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
