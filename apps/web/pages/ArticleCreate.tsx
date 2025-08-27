import React from "react";
import { toast } from "sonner";
import { apiService } from "../services/api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function ArticleCreate() {
  const [title, setTitle] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [excerpt, setExcerpt] = React.useState("");
  const [authorName, setAuthorName] = React.useState("");
  const [authorAvatarUrl, setAuthorAvatarUrl] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim() || !imageUrl.trim()) {
      toast.error("Title, slug and image URL are required");
      return;
    }
    setSubmitting(true);
    try {
      const payload = { title, slug, imageUrl, category: category || undefined, excerpt: excerpt || undefined, authorName: authorName || undefined, authorAvatarUrl: authorAvatarUrl || undefined };
      await apiService.createArticle(payload as any);
      toast.success("Article created");
      setTitle(""); setSlug(""); setImageUrl(""); setCategory(""); setExcerpt(""); setAuthorName(""); setAuthorAvatarUrl("");
    } catch (e: any) {
      toast.error(e?.message || "Failed to create article");
    } finally {
      setSubmitting(false);
    }
  };

  const quillRef = React.useRef<ReactQuill | null>(null);

  async function handleImageUpload() {
    try {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = async () => {
        const file = (input.files && input.files[0]) as File | undefined;
        if (!file) return;
        // Get signed URL
        const key = `articles/${slug || Date.now()}/${file.name}`;
        const res = await fetch(`/api/s3/upload-url?key=${encodeURIComponent(key)}&contentType=${encodeURIComponent(file.type)}`);
        if (!res.ok) throw new Error('Failed to get upload URL');
        const { url, key: savedKey } = await res.json();
        // Upload
        await fetch(url, { method: 'PUT', body: file, headers: { 'Content-Type': file.type } });
        const publicUrl = `https://${import.meta.env.VITE_S3_BUCKET || ''}.s3.${import.meta.env.VITE_AWS_REGION || 'us-east-1'}.amazonaws.com/${savedKey}`;
        const editor = quillRef.current?.getEditor();
        const range = editor?.getSelection(true);
        if (editor) editor.insertEmbed(range ? range.index : 0, 'image', publicUrl, 'user');
      };
      input.click();
    } catch (e: any) {
      toast.error(e?.message || 'Image upload failed');
    }
  }

  const quillModules = {
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
      handlers: {
        image: handleImageUpload,
      },
    },
  } as const;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[900px] mx-auto px-4 lg:px-[70px] py-8">
        <h1 className="text-[28px] lg:text-[34px] font-bold mb-6">Create Article</h1>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <TextInput label="Title" value={title} onChange={setTitle} required />
            <TextInput label="Slug" value={slug} onChange={setSlug} required />
            <TextInput label="Image URL" value={imageUrl} onChange={setImageUrl} required />
            <TextInput label="Category" value={category} onChange={setCategory} />
            <TextInput label="Author Name" value={authorName} onChange={setAuthorName} />
            <TextInput label="Author Avatar URL" value={authorAvatarUrl} onChange={setAuthorAvatarUrl} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Excerpt (rich text with images)</label>
            <ReactQuill ref={quillRef} theme="snow" value={excerpt} onChange={setExcerpt} modules={quillModules} />
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
