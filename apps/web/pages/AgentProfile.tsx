import React, { useEffect, useMemo, useState } from "react";
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
  Instagram,
  Linkedin,
  Youtube,
  Globe,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { apiService } from "../services/api";
import { propertiesApiService, type PropertyCard } from "../services/propertiesApi";

export default function AgentProfile() {
  const { slug = "" } = useParams();
  const [agent, setAgent] = useState<Awaited<ReturnType<typeof apiService.getAgentBySlug>> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [listings, setListings] = useState<PropertyCard[]>([]);
  const [loadingListings, setLoadingListings] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      setError(null);
      try {
        const data = await apiService.getAgentBySlug(slug);
        if (!cancelled) setAgent(data);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Failed to load agent");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    if (slug) run();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!agent?.id) return;
      setLoadingListings(true);
      try {
        const resp = await propertiesApiService.getProperties(1, 6, { agent_id: agent.id });
        if (!cancelled) setListings(resp.properties || []);
      } catch (e) {
        // ignore per-section errors for now
      } finally {
        if (!cancelled) setLoadingListings(false);
      }
    }
    run();
    return () => { cancelled = true; };
  }, [agent?.id]);

  const socialLinks = useMemo(() => [
    { Icon: Instagram, href: agent?.instagram_url || undefined, label: "Instagram" },
    { Icon: Linkedin, href: agent?.linkedin_url || undefined, label: "LinkedIn" },
    { Icon: Youtube, href: agent?.youtube_url || undefined, label: "YouTube" },
    { Icon: Globe, href: agent?.website_url || undefined, label: "Website" },
    { Icon: Mail, href: agent?.email ? `mailto:${agent.email}` : undefined, label: "Email" },
  ].filter((x) => !!x.href), [agent]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading agent…</div>;
  }
  if (error || !agent) {
    return <div className="min-h-screen flex items-center justify-center text-red-600">{error || "Agent not found"}</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      {/* Agent Header (from Figma) */}
      <section className="max-w-[1600px] mx-auto px-[70px] py-[30px] flex flex-col lg:flex-row gap-7">
        {/* Left sticky image */}
        <div
          className="hidden lg:block w-[743px] h-[830px] sticky top-0 bg-center bg-cover"
          style={{
            backgroundImage: `url('${agent.avatar_url || "https://via.placeholder.com/800x1000?text=Agent"}')`,
          }}
        />
        {/* Right content */}
        <div className="flex-1 min-w-0">
          {agent.license_number ? (
            <div className="inline-flex bg-black text-white px-2.5 py-[5px] text-[14px] font-bold">
              License No: {agent.license_number}
            </div>
          ) : null}
          <h1 className="mt-3 text-[40px] md:text-[56px] lg:text-[68px] font-extrabold text-black leading-[1.05]">
            {agent.name}
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
                {agent.bio || "Licensed Real Estate Agent"}
              </span>
            </div>
            <div className="flex items-center gap-3 text-[18px] text-black">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0Zm1 10H9V5h2v5Zm0 5H9v-2h2v2Z"
                  fill="currentColor"
                />
              </svg>
              <span>{agent.location || ""}</span>
            </div>
            <div className="flex items-center gap-3 text-[17px] font-bold text-black">
              <Phone size={18} />
              <span>{agent.phone_number || ""}</span>
            </div>
            <div className="flex items-center gap-3 text-[17px] font-bold text-black">
              <Mail size={18} />
              <span>{agent.email || ""}</span>
            </div>
          </div>
          <button className="mt-6 bg-black text-white h-14 w-[171px] inline-flex items-center justify-center">
            Contact Agent
          </button>
          {/* Social round icons */}
          <div className="mt-4 flex items-center gap-2">
            {socialLinks.map(({ Icon, href, label }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                title={label}
                aria-label={label}
                className="h-14 w-14 rounded-full border border-black/20 flex items-center justify-center hover:bg-gray-50"
              >
                <Icon className="w-6 h-6" />
              </a>
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
            {socialLinks.map(({ Icon, label, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="bg-neutral-100 p-4 flex flex-col items-center justify-center gap-3 hover:shadow-md transition-shadow"
                title={label}
                aria-label={label}
              >
                <Icon className="w-7 h-7" />
                <span className="text-sm font-semibold text-black">{label}</span>
              </a>
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
            {loadingListings ? (
              <div>Loading listings…</div>
            ) : listings.length === 0 ? (
              <div className="text-gray-600">No active listings for this agent.</div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {listings.map((p) => {
                  const formattedPrice = (() => {
                    const currency = p.price_currency || 'USD';
                    try {
                      return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(p.price_amount || 0);
                    } catch {
                      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(p.price_amount || 0);
                    }
                  })();
                  return (
                    <div key={p.id} className="border border-gray-200 bg-white overflow-hidden">
                      <div className="relative">
                        <Link to={`/listing/${p.slug}`}>
                          <img src={p.primary_image_url} alt={p.title} className="w-full h-80 object-cover" onError={(e)=>{(e.currentTarget as HTMLImageElement).src='https://via.placeholder.com/800x600?text=Listing'}} />
                        </Link>
                        <div className="absolute top-4 left-4 flex gap-2">
                          <div className="flex items-center gap-1 px-3 py-2 bg-black/10 backdrop-blur-sm border border-white text-white text-sm">
                            <Eye size={14} />
                            {p.views_count?.toLocaleString?.() || 0}
                          </div>
                          {p.has_video ? (
                            <div className="px-3 py-2 bg-black/10 backdrop-blur-sm border border-white text-white text-sm">Video</div>
                          ) : null}
                        </div>
                        <div className="absolute top-4 right-4 flex gap-2">
                          <button title="Save to favorites" aria-label="Save to favorites" className="p-2 bg-black/10 backdrop-blur-sm border border-white hover:bg-black/20 transition-colors">
                            <Heart className="text-white" size={16} />
                          </button>
                          <button title="Share" aria-label="Share" className="p-2 bg-black/10 backdrop-blur-sm border border-white hover:bg-black/20 transition-colors">
                            <Share2 className="text-white" size={14} />
                          </button>
                        </div>
                      </div>
                      <div className="p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="font-bold text-xl text-black">{formattedPrice}</div>
                          <Link to={`/listing/${p.slug}`} className="flex items-center gap-1 text-sm font-semibold text-black">
                            View details
                            <ChevronRight size={12} className="text-gray-600" />
                          </Link>
                        </div>
                        <h3 className="font-bold text-gray-900">{p.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-black">
                          <div className="flex items-center gap-1">
                            <Bed size={14} />
                            <span>{p.bedrooms} bed</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Bath size={14} />
                            <span>{p.bathrooms} bath</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Square size={14} />
                            <span>{(p.area_value ?? 0).toLocaleString()} {p.area_unit}</span>
                          </div>
                        </div>
                        <hr className="border-gray-200" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
