from __future__ import annotations

import asyncio
from typing import List, Optional
import datetime as dt

from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select, func, text
from sqlalchemy.ext.asyncio import AsyncSession

from db import SessionLocal, engine
from models import Base, HeroSlide, Property, PropertyImage, Agent, Agency, Article, RecentlyViewed, TourRequest, MortgageInquiry
from schemas import (
    HeroSlideCreate,
    HeroSlideOut,
    HeroSlideUpdate,
    HeroSlideWithPropertyOut,
    PropertyCardOut,
    PropertyDetailOut,
    ArticleCardOut,
    TourRequestCreate,
    TourRequestOut,
    MortgageInquiryCreate,
    MortgageInquiryOut,
    AgentOut,
    AgencyOut,
    PropertyImageOut,
)


def build_property_card_out(p: Property, images: List[PropertyImage], agent: Agent | None, agency: Agency | None) -> PropertyCardOut:
    """Helper function to build PropertyCardOut objects"""
    primary_url = images[0].url if images else ""
    
    agent_out = None
    if agent:
        agency_out = None
        if agency:
            agency_out = AgencyOut(
                id=agency.id,
                name=agency.name,
                logo_url=agency.logo_url
            )
        agent_out = AgentOut(
            id=agent.id,
            name=agent.name,
            avatar_url=agent.avatar_url,
            phone_number=agent.phone_number,
            email=agent.email,
            agency=agency_out
        )
    
    return PropertyCardOut(
        id=p.id,
        slug=p.slug,
        title=p.title,
        price_amount=float(p.price_amount),
        price_currency=p.price_currency,
        price_per_sqft=float(p.price_per_sqft) if p.price_per_sqft else None,
        property_type=p.property_type,
        bedrooms=p.bedrooms,
        bathrooms=p.bathrooms,
        area_value=p.area_value,
        area_unit=p.area_unit,
        location_label=p.location_label,
        outdoor_features=p.outdoor_features,
        indoor_features=p.indoor_features,
        view_description=p.view_description,
        year_built=p.year_built,
        description=p.description,
        saves_count=p.saves_count,
        completion_date=p.completion_date,
        payment_options=p.payment_options,
        key_amenities=p.key_amenities,
        location_distances=p.location_distances,
        developer=p.developer,
        has_video=p.has_video,
        has_virtual_tour=p.has_virtual_tour,
        views_count=p.views_count,
        primary_image_url=primary_url,
        image_urls=[img.url for img in images],
        agent=agent_out,
    )


