import React from "react";
import { apiService } from "../services/api";
import { toast } from "sonner";

export default function ArticlesList() {
  const [articles, setArticles] = React.useState<Array<{ id: number; slug: string; title: string; image_url: string | null; category: string | null; excerpt: string | null; created_at: string }>>([]);
  const [loading, setLoading] = React.useState(true);
  const [deletingId, setDeletingId] = React.useState<number | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiService.listArticles(100);
      setArticles(data);
    } catch (e: any) {
      toast.error(e?.message || "Failed to load articles");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => { load(); }, [load]);

  const onDelete = async (id: number) => {
    if (!confirm("Delete this article? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await apiService.deleteArticle(id);
      toast.success("Article deleted");
      await load();
    } catch (e: any) {
      toast.error(e?.message || "Failed to delete article");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading articles…</div>;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1000px] mx-auto px-4 lg:px-[70px] py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[28px] lg:text-[34px] font-bold">Journal Articles</h1>
        </div>
        {articles.length === 0 ? (
          <div className="text-gray-600">No articles found.</div>
        ) : (
          <div className="divide-y border border-gray-200">
            {articles.map((a) => (
              <div key={a.id} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  {a.image_url ? (
                    <img src={a.image_url} alt={a.title} className="w-16 h-16 object-cover rounded" />
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 grid place-items-center rounded text-gray-400">No Image</div>
                  )}
                  <div>
                    <div className="font-semibold text-black">{a.title}</div>
                    <div className="text-sm text-gray-600">{a.category || 'Uncategorized'} • {new Date(a.created_at).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a href={`/news/${encodeURIComponent(a.slug)}`} className="px-3 py-2 border">View</a>
                  <button onClick={() => onDelete(a.id)} disabled={deletingId === a.id} className="px-3 py-2 bg-red-600 text-white disabled:opacity-50">
                    {deletingId === a.id ? 'Deleting…' : 'Delete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
