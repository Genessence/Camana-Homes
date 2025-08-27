import React from "react";
import { apiService } from "../services/api";
import { toast } from "sonner";

export default function AgentsList() {
  const [agents, setAgents] = React.useState<Array<{ id: number; name: string; avatar_url: string | null; phone_number: string | null; email: string | null }>>([]);
  const [loading, setLoading] = React.useState(true);
  const [deletingId, setDeletingId] = React.useState<number | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiService.listAgents();
      setAgents(data);
    } catch (e: any) {
      toast.error(e?.message || "Failed to load agents");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => { load(); }, [load]);

  const onDelete = async (id: number) => {
    if (!confirm("Delete this agent? Their listings will remain but be unassigned.")) return;
    setDeletingId(id);
    try {
      await apiService.deleteAgent(id);
      toast.success("Agent deleted");
      await load();
    } catch (e: any) {
      toast.error(e?.message || "Failed to delete agent");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading agents…</div>;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1000px] mx-auto px-4 lg:px-[70px] py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[28px] lg:text-[34px] font-bold">Agents</h1>
          <a href="/agents/new" className="px-4 py-2 bg-black text-white">New Agent</a>
        </div>
        {agents.length === 0 ? (
          <div className="text-gray-600">No agents found.</div>
        ) : (
          <div className="divide-y border border-gray-200">
            {agents.map((a) => (
              <div key={a.id} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <img src={a.avatar_url || 'https://via.placeholder.com/48x48?text=A'} alt={a.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <div className="font-semibold text-black">{a.name}</div>
                    <div className="text-sm text-gray-600">{a.email || ''}{a.phone_number ? ` · ${a.phone_number}` : ''}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a href={`/agent/${encodeURIComponent((a.name || '').toLowerCase().replace(/\s+/g,'-'))}`} className="px-3 py-2 border">View</a>
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
