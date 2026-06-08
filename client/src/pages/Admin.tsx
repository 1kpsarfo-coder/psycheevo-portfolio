import { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard, Image, Type, Wrench, DollarSign, Mail,
  LogOut, Plus, Trash2, Edit2, Check, X, ChevronDown,
  Eye, EyeOff, Upload, Star, StarOff, Save
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── API helpers ─────────────────────────────────────────────────────────────

const TOKEN_KEY = "psycheevo_admin_token";

function getToken() { return localStorage.getItem(TOKEN_KEY) || ""; }
function setToken(t: string) { localStorage.setItem(TOKEN_KEY, t); }
function clearToken() { localStorage.removeItem(TOKEN_KEY); }

async function api(method: string, path: string, body?: unknown) {
  const res = await fetch(path, {
    method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  images: string[];
  year: string;
  featured: boolean;
  order: number;
}

interface SiteContent {
  hero: { badge: string; headline: string; headlineAccent: string; subheadline: string; ctaPrimary: string; ctaSecondary: string };
  stats: { val: string; label: string }[];
  services: { id: string; icon: string; title: string; description: string; body: string }[];
  about: { headline: string; body: string; quote: string; name: string; role: string; location: string; email: string; whatsapp: string };
  pricing: { id: string; name: string; price: string; description: string; features: string[]; cta: string; highlighted: boolean }[];
  contact: { headline: string; subheadline: string; email: string; whatsapp: string; location: string; availability: string };
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "portfolio", label: "Portfolio", icon: Image },
  { id: "hero", label: "Hero & Stats", icon: Type },
  { id: "services", label: "Services", icon: Wrench },
  { id: "pricing", label: "Pricing", icon: DollarSign },
  { id: "contact", label: "Contact & About", icon: Mail },
];

function Sidebar({ active, setActive, onLogout }: { active: string; setActive: (s: string) => void; onLogout: () => void }) {
  return (
    <aside className="w-60 min-h-screen bg-card border-r border-border flex flex-col shrink-0">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">P</span>
          </div>
          <div>
            <p className="font-bold text-foreground text-sm">psycheevo.</p>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {NAV.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
              active === id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </nav>
      <div className="p-3 border-t border-border">
        <a href="/" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-secondary transition-colors mb-1">
          <Eye size={16} /> View Site
        </a>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-secondary transition-colors"
        >
          <LogOut size={16} /> Log Out
        </button>
      </div>
    </aside>
  );
}

// ─── Login ───────────────────────────────────────────────────────────────────

function Login({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setErr("");
    try {
      const { token } = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      }).then(r => { if (!r.ok) throw new Error("Wrong password"); return r.json(); });
      setToken(token);
      onLogin();
    } catch {
      setErr("Incorrect password. Try again.");
    } finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-sm bg-card border border-border rounded-2xl p-8 shadow-lg">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-primary-foreground font-bold">P</span>
          </div>
          <div>
            <p className="font-bold text-foreground">psycheevo.</p>
            <p className="text-xs text-muted-foreground">Admin Dashboard</p>
          </div>
        </div>
        <h1 className="text-xl font-bold text-foreground mb-1">Welcome back</h1>
        <p className="text-sm text-muted-foreground mb-6">Enter your admin password to continue.</p>
        <form onSubmit={submit} className="space-y-4">
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              value={pw}
              onChange={e => setPw(e.target.value)}
              placeholder="Admin password"
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary pr-10"
              autoFocus
            />
            <button type="button" onClick={() => setShow(s => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {err && <p className="text-sm text-red-500">{err}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in…" : "Sign In"}
          </Button>
        </form>
        <p className="text-xs text-muted-foreground text-center mt-6">
          Default password: <code className="bg-secondary px-1 rounded">psycheevo2024</code><br />
          Change via <code className="bg-secondary px-1 rounded">ADMIN_PASSWORD</code> in .env
        </p>
      </div>
    </div>
  );
}

// ─── Dashboard Overview ───────────────────────────────────────────────────────

function DashboardHome({ projects }: { projects: Project[] }) {
  const categories = [...new Set(projects.map(p => p.category))];
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage all your website content from here.</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Projects", val: projects.length },
          { label: "Featured", val: projects.filter(p => p.featured).length },
          { label: "Categories", val: categories.length },
          { label: "Total Images", val: projects.reduce((acc, p) => acc + p.images.length, 0) },
        ].map(({ label, val }) => (
          <div key={label} className="bg-card border border-border rounded-xl p-5">
            <p className="text-3xl font-bold text-primary">{val}</p>
            <p className="text-sm text-muted-foreground mt-1">{label}</p>
          </div>
        ))}
      </div>
      <div className="bg-card border border-border rounded-xl p-5">
        <h2 className="font-semibold text-foreground mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {NAV.slice(1).map(({ id, label, icon: Icon }) => (
            <a key={id} href={`#${id}`}
              className="flex items-center gap-2 px-4 py-3 rounded-lg border border-border hover:border-primary hover:text-primary text-sm font-medium transition-colors text-muted-foreground">
              <Icon size={15} /> Edit {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Portfolio Manager ────────────────────────────────────────────────────────

const CATEGORIES = ["Branding", "Print", "Social Media", "Web", "Motion"];

function ProjectCard({
  project, onEdit, onDelete, onToggleFeatured,
}: {
  project: Project;
  onEdit: () => void;
  onDelete: () => void;
  onToggleFeatured: () => void;
}) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="relative aspect-video bg-muted">
        {project.images[0] ? (
          <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">No image</div>
        )}
        <div className="absolute top-2 left-2 flex gap-1">
          <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-background/90 text-foreground border border-border">
            {project.category}
          </span>
        </div>
        {project.images.length > 1 && (
          <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full text-xs bg-background/90 text-muted-foreground border border-border">
            {project.images.length} images
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-foreground">{project.title}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{project.year}</p>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button onClick={onToggleFeatured}
              className={`p-1.5 rounded-lg transition-colors ${project.featured ? "text-yellow-500 hover:bg-yellow-50" : "text-muted-foreground hover:bg-secondary"}`}
              title={project.featured ? "Unfeature" : "Feature"}>
              {project.featured ? <Star size={15} fill="currentColor" /> : <StarOff size={15} />}
            </button>
            <button onClick={onEdit} className="p-1.5 rounded-lg text-muted-foreground hover:bg-secondary transition-colors" title="Edit">
              <Edit2 size={15} />
            </button>
            <button onClick={onDelete} className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition-colors" title="Delete">
              <Trash2 size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectForm({
  initial, onSave, onCancel,
}: {
  initial?: Partial<Project>;
  onSave: (data: Partial<Project>) => Promise<void>;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Partial<Project>>({
    title: "", category: "Branding", description: "", tags: [], year: String(new Date().getFullYear()), featured: false,
    ...initial,
  });
  const [tagInput, setTagInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function field(k: keyof Project) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }));
  }

  function addTag() {
    const t = tagInput.trim();
    if (t && !(form.tags || []).includes(t)) setForm(f => ({ ...f, tags: [...(f.tags || []), t] }));
    setTagInput("");
  }

  function removeTag(t: string) { setForm(f => ({ ...f, tags: (f.tags || []).filter(x => x !== t) })); }
  function removeImage(url: string) { setForm(f => ({ ...f, images: (f.images || []).filter(x => x !== url) })); }

  async function uploadImages(files: FileList) {
    if (!initial?.id) { alert("Save the project first, then upload images."); return; }
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const reader = new FileReader();
        const imageData = await new Promise<string>(resolve => { reader.onload = e => resolve(e.target!.result as string); reader.readAsDataURL(file); });
        const res = await api("POST", `/api/admin/portfolio/${initial.id}/images`, { imageData, filename: file.name });
        setForm(f => ({ ...f, images: res.images }));
      }
    } catch (e) { alert("Upload failed: " + e); }
    setUploading(false);
  }

  const inputClass = "w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary";
  const labelClass = "block text-sm font-medium text-foreground mb-1";

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">{initial?.id ? "Edit Project" : "New Project"}</h2>
        <button onClick={onCancel} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className={labelClass}>Project Title</label>
          <input value={form.title || ""} onChange={field("title")} className={inputClass} placeholder="e.g. Just Sip" />
        </div>
        <div>
          <label className={labelClass}>Category</label>
          <select value={form.category || "Branding"} onChange={field("category")} className={inputClass}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Year</label>
          <input value={form.year || ""} onChange={field("year")} className={inputClass} placeholder="2025" />
        </div>
        <div className="col-span-2">
          <label className={labelClass}>Description</label>
          <textarea value={form.description || ""} onChange={field("description")} className={inputClass} rows={4}
            placeholder="Describe the project — what you did, for whom, and the impact." />
        </div>
      </div>

      {/* Tags */}
      <div>
        <label className={labelClass}>Tags</label>
        <div className="flex gap-2 mb-2">
          <input value={tagInput} onChange={e => setTagInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTag())}
            className={inputClass} placeholder="Type a tag and press Enter" />
          <Button type="button" variant="outline" size="sm" onClick={addTag}>Add</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {(form.tags || []).map(t => (
            <span key={t} className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
              {t}
              <button onClick={() => removeTag(t)}><X size={10} /></button>
            </span>
          ))}
        </div>
      </div>

      {/* Featured toggle */}
      <label className="flex items-center gap-3 cursor-pointer">
        <div className={`w-10 h-6 rounded-full transition-colors ${form.featured ? "bg-primary" : "bg-muted"} relative`}
          onClick={() => setForm(f => ({ ...f, featured: !f.featured }))}>
          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${form.featured ? "left-5" : "left-1"}`} />
        </div>
        <span className="text-sm font-medium text-foreground">Featured project</span>
      </label>

      {/* Images */}
      <div>
        <label className={labelClass}>Images</label>
        {!initial?.id && (
          <p className="text-xs text-muted-foreground mb-2">Save the project first, then upload images.</p>
        )}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {(form.images || []).map((url, i) => (
            <div key={url} className="relative aspect-video rounded-lg overflow-hidden border border-border group">
              <img src={url} alt="" className="w-full h-full object-cover" />
              {i === 0 && <span className="absolute top-1 left-1 px-1.5 py-0.5 text-[10px] bg-primary text-primary-foreground rounded">Cover</span>}
              <button onClick={() => removeImage(url)}
                className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <X size={10} />
              </button>
            </div>
          ))}
          {initial?.id && (
            <button onClick={() => fileRef.current?.click()}
              className="aspect-video rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors text-xs gap-1">
              <Upload size={16} />
              {uploading ? "Uploading…" : "Upload"}
            </button>
          )}
        </div>
        <input ref={fileRef} type="file" accept="image/*" multiple className="hidden"
          onChange={e => e.target.files && uploadImages(e.target.files)} />
        {initial?.id && (
          <p className="text-xs text-muted-foreground">First image is the cover. Click × on an image to remove it.</p>
        )}
      </div>

      <div className="flex gap-3 pt-2 border-t border-border">
        <Button onClick={async () => { setSaving(true); await onSave(form); setSaving(false); }} disabled={saving}>
          <Save size={15} className="mr-2" />{saving ? "Saving…" : "Save Project"}
        </Button>
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  );
}

function PortfolioManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null | "new">(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api("GET", "/api/admin/portfolio").then(setProjects).finally(() => setLoading(false));
  }, []);

  async function saveProject(data: Partial<Project>) {
    if (editing === "new") {
      const created = await api("POST", "/api/admin/portfolio", data);
      setProjects(p => [...p, created]);
      setEditing(created); // switch to edit mode so images can be uploaded
    } else if (editing) {
      const updated = await api("PUT", `/api/admin/portfolio/${editing.id}`, data);
      setProjects(p => p.map(x => x.id === updated.id ? updated : x));
      setEditing(null);
    }
  }

  async function deleteProject(id: string) {
    if (!confirm("Delete this project? This cannot be undone.")) return;
    await api("DELETE", `/api/admin/portfolio/${id}`);
    setProjects(p => p.filter(x => x.id !== id));
  }

  async function toggleFeatured(project: Project) {
    const updated = await api("PUT", `/api/admin/portfolio/${project.id}`, { ...project, featured: !project.featured });
    setProjects(p => p.map(x => x.id === updated.id ? updated : x));
  }

  if (loading) return <div className="text-muted-foreground text-sm">Loading…</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Portfolio</h1>
          <p className="text-muted-foreground text-sm mt-1">{projects.length} projects · drag to reorder coming soon</p>
        </div>
        {editing === null && (
          <Button onClick={() => setEditing("new")}><Plus size={15} className="mr-2" />Add Project</Button>
        )}
      </div>

      {editing !== null && (
        <ProjectForm
          initial={editing === "new" ? undefined : editing}
          onSave={saveProject}
          onCancel={() => setEditing(null)}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {projects.sort((a, b) => a.order - b.order).map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            onEdit={() => setEditing(project)}
            onDelete={() => deleteProject(project.id)}
            onToggleFeatured={() => toggleFeatured(project)}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Section editor helpers ───────────────────────────────────────────────────

function Field({ label, value, onChange, multiline = false, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; multiline?: boolean; type?: string;
}) {
  const cls = "w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary";
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1">{label}</label>
      {multiline
        ? <textarea value={value} onChange={e => onChange(e.target.value)} className={cls} rows={3} />
        : <input type={type} value={value} onChange={e => onChange(e.target.value)} className={cls} />}
    </div>
  );
}

function SaveBar({ onSave, saving, saved }: { onSave: () => void; saving: boolean; saved: boolean }) {
  return (
    <div className="flex items-center gap-3 pt-4 border-t border-border sticky bottom-0 bg-background pb-4">
      <Button onClick={onSave} disabled={saving}>
        <Save size={15} className="mr-2" />{saving ? "Saving…" : "Save Changes"}
      </Button>
      {saved && <span className="flex items-center gap-1 text-sm text-green-600"><Check size={14} /> Saved!</span>}
    </div>
  );
}

// ─── Hero & Stats Editor ─────────────────────────────────────────────────────

function HeroEditor({ content, onChange }: { content: SiteContent; onChange: (c: SiteContent) => void }) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const h = content.hero;

  function set(k: keyof typeof h) {
    return (v: string) => onChange({ ...content, hero: { ...h, [k]: v } });
  }

  function setStat(i: number, k: "val" | "label", v: string) {
    const stats = [...content.stats];
    stats[i] = { ...stats[i], [k]: v };
    onChange({ ...content, stats });
  }

  async function save() {
    setSaving(true);
    await api("PATCH", "/api/admin/content/hero", content.hero);
    await api("PATCH", "/api/admin/content/stats", content.stats);
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-foreground">Hero & Stats</h1></div>
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 className="font-semibold text-foreground">Hero Section</h2>
        <Field label="Location Badge" value={h.badge} onChange={set("badge")} />
        <Field label="Headline (dark)" value={h.headline} onChange={set("headline")} />
        <Field label="Headline (accent colour)" value={h.headlineAccent} onChange={set("headlineAccent")} />
        <Field label="Subheadline" value={h.subheadline} onChange={set("subheadline")} multiline />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Primary CTA text" value={h.ctaPrimary} onChange={set("ctaPrimary")} />
          <Field label="Secondary CTA text" value={h.ctaSecondary} onChange={set("ctaSecondary")} />
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 className="font-semibold text-foreground">Stats Strip</h2>
        {content.stats.map((stat, i) => (
          <div key={i} className="grid grid-cols-2 gap-4">
            <Field label={`Stat ${i + 1} value`} value={stat.val} onChange={v => setStat(i, "val", v)} />
            <Field label={`Stat ${i + 1} label`} value={stat.label} onChange={v => setStat(i, "label", v)} />
          </div>
        ))}
      </div>
      <SaveBar onSave={save} saving={saving} saved={saved} />
    </div>
  );
}

// ─── Services Editor ─────────────────────────────────────────────────────────

function ServicesEditor({ content, onChange }: { content: SiteContent; onChange: (c: SiteContent) => void }) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function setService(i: number, k: string, v: string) {
    const services = [...content.services];
    services[i] = { ...services[i], [k]: v };
    onChange({ ...content, services });
  }

  async function save() {
    setSaving(true);
    await api("PATCH", "/api/admin/content/services", content.services);
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-foreground">Services</h1></div>
      {content.services.map((svc, i) => (
        <div key={svc.id} className="bg-card border border-border rounded-xl p-6 space-y-3">
          <h2 className="font-semibold text-foreground">{svc.title}</h2>
          <Field label="Title" value={svc.title} onChange={v => setService(i, "title", v)} />
          <Field label="Short description (card preview)" value={svc.description} onChange={v => setService(i, "description", v)} multiline />
          <Field label="Full body text" value={svc.body} onChange={v => setService(i, "body", v)} multiline />
        </div>
      ))}
      <SaveBar onSave={save} saving={saving} saved={saved} />
    </div>
  );
}

// ─── Pricing Editor ───────────────────────────────────────────────────────────

function PricingEditor({ content, onChange }: { content: SiteContent; onChange: (c: SiteContent) => void }) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function setTier(i: number, k: string, v: string | boolean | string[]) {
    const pricing = [...content.pricing];
    pricing[i] = { ...pricing[i], [k]: v };
    onChange({ ...content, pricing });
  }

  function setFeature(tier: number, fi: number, v: string) {
    const features = [...content.pricing[tier].features];
    features[fi] = v;
    setTier(tier, "features", features);
  }

  function addFeature(tier: number) {
    setTier(tier, "features", [...content.pricing[tier].features, ""]);
  }

  function removeFeature(tier: number, fi: number) {
    setTier(tier, "features", content.pricing[tier].features.filter((_, j) => j !== fi));
  }

  async function save() {
    setSaving(true);
    await api("PATCH", "/api/admin/content/pricing", content.pricing);
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-foreground">Pricing</h1></div>
      {content.pricing.map((tier, i) => (
        <div key={tier.id} className={`bg-card border rounded-xl p-6 space-y-4 ${tier.highlighted ? "border-primary" : "border-border"}`}>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-foreground">{tier.name}</h2>
            <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
              <div className={`w-9 h-5 rounded-full transition-colors ${tier.highlighted ? "bg-primary" : "bg-muted"} relative`}
                onClick={() => setTier(i, "highlighted", !tier.highlighted)}>
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${tier.highlighted ? "left-4" : "left-0.5"}`} />
              </div>
              Highlighted
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Tier name" value={tier.name} onChange={v => setTier(i, "name", v)} />
            <Field label="Price" value={tier.price} onChange={v => setTier(i, "price", v)} />
          </div>
          <Field label="Description" value={tier.description} onChange={v => setTier(i, "description", v)} multiline />
          <Field label="CTA Button text" value={tier.cta} onChange={v => setTier(i, "cta", v)} />
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Features</label>
            <div className="space-y-2">
              {tier.features.map((feat, fi) => (
                <div key={fi} className="flex items-center gap-2">
                  <input value={feat} onChange={e => setFeature(i, fi, e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                  <button onClick={() => removeFeature(i, fi)} className="text-red-400 hover:text-red-600"><X size={14} /></button>
                </div>
              ))}
              <button onClick={() => addFeature(i)}
                className="flex items-center gap-1 text-sm text-primary hover:underline mt-1">
                <Plus size={13} /> Add feature
              </button>
            </div>
          </div>
        </div>
      ))}
      <SaveBar onSave={save} saving={saving} saved={saved} />
    </div>
  );
}

