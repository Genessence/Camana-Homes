from __future__ import annotations

import asyncio
from typing import List

from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from db import SessionLocal, engine
from models import Base, HeroSlide, Property, PropertyImage, Agent, Agency, Article, RecentlyViewed
from schemas import (
    HeroSlideCreate,
    HeroSlideOut,
    HeroSlideUpdate,
    PropertyCardOut,
    PropertyDetailOut,
    ArticleCardOut,
)


def build_property_card_out(p: Property, images: List[PropertyImage], agent: Agent | None, agency: Agency | None) -> PropertyCardOut:
    """Helper function to build PropertyCardOut objects"""
    primary_url = images[0].url if images else ""
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
        agent=(
            None
            if not agent
            else {
                "id": agent.id,
                "name": agent.name,
                "avatar_url": agent.avatar_url,
                "agency": None
                if not agency
                else {"id": agency.id, "name": agency.name, "logo_url": agency.logo_url},
            }
        ),
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


@app.get("/api/hero-slides", response_model=List[HeroSlideOut])
async def list_hero_slides(db: AsyncSession = Depends(get_db)) -> List[HeroSlideOut]:
    rows = (
        await db.execute(
            select(HeroSlide)
            .where(HeroSlide.is_active == True)  # noqa: E712
            .order_by(HeroSlide.sort_order.asc(), HeroSlide.id.asc())
        )
    ).scalars().all()
    return rows


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

        result.append(build_property_card_out(p, images, agent, agency))
    return result


@app.get("/api/properties/{slug}", response_model=PropertyDetailOut)
async def property_detail(slug: str, db: AsyncSession = Depends(get_db)) -> PropertyDetailOut:
    prop = (
        await db.execute(select(Property).where(Property.slug == slug).limit(1))
    ).scalars().first()
    if not prop:
        raise HTTPException(status_code=404, detail="Property not found")
    images = (
        await db.execute(
            select(PropertyImage).where(PropertyImage.property_id == prop.id).order_by(PropertyImage.sort_order.asc())
        )
    ).scalars().all()
    agent = await db.get(Agent, prop.agent_id) if prop.agent_id else None
    agency = await db.get(Agency, agent.agency_id) if agent and agent.agency_id else None
    primary_url = images[0].url if images else ""
    
    return PropertyDetailOut(
        id=prop.id,
        slug=prop.slug,
        title=prop.title,
        price_amount=float(prop.price_amount),
        price_currency=prop.price_currency,
        price_per_sqft=float(prop.price_per_sqft) if prop.price_per_sqft else None,
        property_type=prop.property_type,
        bedrooms=prop.bedrooms,
        bathrooms=prop.bathrooms,
        area_value=prop.area_value,
        area_unit=prop.area_unit,
        location_label=prop.location_label,
        outdoor_features=prop.outdoor_features,
        indoor_features=prop.indoor_features,
        view_description=prop.view_description,
        year_built=prop.year_built,
        description=prop.description,
        saves_count=prop.saves_count,
        completion_date=prop.completion_date,
        payment_options=prop.payment_options,
        key_amenities=prop.key_amenities,
        location_distances=prop.location_distances,
        developer=prop.developer,
        has_video=prop.has_video,
        has_virtual_tour=prop.has_virtual_tour,
        views_count=prop.views_count,
        primary_image_url=primary_url,
        image_urls=[img.url for img in images],
        images=[
            {
                "url": img.url,
                "sort_order": img.sort_order,
                "is_primary": img.is_primary,
                "alt_text": img.alt_text,
            }
            for img in images
        ],
        created_at=prop.created_at.isoformat(),
        updated_at=prop.updated_at.isoformat(),
        agent=(
            None
            if not agent
            else {
                "id": agent.id,
                "name": agent.name,
                "avatar_url": agent.avatar_url,
                "phone_number": agent.phone_number,
                "agency": None
                if not agency
                else {"id": agency.id, "name": agency.name, "logo_url": agency.logo_url},
            }
        ),
    )


