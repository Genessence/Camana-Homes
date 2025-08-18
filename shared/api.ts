/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

export type FetchOptions = {
  headers?: Record<string, string>;
};

export async function apiGet<T>(path: string, opts: FetchOptions = {}): Promise<T> {
  // Use the backend URL for API requests
  const baseUrl = "http://localhost:8000";
  const fullPath = path.startsWith("http") ? path : `${baseUrl}${path}`;
  
  const res = await fetch(fullPath, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(opts.headers || {}),
    },
  });
  if (!res.ok) throw new Error(`GET ${fullPath} -> ${res.status}`);
  return (await res.json()) as T;
}

export const API = {
  heroSlides: {
    list: () => apiGet<import("@/shared/api.types").HeroSlide[]>("/api/hero-slides"),
  },
  properties: {
    trending: (limit = 3) => apiGet<import("@/shared/api.types").PropertyCard[]>(`/api/properties/trending?limit=${limit}`),
    bySlug: (slug: string) => apiGet<import("@/shared/api.types").PropertyCard>(`/api/properties/${slug}`),
    featured: (limit = 5) => apiGet<import("@/shared/api.types").PropertyCard[]>(`/api/properties/featured?limit=${limit}`),
    recentlyViewed: (limit = 3, visitorId?: string) =>
      fetch(`http://localhost:8000/api/recently-viewed?limit=${limit}`, {
        method: "GET",
        headers: visitorId ? { "X-Visitor-Id": visitorId } : undefined,
      }).then(async (r) => {
        if (!r.ok) throw new Error(`GET /api/recently-viewed -> ${r.status}`);
        return (await r.json()) as import("@/shared/api.types").PropertyCard[];
      }),
    trackView: (slug: string, visitorId?: string) =>
      fetch(`http://localhost:8000/api/activity/view-property`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(visitorId ? { "X-Visitor-Id": visitorId } : {}),
        },
        body: JSON.stringify({ property_slug: slug }),
      }).then(async (r) => {
        if (!r.ok) throw new Error(`POST /api/activity/view-property -> ${r.status}`);
        return (await r.json()) as { ok: boolean };
      }),
  },
  articles: {
    list: (limit = 3, category?: string) =>
      apiGet<import("@/shared/api.types").ArticleCard[]>(
        `/api/articles?limit=${limit}${category ? `&category=${encodeURIComponent(category)}` : ""}`
      ),
    bySlug: (slug: string) => apiGet<import("@/shared/api.types").ArticleCard>(`/api/articles/${slug}`),
  },
};