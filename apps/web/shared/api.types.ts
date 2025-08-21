export type HeroSlide = {
  id: number;
  image_url: string;
  title?: string | null;
  subtitle?: string | null;
  property_id?: number | null;
  sort_order: number;
  is_active: boolean;
  property?: PropertyCard | null;
};

export type Agency = {
  id: number;
  name: string;
  logo_url?: string | null;
};

export type Agent = {
  id: number;
  name: string;
  avatar_url?: string | null;
  phone_number?: string | null;
  agency?: Agency | null;
};

export type PropertyImage = {
  url: string;
  sort_order: number;
  is_primary: boolean;
  alt_text?: string | null;
};

export type PropertyCard = {
  id: number;
  slug: string;
  title: string;
  price_amount: number;
  price_currency: string;
  price_per_sqft?: number | null;
  property_type: string;
  bedrooms: number;
  bathrooms: number;
  area_value: number;
  area_unit: string;
  location_label: string;
  
  // New Excel fields
  outdoor_features?: string[] | null;
  indoor_features?: string[] | null;
  view_description?: string | null;
  year_built?: number | null;
  description?: string | null;
  saves_count: number;
  completion_date?: string | null;
  payment_options?: string | null;
  key_amenities?: string[] | null;
  location_distances?: Array<Record<string, any>> | null;
  developer?: string | null;
  
  // Existing fields
  has_video: boolean;
  has_virtual_tour: boolean;
  views_count: number;
  primary_image_url: string;
  image_urls: string[];
  agent?: Agent | null;
};

export type PropertyDetail = PropertyCard & {
  images: PropertyImage[];
  created_at: string;
  updated_at: string;
};

export type ArticleCard = {
  id: number;
  slug: string;
  title: string;
  excerpt?: string | null;
  image_url: string;
  category?: string | null;
  author_name?: string | null;
  author_avatar_url?: string | null;
  published_at: string;
};

export type RecentlyViewedEntry = {
  property: PropertyCard;
  viewed_at: string;
};


