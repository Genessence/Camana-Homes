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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function AgentProfile() {
  const { slug = "" } = useParams();
  const [agent, setAgent] = useState<Awaited<ReturnType<typeof apiService.getAgentBySlug>> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [listings, setListings] = useState<PropertyCard[]>([]);
  const [loadingListings, setLoadingListings] = useState(false);

  // Lead modal state (reused from ListingPage pattern)
  const [leadOpen, setLeadOpen] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadLocation, setLeadLocation] = useState("");

  const openLeadModal = () => setLeadOpen(true);
  const submitLead = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, mimic ListingPage behaviour: close on submit
    setLeadOpen(false);
  };

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
      <section className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-[70px] py-[30px] flex flex-col lg:flex-row gap-7">
        {/* Left image */}
        <div
          className="w-full lg:w-1/2 h-[320px] sm:h-[420px] lg:h-[830px] bg-[center_top_10%] bg-cover"
          style={{
            backgroundImage: `url('${agent.avatar_url || "https://via.placeholder.com/800x1000?text=Agent"}')`,
          }}
        />
        {/* Right content */}
        <div className="w-full lg:w-1/2 min-w-0 py-8 px-4 sm:px-8 lg:py-12 lg:px-10">
          {agent.license_number ? (
            <div className="inline-flex bg-black text-white px-2.5 py-[5px] text-[14px] font-bold">
              License No: {agent.license_number}
            </div>
          ) : null}
          <h1 className="mt-3 text-[40px] md:text-[56px] lg:text-[68px] font-extrabold text-black leading-[1.05]">
            {agent.name}
          </h1>
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-3 text-[18px] text-black mb-[32px] mt-[10px]">
              <span>
                {agent.bio || "Licensed Real Estate Agent"}
              </span>
            </div>
            <div className="flex items-center gap-3 text-[18px] text-black">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 2c-3.866 0-7 3.134-7 7 0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
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
          <button onClick={openLeadModal} className="mt-6 bg-black text-white h-14 w-full sm:w-[171px] inline-flex items-center justify-center">
            Contact Agent
          </button>
          {/* Social round icons */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {socialLinks.map(({ Icon, href, label }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                title={label}
                aria-label={label}
                className="h-12 w-12 sm:h-14 sm:w-14 rounded-full border border-black/20 flex items-center justify-center hover:bg-gray-50"
              >
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </div>
          {/* About the Agent (moved below social links) */}
          <div className="mt-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-black">About the Agent</h2>
            {agent.about ? (
              <div className="prose max-w-none text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: agent.about }} />
            ) : (
              <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
                <p>
                  {agent.bio || 'Experienced real estate professional with a focus on client success.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Video banner with centered play */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-[70px] py-[30px]">
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
      {/* Active Listings Section */}
      <section className="max-w-[1600px] mx-auto px-4 lg:px-[70px] py-16">
        <div className="space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-black">
            Active Listings
          </h2>
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
                    const amount = p.price_amount || 0;
                    try {
                      return new Intl.NumberFormat('en-US', { style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
                    } catch {
                      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
                    }
                  })();
                  return (
                    <div key={p.id} className="border border-gray-200 bg-white overflow-hidden">
                      <div className="relative">
                        <Link to={`/listing/${p.slug}`}>
                          <img src={p.primary_image_url} alt={p.title} className="w-full h-80 object-cover" onError={(e)=>{(e.currentTarget as HTMLImageElement).src='https://via.placeholder.com/800x600?text=Listing'}} />
                        </Link>
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

      {/* Lead modal hooks into the same UI as ListingPage */}
      <LeadModal
        open={leadOpen}
        onOpenChange={setLeadOpen}
        onSubmit={submitLead}
        leadName={leadName}
        setLeadName={setLeadName}
        leadEmail={leadEmail}
        setLeadEmail={setLeadEmail}
        leadPhone={leadPhone}
        setLeadPhone={setLeadPhone}
        leadLocation={leadLocation}
        setLeadLocation={setLeadLocation}
      />
    </div>
  );
}

function LeadModal({ open, onOpenChange, onSubmit, leadName, setLeadName, leadEmail, setLeadEmail, leadPhone, setLeadPhone, leadLocation, setLeadLocation }: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  leadName: string;
  setLeadName: (v: string) => void;
  leadEmail: string;
  setLeadEmail: (v: string) => void;
  leadPhone: string;
  setLeadPhone: (v: string) => void;
  leadLocation: string;
  setLeadLocation: (v: string) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Request a Tour</DialogTitle>
          <DialogDescription>Share your contact details and agent will reach out shortly.</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="lead-name">Name</Label>
            <Input id="lead-name" value={leadName} onChange={(e) => setLeadName(e.target.value)} placeholder="Your name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lead-email">Email</Label>
            <Input id="lead-email" type="email" value={leadEmail} onChange={(e) => setLeadEmail(e.target.value)} placeholder="you@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lead-phone">Phone</Label>
            <Input id="lead-phone" value={leadPhone} onChange={(e) => setLeadPhone(e.target.value)} placeholder="+1 555-123-4567" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lead-location">Location</Label>
            <Input id="lead-location" value={leadLocation} onChange={(e) => setLeadLocation(e.target.value)} placeholder="City, Country" />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
