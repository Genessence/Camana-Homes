import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function AgentCreate() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = React.useState(false);

  const [name, setName] = React.useState("");
  const [avatarUrl, setAvatarUrl] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [licenseNumber, setLicenseNumber] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [aboutHtml, setAboutHtml] = React.useState("");
  const [instagramUrl, setInstagramUrl] = React.useState("");
  const [linkedinUrl, setLinkedinUrl] = React.useState("");
  const [youtubeUrl, setYoutubeUrl] = React.useState("");
  const [websiteUrl, setWebsiteUrl] = React.useState("");
  const [agencyName, setAgencyName] = React.useState("");

  const validate = () => {
    if (!name.trim()) return "Name is required";
    if (!email.trim()) return "Email is required";
    if (!agencyName.trim()) return "Agency is required";
    return null;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) { toast.error(err); return; }
    setSubmitting(true);
    try {
      const payload = {
        name,
        avatarUrl: avatarUrl || null,
        phoneNumber: phoneNumber || null,
        email,
        slug: slug || null,
        licenseNumber: licenseNumber || null,
        location: location || null,
        bio: bio || null,
        about: aboutHtml || null,
        instagramUrl: instagramUrl || null,
        linkedinUrl: linkedinUrl || null,
        youtubeUrl: youtubeUrl || null,
        websiteUrl: websiteUrl || null,
        agencyName: agencyName || null,
      };
      const res = await fetch("http://localhost:8080/api/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Create failed: ${res.status}`);
      toast.success("Agent created");
      navigate(-1);
    } catch (e: any) {
      toast.error(e?.message || "Failed to create agent");
    } finally {
      setSubmitting(false);
    }
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ align: [] }],
      ['link'],
      ['clean'],
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[900px] mx-auto px-4 lg:px-[70px] py-8">
        <h1 className="text-[28px] lg:text-[34px] font-bold mb-6">Create Agent</h1>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <TextInput label="Name" value={name} onChange={setName} required />
            <TextInput label="Email" value={email} onChange={setEmail} required />
            <TextInput label="Phone Number" value={phoneNumber} onChange={setPhoneNumber} />
            <TextInput label="Slug (optional)" value={slug} onChange={setSlug} />
            <TextInput label="License Number" value={licenseNumber} onChange={setLicenseNumber} />
            <TextInput label="Location" value={location} onChange={setLocation} />
            <TextInput label="Avatar URL" value={avatarUrl} onChange={setAvatarUrl} />
            <TextInput label="Agency" value={agencyName} onChange={setAgencyName} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea className="w-full border border-gray-300 p-2" rows={5} value={bio} onChange={(e) => setBio(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">About</label>
            <ReactQuill theme="snow" value={aboutHtml} onChange={setAboutHtml} modules={quillModules} />
            <p className="text-xs text-gray-500 mt-1">Use the toolbar to format paragraphs, lists, and links.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <TextInput label="Instagram URL" value={instagramUrl} onChange={setInstagramUrl} />
            <TextInput label="LinkedIn URL" value={linkedinUrl} onChange={setLinkedinUrl} />
            <TextInput label="YouTube URL" value={youtubeUrl} onChange={setYoutubeUrl} />
            <TextInput label="Website URL" value={websiteUrl} onChange={setWebsiteUrl} />
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={submitting} className="px-5 py-2 bg-black text-white">{submitting ? 'Submitting...' : 'Create Agent'}</button>
            <button type="button" className="px-5 py-2 border" onClick={() => navigate(-1)}>Cancel</button>
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