// ─── Contact & About Editor ───────────────────────────────────────────────────

function ContactEditor({ content, onChange }: { content: SiteContent; onChange: (c: SiteContent) => void }) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const a = content.about;
  const c = content.contact;

  function setAbout(k: keyof typeof a) { return (v: string) => onChange({ ...content, about: { ...a, [k]: v } }); }
  function setContact(k: keyof typeof c) { return (v: string) => onChange({ ...content, contact: { ...c, [k]: v } }); }

  async function save() {
    setSaving(true);
    await api("PATCH", "/api/admin/content/about", content.about);
    await api("PATCH", "/api/admin/content/contact", content.contact);
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-foreground">Contact & About</h1></div>
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 className="font-semibold text-foreground">About Section</h2>
        <Field label="Section headline" value={a.headline} onChange={setAbout("headline")} />
        <Field label="Body text" value={a.body} onChange={setAbout("body")} multiline />
        <Field label="Pull quote" value={a.quote} onChange={setAbout("quote")} multiline />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Your name" value={a.name} onChange={setAbout("name")} />
          <Field label="Your role" value={a.role} onChange={setAbout("role")} />
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 className="font-semibold text-foreground">Contact Section</h2>
        <Field label="Section headline" value={c.headline} onChange={setContact("headline")} />
        <Field label="Subheadline" value={c.subheadline} onChange={setContact("subheadline")} multiline />
        <Field label="Availability note" value={c.availability} onChange={setContact("availability")} />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Email" value={c.email} onChange={setContact("email")} type="email" />
          <Field label="WhatsApp number" value={c.whatsapp} onChange={setContact("whatsapp")} />
        </div>
        <Field label="Location" value={c.location} onChange={setContact("location")} />
      </div>
      <SaveBar onSave={save} saving={saving} saved={saved} />
    </div>
  );
}

