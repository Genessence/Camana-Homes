from __future__ import annotations

from typing import Optional, List, Dict, Any
from pydantic import BaseModel


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
    images: List[PropertyImageOut]
    created_at: str
    updated_at: str

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



