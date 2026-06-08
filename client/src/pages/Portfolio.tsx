import { useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { X, ChevronLeft, ChevronRight, ChevronDown, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import TopNav from "@/components/TopNav";

// ─── Project Data ────────────────────────────────────────────────────────────

type Category = "All Work" | "Branding" | "Print" | "Social Media";

interface Project {
  id: string;
  title: string;
  category: Exclude<Category, "All Work">;
  description: string;
  tags: string[];
  images: string[];
  year: string;
}

const PROJECTS: Project[] = [
  {
    id: "just-sip",
    title: "Just Sip",
    category: "Branding",
    description:
      "Full brand identity for Just Sip — a healthy juice and beverage brand targeting health-conscious consumers. Covers logo design, cup packaging, brand colour system, and marketing collateral. The identity balances organic warmth with playful energy.",
    tags: ["Logo Design", "Packaging", "Brand Identity", "Print"],
    images: [
      "/portfolio/just-sip-1.jpg",
      "/portfolio/just-sip-2.jpg",
      "/portfolio/just-sip-3.jpg",
      "/portfolio/just-sip-4.jpg",
    ],
    year: "2025",
  },
  {
    id: "kampus-crave",
    title: "Kampus Crave",
    category: "Branding",
    description:
      "Brand identity and packaging design for Kampus Crave, a campus food delivery brand. The design captures the youthful, energetic spirit of student culture — bold colours, playful typography, and a memorable mark that works on packaging, digital, and outdoor formats.",
    tags: ["Logo Design", "Brand Identity", "Packaging", "Social Media"],
    images: [
      "/portfolio/kampus-crave-1.jpg",
      "/portfolio/kampus-crave-2.jpg",
      "/portfolio/kampus-crave-3.jpg",
    ],
    year: "2025",
  },
  {
    id: "birak",
    title: "BIRAK Group",
    category: "Branding",
    description:
      "Comprehensive brand system for BIRAK Group — a multi-vertical conglomerate spanning civic care, merchandise, and corporate services. Deliverables include logo suite, business card system, apparel branding, and architectural signage.",
    tags: ["Corporate Identity", "Logo Design", "Stationery", "Apparel"],
    images: [
      "/portfolio/birak-1.jpg",
      "/portfolio/birak-2.jpg",
      "/portfolio/birak-3.jpg",
      "/portfolio/birak-4.jpg",
    ],
    year: "2025",
  },
  {
    id: "maxduray",
    title: "Maxduray",
    category: "Branding",
    description:
      "Brand identity for Maxduray Decor & Construction — a premium construction and interior decor company. The identity system balances industrial strength with refined elegance, applied across logo, uniforms, hard hats, and architectural presentations.",
    tags: ["Corporate Identity", "Logo Design", "Uniform Branding"],
    images: [
      "/portfolio/maxduray-1.jpg",
      "/portfolio/maxduray-2.jpg",
    ],
    year: "2024",
  },
  {
    id: "nyarko-homes",
    title: "Nyarko Homes",
    category: "Branding",
    description:
      "Premium business card and corporate identity for Nyarko Homes Ltd — a luxury real estate developer. The design communicates timeless sophistication through a refined monogram, gold accents, and precision typography.",
    tags: ["Corporate Identity", "Stationery", "Luxury Branding"],
    images: ["/portfolio/nyarko-homes-1.png"],
    year: "2026",
  },
  {
    id: "djakas-coconut",
    title: "Djaka's Coconut",
    category: "Branding",
    description:
      "Logo and brand mark design for Djaka's Coconut — a fresh coconut events and catering brand. The identity blends tropical warmth with a clean, modern aesthetic suitable for weddings, corporate events, and outdoorings.",
    tags: ["Logo Design", "Brand Identity", "Events"],
    images: ["/portfolio/djakas-coconut-1.png"],
    year: "2025",
  },
  {
    id: "zentaprost",
    title: "Zentaprost",
    category: "Print",
    description:
      "Pharmaceutical packaging and label design for Zentaprost — an evidence-based prostate health supplement. The design communicates clinical credibility while remaining approachable, using clean layouts, medical-grade typography, and trust-building visual hierarchy.",
    tags: ["Pharmaceutical", "Packaging", "Label Design"],
    images: ["/portfolio/zentaprost-1.jpg"],
    year: "2025",
  },
  {
    id: "premium-mashke",
    title: "Premium Mashke",
    category: "Print",
    description:
      "Packaging and brand collateral for Premium Mashke — a coconut kenkey smoothie brand. Deliverables include paper bag design, bottle label, and brand identity elements that position the product as a premium, locally-rooted FMCG offering.",
    tags: ["Packaging", "Label Design", "FMCG"],
    images: ["/portfolio/premium-mashke-1.jpg"],
    year: "2025",
  },
  {
    id: "safkan",
    title: "Safkan Herbal Tea",
    category: "Print",
    description:
      "Label and pouch packaging design for Safkan — a herbal tea brand. The design draws on natural textures and earthy tones to communicate purity and wellness, applied across the primary label, stand-up pouch, and secondary packaging.",
    tags: ["Packaging", "Label Design", "Health & Wellness"],
    images: [
      "/portfolio/safkan-1.png",
      "/portfolio/safkan-2.jpg",
    ],
    year: "2025",
  },
  {
    id: "akuafo",
    title: "Akuafo Hall 70th",
    category: "Print",
    description:
      "Anniversary merchandise and print design for Akuafo Hall's 70th Anniversary at the University of Ghana. Deliverables include a silk scarf with custom pattern, commemorative mug, and event launch collateral — all built around a unified anniversary mark.",
    tags: ["Event Branding", "Merchandise", "Print", "Pattern Design"],
    images: [
      "/portfolio/akuafo-1.jpg",
      "/portfolio/akuafo-2.jpg",
      "/portfolio/akuafo-3.jpg",
    ],
    year: "2025",
  },
  {
    id: "kfcs",
    title: "KFCS Restaurant",
    category: "Social Media",
    description:
      "Ongoing social media content design for KFCS — a fast food restaurant brand. Covers festive campaign ads, promotional flyers, holiday posts, and daily content designed for maximum engagement across Facebook and Instagram.",
    tags: ["Social Media", "Content Design", "Advertising"],
    images: [
      "/portfolio/kfcs-1.jpg",
      "/portfolio/kfcs-2.jpg",
      "/portfolio/kfcs-3.jpg",
      "/portfolio/kfcs-4.png",
    ],
    year: "2025",
  },
  {
    id: "speedpoint",
    title: "Speedpoint",
    category: "Social Media",
    description:
      "Social media content design for Speedpoint — promotional flyers and seasonal campaign graphics designed to drive foot traffic and digital engagement. Clean, bold layouts with strong call-to-action hierarchy.",
    tags: ["Social Media", "Flyer Design", "Advertising"],
    images: [
      "/portfolio/speedpoint-1.jpg",
      "/portfolio/speedpoint-2.jpg",
    ],
    year: "2025",
  },
];

const CATEGORIES: Category[] = ["All Work", "Branding", "Print", "Social Media"];

// ─── Portfolio Page ──────────────────────────────────────────────────────────

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<Category>("All Work");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const filtered =
    activeCategory === "All Work"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  const openProject = (project: Project) => {
    setSelectedProject(project);
    setCarouselIndex(0);
    setDetailsOpen(false);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "";
  };

  const prev = useCallback(() => {
    if (!selectedProject) return;
    setCarouselIndex((i) =>
      i === 0 ? selectedProject.images.length - 1 : i - 1
    );
  }, [selectedProject]);

  const next = useCallback(() => {
    if (!selectedProject) return;
    setCarouselIndex((i) =>
      i === selectedProject.images.length - 1 ? 0 : i + 1
    );
  }, [selectedProject]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!selectedProject) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedProject, prev, next]);

  return (
    <div className="min-h-screen bg-background">
      <TopNav />

      {/* ── Header ────────────────────────────────────────── */}
      <section className="pt-20 pb-12 text-center">
        <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase mb-4">
          Portfolio
        </p>
        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-5 leading-tight">
          Selected{" "}
          <span className="text-primary">Work.</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Projects built with purpose, craft, and a relentless standard of quality.
        </p>
      </section>

      {/* ── Category Filters ──────────────────────────────── */}
      <div className="flex flex-wrap justify-center gap-3 pb-12 px-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground border-primary shadow-md"
                : "bg-transparent text-foreground border-border hover:border-primary hover:text-primary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Grid ──────────────────────────────────────────── */}
      <div className="container pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <button
              key={project.id}
              onClick={() => openProject(project)}
              className="group relative rounded-2xl overflow-hidden border border-border bg-card aspect-[4/3] cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {/* Image with grayscale effect */}
              <img
                src={project.images[0]}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-500 filter grayscale group-hover:grayscale-0 group-hover:scale-105"
              />

              {/* Default overlay — category label */}
              <div className="absolute inset-0 bg-background/30 group-hover:bg-transparent transition-colors duration-300" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-foreground/60 group-hover:opacity-0 transition-opacity duration-200">
                  {project.category}
                </span>
              </span>

              {/* Hover overlay — title + CTA */}
              <div className="absolute inset-0 bg-background/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-6 text-center">
                <span className="px-3 py-1 rounded-full text-xs font-semibold text-primary bg-primary/10 border border-primary/20">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
                <span className="text-xs text-muted-foreground">
                  {project.images.length > 1
                    ? `${project.images.length} images · Click to explore`
                    : "Click to view"}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Modal ─────────────────────────────────────────── */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
          onClick={closeModal}
        >
          <div
            className="relative bg-card border border-border rounded-2xl overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-background/80 border border-border flex items-center justify-center hover:bg-secondary transition-colors"
            >
              <X size={16} />
            </button>

            {/* Carousel */}
            <div className="relative bg-muted flex-shrink-0" style={{ height: "55vh" }}>
              <img
                key={carouselIndex}
                src={selectedProject.images[carouselIndex]}
                alt={`${selectedProject.title} — image ${carouselIndex + 1}`}
                className="w-full h-full object-contain animate-fade-in"
              />

              {/* Prev / Next */}
              {selectedProject.images.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                  >
                    <ChevronRight size={18} />
                  </button>

                  {/* Dot indicators */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                    {selectedProject.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCarouselIndex(i)}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                          i === carouselIndex
                            ? "bg-primary w-5"
                            : "bg-foreground/30 hover:bg-foreground/60"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Project info */}
            <div className="overflow-y-auto">
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold text-primary bg-primary/10 border border-primary/20 mr-2">
                      {selectedProject.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{selectedProject.year}</span>
                    <h2 className="text-2xl font-bold text-foreground mt-2">
                      {selectedProject.title}
                    </h2>
                  </div>
                  {selectedProject.images.length > 1 && (
                    <span className="text-sm text-muted-foreground flex-shrink-0 mt-1">
                      {carouselIndex + 1} / {selectedProject.images.length}
                    </span>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-xs font-medium bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* View Project accordion */}
                <button
                  onClick={() => setDetailsOpen((o) => !o)}
                  className="flex items-center justify-between w-full py-3 border-t border-border text-sm font-semibold text-foreground hover:text-primary transition-colors"
                >
                  <span>View Project Details</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${detailsOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {detailsOpen && (
                  <p className="text-muted-foreground text-sm leading-relaxed pb-4 animate-slide-up">
                    {selectedProject.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Footer ────────────────────────────────────────── */}
      <footer className="border-t border-border py-8 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} <span className="font-semibold text-foreground">psycheevo.</span> · Prince Kofi Sarfo · Accra, Ghana
        </p>
        <Link href="/" className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2">
          <ArrowLeft size={12} /> Back to Home
        </Link>
      </footer>
    </div>
  );
}
