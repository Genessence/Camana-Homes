import React from "react";
import { useNavigate } from "react-router-dom";
import { API } from "@shared/api";
import { toast } from "sonner";
import { RichTextEditor } from "@/components/ui/RichTextEditor";

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
  
  // Details body field
  const [detailsBody, setDetailsBody] = React.useState("");
  const [useDetailsBody, setUseDetailsBody] = React.useState(false);

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
    setImages((imgs) => {
      // If setting this image as primary, unset all others
      if (patch.is_primary) {
        return imgs.map((img, i) => ({
          ...img,
          is_primary: i === idx,
          ...(i === idx ? patch : {})
        }));
      }
      // Otherwise just update the specific image
      return imgs.map((img, i) => (i === idx ? { ...img, ...patch } : img));
    });

  // Function to upload multiple images
  const uploadMultipleImages = async (files: File[]) => {
    try {
      toast.info(`Uploading ${files.length} images...`);
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fd = new FormData();
        fd.append('file', file);
        
        const res = await fetch(`http://localhost:8080/api/uploads/image?prefix=${encodeURIComponent(`properties/${slug || Date.now()}/bulk-${Date.now()}-${i}`)}`, { 
          method: 'POST', 
          body: fd 
        });
        
        if (!res.ok) throw new Error(`Failed to upload ${file.name}`);
        const { url } = await res.json();
        
        // Add new image to the list
        const newImage = {
          url,
          sort_order: images.length + i,
          is_primary: images.length === 0 && i === 0, // First image becomes primary if no primary exists
          alt_text: file.name.replace(/\.[^/.]+$/, "") // Remove file extension for alt text
        };
        
        setImages(prev => [...prev, newImage]);
      }
      
      toast.success(`${files.length} images uploaded successfully`);
    } catch (error: any) {
      toast.error(error?.message || 'Bulk upload failed');
    }
  };

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
        detailsBody: useDetailsBody ? detailsBody : null,
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
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[28px] lg:text-[34px] font-bold">Create Property Listing</h1>
          <div className="flex gap-3">
            <a href="/properties/list" className="px-4 py-2 border border-gray-300 hover:bg-gray-50 transition-colors">View All Properties</a>
          </div>
        </div>
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
              <NumberInput label="Year Built" value={yearBuilt} onChange={setYearBuilt} />
              <NumberInput label="Garage Spaces" value={garageSpaces} onChange={setGarageSpaces} />
            </div>
          </section>

          {/* Details Body vs Detailed Sections Toggle */}
          <section>
            <h2 className="text-[18px] font-semibold mb-3">Content Type Selection</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg border">
                <p className="text-sm text-gray-600 mb-3">
                  Choose how you want to provide property details. You can either use individual form fields for structured data, 
                  or use a rich text editor for free-form content.
                </p>
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      checked={!useDetailsBody}
                      onChange={() => setUseDetailsBody(false)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div>
                      <span className="font-medium">Detailed Sections</span>
                      <p className="text-xs text-gray-500">Use individual form fields for structured property information</p>
                    </div>
                  </label>
                  <label className="inline-flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      checked={useDetailsBody}
                      onChange={() => setUseDetailsBody(true)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div>
                      <span className="font-medium">Rich Text Editor</span>
                      <p className="text-xs text-gray-500">Use rich text editor for free-form property details</p>
                    </div>
                  </label>
                </div>
              </div>
              
              {useDetailsBody && (
                <div>
                  <label className="block text-sm font-medium mb-2">Details Body (Rich Text)</label>
                  <RichTextEditor
                    value={detailsBody}
                    onChange={setDetailsBody}
                    placeholder="Enter detailed property information using the rich text editor..."
                    className="min-h-[300px]"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Use this rich text editor to create formatted property details. This will replace the individual detailed sections below.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Details */}
          <section className={useDetailsBody ? "opacity-50 pointer-events-none" : ""}>
            <h2 className="text-[18px] font-semibold mb-3">
              Details
              {useDetailsBody && <span className="text-sm text-gray-500 ml-2">(Disabled - Using Rich Text Editor)</span>}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
          <section className={useDetailsBody ? "opacity-50 pointer-events-none" : ""}>
            <h2 className="text-[18px] font-semibold mb-3">
              Features & JSON Lists (comma-separated)
              {useDetailsBody && <span className="text-sm text-gray-500 ml-2">(Disabled - Using Rich Text Editor)</span>}
            </h2>
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
          <section className={useDetailsBody ? "opacity-50 pointer-events-none" : ""}>
            <h2 className="text-[18px] font-semibold mb-3">
              Flags
              {useDetailsBody && <span className="text-sm text-gray-500 ml-2">(Disabled - Using Rich Text Editor)</span>}
            </h2>
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
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[18px] font-semibold">Images</h2>
              {images.length > 0 && (
                <div className="text-sm text-gray-600">
                  {images.filter(img => img.is_primary).length > 0 ? (
                    <span className="inline-flex items-center gap-2 text-green-600">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Primary image set
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-amber-600">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      No primary image selected
                    </span>
                  )}
                </div>
              )}
            </div>
            
            {/* Bulk Image Upload */}
            <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="text-[16px] font-medium mb-3">Bulk Image Upload</h3>
              <p className="text-sm text-gray-600 mb-3">
                Upload multiple images at once. You can drag & drop images here or click to select files.
              </p>
              
              {/* Primary Image Selection */}
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium text-blue-800">Primary Image Selection</span>
                </div>
                <p className="text-xs text-blue-700">
                  The first image you select will automatically become the primary image (used in listings and titles). 
                  You can change this later by checking the "Primary" checkbox for any image below.
                </p>
              </div>
              
              {/* Drag & Drop Zone */}
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer"
                onDragOver={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.add('border-blue-400', 'bg-blue-50');
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove('border-blue-400', 'bg-blue-50');
                }}
                onDrop={async (e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove('border-blue-400', 'bg-blue-50');
                  
                  const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
                  if (files.length === 0) {
                    toast.error('Please drop only image files');
                    return;
                  }
                  
                  await uploadMultipleImages(files);
                }}
                onClick={() => {
                  const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
                  fileInput?.click();
                }}
              >
                <div className="text-gray-500">
                  <svg className="mx-auto h-12 w-12 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="text-lg font-medium">Drop images here or click to select</p>
                  <p className="text-sm">Supports JPG, PNG, GIF, WebP</p>
                  <p className="text-xs text-blue-600 mt-2">First image selected = Primary image</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 mt-4">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={async (e) => {
                    const files = Array.from(e.target.files || []);
                    if (files.length === 0) return;
                    await uploadMultipleImages(files);
                    e.target.value = ''; // Reset input
                  }}
                  className="hidden"
                />
                <button 
                  type="button" 
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  onClick={() => {
                    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
                    fileInput?.click();
                  }}
                >
                  Select Images
                </button>
                <span className="text-sm text-gray-500">or drag & drop above</span>
              </div>
            </div>
            <div className="space-y-3">
              {images.map((img, idx) => (
                <div key={idx} className="grid grid-cols-1 lg:grid-cols-[1fr_130px_120px_1fr] gap-3 items-end">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Image {idx + 1}
                      {img.is_primary && (
                        <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Primary
                        </span>
                      )}
                    </label>
                    <div className="flex items-center gap-2">
                      <input 
                        className="w-full border border-gray-300 p-2" 
                        value={img.url} 
                        onChange={(e) => updateImageRow(idx, { url: e.target.value })} 
                        placeholder="Paste URL or upload image"
                      />
                      <button 
                        type="button" 
                        className="px-3 py-2 border border-gray-300 hover:bg-gray-50 transition-colors"
                        onClick={async () => {
                          const input = document.createElement('input');
                          input.type = 'file';
                          input.accept = 'image/*';
                          input.onchange = async () => {
                            const file = (input.files && input.files[0]) as File | undefined;
                            if (!file) return;
                            try {
                              const fd = new FormData();
                              fd.append('file', file);
                              const res = await fetch(`http://localhost:8080/api/uploads/image?prefix=${encodeURIComponent(`properties/${slug || Date.now()}/image-${idx + 1}`)}`, { 
                                method: 'POST', 
                                body: fd 
                              });
                              if (!res.ok) throw new Error('Upload failed');
                              const { url } = await res.json();
                              updateImageRow(idx, { url });
                              toast.success(`Image ${idx + 1} uploaded successfully`);
                            } catch (e: any) {
                              toast.error(e?.message || 'Upload failed');
                            }
                          };
                          input.click();
                        }}
                      >
                        Upload
                      </button>
                    </div>
                    {img.url && (
                      <div className="mt-2">
                        <img 
                          src={img.url} 
                          alt="Preview" 
                          className="w-20 h-20 object-cover rounded border"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
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
              <button type="button" className="px-3 py-2 border border-gray-300 hover:bg-gray-50 transition-colors" onClick={addImageRow}>Add Image</button>
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


