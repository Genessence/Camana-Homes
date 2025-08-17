from __future__ import annotations

from typing import Optional, List, Dict, Any
from pydantic import BaseModel
from datetime import date, datetime


class HeroSlideBase(BaseModel):
    image_url: str
    title: Optional[str] = None
    subtitle: Optional[str] = None
    sort_order: int = 0
    is_active: bool = True


class HeroSlideCreate(HeroSlideBase):
    pass


class HeroSlideUpdate(BaseModel):
    image_url: Optional[str] = None
    title: Optional[str] = None
    subtitle: Optional[str] = None
    sort_order: Optional[int] = None
    is_active: Optional[bool] = None


class HeroSlideOut(HeroSlideBase):
    id: int

    class Config:
        from_attributes = True


# Properties
class AgencyOut(BaseModel):
    id: int
    name: str
    logo_url: Optional[str] = None

    class Config:
        from_attributes = True


class AgentOut(BaseModel):
    id: int
    name: str
    avatar_url: Optional[str] = None
    phone_number: Optional[str] = None
    email: Optional[str] = None
    agency: Optional[AgencyOut] = None

    class Config:
        from_attributes = True


class PropertyImageOut(BaseModel):
    url: str
    sort_order: int
    is_primary: bool
    alt_text: Optional[str] = None

    class Config:
        from_attributes = True


class PropertyCardOut(BaseModel):
    id: int
    slug: str
    title: str
    price_amount: float
    price_currency: str
    price_per_sqft: Optional[float] = None
    property_type: str
    bedrooms: int
    bathrooms: int
    area_value: int
    area_unit: str
    location_label: str
    
    # New Excel fields
    outdoor_features: Optional[List[str]] = None
    indoor_features: Optional[List[str]] = None
    view_description: Optional[str] = None
    year_built: Optional[int] = None
    description: Optional[str] = None
    saves_count: int = 0
    completion_date: Optional[str] = None
    payment_options: Optional[str] = None
    key_amenities: Optional[List[str]] = None
    location_distances: Optional[List[Dict[str, Any]]] = None
    developer: Optional[str] = None
    
    # Existing fields
    has_video: bool
    has_virtual_tour: bool
    views_count: int
    primary_image_url: str
    image_urls: List[str]
    agent: Optional[AgentOut] = None

    class Config:
        from_attributes = True


class PropertyDetailOut(PropertyCardOut):
    """Extended property details for detail pages"""
    # Enhanced property details for Listing Page
    total_stories: Optional[int] = None
    full_bathrooms: Optional[int] = None
    half_bathrooms: Optional[int] = None
    lot_size: Optional[str] = None
    permit_number: Optional[str] = None
    ded_number: Optional[str] = None
    mls_id: Optional[str] = None
    
    # Interior features
    interior_features: Optional[List[str]] = None
    appliances: Optional[List[str]] = None
    floor_description: Optional[str] = None
    fireplace: Optional[bool] = None
    fireplace_description: Optional[str] = None
    cooling: Optional[bool] = None
    cooling_description: Optional[str] = None
    heating: Optional[bool] = None
    heating_description: Optional[str] = None
    basement: Optional[bool] = None
    
    # Exterior features
    exterior_features: Optional[List[str]] = None
    lot_features: Optional[str] = None
    sewer: Optional[str] = None
    patio_porch: Optional[str] = None
    
    # School information
    high_school: Optional[str] = None
    elementary_school: Optional[str] = None
    
    # Other property details
    taxes: Optional[str] = None
    tax_frequency: Optional[str] = None
    days_on_market: Optional[int] = None
    accessibility: Optional[str] = None
    garage: Optional[bool] = None
    garage_spaces: Optional[int] = None
    parking: Optional[str] = None
    parking_total: Optional[int] = None
    view: Optional[str] = None
    county: Optional[str] = None
    water_source: Optional[str] = None
    new_construction: Optional[bool] = None
    pool: Optional[bool] = None
    pool_features: Optional[str] = None
    utilities: Optional[List[str]] = None
    
    images: List[PropertyImageOut]
    created_at: str
    updated_at: str

    class Config:
        from_attributes = True


# Tour Request schemas
class TourRequestCreate(BaseModel):
    property_id: int
    visitor_name: str
    visitor_email: str
    visitor_phone: Optional[str] = None
    preferred_date: date
    preferred_time: str
    message: Optional[str] = None


class TourRequestOut(BaseModel):
    id: int
    property_id: int
    visitor_name: str
    visitor_email: str
    visitor_phone: Optional[str] = None
    preferred_date: str
    preferred_time: str
    message: Optional[str] = None
    status: str
    created_at: str

    class Config:
        from_attributes = True


# Mortgage Inquiry schemas
class MortgageInquiryCreate(BaseModel):
    property_id: Optional[int] = None
    inquirer_name: str
    inquirer_email: str
    inquirer_phone: Optional[str] = None
    content_sum_insured: str
    location: str
    age: int
    message: Optional[str] = None


class MortgageInquiryOut(BaseModel):
    id: int
    property_id: Optional[int] = None
    inquirer_name: str
    inquirer_email: str
    inquirer_phone: Optional[str] = None
    content_sum_insured: str
    location: str
    age: int
    message: Optional[str] = None
    status: str
    created_at: str

    class Config:
        from_attributes = True


class ArticleCardOut(BaseModel):
    id: int
    slug: str
    title: str
    excerpt: Optional[str] = None
    image_url: str
    category: Optional[str] = None
    author_name: Optional[str] = None
    author_avatar_url: Optional[str] = None
    published_at: str

    class Config:
        from_attributes = True


class RecentlyViewedEntry(BaseModel):
    property: PropertyCardOut
    viewed_at: str

    class Config:
        from_attributes = True


# Property statistics for the overview section
class PropertyStats(BaseModel):
    last_update: str
    views_count: int
    saves_count: int
    days_on_market: Optional[int] = None

    class Config:
        from_attributes = True



