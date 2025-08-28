import React from "react";
import { toast } from "sonner";
import { apiService, getApiBaseUrl } from "../services/api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function ArticleCreate() {
  const [title, setTitle] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [excerpt, setExcerpt] = React.useState("");
  const [bodyHtml, setBodyHtml] = React.useState("<p><br/></p>");
  const [authorName, setAuthorName] = React.useState("");
  const [authorBio, setAuthorBio] = React.useState("");
  const [authorAvatarUrl, setAuthorAvatarUrl] = React.useState("");
  const [featuredPropertyId, setFeaturedPropertyId] = React.useState<number | "">("");
  const [listings, setListings] = React.useState<Array<{ id: number; title: string }>>([]);
  const [submitting, setSubmitting] = React.useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim() || !imageUrl.trim()) {
      toast.error("Title, slug and image URL are required");
      return;
    }
    setSubmitting(true);
    try {
      const payload = { title, slug, imageUrl, category: category || undefined, excerpt: excerpt || undefined, body: bodyHtml || undefined, authorName: authorName || undefined, authorAvatarUrl: authorAvatarUrl || undefined, featuredPropertyId: featuredPropertyId || undefined, authorBio: authorBio || undefined };
      await apiService.createArticle(payload as any);
      toast.success("Article created");
      setTitle(""); setSlug(""); setImageUrl(""); setCategory(""); setExcerpt(""); setBodyHtml("<p><br/></p>"); setAuthorName(""); setAuthorAvatarUrl(""); setAuthorBio(""); setFeaturedPropertyId("");
    } catch (e: any) {
      toast.error(e?.message || "Failed to create article");
    } finally {
      setSubmitting(false);
    }
  };

  const quillRef = React.useRef<ReactQuill | null>(null);

  React.useEffect(() => {
    // Load a small list of properties for dropdown (first page)
    fetch(`${getApiBaseUrl()}/properties?limit=50`)
      .then(r => r.json())
      .then((data) => setListings((data?.properties || []).map((p: any) => ({ id: p.id, title: p.title }))))
      .catch(() => {});
  }, []);

  async function handleImageUpload() {
    try {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = async () => {
        const file = (input.files && input.files[0]) as File | undefined;
        if (!file) return;
        const fd = new FormData();
        fd.append('file', file);
        const res = await fetch(`${getApiBaseUrl()}/uploads/image?prefix=${encodeURIComponent(`articles/${slug || Date.now()}`)}`, { method: 'POST', body: fd });
        if (!res.ok) throw new Error('Failed to upload image');
        const { url: downloadUrl } = await res.json();
        const editor = quillRef.current?.getEditor();
        const range = editor?.getSelection(true);
        if (editor) editor.insertEmbed(range ? range.index : 0, 'image', downloadUrl, 'user');
      };
      input.click();
    } catch (e: any) {
      toast.error(e?.message || 'Image upload failed');
    }
  }

  const quillModules = React.useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ align: [] }],
        ['link', 'image'],
        ['clean'],
      ],
      handlers: { image: handleImageUpload },
    },
  }), []);

  const quillFormats = React.useMemo(() => [
    'header', 'bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'indent', 'align', 'link', 'image'
  ], []);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[900px] mx-auto px-4 lg:px-[70px] py-8">
        <h1 className="text-[28px] lg:text-[34px] font-bold mb-6">Create Article</h1>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <TextInput label="Title" value={title} onChange={setTitle} required />
            <TextInput label="Slug" value={slug} onChange={setSlug} required />
            <div>
              <label className="block text-sm font-medium mb-1">Hero Image</label>
              <div className="flex items-center gap-2">
                <input className="w-full border border-gray-300 p-2" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Paste URL or upload" required />
                <button type="button" className="px-3 py-2 border" onClick={async () => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/*';
                  input.onchange = async () => {
                    const file = (input.files && input.files[0]) as File | undefined;
                    if (!file) return;
                    try {
                      const fd = new FormData();
                      fd.append('file', file);
                      const res = await fetch(`${getApiBaseUrl()}/uploads/image?prefix=${encodeURIComponent(`articles/${slug || Date.now()}`)}`, { method: 'POST', body: fd });
                      const { url } = await res.json();
                      setImageUrl(url);
                      toast.success('Hero image uploaded');
                    } catch (e: any) {
                      toast.error(e?.message || 'Upload failed');
                    }
                  };
                  input.click();
                }}>Upload</button>
              </div>
            </div>
            <TextInput label="Category" value={category} onChange={setCategory} />
            <TextInput label="Author Name" value={authorName} onChange={setAuthorName} />
            <div>
              <label className="block text-sm font-medium mb-1">Author Avatar</label>
              <div className="flex items-center gap-2">
                <input className="w-full border border-gray-300 p-2" value={authorAvatarUrl} onChange={(e) => setAuthorAvatarUrl(e.target.value)} placeholder="Paste URL or upload" />
                <button type="button" className="px-3 py-2 border" onClick={async () => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/*';
                  input.onchange = async () => {
                    const file = (input.files && input.files[0]) as File | undefined;
                    if (!file) return;
                    try {
                      const fd = new FormData();
                      fd.append('file', file);
                      const res = await fetch(`${getApiBaseUrl()}/uploads/image?prefix=${encodeURIComponent(`articles/${slug || Date.now()}`)}`, { method: 'POST', body: fd });
                      const { url } = await res.json();
                      setAuthorAvatarUrl(url);
                      toast.success('Author avatar uploaded');
                    } catch (e: any) {
                      toast.error(e?.message || 'Upload failed');
                    }
                  };
                  input.click();
                }}>Upload</button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Related Listing (optional)</label>
              <select className="w-full border border-gray-300 p-2" value={featuredPropertyId as any} onChange={(e) => setFeaturedPropertyId(e.target.value ? Number(e.target.value) : "") }>
                <option value="">None</option>
                {listings.map(l => (
                  <option key={l.id} value={l.id}>{l.title}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Excerpt (short summary, bolded by default)</label>
            <input className="w-full border border-gray-300 p-2 font-bold" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Short intro" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Author Bio (basic formatting)</label>
            <ReactQuill
              theme="snow"
              value={authorBio}
              onChange={setAuthorBio}
              modules={{ toolbar: [['bold', 'italic', 'underline'], [{ list: 'ordered' }, { list: 'bullet' }], ['clean']] }}
              formats={['bold','italic','underline','list','bullet']}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Body (rich text with images)</label>
            <ReactQuill
              ref={quillRef}
              theme="snow"
              value={bodyHtml || "<p><br/></p>"}
              onChange={setBodyHtml}
              modules={quillModules}
              formats={quillFormats}
              placeholder="Write your article content here..."
              className="min-h-[220px]"
            />
            <p className="text-xs text-gray-500 mt-1">Use the toolbar to format and insert images (uploads to S3).</p>
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={submitting} className="px-5 py-2 bg-black text-white">{submitting ? 'Submitting...' : 'Create Article'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function TextInput({ label, value, onChange, required }: { label: string; value: string; onChange: (v: string) => void; required?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}{required ? ' *' : ''}</label>
      <input className="w-full border border-gray-300 p-2" value={value} onChange={(e) => onChange(e.target.value)} required={required} />
    </div>
  );
}
