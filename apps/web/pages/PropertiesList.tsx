import React from "react";
import { apiService } from "../services/api";
import { toast } from "sonner";

export default function PropertiesList() {
  const [properties, setProperties] = React.useState<Array<{ 
    id: number; 
    slug: string; 
    title: string; 
    price_amount: number;
    price_currency: string;
    property_type: string;
    bedrooms: number;
    bathrooms: number;
    location_label: string;
    primary_image_url: string;
    created_at: string;
    views_count: number;
    saves_count: number;
    is_featured: boolean;
  }>>([]);
  const [loading, setLoading] = React.useState(true);
  const [deletingId, setDeletingId] = React.useState<number | null>(null);
  
  // Hero slides management
  const [heroSlides, setHeroSlides] = React.useState<Array<{
    id: number;
    title: string;
    subtitle: string;
    property_id: number;
    sort_order: number;
    is_active: boolean;
    property: {
      id: number;
      slug: string;
      title: string;
    };
  }>>([]);
  const [loadingHeroSlides, setLoadingHeroSlides] = React.useState(false);
  const [showHeroSlidesModal, setShowHeroSlidesModal] = React.useState(false);
  const [showAddHeroSlideModal, setShowAddHeroSlideModal] = React.useState(false);
  const [selectedPropertyForHero, setSelectedPropertyForHero] = React.useState<number | null>(null);
  const [heroSlideTitle, setHeroSlideTitle] = React.useState('');
  const [heroSlideSubtitle, setHeroSlideSubtitle] = React.useState('');

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      // Use the properties endpoint with a high limit to get all properties
      const response = await fetch('http://localhost:8080/api/properties?limit=1000');
      const data = await response.json();
      setProperties(data.properties || []);
    } catch (e: any) {
      toast.error(e?.message || "Failed to load properties");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => { load(); }, [load]);

  // Load hero slides
  const loadHeroSlides = React.useCallback(async () => {
    setLoadingHeroSlides(true);
    try {
      const response = await fetch('http://localhost:8080/api/hero-slides/admin');
      const data = await response.json();
      setHeroSlides(data);
    } catch (e: any) {
      toast.error(e?.message || "Failed to load hero slides");
    } finally {
      setLoadingHeroSlides(false);
    }
  }, []);

  React.useEffect(() => { loadHeroSlides(); }, [loadHeroSlides]);

  // Toggle featured status
  const toggleFeatured = async (id: number) => {
    try {
      console.log('Toggling featured status for property:', id);
      
      const response = await fetch(`http://localhost:8080/api/properties/toggle-featured/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' }
      });
      
      console.log('Toggle response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Toggle failed: ${response.status} - ${errorData.error || response.statusText}`);
      }
      
      const result = await response.json();
      console.log('Toggle result:', result);
      
      toast.success(result.message);
      await load(); // Reload properties to update UI
    } catch (e: any) {
      console.error('Error toggling featured status:', e);
      toast.error(e?.message || "Failed to toggle featured status");
    }
  };

  // Add property to hero slides
  const addToHeroSlides = async () => {
    if (!selectedPropertyForHero) return;
    
    try {
      console.log('Adding to hero slides:', {
        propertyId: selectedPropertyForHero,
        title: heroSlideTitle,
        subtitle: heroSlideSubtitle
      });

      const response = await fetch('http://localhost:8080/api/hero-slides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId: selectedPropertyForHero,
          title: heroSlideTitle,
          subtitle: heroSlideSubtitle
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Add failed: ${response.status} - ${errorData.error || response.statusText}`);
      }
      
      const result = await response.json();
      console.log('Hero slide created:', result);
      
      toast.success("Property added to hero slides");
      setShowAddHeroSlideModal(false);
      setSelectedPropertyForHero(null);
      setHeroSlideTitle('');
      setHeroSlideSubtitle('');
      await loadHeroSlides();
    } catch (e: any) {
      console.error('Error adding to hero slides:', e);
      toast.error(e?.message || "Failed to add to hero slides");
    }
  };

  // Remove property from hero slides
  const removeFromHeroSlides = async (slideId: number) => {
    if (!confirm("Remove this property from hero slides?")) return;
    
    try {
      const response = await fetch(`http://localhost:8080/api/hero-slides/${slideId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error(`Remove failed: ${response.status}`);
      
      toast.success("Property removed from hero slides");
      await loadHeroSlides();
    } catch (e: any) {
      toast.error(e?.message || "Failed to remove from hero slides");
    }
  };

  // Toggle hero slide active status
  const toggleHeroSlideActive = async (slideId: number, currentStatus: boolean) => {
    try {
      const response = await fetch(`http://localhost:8080/api/hero-slides/${slideId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus })
      });
      
      if (!response.ok) throw new Error(`Toggle failed: ${response.status}`);
      
      toast.success(`Hero slide ${!currentStatus ? 'activated' : 'deactivated'}`);
      await loadHeroSlides();
    } catch (e: any) {
      toast.error(e?.message || "Failed to toggle hero slide status");
    }
  };

  const onDelete = async (id: number) => {
    if (!confirm("Delete this property? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      const response = await fetch(`http://localhost:8080/api/properties/${id}`, { 
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error(`Delete failed: ${response.status}`);
      toast.success("Property deleted");
      await load();
    } catch (e: any) {
      toast.error(e?.message || "Failed to delete property");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading properties…</div>;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-[70px] py-8">
        {/* Breadcrumb Navigation */}
        <div className="text-[18px] font-medium text-[#8c8c8c] tracking-[-0.36px] leading-[27px] mb-6">
          <a href="/" className="text-[#8c8c8c] hover:text-[#fd2d15] transition-colors">
            Homepage
          </a>
          <span className="mx-2 text-[#8c8c8c]">{">"}</span>
          <a href="/properties" className="text-[#8c8c8c] hover:text-[#fd2d15] transition-colors">
            Properties
          </a>
          <span className="mx-2 text-[#8c8c8c]">{">"}</span>
          <span className="text-[#fd2d15]">Admin List</span>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[28px] lg:text-[34px] font-bold">Property Listings</h1>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowHeroSlidesModal(true)}
              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Manage Hero Slides
            </button>
            <a href="/properties" className="px-4 py-2 border border-gray-300 hover:bg-gray-50 transition-colors">View Public Properties</a>
            <a href="/properties/new" className="px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors">New Property</a>
          </div>
        </div>
        {properties.length === 0 ? (
          <div className="text-gray-600">No properties found.</div>
        ) : (
          <div className="divide-y border border-gray-200 rounded-lg overflow-hidden">
            {properties.map((property) => (
              <div key={property.id} className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  {property.primary_image_url ? (
                    <img 
                      src={property.primary_image_url} 
                      alt={property.title} 
                      className="w-20 h-20 object-cover rounded-lg" 
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-100 grid place-items-center rounded-lg text-gray-400 text-sm text-center">
                      No Image
                    </div>
                  )}
                  <div className="space-y-2">
                    <div className="font-semibold text-lg text-black">{property.title}</div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex items-center gap-4">
                        <span>{property.property_type}</span>
                        <span>•</span>
                        <span>{property.bedrooms} beds, {property.bathrooms} baths</span>
                        <span>•</span>
                        <span>{property.location_label}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>Price: {property.price_currency} {property.price_amount.toLocaleString()}</span>
                        <span>•</span>
                        <span>Views: {property.views_count}</span>
                        <span>•</span>
                        <span>Saved: {property.saves_count}</span>
                        <span>•</span>
                        <span>Created: {new Date(property.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleFeatured(property.id)}
                    className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                      property.is_featured 
                        ? 'bg-green-600 text-white hover:bg-green-700' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    title={property.is_featured ? 'Remove from featured' : 'Mark as featured'}
                  >
                    {property.is_featured ? '⭐ Featured' : '☆ Feature'}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedPropertyForHero(property.id);
                      setHeroSlideTitle(property.title);
                      setHeroSlideSubtitle(`Featured ${property.property_type} in ${property.location_label}`);
                      setShowAddHeroSlideModal(true);
                    }}
                    className="px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors text-sm"
                    title="Add to hero slides"
                  >
                    🎯 Hero
                  </button>
                  <a 
                    href={`/listing/${encodeURIComponent(property.slug)}`} 
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                  >
                    View
                  </a>
                  <a 
                    href={`/property/edit/${encodeURIComponent(property.slug)}`} 
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                  >
                    Edit
                  </a>
                  <button 
                    onClick={() => onDelete(property.id)} 
                    disabled={deletingId === property.id} 
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {deletingId === property.id ? 'Deleting…' : 'Delete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hero Slides Management Modal */}
      {showHeroSlidesModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Manage Hero Slides</h2>
              <button 
                onClick={() => setShowHeroSlidesModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            {loadingHeroSlides ? (
              <div className="text-center py-8">Loading hero slides...</div>
            ) : (
              <div className="space-y-4">
                {heroSlides.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No hero slides configured yet.
                  </div>
                ) : (
                  heroSlides.map((slide) => (
                    <div key={slide.id} className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img 
                          src={properties.find(p => p.id === slide.property_id)?.primary_image_url || 'https://via.placeholder.com/80x80?text=No+Image'} 
                          alt={slide.property.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="font-semibold">{slide.title || slide.property.title}</h3>
                          <p className="text-sm text-gray-600">{slide.subtitle}</p>
                          <p className="text-xs text-gray-500">Order: {slide.sort_order}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleHeroSlideActive(slide.id, slide.is_active)}
                          className={`px-3 py-1 rounded text-sm ${
                            slide.is_active 
                              ? 'bg-green-600 text-white hover:bg-green-700' 
                              : 'bg-gray-400 text-white hover:bg-gray-500'
                          }`}
                        >
                          {slide.is_active ? 'Active' : 'Inactive'}
                        </button>
                        <button
                          onClick={() => removeFromHeroSlides(slide.id)}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add Hero Slide Modal */}
      {showAddHeroSlideModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Add to Hero Slides</h2>
              <button 
                onClick={() => setShowAddHeroSlideModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={heroSlideTitle}
                  onChange={(e) => setHeroSlideTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Custom title (optional)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subtitle</label>
                <input
                  type="text"
                  value={heroSlideSubtitle}
                  onChange={(e) => setHeroSlideSubtitle(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Custom subtitle (optional)"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={addToHeroSlides}
                  className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  Add to Hero Slides
                </button>
                <button
                  onClick={() => setShowAddHeroSlideModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
