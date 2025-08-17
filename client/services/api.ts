// API service for Listing Page
const API_BASE_URL = 'http://localhost:8000/api';

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
    return this.request(`/properties/${slug}/recently-viewed`, {
      method: 'GET',
      headers: {
        'X-Visitor-ID': 'anonymous', // You can implement proper visitor tracking
      },
    });
  }
}

export const apiService = new ApiService();