// ─── Main Admin App ───────────────────────────────────────────────────────────

export default function Admin() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [tab, setTab] = useState("dashboard");
  const [projects, setProjects] = useState<Project[]>([]);
  const [content, setContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    // Verify token on mount
    const token = getToken();
    if (!token) { setAuthed(false); return; }
    api("GET", "/api/admin/verify")
      .then(() => setAuthed(true))
      .catch(() => { clearToken(); setAuthed(false); });
  }, []);

  useEffect(() => {
    if (!authed) return;
    api("GET", "/api/admin/portfolio").then(setProjects);
    api("GET", "/api/admin/content").then(setContent);
  }, [authed]);

  if (authed === null) return (
    <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground text-sm">Loading…</div>
  );

  if (!authed) return <Login onLogin={() => setAuthed(true)} />;

  function logout() { clearToken(); setAuthed(false); }

  const main = (() => {
    if (tab === "dashboard") return <DashboardHome projects={projects} />;
    if (tab === "portfolio") return <PortfolioManager />;
    if (content === null) return <div className="text-muted-foreground text-sm">Loading content…</div>;
    if (tab === "hero") return <HeroEditor content={content} onChange={setContent} />;
    if (tab === "services") return <ServicesEditor content={content} onChange={setContent} />;
    if (tab === "pricing") return <PricingEditor content={content} onChange={setContent} />;
    if (tab === "contact") return <ContactEditor content={content} onChange={setContent} />;
    return null;
  })();

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar active={tab} setActive={setTab} onLogout={logout} />
      <main className="flex-1 p-8 overflow-y-auto max-w-5xl">
        {main}
      </main>
    </div>
  );
}