def build_property_detail_out(p: Property, images: List[PropertyImage], agent: Agent | None, agency: Agency | None) -> PropertyDetailOut:
    """Helper function to build PropertyDetailOut objects with all enhanced details"""
    primary_url = images[0].url if images else ""
    
    agent_out = None
    if agent:
        agency_out = None
        if agency:
            agency_out = AgencyOut(
                id=agency.id,
                name=agency.name,
                logo_url=agency.logo_url
            )
        agent_out = AgentOut(
            id=agent.id,
            name=agent.name,
            avatar_url=agent.avatar_url,
            phone_number=agent.phone_number,
            email=agent.email,
            agency=agency_out
        )
    
    return PropertyDetailOut(
        id=p.id,
        slug=p.slug,
        title=p.title,
        price_amount=float(p.price_amount),
        price_currency=p.price_currency,
        price_per_sqft=float(p.price_per_sqft) if p.price_per_sqft else None,
        property_type=p.property_type,
        bedrooms=p.bedrooms,
        bathrooms=p.bathrooms,
        area_value=p.area_value,
        area_unit=p.area_unit,
        location_label=p.location_label,
        outdoor_features=p.outdoor_features,
        indoor_features=p.indoor_features,
        view_description=p.view_description,
        year_built=p.year_built,
        description=p.description,
        saves_count=p.saves_count,
        completion_date=p.completion_date,
        payment_options=p.payment_options,
        key_amenities=p.key_amenities,
        location_distances=p.location_distances,
        developer=p.developer,
        has_video=p.has_video,
        has_virtual_tour=p.has_virtual_tour,
        views_count=p.views_count,
        primary_image_url=primary_url,
        image_urls=[img.url for img in images],
        # Enhanced property details
        total_stories=p.total_stories,
        full_bathrooms=p.full_bathrooms,
        half_bathrooms=p.half_bathrooms,
        lot_size=p.lot_size,
        permit_number=p.permit_number,
        ded_number=p.ded_number,
        mls_id=p.mls_id,
        # Interior features
        interior_features=p.interior_features,
        appliances=p.appliances,
        floor_description=p.floor_description,
        fireplace=p.fireplace,
        fireplace_description=p.fireplace_description,
        cooling=p.cooling,
        cooling_description=p.cooling_description,
        heating=p.heating,
        heating_description=p.heating_description,
        basement=p.basement,
        # Exterior features
        exterior_features=p.exterior_features,
        lot_features=p.lot_features,
        sewer=p.sewer,
        patio_porch=p.patio_porch,
        # School information
        high_school=p.high_school,
        elementary_school=p.elementary_school,
        # Other property details
        taxes=p.taxes,
        tax_frequency=p.tax_frequency,
        days_on_market=p.days_on_market,
        accessibility=p.accessibility,
        garage=p.garage,
        garage_spaces=p.garage_spaces,
        parking=p.parking,
        parking_total=p.parking_total,
        view=p.view,
        county=p.county,
        water_source=p.water_source,
        new_construction=p.new_construction,
        pool=p.pool,
        pool_features=p.pool_features,
        utilities=p.utilities,
        images=[
            PropertyImageOut(
                url=img.url,
                sort_order=img.sort_order,
                is_primary=img.is_primary,
                alt_text=img.alt_text,
            )
            for img in images
        ],
        created_at=p.created_at.isoformat(),
        updated_at=p.updated_at.isoformat(),
        agent=agent_out,
    )


app = FastAPI(title="Camana Homes API")

