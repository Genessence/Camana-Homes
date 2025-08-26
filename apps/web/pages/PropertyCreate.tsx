import React from "react";
import { useNavigate } from "react-router-dom";
import { API } from "@shared/api";
import { toast } from "sonner";

type ImageInput = {
  url: string;
  sort_order: number;
  is_primary: boolean;
  alt_text?: string;
};

export default function PropertyCreate() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = React.useState(false);

  // Core fields
  const [title, setTitle] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [slugAvailable, setSlugAvailable] = React.useState<boolean | null>(null);
  const [priceAmount, setPriceAmount] = React.useState<number | "">("");
  const [priceCurrency, setPriceCurrency] = React.useState("USD");
  const [pricePerSqft, setPricePerSqft] = React.useState<number | "">("");
  const [priceOnRequest, setPriceOnRequest] = React.useState(false);
  const [propertyType, setPropertyType] = React.useState("Apartment");
  const [bedrooms, setBedrooms] = React.useState<number | "">("");
  const [bathrooms, setBathrooms] = React.useState<number | "">("");
  const [areaValue, setAreaValue] = React.useState<number | "">("");
  const [areaUnit, setAreaUnit] = React.useState("sqft");
  const [locationLabel, setLocationLabel] = React.useState("");

  // Descriptive
  const [yearBuilt, setYearBuilt] = React.useState<number | "">("");
  const [description, setDescription] = React.useState("");
  const [developer, setDeveloper] = React.useState("");
  const [developerLogoUrl, setDeveloperLogoUrl] = React.useState("");
  const [viewDescription, setViewDescription] = React.useState("");

  // Booleans / flags
  const [hasVideo, setHasVideo] = React.useState(false);
  const [hasVirtualTour, setHasVirtualTour] = React.useState(false);
  const [isFeatured, setIsFeatured] = React.useState(false);
  const [newConstruction, setNewConstruction] = React.useState(false);
  const [fireplace, setFireplace] = React.useState(false);
  const [cooling, setCooling] = React.useState(false);
  const [heating, setHeating] = React.useState(false);
  const [basement, setBasement] = React.useState(false);
  const [pool, setPool] = React.useState(false);
  const [garage, setGarage] = React.useState(false);

  // Numbers / misc
  const [totalStories, setTotalStories] = React.useState<number | "">("");
  const [fullBathrooms, setFullBathrooms] = React.useState<number | "">("");
  const [halfBathrooms, setHalfBathrooms] = React.useState<number | "">("");
  const [garageSpaces, setGarageSpaces] = React.useState<number | "">("");
  const [parkingTotal, setParkingTotal] = React.useState<number | "">("");
  const [daysOnMarket, setDaysOnMarket] = React.useState<number | "">("");

  // Strings
  const [lotSize, setLotSize] = React.useState("");
  const [permitNumber, setPermitNumber] = React.useState("");
  const [dedNumber, setDedNumber] = React.useState("");
  const [mlsId, setMlsId] = React.useState("");
  const [floorDescription, setFloorDescription] = React.useState("");
  const [fireplaceDescription, setFireplaceDescription] = React.useState("");
  const [coolingDescription, setCoolingDescription] = React.useState("");
  const [heatingDescription, setHeatingDescription] = React.useState("");
  const [lotFeatures, setLotFeatures] = React.useState("");
  const [sewer, setSewer] = React.useState("");
  const [patioPorch, setPatioPorch] = React.useState("");
  const [highSchool, setHighSchool] = React.useState("");
  const [elementarySchool, setElementarySchool] = React.useState("");
  const [taxes, setTaxes] = React.useState("");
  const [taxFrequency, setTaxFrequency] = React.useState("");
  const [accessibility, setAccessibility] = React.useState("");
  const [parking, setParking] = React.useState("");
  const [view, setView] = React.useState("");
  const [county, setCounty] = React.useState("");
  const [waterSource, setWaterSource] = React.useState("");
  const [poolFeatures, setPoolFeatures] = React.useState("");
  const [completionDate, setCompletionDate] = React.useState("");
  const [paymentOptions, setPaymentOptions] = React.useState("");

  // JSON-like arrays (managed as CSV for simplicity in first iteration)
  const [indoorFeatures, setIndoorFeatures] = React.useState("");
  const [outdoorFeatures, setOutdoorFeatures] = React.useState("");
  const [appliances, setAppliances] = React.useState("");
  const [keyAmenities, setKeyAmenities] = React.useState("");
  const [locationDistances, setLocationDistances] = React.useState("");
  const [utilities, setUtilities] = React.useState("");
  const [interiorFeatures, setInteriorFeatures] = React.useState("");

  // Agent
  const [agentId, setAgentId] = React.useState<number | string>("");
  const [noAgent, setNoAgent] = React.useState(false);
  const [agents, setAgents] = React.useState<Array<{ id: number; name: string }>>([]);

  // Images
  const [images, setImages] = React.useState<ImageInput[]>([
    { url: "", sort_order: 0, is_primary: true },
  ]);

  const addImageRow = () => setImages((imgs) => [...imgs, { url: "", sort_order: imgs.length, is_primary: false }]);
  const removeImageRow = (idx: number) => setImages((imgs) => imgs.filter((_, i) => i !== idx));
  const updateImageRow = (idx: number, patch: Partial<ImageInput>) =>
    setImages((imgs) => imgs.map((img, i) => (i === idx ? { ...img, ...patch } : img)));

  // Auto-generate slug from title and check availability
  React.useEffect(() => {
    const s = slugify(title);
    if (s && s !== slug) setSlug(s);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  React.useEffect(() => {
    let cancelled = false;
    const run = async () => {
      if (!slug.trim()) { setSlugAvailable(null); return; }
      try {
        const res = await fetch(`http://localhost:8080/api/properties/slug-available?slug=${encodeURIComponent(slug)}`);
        const data = await res.json();
        if (!cancelled) setSlugAvailable(Boolean(data?.ok));
      } catch {
        if (!cancelled) setSlugAvailable(null);
      }
    };
    const t = setTimeout(run, 300);
    return () => { cancelled = true; clearTimeout(t); };
  }, [slug]);

  // Load agents
  React.useEffect(() => {
    let cancelled = false;
    API as any;
    fetch(`http://localhost:8080/api/agents`).then(r => r.json()).then((arr: Array<{id: number; name: string}>) => {
      if (!cancelled) setAgents(arr || []);
    }).catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const validate = () => {
    if (!title.trim()) return "Title is required";
    if (!slug.trim()) return "Slug is required";
    if (!priceOnRequest && (priceAmount === "" || Number(priceAmount) <= 0)) return "Price amount is required";
    if (!priceCurrency) return "Currency is required";
    if (!propertyType) return "Property type is required";
    if (bedrooms === "") return "Bedrooms is required";
    if (bathrooms === "") return "Bathrooms is required";
    if (areaValue === "") return "Area value is required";
    if (!areaUnit) return "Area unit is required";
    if (!locationLabel.trim()) return "Location is required";
    if (!noAgent && agentId === "") return "Agent is required";
    return null;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) { toast.error(err); return; }
    if (slugAvailable === false) { toast.error("Slug not available. Please edit title or slug."); return; }
    if (!noAgent && (agentId === "" || agentId === null)) { toast.error("Agent is required"); return; }
    setSubmitting(true);
    try {
      const payload: any = {
        title,
        slug,
        priceAmount: priceOnRequest ? 0 : Number(priceAmount),
        priceCurrency,
        pricePerSqft: pricePerSqft === "" ? null : Number(pricePerSqft),
        propertyType,
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        areaValue: Number(areaValue),
        areaUnit,
        locationLabel,
        yearBuilt: yearBuilt === "" ? null : Number(yearBuilt),
        description,
        developer,
        developerLogoUrl: developerLogoUrl || null,
        viewDescription,
        hasVideo,
        hasVirtualTour,
        isFeatured,
        newConstruction,
        fireplace,
        cooling,
        heating,
        basement,
        pool,
        garage,
        totalStories: totalStories === "" ? null : Number(totalStories),
        fullBathrooms: fullBathrooms === "" ? null : Number(fullBathrooms),
        halfBathrooms: halfBathrooms === "" ? null : Number(halfBathrooms),
        garageSpaces: garageSpaces === "" ? null : Number(garageSpaces),
        parkingTotal: parkingTotal === "" ? null : Number(parkingTotal),
        daysOnMarket: daysOnMarket === "" ? null : Number(daysOnMarket),
        lotSize,
        permitNumber,
        dedNumber,
        mlsId,
        floorDescription,
        fireplaceDescription,
        coolingDescription,
        heatingDescription,
        lotFeatures,
        sewer,
        patioPorch,
        highSchool,
        elementarySchool,
        taxes,
        taxFrequency,
        accessibility,
        parking,
        view,
        county,
        waterSource,
        poolFeatures,
        completionDate,
        paymentOptions,
        indoorFeatures: csvToArray(indoorFeatures),
        outdoorFeatures: csvToArray(outdoorFeatures),
        appliances: csvToArray(appliances),
        keyAmenities: csvToArray(keyAmenities),
        locationDistances: csvToArray(locationDistances),
        utilities: csvToArray(utilities),
        interiorFeatures: csvToArray(interiorFeatures),
        agentId: noAgent
          ? null
          : (typeof agentId === 'string'
              ? (agentId === "" || agentId === 'direct' ? null : Number(agentId))
              : agentId),
        images,
      };

      const res = await fetch("http://localhost:8080/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Create failed: ${res.status}`);
      toast.success("Listing created");
      navigate(`/listing/${slug}`);
    } catch (e: any) {
      console.error(e);
      toast.error(e?.message || "Failed to submit");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-[70px] py-8">
        <h1 className="text-[28px] lg:text-[34px] font-bold mb-6">Create Property Listing</h1>
        <form onSubmit={onSubmit} className="space-y-8">
          {/* Basic info */}
          <section>
            <h2 className="text-[18px] font-semibold mb-3">Basic</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <TextInput label="Title" value={title} onChange={setTitle} required />
              <div>
                <TextInput label="Slug" value={slug} onChange={setSlug} required helper={slugAvailable === false ? "Not available" : slugAvailable === true ? "Available" : "URL-friendly unique identifier"} />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium mb-1">Price Amount *</label>
                  <label className="inline-flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={priceOnRequest}
                      onChange={(e) => setPriceOnRequest(e.target.checked)}
                    />
                    <span>Price on Request</span>
                  </label>
                </div>
                <input
                  className="w-full border border-gray-300 p-2"
                  type="number"
                  value={priceAmount}
                  onChange={(e) => setPriceAmount(e.target.value === "" ? "" : Number(e.target.value))}
                  required={!priceOnRequest}
                  disabled={priceOnRequest}
                />
              </div>
              <TextInput label="Price Currency" value={priceCurrency} onChange={setPriceCurrency} required />
              <NumberInput label="Price per sqft" value={pricePerSqft} onChange={setPricePerSqft} />
              <TextInput label="Property Type" value={propertyType} onChange={setPropertyType} required />
              <NumberInput label="Bedrooms" value={bedrooms} onChange={setBedrooms} required />
              <NumberInput label="Bathrooms" value={bathrooms} onChange={setBathrooms} required />
              <NumberInput label="Area Value" value={areaValue} onChange={setAreaValue} required />
              <TextInput label="Area Unit" value={areaUnit} onChange={setAreaUnit} required />
              <TextInput label="Location Label" value={locationLabel} onChange={setLocationLabel} required />
            </div>
          </section>

          {/* Details */}
          <section>
            <h2 className="text-[18px] font-semibold mb-3">Details</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <NumberInput label="Year Built" value={yearBuilt} onChange={setYearBuilt} />
              <TextInput label="Developer" value={developer} onChange={setDeveloper} />
              <TextInput label="Developer Logo URL" value={developerLogoUrl} onChange={setDeveloperLogoUrl} />
              <TextInput label="View Description" value={viewDescription} onChange={setViewDescription} />
              <NumberInput label="Total Stories" value={totalStories} onChange={setTotalStories} />
              <NumberInput label="Full Bathrooms" value={fullBathrooms} onChange={setFullBathrooms} />
              <NumberInput label="Half Bathrooms" value={halfBathrooms} onChange={setHalfBathrooms} />
              <TextInput label="Lot Size" value={lotSize} onChange={setLotSize} />
              <TextInput label="Permit Number" value={permitNumber} onChange={setPermitNumber} />
              <TextInput label="DED Number" value={dedNumber} onChange={setDedNumber} />
              <TextInput label="MLS Id" value={mlsId} onChange={setMlsId} />
              <TextInput label="Floor Description" value={floorDescription} onChange={setFloorDescription} />
              <TextInput label="Fireplace Description" value={fireplaceDescription} onChange={setFireplaceDescription} />
              <TextInput label="Cooling Description" value={coolingDescription} onChange={setCoolingDescription} />
              <TextInput label="Heating Description" value={heatingDescription} onChange={setHeatingDescription} />
              <TextInput label="Lot Features" value={lotFeatures} onChange={setLotFeatures} />
              <TextInput label="Sewer" value={sewer} onChange={setSewer} />
              <TextInput label="Patio/Porch" value={patioPorch} onChange={setPatioPorch} />
              <TextInput label="High School" value={highSchool} onChange={setHighSchool} />
              <TextInput label="Elementary School" value={elementarySchool} onChange={setElementarySchool} />
              <TextInput label="Taxes" value={taxes} onChange={setTaxes} />
              <TextInput label="Tax Frequency" value={taxFrequency} onChange={setTaxFrequency} />
              <TextInput label="Accessibility" value={accessibility} onChange={setAccessibility} />
              <TextInput label="Parking" value={parking} onChange={setParking} />
              <NumberInput label="Parking Total" value={parkingTotal} onChange={setParkingTotal} />
              <TextInput label="View" value={view} onChange={setView} />
              <TextInput label="County" value={county} onChange={setCounty} />
              <TextInput label="Water Source" value={waterSource} onChange={setWaterSource} />
              <TextInput label="Pool Features" value={poolFeatures} onChange={setPoolFeatures} />
              <NumberInput label="Days On Market" value={daysOnMarket} onChange={setDaysOnMarket} />
              <TextInput label="Completion Date" value={completionDate} onChange={setCompletionDate} />
              <TextInput label="Payment Options" value={paymentOptions} onChange={setPaymentOptions} />
            </div>
            <div className="mt-3">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea className="w-full border border-gray-300 p-2" rows={5} value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
          </section>

          {/* Arrays (CSV) */}
          <section>
            <h2 className="text-[18px] font-semibold mb-3">Features & JSON Lists (comma-separated)</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <TextInput label="Indoor Features (CSV)" value={indoorFeatures} onChange={setIndoorFeatures} />
              <TextInput label="Outdoor Features (CSV)" value={outdoorFeatures} onChange={setOutdoorFeatures} />
              <TextInput label="Appliances (CSV)" value={appliances} onChange={setAppliances} />
              <TextInput label="Key Amenities (CSV)" value={keyAmenities} onChange={setKeyAmenities} />
              <TextInput label="Location Distances (CSV)" value={locationDistances} onChange={setLocationDistances} />
              <TextInput label="Utilities (CSV)" value={utilities} onChange={setUtilities} />
              <TextInput label="Interior Features (CSV)" value={interiorFeatures} onChange={setInteriorFeatures} />
            </div>
          </section>

          {/* Flags */}
          <section>
            <h2 className="text-[18px] font-semibold mb-3">Flags</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <CheckboxInput label="Has Video" checked={hasVideo} onChange={setHasVideo} />
              <CheckboxInput label="Has Virtual Tour" checked={hasVirtualTour} onChange={setHasVirtualTour} />
              <CheckboxInput label="Featured" checked={isFeatured} onChange={setIsFeatured} />
              <CheckboxInput label="New Construction" checked={newConstruction} onChange={setNewConstruction} />
              <CheckboxInput label="Fireplace" checked={fireplace} onChange={setFireplace} />
              <CheckboxInput label="Cooling" checked={cooling} onChange={setCooling} />
              <CheckboxInput label="Heating" checked={heating} onChange={setHeating} />
              <CheckboxInput label="Basement" checked={basement} onChange={setBasement} />
              <CheckboxInput label="Pool" checked={pool} onChange={setPool} />
              <CheckboxInput label="Garage" checked={garage} onChange={setGarage} />
            </div>
          </section>

          {/* Agent */}
          <section>
            <h2 className="text-[18px] font-semibold mb-3">Agent</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <input id="noAgent" type="checkbox" checked={noAgent} onChange={(e) => { setNoAgent(e.target.checked); if (e.target.checked) setAgentId(""); }} />
                <label htmlFor="noAgent">No agent</label>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Agent *</label>
                <select className="w-full border border-gray-300 p-2" value={agentId} onChange={(e) => setAgentId(e.target.value)} required={!noAgent} disabled={noAgent}>
                  <option value="">Select an agent</option>
                  <option value="direct">Direct from developer</option>
                  {agents.map((a) => (
                    <option key={a.id} value={String(a.id)}>{a.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Images */}
          <section>
            <h2 className="text-[18px] font-semibold mb-3">Images</h2>
            <div className="space-y-3">
              {images.map((img, idx) => (
                <div key={idx} className="grid grid-cols-1 lg:grid-cols-[1fr_130px_120px_1fr] gap-3 items-end">
                  <div>
                    <TextInput label="Image URL" value={img.url} onChange={(v) => updateImageRow(idx, { url: v })} />
                  </div>
                  <div>
                    <NumberInput label="Sort Order" value={img.sort_order} onChange={(v) => updateImageRow(idx, { sort_order: v as number })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Primary</label>
                    <input type="checkbox" checked={img.is_primary} onChange={(e) => updateImageRow(idx, { is_primary: e.target.checked })} />
                  </div>
                  <div>
                    <TextInput label="Alt Text" value={img.alt_text || ""} onChange={(v) => updateImageRow(idx, { alt_text: v })} />
                  </div>
                  <div className="lg:col-span-4">
                    <button type="button" className="text-sm text-red-600 underline" onClick={() => removeImageRow(idx)} disabled={images.length === 1}>Remove</button>
                  </div>
                </div>
              ))}
              <button type="button" className="px-3 py-2 border border-gray-300" onClick={addImageRow}>Add Image</button>
            </div>
          </section>

          {/* Submit */}
          <div className="flex gap-3">
            <button type="submit" disabled={submitting} className="px-5 py-2 bg-black text-white">
              {submitting ? "Submitting..." : "Create Listing"}
            </button>
            <button type="button" className="px-5 py-2 border" onClick={() => navigate(-1)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function TextInput({ label, value, onChange, required, helper }: { label: string; value: string; onChange: (v: string) => void; required?: boolean; helper?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}{required ? " *" : ""}</label>
      <input className="w-full border border-gray-300 p-2" value={value} onChange={(e) => onChange(e.target.value)} required={required} />
      {helper ? <div className="text-xs text-gray-500 mt-1">{helper}</div> : null}
    </div>
  );
}

function NumberInput({ label, value, onChange, required }: { label: string; value: number | ""; onChange: (v: number | "") => void; required?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}{required ? " *" : ""}</label>
      <input
        className="w-full border border-gray-300 p-2"
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
        required={required}
      />
    </div>
  );
}

function CheckboxInput({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="inline-flex items-center gap-2">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span>{label}</span>
    </label>
  );
}

function csvToArray(input: string): string[] {
  return input
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}


