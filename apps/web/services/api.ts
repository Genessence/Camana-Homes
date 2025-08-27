// API service for Listing Page
function resolveBaseUrl(): string {
  const envUrl = import.meta.env.VITE_API_BASE_URL as string | undefined;
  // If running vite dev on 8081, talk to backend 8080 explicitly
  const isDevHost = typeof window !== 'undefined' && window.location.port === '8081';
  if (isDevHost) return 'http://localhost:8080/api';
  if (envUrl && envUrl.length > 0) return envUrl;
  return '/api';
}
const API_BASE_URL = resolveBaseUrl();

function getVisitorId(): string {
  try {
    const key = 'camana_vid';
    let v = localStorage.getItem(key) || '';
    if (!v) {
      try {
        v = (crypto && 'randomUUID' in crypto) ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      } catch {
        v = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      }
      try { localStorage.setItem(key, v); } catch {}
      try { document.cookie = `${key}=${v}; path=/; max-age=${60 * 60 * 24 * 365}`; } catch {}
    }
    return v;
  } catch {
    return 'anonymous';
  }
}

export interface PropertyDetail {
  id: number;
  slug: string;
  title: string;
  price_amount: number;
  price_currency: string;
  price_per_sqft: number | null;
  property_type: string;
  bedrooms: number;
  bathrooms: number;
  area_value: number;
  area_unit: string;
  location_label: string;
  outdoor_features: string[];
  indoor_features: string[];
  view_description: string;
  year_built: number;
  description: string;
  saves_count: number;
  completion_date: string;
  payment_options: string;
  key_amenities: string[];
  location_distances: Array<{ place: string; distance: string }>;
  developer: string;
  developer_logo_url?: string | null;
  has_video: boolean;
  has_virtual_tour: boolean;
  views_count: number;
  primary_image_url: string;
  image_urls: string[];
  
  // Enhanced property details
  total_stories?: number;
  full_bathrooms?: number;
  half_bathrooms?: number;
  lot_size?: string;
  permit_number?: string;
  ded_number?: string;
  mls_id?: string;
  
  // Interior features
  interior_features?: string[];
  appliances?: string[];
  floor_description?: string;
  fireplace?: boolean;
  fireplace_description?: string;
  cooling?: boolean;
  cooling_description?: string;
  heating?: boolean;
  heating_description?: string;
  basement?: boolean;
  
  // Exterior features
  exterior_features?: string[];
  lot_features?: string;
  sewer?: string;
  patio_porch?: string;
  
  // School information
  high_school?: string;
  elementary_school?: string;
  
  // Other property details
  taxes?: string;
  tax_frequency?: string;
  days_on_market?: number;
  accessibility?: string;
  garage?: boolean;
  garage_spaces?: number;
  parking?: string;
  parking_total?: number;
  view?: string;
  county?: string;
  water_source?: string;
  new_construction?: boolean;
  pool?: boolean;
  pool_features?: string;
  utilities?: string[];
  
  images: Array<{
    url: string;
    sort_order: number;
    is_primary: boolean;
    alt_text: string;
  }>;
  
  agent?: {
    id: number;
    name: string;
    avatar_url: string;
    phone_number: string;
    email: string;
    agency?: {
      id: number;
      name: string;
      logo_url: string;
    };
  };
  
  created_at: string;
  updated_at: string;
}

export interface PropertyStats {
  last_update: string;
  views_count: number;
  saves_count: number;
  days_on_market: number | null;
}

export interface TourRequest {
  property_id: number;
  visitor_name: string;
  visitor_email: string;
  visitor_phone?: string;
  preferred_date: string;
  preferred_time: string;
  message?: string;
}

export interface MortgageInquiry {
  property_id?: number;
  inquirer_name: string;
  inquirer_email: string;
  inquirer_phone?: string;
  content_sum_insured: string;
  location: string;
  age: number;
  message?: string;
}

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  // Agents
  async listAgents(): Promise<Array<{ id: number; name: string; avatar_url: string | null; phone_number: string | null; email: string | null; }>> {
    return this.request(`/agents`);
  }
  async deleteAgent(id: number): Promise<{ ok: boolean }> {
    const url = `${API_BASE_URL}/agents/${id}`;
    const res = await fetch(url, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } });
    if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
    return res.json();
  }

  // Articles
  async listArticles(limit = 50): Promise<Array<{ id: number; slug: string; title: string; image_url: string | null; category: string | null; excerpt: string | null; created_at: string }>> {
    return this.request(`/articles?limit=${limit}`);
  }
  async createArticle(data: { title: string; slug: string; imageUrl: string; category?: string; excerpt?: string; authorName?: string; authorAvatarUrl?: string; }): Promise<{ id: number; slug: string }> {
    return this.request(`/articles`, { method: 'POST', body: JSON.stringify(data) });
  }
  async deleteArticle(id: number): Promise<{ ok: boolean }> {
    const res = await fetch(`${API_BASE_URL}/articles/${id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } });
    if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
    return res.json();
  }

  // Get agent by slug
  async getAgentBySlug(slug: string): Promise<{
    id: number;
    name: string;
    slug: string | null;
    avatar_url: string | null;
    phone_number: string | null;
    email: string | null;
    license_number: string | null;
    location: string | null;
    bio: string | null;
    about: string | null;
    instagram_url: string | null;
    linkedin_url: string | null;
    youtube_url: string | null;
    website_url: string | null;
    agency: { id: number; name: string; logo_url: string | null } | null;
  }> {
    return this.request(`/agents/${encodeURIComponent(slug)}`);
  }

  // Get property details by slug
  async getPropertyDetail(slug: string): Promise<PropertyDetail> {
    return this.request<PropertyDetail>(`/properties/${slug}`);
  }

  // Get property statistics
  async getPropertyStats(slug: string): Promise<PropertyStats> {
    return this.request<PropertyStats>(`/properties/${slug}/stats`);
  }

  // Submit tour request
  async submitTourRequest(data: TourRequest): Promise<any> {
    return this.request('/tour-requests', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Submit mortgage inquiry
  async submitMortgageInquiry(data: MortgageInquiry): Promise<any> {
    return this.request('/mortgage-inquiries', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Track property view
  async trackPropertyView(slug: string): Promise<any> {
    const endpoint = `/activity/view-property?property_slug=${encodeURIComponent(slug)}`;
    return this.request(endpoint, {
      method: 'POST',
      headers: {
        'X-Visitor-Id': getVisitorId(),
      },
    });
  }
}

export const apiService = new ApiService();
