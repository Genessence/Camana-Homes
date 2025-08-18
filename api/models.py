from __future__ import annotations

from typing import Optional

from sqlalchemy import Integer, String, Boolean, ForeignKey, Numeric, DateTime, UniqueConstraint, Text, JSON
from sqlalchemy.orm import relationship
import datetime as dt
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    pass


class HeroSlide(Base):
    __tablename__ = "hero_slides"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    image_url: Mapped[str] = mapped_column(String(1024))
    title: Mapped[Optional[str]] = mapped_column(String(255), default=None)
    subtitle: Mapped[Optional[str]] = mapped_column(String(512), default=None)
    property_id: Mapped[Optional[int]] = mapped_column(ForeignKey("properties.id"), default=None)
    sort_order: Mapped[int] = mapped_column(Integer, default=0)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    property: Mapped[Optional["Property"]] = relationship("Property")


class Agency(Base):
    __tablename__ = "agencies"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255))
    logo_url: Mapped[Optional[str]] = mapped_column(String(1024), default=None)

    agents: Mapped[list["Agent"]] = relationship(back_populates="agency")


class Agent(Base):
    __tablename__ = "agents"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255))
    avatar_url: Mapped[Optional[str]] = mapped_column(String(1024), default=None)
    agency_id: Mapped[Optional[int]] = mapped_column(ForeignKey("agencies.id"))
    phone_number: Mapped[Optional[str]] = mapped_column(String(50), default=None)
    email: Mapped[Optional[str]] = mapped_column(String(255), default=None)

    agency: Mapped[Optional[Agency]] = relationship(back_populates="agents")
    properties: Mapped[list["Property"]] = relationship(back_populates="agent")