@app.get("/api/properties/featured", response_model=List[PropertyCardOut])
async def featured_properties(limit: int = 5, db: AsyncSession = Depends(get_db)) -> List[PropertyCardOut]:
    limit = min(max(limit, 1), 12)
    props = (
        await db.execute(
            select(Property)
            .where(Property.is_featured == True)  # noqa: E712
            .order_by(Property.created_at.desc())
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
        primary_url = images[0].url if images else ""
        result.append(
            PropertyCardOut(
                id=p.id,
                slug=p.slug,
                title=p.title,
                price_amount=float(p.price_amount),
                price_currency=p.price_currency,
                property_type=p.property_type,
                bedrooms=p.bedrooms,
                bathrooms=p.bathrooms,
                area_value=p.area_value,
                area_unit=p.area_unit,
                location_label=p.location_label,
                has_video=p.has_video,
                has_virtual_tour=p.has_virtual_tour,
                views_count=p.views_count,
                primary_image_url=primary_url,
                image_urls=[img.url for img in images],
                agent=(
                    None
                    if not agent
                    else {
                        "id": agent.id,
                        "name": agent.name,
                        "avatar_url": agent.avatar_url,
                        "agency": None
                        if not agency
                        else {"id": agency.id, "name": agency.name, "logo_url": agency.logo_url},
                    }
                ),
            )
        )
    return result


@app.get("/api/articles", response_model=List[ArticleCardOut])
async def list_articles(limit: int = 3, category: str | None = None, db: AsyncSession = Depends(get_db)) -> List[ArticleCardOut]:
    limit = min(max(limit, 1), 12)
    stmt = select(Article).order_by(Article.published_at.desc()).limit(limit)
    if category:
        stmt = (
            select(Article)
            .where(Article.category == category)
            .order_by(Article.published_at.desc())
            .limit(limit)
        )
    rows = (await db.execute(stmt)).scalars().all()
    return [
        ArticleCardOut(
            id=a.id,
            slug=a.slug,
            title=a.title,
            excerpt=a.excerpt,
            image_url=a.image_url,
            category=a.category,
            author_name=a.author_name,
            author_avatar_url=a.author_avatar_url,
            published_at=a.published_at.isoformat(),
        )
        for a in rows
    ]


@app.get("/api/articles/{slug}", response_model=ArticleCardOut)
async def article_detail(slug: str, db: AsyncSession = Depends(get_db)) -> ArticleCardOut:
    a = (await db.execute(select(Article).where(Article.slug == slug).limit(1))).scalars().first()
    if not a:
        raise HTTPException(status_code=404, detail="Article not found")
    return ArticleCardOut(
        id=a.id,
        slug=a.slug,
        title=a.title,
        excerpt=a.excerpt,
        image_url=a.image_url,
        category=a.category,
        author_name=a.author_name,
        author_avatar_url=a.author_avatar_url,
        published_at=a.published_at.isoformat(),
    )


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
    try:
        rv = RecentlyViewed(visitor_id=visitor_id, property_id=prop.id)
        db.add(rv)
        await db.commit()
    except Exception:
        await db.rollback()
        await db.execute(
            """
            UPDATE recently_viewed
            SET viewed_at = NOW()
            WHERE visitor_id = :vid AND property_id = :pid
            """,
            {"vid": visitor_id, "pid": prop.id},
        )
        await db.commit()
    return {"ok": True}


@app.get("/api/recently-viewed", response_model=List[PropertyCardOut])
async def recently_viewed(limit: int = 3, request: Request = None, db: AsyncSession = Depends(get_db)) -> List[PropertyCardOut]:
    limit = min(max(limit, 1), 12)
    visitor_id = _get_visitor_id_from_request(request)
    if not visitor_id:
        return []
    rows = await db.execute(
        """
        SELECT property_id
        FROM recently_viewed
        WHERE visitor_id = :vid
        ORDER BY viewed_at DESC
        LIMIT :lim
        """,
        {"vid": visitor_id, "lim": limit},
    )
    ids = [r[0] for r in rows]
    if not ids:
        return []
    props = (
        await db.execute(select(Property).where(Property.id.in_(ids)))
    ).scalars().all()
    by_id = {p.id: p for p in props}
    ordered = [by_id[i] for i in ids if i in by_id]
    result: List[PropertyCardOut] = []
    for p in ordered:
        images = (
            await db.execute(
                select(PropertyImage).where(PropertyImage.property_id == p.id).order_by(PropertyImage.sort_order.asc())
            )
        ).scalars().all()
        agent = await db.get(Agent, p.agent_id) if p.agent_id else None
        agency = await db.get(Agency, agent.agency_id) if agent and agent.agency_id else None
        primary_url = images[0].url if images else ""
        result.append(
            PropertyCardOut(
                id=p.id,
                slug=p.slug,
                title=p.title,
                price_amount=float(p.price_amount),
                price_currency=p.price_currency,
                property_type=p.property_type,
                bedrooms=p.bedrooms,
                bathrooms=p.bathrooms,
                area_value=p.area_value,
                area_unit=p.area_unit,
                location_label=p.location_label,
                has_video=p.has_video,
                has_virtual_tour=p.has_virtual_tour,
                views_count=p.views_count,
                primary_image_url=primary_url,
                image_urls=[img.url for img in images],
                agent=(
                    None
                    if not agent
                    else {
                        "id": agent.id,
                        "name": agent.name,
                        "avatar_url": agent.avatar_url,
                        "agency": None
                        if not agency
                        else {"id": agency.id, "name": agency.name, "logo_url": agency.logo_url},
                    }
                ),
            )
        )
    return result


@app.post("/api/hero-slides", response_model=HeroSlideOut)
async def create_hero_slide(
    payload: HeroSlideCreate, db: AsyncSession = Depends(get_db)
) -> HeroSlideOut:
    slide = HeroSlide(**payload.model_dump())
    db.add(slide)
    await db.commit()
    await db.refresh(slide)
    return slide


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
    return slide


@app.delete("/api/hero-slides/{slide_id}")
async def delete_hero_slide(slide_id: int, db: AsyncSession = Depends(get_db)) -> dict:
    slide = await db.get(HeroSlide, slide_id)
    if not slide:
        raise HTTPException(status_code=404, detail="Slide not found")
    await db.delete(slide)
    await db.commit()
    return {"ok": True}


# Health
@app.get("/api/health")
async def health() -> dict:
    return {"ok": True}


