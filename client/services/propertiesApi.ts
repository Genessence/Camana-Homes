// API service for Properties Listing Page
const API_BASE_URL = 'http://localhost:8000/api';

export interface PropertyListingFilters {
  search?: string;
  property_type?: string;
  min_price?: number;
  max_price?: number;
  min_bedrooms?: number;
  max_bedrooms?: number;
  sort_by?: 'price' | 'bedrooms' | 'views' | 'created_at';
  sort_order?: 'asc' | 'desc';
}

export interface PropertyListingResponse {
  properties: PropertyCard[];
  pagination: {
    current_page: number;
    total_pages: number;
    total_count: number;
    limit: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

export interface PropertyCard {
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
  agent: {
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
  } | null;
}

class PropertiesApiService {
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

  // Get properties with pagination, filtering, and sorting
  async getProperties(
    page: number = 1,
    limit: number = 12,
    filters?: PropertyListingFilters
  ): Promise<PropertyListingResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (filters) {
      if (filters.search) params.append('search', filters.search);
      if (filters.property_type) params.append('property_type', filters.property_type);
      if (filters.min_price) params.append('min_price', filters.min_price.toString());
      if (filters.max_price) params.append('max_price', filters.max_price.toString());
      if (filters.min_bedrooms) params.append('min_bedrooms', filters.min_bedrooms.toString());
      if (filters.max_bedrooms) params.append('max_bedrooms', filters.max_bedrooms.toString());
      if (filters.sort_by) params.append('sort_by', filters.sort_by);
      if (filters.sort_order) params.append('sort_order', filters.sort_order);
    }

    return this.request<PropertyListingResponse>(`/properties?${params.toString()}`);
  }

  // Get trending properties (reuse existing endpoint)
  async getTrendingProperties(limit: number = 3): Promise<PropertyCard[]> {
    return this.request<PropertyCard[]>(`/properties/trending?limit=${limit}`);
  }
}

export const propertiesApiService = new PropertiesApiService();