# CORS: allow Vite dev server
origins = [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


async def get_db():
    async with SessionLocal() as session:
        yield session


@app.on_event("startup")
async def on_startup() -> None:
    # Create tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    # Database is now purely data-driven - no demo seeding
    # All data must be imported via import scripts


@app.get("/api/hero-slides", response_model=List[HeroSlideWithPropertyOut])
async def list_hero_slides(db: AsyncSession = Depends(get_db)) -> List[HeroSlideWithPropertyOut]:
    rows = (
        await db.execute(
            select(HeroSlide)
            .where(HeroSlide.is_active == True)  # noqa: E712
            .order_by(HeroSlide.sort_order.asc(), HeroSlide.id.asc())
        )
    ).scalars().all()
    
    result: List[HeroSlideWithPropertyOut] = []
    for slide in rows:
        property_data = None
        if slide.property_id:
            # Get property details
            prop = await db.get(Property, slide.property_id)
            if prop:
                images = (
                    await db.execute(
                        select(PropertyImage).where(PropertyImage.property_id == prop.id).order_by(PropertyImage.sort_order.asc())
                    )
                ).scalars().all()
                agent = await db.get(Agent, prop.agent_id) if prop.agent_id else None
                agency = await db.get(Agency, agent.agency_id) if agent and agent.agency_id else None
                property_data = build_property_card_out(prop, list(images), agent, agency)
        
        result.append(HeroSlideWithPropertyOut(
            id=slide.id,
            image_url=slide.image_url,
            title=slide.title,
            subtitle=slide.subtitle,
            property_id=slide.property_id,
            sort_order=slide.sort_order,
            is_active=slide.is_active,
            property=property_data
        ))
    
    return result


@app.get("/api/properties/trending", response_model=List[PropertyCardOut])
async def trending_properties(limit: int = 3, db: AsyncSession = Depends(get_db)) -> List[PropertyCardOut]:
    limit = min(max(limit, 1), 12)
    # Join fetch: properties + first image + agent + agency
    props = (
        await db.execute(
            select(Property)
            .order_by(Property.trending_score.desc(), Property.created_at.desc())
            .limit(limit)
        )
    ).scalars().all()

    result: List[PropertyCardOut] = []
    for p in props:
        images = (
            await db.execute(
                select(PropertyImage).where(PropertyImage.property_id == p.id).order_by(PropertyImage.sort_order.asc())
            )
        ).scalars().all()
        agent = await db.get(Agent, p.agent_id) if p.agent_id else None
        agency = await db.get(Agency, agent.agency_id) if agent and agent.agency_id else None

        result.append(build_property_card_out(p, list(images), agent, agency))
    return result


# Featured Properties
@app.get("/api/properties/featured", response_model=List[PropertyCardOut])
async def get_featured_properties(
    limit: int = 5,
    db: AsyncSession = Depends(get_db)
) -> List[PropertyCardOut]:
    """
    Get featured properties
    """
    try:
        # Build query for featured properties
        query = select(Property).where(Property.is_featured == True).limit(limit)
        
        # If no featured properties, fall back to trending properties
        properties = (await db.execute(query)).scalars().all()
        
        if not properties:
            # Fallback to trending properties
            query = select(Property).order_by(Property.trending_score.desc()).limit(limit)
            properties = (await db.execute(query)).scalars().all()
        
        print(f"Found {len(properties)} properties for featured endpoint")
        
        # Build response with property details
        property_cards = []
        for prop in properties:
            print(f"Processing property: {prop.title} (ID: {prop.id})")
            
            # Get images for this property
            images = (await db.execute(
                select(PropertyImage)
                .where(PropertyImage.property_id == prop.id)
                .order_by(PropertyImage.sort_order.asc())
            )).scalars().all()
            
            print(f"Found {len(images)} images for property {prop.id}")
            
            # Get agent and agency info
            agent = None
            agency = None
            if prop.agent_id:
                agent = (await db.execute(
                    select(Agent).where(Agent.id == prop.agent_id)
                )).scalars().first()
                if agent and agent.agency_id:
                    agency = (await db.execute(
                        select(Agency).where(Agency.id == agent.agency_id)
                    )).scalars().first()
            
            property_card = build_property_card_out(prop, list(images), agent, agency)
            property_cards.append(property_card)
        
        print(f"Returning {len(property_cards)} property cards")
        return property_cards
        
    except Exception as e:
        print(f"Error in featured properties endpoint: {e}")
        import traceback
        traceback.print_exc()
        raise


@app.get("/api/properties/{slug}", response_model=PropertyDetailOut)
async def property_detail(slug: str, db: AsyncSession = Depends(get_db)) -> PropertyDetailOut:
    prop = (
        await db.execute(select(Property).where(Property.slug == slug).limit(1))
    ).scalars().first()
    if not prop:
        raise HTTPException(status_code=404, detail="Property not found")
    
    # Increment view count
    prop.views_count += 1
    await db.commit()
    
    images = (
        await db.execute(
            select(PropertyImage).where(PropertyImage.property_id == prop.id).order_by(PropertyImage.sort_order.asc())
        )
    ).scalars().all()
    agent = await db.get(Agent, prop.agent_id) if prop.agent_id else None
    agency = await db.get(Agency, agent.agency_id) if agent and agent.agency_id else None
    
    return build_property_detail_out(prop, list(images), agent, agency)


@app.get("/api/properties/{slug}/stats")
async def property_stats(slug: str, db: AsyncSession = Depends(get_db)):
    """Get property statistics for the overview section"""
    prop = (
        await db.execute(select(Property).where(Property.slug == slug).limit(1))
    ).scalars().first()
    if not prop:
        raise HTTPException(status_code=404, detail="Property not found")
    
    return {
        "last_update": prop.updated_at.isoformat(),
        "views_count": prop.views_count,
        "saves_count": prop.saves_count,
        "days_on_market": prop.days_on_market,
    }


@app.post("/api/tour-requests", response_model=TourRequestOut)
async def create_tour_request(
    tour_request: TourRequestCreate, 
    db: AsyncSession = Depends(get_db)
) -> TourRequestOut:
    """Create a new tour request"""
    # Verify property exists
    property_exists = await db.execute(
        select(Property).where(Property.id == tour_request.property_id)
    )
    if not property_exists.scalar_one_or_none():
        raise HTTPException(status_code=404, detail="Property not found")
    
    # Create tour request
    db_tour_request = TourRequest(
        property_id=tour_request.property_id,
        visitor_name=tour_request.visitor_name,
        visitor_email=tour_request.visitor_email,
        visitor_phone=tour_request.visitor_phone,
        preferred_date=tour_request.preferred_date,
        preferred_time=tour_request.preferred_time,
        message=tour_request.message,
    )
    
    db.add(db_tour_request)
    await db.commit()
    await db.refresh(db_tour_request)
    
    return TourRequestOut.model_validate(db_tour_request)


@app.post("/api/mortgage-inquiries", response_model=MortgageInquiryOut)
async def create_mortgage_inquiry(
    mortgage_inquiry: MortgageInquiryCreate, 
    db: AsyncSession = Depends(get_db)
) -> MortgageInquiryOut:
    """Create a new mortgage inquiry"""
    # Verify property exists if provided
    if mortgage_inquiry.property_id:
        property_exists = await db.execute(
            select(Property).where(Property.id == mortgage_inquiry.property_id)
        )
        if not property_exists.scalar_one_or_none():
            raise HTTPException(status_code=404, detail="Property not found")
    
    # Create mortgage inquiry
    db_mortgage_inquiry = MortgageInquiry(
        property_id=mortgage_inquiry.property_id,
        inquirer_name=mortgage_inquiry.inquirer_name,
        inquirer_email=mortgage_inquiry.inquirer_email,
        inquirer_phone=mortgage_inquiry.inquirer_phone,
        content_sum_insured=mortgage_inquiry.content_sum_insured,
        location=mortgage_inquiry.location,
        age=mortgage_inquiry.age,
        message=mortgage_inquiry.message,
    )
    
    db.add(db_mortgage_inquiry)
    await db.commit()
    await db.refresh(db_mortgage_inquiry)
    
    return MortgageInquiryOut.model_validate(db_mortgage_inquiry)


@app.get("/api/properties/{slug}/recently-viewed")
async def track_recently_viewed(
    slug: str, 
    request: Request,
    db: AsyncSession = Depends(get_db)
):
    """Track property view for recently viewed functionality"""
    # Get visitor ID from request (you might want to implement proper visitor tracking)
    visitor_id = request.headers.get("X-Visitor-ID", "anonymous")
    
    # Get property
    prop = (
        await db.execute(select(Property).where(Property.slug == slug).limit(1))
    ).scalars().first()
    if not prop:
        raise HTTPException(status_code=404, detail="Property not found")
    
    # Check if already exists
    existing = (
        await db.execute(
            select(RecentlyViewed).where(
                RecentlyViewed.visitor_id == visitor_id,
                RecentlyViewed.property_id == prop.id
            )
        )
    ).scalar_one_or_none()
    
    if existing:
        # Update timestamp
        existing.viewed_at = dt.datetime.utcnow()
        await db.commit()
    else:
        # Create new entry
        recently_viewed = RecentlyViewed(
            visitor_id=visitor_id,
            property_id=prop.id
        )
        db.add(recently_viewed)
        await db.commit()
    
    return {"message": "View tracked successfully"}


@app.get("/api/recently-viewed", response_model=List[PropertyCardOut])
async def get_recently_viewed(
    request: Request,
    limit: int = 10,
    db: AsyncSession = Depends(get_db)
) -> List[PropertyCardOut]:
    """Get recently viewed properties for a visitor"""
    visitor_id = request.headers.get("X-Visitor-ID", "anonymous")
    limit = min(max(limit, 1), 20)
    
    # Get recently viewed properties
    recently_viewed = (
        await db.execute(
            select(RecentlyViewed)
            .where(RecentlyViewed.visitor_id == visitor_id)
            .order_by(RecentlyViewed.viewed_at.desc())
            .limit(limit)
        )
    ).scalars().all()
    
    result: List[PropertyCardOut] = []
    for rv in recently_viewed:
        prop = await db.get(Property, rv.property_id)
        if prop:
            images = (
                await db.execute(
                    select(PropertyImage).where(PropertyImage.property_id == prop.id).order_by(PropertyImage.sort_order.asc())
                )
            ).scalars().all()
            agent = await db.get(Agent, prop.agent_id) if prop.agent_id else None
            agency = await db.get(Agency, agent.agency_id) if agent and agent.agency_id else None
            
            result.append(build_property_card_out(prop, list(images), agent, agency))
    
    return result


@app.get("/api/articles", response_model=List[ArticleCardOut])
async def list_articles(
    limit: int = 10,
    offset: int = 0,
    db: AsyncSession = Depends(get_db)
) -> List[ArticleCardOut]:
    """List articles with pagination"""
    limit = min(max(limit, 1), 50)
    offset = max(offset, 0)
    
    articles = (
        await db.execute(
            select(Article)
            .order_by(Article.published_at.desc())
            .offset(offset)
            .limit(limit)
        )
    ).scalars().all()
    
    return [ArticleCardOut.model_validate(article) for article in articles]


@app.get("/api/articles/{slug}", response_model=ArticleCardOut)
async def article_detail(slug: str, db: AsyncSession = Depends(get_db)) -> ArticleCardOut:
    a = (await db.execute(select(Article).where(Article.slug == slug).limit(1))).scalars().first()
    if not a:
        raise HTTPException(status_code=404, detail="Article not found")
    return ArticleCardOut.model_validate(a)


def _get_visitor_id_from_request(request: Request) -> str | None:
    vid = request.cookies.get("camana_vid")
    if vid:
        return vid
    return request.headers.get("X-Visitor-Id")


@app.post("/api/activity/view-property")
async def track_view_property(payload: dict, request: Request, db: AsyncSession = Depends(get_db)) -> dict:
    slug = payload.get("property_slug")
    if not slug:
        raise HTTPException(status_code=400, detail="property_slug is required")
    visitor_id = _get_visitor_id_from_request(request)
    if not visitor_id:
        raise HTTPException(status_code=400, detail="visitor id missing")
    prop = (await db.execute(select(Property).where(Property.slug == slug).limit(1))).scalars().first()
    if not prop:
        raise HTTPException(status_code=404, detail="Property not found")
    
    # Check if already exists
    existing = (
        await db.execute(
            select(RecentlyViewed).where(
                RecentlyViewed.visitor_id == visitor_id,
                RecentlyViewed.property_id == prop.id
            )
        )
    ).scalar_one_or_none()
    
    if existing:
        # Update timestamp
        existing.viewed_at = dt.datetime.utcnow()
        await db.commit()
    else:
        # Create new entry
        rv = RecentlyViewed(visitor_id=visitor_id, property_id=prop.id)
        db.add(rv)
        await db.commit()
    
    return {"ok": True}


@app.post("/api/hero-slides", response_model=HeroSlideOut)
async def create_hero_slide(
    payload: HeroSlideCreate, db: AsyncSession = Depends(get_db)
) -> HeroSlideOut:
    slide = HeroSlide(**payload.model_dump())
    db.add(slide)
    await db.commit()
    await db.refresh(slide)
    return HeroSlideOut.model_validate(slide)


@app.put("/api/hero-slides/{slide_id}", response_model=HeroSlideOut)
async def update_hero_slide(
    slide_id: int, payload: HeroSlideUpdate, db: AsyncSession = Depends(get_db)
) -> HeroSlideOut:
    slide = await db.get(HeroSlide, slide_id)
    if not slide:
        raise HTTPException(status_code=404, detail="Slide not found")
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(slide, field, value)
    await db.commit()
    await db.refresh(slide)
    return HeroSlideOut.model_validate(slide)


@app.delete("/api/hero-slides/{slide_id}")
async def delete_hero_slide(slide_id: int, db: AsyncSession = Depends(get_db)) -> dict:
    slide = await db.get(HeroSlide, slide_id)
    if not slide:
        raise HTTPException(status_code=404, detail="Slide not found")
    await db.delete(slide)
    await db.commit()
    return {"ok": True}


# Properties Listing with Pagination and Filtering
@app.get("/api/properties", response_model=dict)
async def get_properties(
    page: int = 1,
    limit: int = 12,
    search: Optional[str] = None,
    property_type: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    min_bedrooms: Optional[int] = None,
    max_bedrooms: Optional[int] = None,
    sort_by: str = "created_at",
    sort_order: str = "desc",
    db: AsyncSession = Depends(get_db)
) -> dict:
    """
    Get all properties with pagination, filtering, and sorting
    """
    # Calculate offset
    offset = (page - 1) * limit
    
    # Build base query
    query = select(Property)
    
    # Apply filters
    if search:
        search_term = f"%{search}%"
        query = query.where(
            (Property.title.ilike(search_term)) |
            (Property.location_label.ilike(search_term)) |
            (Property.description.ilike(search_term))
        )
    
    if property_type:
        query = query.where(Property.property_type == property_type)
    
    if min_price is not None:
        query = query.where(Property.price_amount >= min_price)
    
    if max_price is not None:
        query = query.where(Property.price_amount <= max_price)
    
    if min_bedrooms is not None:
        query = query.where(Property.bedrooms >= min_bedrooms)
    
    if max_bedrooms is not None:
        query = query.where(Property.bedrooms <= max_bedrooms)
    
    # Apply sorting
    if sort_by == "price":
        if sort_order == "asc":
            query = query.order_by(Property.price_amount.asc())
        else:
            query = query.order_by(Property.price_amount.desc())
    elif sort_by == "bedrooms":
        if sort_order == "asc":
            query = query.order_by(Property.bedrooms.asc())
        else:
            query = query.order_by(Property.bedrooms.desc())
    elif sort_by == "views":
        if sort_order == "asc":
            query = query.order_by(Property.views_count.asc())
        else:
            query = query.order_by(Property.views_count.desc())
    else:  # default: created_at
        if sort_order == "asc":
            query = query.order_by(Property.created_at.asc())
        else:
            query = query.order_by(Property.created_at.desc())
    
    # Get total count for pagination
    count_query = select(func.count(Property.id))
    if search:
        search_term = f"%{search}%"
        count_query = count_query.where(
            (Property.title.ilike(search_term)) |
            (Property.location_label.ilike(search_term)) |
            (Property.description.ilike(search_term))
        )
    if property_type:
        count_query = count_query.where(Property.property_type == property_type)
    if min_price is not None:
        count_query = count_query.where(Property.price_amount >= min_price)
    if max_price is not None:
        count_query = count_query.where(Property.price_amount <= max_price)
    if min_bedrooms is not None:
        count_query = count_query.where(Property.bedrooms >= min_bedrooms)
    if max_bedrooms is not None:
        count_query = count_query.where(Property.bedrooms <= max_bedrooms)
    
    total_count = (await db.execute(count_query)).scalar() or 0
    
    # Get paginated results
    query = query.offset(offset).limit(limit)
    properties = (await db.execute(query)).scalars().all()
    
    # Build response with property details
    property_cards = []
    for prop in properties:
        # Get images for this property
        images = (await db.execute(
            select(PropertyImage)
            .where(PropertyImage.property_id == prop.id)
            .order_by(PropertyImage.sort_order.asc())
        )).scalars().all()
        
        # Get agent and agency info
        agent = None
        agency = None
        if prop.agent_id:
            agent = (await db.execute(
                select(Agent).where(Agent.id == prop.agent_id)
            )).scalars().first()
            if agent and agent.agency_id:
                agency = (await db.execute(
                    select(Agency).where(Agency.id == agent.agency_id)
                )).scalars().first()
        
        property_card = build_property_card_out(prop, list(images), agent, agency)
        property_cards.append(property_card)
    
    # Calculate pagination info
    total_pages = (total_count + limit - 1) // limit
    has_next = page < total_pages
    has_prev = page > 1
    
    return {
        "properties": property_cards,
        "pagination": {
            "current_page": page,
            "total_pages": total_pages,
            "total_count": total_count,
            "limit": limit,
            "has_next": has_next,
            "has_prev": has_prev
        }
    }


# Health
@app.get("/api/health")
async def health() -> dict:
    return {"ok": True}