class Property(Base):
    __tablename__ = "properties"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    slug: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    title: Mapped[str] = mapped_column(String(255))
    price_amount: Mapped[float] = mapped_column(Numeric(14, 2))
    price_currency: Mapped[str] = mapped_column(String(3), default="USD")
    price_per_sqft: Mapped[Optional[float]] = mapped_column(Numeric(10, 2), default=None)
    property_type: Mapped[str] = mapped_column(String(50))
    bedrooms: Mapped[int] = mapped_column(Integer)
    bathrooms: Mapped[int] = mapped_column(Integer)
    area_value: Mapped[int] = mapped_column(Integer)
    area_unit: Mapped[str] = mapped_column(String(10), default="sqft")
    location_label: Mapped[str] = mapped_column(String(120))
    
    # Enhanced property details for Listing Page
    total_stories: Mapped[Optional[int]] = mapped_column(Integer, default=None)
    full_bathrooms: Mapped[Optional[int]] = mapped_column(Integer, default=None)
    half_bathrooms: Mapped[Optional[int]] = mapped_column(Integer, default=None)
    lot_size: Mapped[Optional[str]] = mapped_column(String(100), default=None)
    permit_number: Mapped[Optional[str]] = mapped_column(String(100), default=None)
    ded_number: Mapped[Optional[str]] = mapped_column(String(100), default=None)
    mls_id: Mapped[Optional[str]] = mapped_column(String(100), default=None)
    
    # Interior features
    interior_features: Mapped[Optional[list[str]]] = mapped_column(JSON, default=None)
    appliances: Mapped[Optional[list[str]]] = mapped_column(JSON, default=None)
    floor_description: Mapped[Optional[str]] = mapped_column(String(500), default=None)
    fireplace: Mapped[Optional[bool]] = mapped_column(Boolean, default=None)
    fireplace_description: Mapped[Optional[str]] = mapped_column(String(500), default=None)
    cooling: Mapped[Optional[bool]] = mapped_column(Boolean, default=None)
    cooling_description: Mapped[Optional[str]] = mapped_column(String(500), default=None)
    heating: Mapped[Optional[bool]] = mapped_column(Boolean, default=None)
    heating_description: Mapped[Optional[str]] = mapped_column(String(500), default=None)
    basement: Mapped[Optional[bool]] = mapped_column(Boolean, default=None)
    
    # Exterior features
    exterior_features: Mapped[Optional[list[str]]] = mapped_column(JSON, default=None)
    lot_features: Mapped[Optional[str]] = mapped_column(String(500), default=None)
    sewer: Mapped[Optional[str]] = mapped_column(String(100), default=None)
    patio_porch: Mapped[Optional[str]] = mapped_column(String(500), default=None)
    
    # School information
    high_school: Mapped[Optional[str]] = mapped_column(String(255), default=None)
    elementary_school: Mapped[Optional[str]] = mapped_column(String(255), default=None)
    
    # Other property details
    taxes: Mapped[Optional[str]] = mapped_column(String(100), default=None)
    tax_frequency: Mapped[Optional[str]] = mapped_column(String(50), default=None)
    days_on_market: Mapped[Optional[int]] = mapped_column(Integer, default=None)
    accessibility: Mapped[Optional[str]] = mapped_column(String(500), default=None)
    garage: Mapped[Optional[bool]] = mapped_column(Boolean, default=None)
    garage_spaces: Mapped[Optional[int]] = mapped_column(Integer, default=None)
    parking: Mapped[Optional[str]] = mapped_column(String(100), default=None)
    parking_total: Mapped[Optional[int]] = mapped_column(Integer, default=None)
    view: Mapped[Optional[str]] = mapped_column(String(100), default=None)
    county: Mapped[Optional[str]] = mapped_column(String(255), default=None)
    water_source: Mapped[Optional[str]] = mapped_column(String(100), default=None)
    new_construction: Mapped[Optional[bool]] = mapped_column(Boolean, default=None)
    pool: Mapped[Optional[bool]] = mapped_column(Boolean, default=None)
    pool_features: Mapped[Optional[str]] = mapped_column(String(500), default=None)
    utilities: Mapped[Optional[list[str]]] = mapped_column(JSON, default=None)
    
    # New fields from Excel
    outdoor_features: Mapped[Optional[list[str]]] = mapped_column(JSON, default=None)
    indoor_features: Mapped[Optional[list[str]]] = mapped_column(JSON, default=None)
    view_description: Mapped[Optional[str]] = mapped_column(String(255), default=None)
    year_built: Mapped[Optional[int]] = mapped_column(Integer, default=None)
    description: Mapped[Optional[str]] = mapped_column(Text, default=None)
    saves_count: Mapped[int] = mapped_column(Integer, default=0)
    completion_date: Mapped[Optional[str]] = mapped_column(String(100), default=None)
    payment_options: Mapped[Optional[str]] = mapped_column(String(500), default=None)
    key_amenities: Mapped[Optional[list[str]]] = mapped_column(JSON, default=None)
    location_distances: Mapped[Optional[list[dict]]] = mapped_column(JSON, default=None)
    developer: Mapped[Optional[str]] = mapped_column(String(255), default=None)
    
    # Existing fields
    has_video: Mapped[bool] = mapped_column(Boolean, default=False)
    has_virtual_tour: Mapped[bool] = mapped_column(Boolean, default=False)
    views_count: Mapped[int] = mapped_column(Integer, default=0)
    trending_score: Mapped[int] = mapped_column(Integer, default=0, index=True)
    is_featured: Mapped[bool] = mapped_column(Boolean, default=False, index=True)
    created_at: Mapped[dt.datetime] = mapped_column(DateTime(timezone=True), default=dt.datetime.utcnow)
    updated_at: Mapped[dt.datetime] = mapped_column(DateTime(timezone=True), default=dt.datetime.utcnow, onupdate=dt.datetime.utcnow)
    agent_id: Mapped[Optional[int]] = mapped_column(ForeignKey("agents.id"))

    agent: Mapped[Optional[Agent]] = relationship(back_populates="properties")
    images: Mapped[list["PropertyImage"]] = relationship(back_populates="property", cascade="all, delete-orphan")
    tour_requests: Mapped[list["TourRequest"]] = relationship(back_populates="property", cascade="all, delete-orphan")


