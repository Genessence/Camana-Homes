from __future__ import annotations

# """
# Insert or update a single Article in the database.

# Usage (from repo root):
#   pip install -r requirements.txt  # first time only
#   python -m database_tools.insert_article

# This script upserts on slug.
# Replace the placeholder image URLs before running in production.
# """

import asyncio
from datetime import datetime, timezone

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from api.db import SessionLocal
from api.models import Article


async def upsert_article(session: AsyncSession, data: dict) -> Article:
    slug = data["slug"].strip()
    existing = (
        await session.execute(select(Article).where(Article.slug == slug).limit(1))
    ).scalars().first()

    if existing:
        existing.title = data["title"]
        existing.excerpt = data.get("excerpt")
        existing.image_url = data["image_url"]
        existing.category = data.get("category")
        existing.author_name = data.get("author_name")
        existing.author_avatar_url = data.get("author_avatar_url")
        existing.published_at = data.get("published_at", existing.published_at)
        await session.commit()
        await session.refresh(existing)
        return existing

    article = Article(
        slug=slug,
        title=data["title"],
        excerpt=data.get("excerpt"),
        image_url=data["image_url"],
        category=data.get("category"),
        author_name=data.get("author_name"),
        author_avatar_url=data.get("author_avatar_url"),
        published_at=data.get("published_at", datetime.now(timezone.utc)),
    )
    session.add(article)
    await session.commit()
    await session.refresh(article)
    return article


async def main() -> None:
    # TODO: Replace image URLs with your hosted assets (S3/Cloudinary/etc.)
    payload = {
        "slug": "muhammad-binghatti-the-visionary-behind-dubais-most-iconic-residences",
        "title": "Muhammad BinGhatti: The Visionary Behind Dubai's Most Iconic Residences",
        "excerpt": (
            "Redefining luxury living—Muhammad BinGhatti merges visionary design with "
            "world-class brand collaborations to shape Dubai's skyline."
        ),
        # Title image (e.g., handshake/mercedes image)
        "image_url": "https://picsum.photos/seed/binghatti-title/1920/1080",
        "category": "Luxury",
        "author_name": "Camana Luxury",
        # Editor/avatar image (Camana Luxury)
        "author_avatar_url": "https://picsum.photos/seed/camana-avatar/400/400",
        # New extended fields – replace with real links
        "author_bio": (
            "Camana Luxury is the luxury vertical of Camana Homes, offering an exclusive "
            "front-row seat to elite real estate, hospitality, and lifestyle."
        ),
        "author_website_url": "https://camana.homes",
        "author_instagram_url": "https://instagram.com/camana",
        "author_linkedin_url": "https://linkedin.com/company/camana",
        "author_youtube_url": "https://youtube.com/@camana",
        # Optional: set a fixed published_at (UTC ISO)
        "published_at": datetime(2025, 1, 15, 10, 0, 0, tzinfo=timezone.utc),
    }

    async with SessionLocal() as session:
        article = await upsert_article(session, payload)
        print(
            f"✔ Article upserted: id={article.id}, slug={article.slug}, title={article.title}"
        )


if __name__ == "__main__":
    asyncio.run(main())