class PropertyImage(Base):
    __tablename__ = "property_images"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    property_id: Mapped[int] = mapped_column(ForeignKey("properties.id", ondelete="CASCADE"))
    url: Mapped[str] = mapped_column(String(1024))
    sort_order: Mapped[int] = mapped_column(Integer, default=0)
    is_primary: Mapped[bool] = mapped_column(Boolean, default=False)
    alt_text: Mapped[Optional[str]] = mapped_column(String(255), default=None)

    property: Mapped[Property] = relationship(back_populates="images")


class TourRequest(Base):
    __tablename__ = "tour_requests"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    property_id: Mapped[int] = mapped_column(ForeignKey("properties.id", ondelete="CASCADE"))
    visitor_name: Mapped[str] = mapped_column(String(255))
    visitor_email: Mapped[str] = mapped_column(String(255))
    visitor_phone: Mapped[Optional[str]] = mapped_column(String(50), default=None)
    preferred_date: Mapped[dt.date] = mapped_column(DateTime(timezone=True))
    preferred_time: Mapped[str] = mapped_column(String(50))
    message: Mapped[Optional[str]] = mapped_column(Text, default=None)
    status: Mapped[str] = mapped_column(String(50), default="pending")  # pending, confirmed, cancelled
    created_at: Mapped[dt.datetime] = mapped_column(DateTime(timezone=True), default=dt.datetime.utcnow)

    property: Mapped[Property] = relationship(back_populates="tour_requests")


class MortgageInquiry(Base):
    __tablename__ = "mortgage_inquiries"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    property_id: Mapped[Optional[int]] = mapped_column(ForeignKey("properties.id", ondelete="SET NULL"), default=None)
    inquirer_name: Mapped[str] = mapped_column(String(255))
    inquirer_email: Mapped[str] = mapped_column(String(255))
    inquirer_phone: Mapped[Optional[str]] = mapped_column(String(50), default=None)
    content_sum_insured: Mapped[str] = mapped_column(String(100))
    location: Mapped[str] = mapped_column(String(255))
    age: Mapped[int] = mapped_column(Integer)
    message: Mapped[Optional[str]] = mapped_column(Text, default=None)
    status: Mapped[str] = mapped_column(String(50), default="pending")  # pending, contacted, closed
    created_at: Mapped[dt.datetime] = mapped_column(DateTime(timezone=True), default=dt.datetime.utcnow)


class Article(Base):
    __tablename__ = "articles"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    slug: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    title: Mapped[str] = mapped_column(String(255))
    excerpt: Mapped[Optional[str]] = mapped_column(String(1024), default=None)
    image_url: Mapped[str] = mapped_column(String(1024))
    category: Mapped[Optional[str]] = mapped_column(String(120), default=None)
    author_name: Mapped[Optional[str]] = mapped_column(String(255), default=None)
    author_avatar_url: Mapped[Optional[str]] = mapped_column(String(1024), default=None)
    published_at: Mapped[dt.datetime] = mapped_column(DateTime(timezone=True), default=dt.datetime.utcnow, index=True)


class RecentlyViewed(Base):
    __tablename__ = "recently_viewed"
    __table_args__ = (
        UniqueConstraint("visitor_id", "property_id", name="uq_recently_viewed_visitor_property"),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    visitor_id: Mapped[str] = mapped_column(String(64), index=True)
    property_id: Mapped[int] = mapped_column(ForeignKey("properties.id", ondelete="CASCADE"))
    viewed_at: Mapped[dt.datetime] = mapped_column(DateTime(timezone=True), default=dt.datetime.utcnow, index=True)

