import TopNav from "@/components/TopNav";
import { Button } from "@/components/ui/button";
import {
  Pen,
  FileText,
  Zap,
  Globe,
  Play,
  RefreshCw,
  ArrowRight,
  MapPin,
  Mail,
  Phone,
  ChevronDown,
} from "lucide-react";
import { Link } from "wouter";
import { PageFade, FadeUp, FadeIn, Stagger, StaggerItem } from "@/components/Animate";

export default function Landing() {
  return (
    <PageFade className="min-h-screen bg-background">
      <TopNav />

      {/* ── HERO SECTION ─────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

        <div className="container relative py-20 md:py-32 lg:py-40">
          <div className="max-w-3xl mx-auto text-center">

            <FadeUp delay={0}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <MapPin size={14} className="text-primary" />
                <span className="text-sm font-medium text-primary">
                  Creative Director · Accra, Ghana
                </span>
              </div>
            </FadeUp>

            <FadeUp delay={0.08}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
                Design That Thinks.{" "}
                <span className="text-primary">Brands That Lead.</span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.16}>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                I'm Prince Kofi Sarfo — a Biomedical Engineer turned Creative
                Director, building brands that don't just look good. They think.
                They convert. They evolve.
              </p>
            </FadeUp>

            <FadeUp delay={0.24}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Button size="lg" asChild>
                  <Link href="/portfolio">
                    View My Work
                    <ArrowRight className="ml-2" size={20} />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Start a Project</Link>
                </Button>
              </div>
            </FadeUp>

            {/* Stats strip */}
            <FadeUp delay={0.32}>
              <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-border pt-10 mt-4">
                {[
                  { val: "100+", label: "Projects Completed" },
                  { val: "50+", label: "Clients Served" },
                  { val: "5+", label: "Years Experience" },
                  { val: "3", label: "Countries Reached" },
                ].map(({ val, label }) => (
                  <StaggerItem key={label}>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-1">{val}</div>
                      <div className="text-sm text-muted-foreground">{label}</div>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </FadeUp>

          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex flex-col items-center pb-8 gap-1 text-muted-foreground animate-bounce">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown size={16} />
        </div>
      </section>

      {/* ── LOGOFOLIO MARQUEE ────────────────────────────── */}
      <section className="py-12 border-t border-border overflow-hidden">
        <style>{`
          @keyframes marquee-scroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-track {
            display: flex;
            width: max-content;
            animation: marquee-scroll 28s linear infinite;
          }
          .marquee-track:hover {
            animation-play-state: paused;
          }
        `}</style>

        <FadeIn>
          <p className="text-center text-xs font-semibold text-muted-foreground tracking-widest uppercase mb-8">
            Brands I've Built
          </p>
        </FadeIn>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="overflow-hidden">
            <div className="marquee-track">
              {[
                { src: "/logos/birak.jpg", name: "BIRAK" },
                { src: "/logos/nyarko-homes.jpg", name: "Nyarko Homes" },
                { src: "/logos/chops-infusion.jpg", name: "Chops 'n' Infusion" },
                { src: "/logos/maxduray.jpg", name: "Maxduray" },
                { src: "/logos/safkan.jpg", name: "Safkan" },
                { src: "/logos/sheasens.jpg", name: "Sheasens" },
                { src: "/logos/kampus-crave.png", name: "Kampus Crave" },
                { src: "/logos/djakas-coconut.png", name: "Djaka's Coconut" },
                { src: "/logos/birak.jpg", name: "BIRAK" },
                { src: "/logos/nyarko-homes.jpg", name: "Nyarko Homes" },
                { src: "/logos/chops-infusion.jpg", name: "Chops 'n' Infusion" },
                { src: "/logos/maxduray.jpg", name: "Maxduray" },
                { src: "/logos/safkan.jpg", name: "Safkan" },
                { src: "/logos/sheasens.jpg", name: "Sheasens" },
                { src: "/logos/kampus-crave.png", name: "Kampus Crave" },
                { src: "/logos/djakas-coconut.png", name: "Djaka's Coconut" },
              ].map((logo, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 mx-10 flex items-center justify-center h-16"
                  title={logo.name}
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="h-10 w-auto max-w-[120px] object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES SECTION ─────────────────────────────── */}
      <section id="services" className="py-20 md:py-32 border-t border-border">
        <div className="container">
          <FadeUp>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <span className="text-xs font-semibold text-primary tracking-widest uppercase">
                  Services
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                One mind. Every creative need.
              </h2>
              <p className="text-lg text-muted-foreground">
                From your brand's first logo to a full campaign — precision meets
                art in every deliverable.
              </p>
            </div>
          </FadeUp>

          <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Pen,
                tag: "IDENTITY",
                title: "Logo Design & Corporate Branding",
                body: "I build brand identities that carry the full weight of your vision — from a startup's first mark to a full corporate rebrand.",
                price: "From GHS 350",
              },
              {
                icon: FileText,
                tag: "PRINT",
                title: "Flyer & Print Design",
                body: "Print that commands attention in a world of screens. Every piece designed to stop the eye and move the person toward action.",
                price: "From GHS 120",
              },
              {
                icon: Zap,
                tag: "DIGITAL",
                title: "Social Media Ad Campaigns",
                body: "Scroll-stopping creatives backed by strategic thinking. Your campaign deserves more than stock templates.",
                price: "From GHS 150",
              },
              {
                icon: Globe,
                tag: "WEB",
                title: "WordPress Development",
                body: "Clean, fast websites that work 24 hours a day. Your site is your most available team member — make it count.",
                price: "From GHS 1,500",
              },
              {
                icon: Play,
                tag: "MOTION",
                title: "Motion Graphics",
                body: "Brand motion that brings your identity alive — animated logos, explainer content, and visual storytelling.",
                price: "From GHS 2,500",
              },
              {
                icon: RefreshCw,
                tag: "ONGOING",
                title: "Design Retainer",
                body: "Your in-house designer without the salary. Priority access, consistent quality, predictable monthly cost.",
                price: "From GHS 800/month",
                featured: true,
              },
            ].map(({ icon: Icon, tag, title, body, price, featured }) => (
              <StaggerItem key={title}>
                <div
                  className={`group p-6 rounded-xl border bg-card hover:border-primary/50 transition-all duration-300 card-hover h-full ${
                    featured ? "border-primary/40 shadow-lg shadow-primary/10" : "border-border"
                  }`}
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <div className="inline-flex px-2 py-0.5 rounded text-xs font-semibold text-primary bg-primary/10 mb-3">
                    {tag}
                  </div>
                  {featured && (
                    <div className="inline-flex ml-2 px-2 py-0.5 rounded text-xs font-semibold text-accent-foreground bg-accent mb-3">
                      ★ POPULAR
                    </div>
                  )}
                  <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
                  <p className="text-muted-foreground mb-4">{body}</p>
                  <p className="text-sm font-semibold text-primary">{price}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── ABOUT SECTION ────────────────────────────────── */}
      <section id="about" className="py-20 md:py-32 border-t border-border bg-muted/30">
        <div className="container">
          <FadeUp>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <span className="text-xs font-semibold text-primary tracking-widest uppercase">
                  The Designer
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                A scientist who chose to create.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                I hold a BSc in Biomedical Engineering. I'm currently studying
                Theatre Arts at the University of Ghana. Between those two worlds
                lives psycheevo. — where analytical precision meets bold creative
                vision.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                I don't just design. I think about why the design needs to exist,
                what it needs to communicate, and how it needs to perform.
                Then I build it.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  "BSc Biomedical Engineering",
                  "Theatre Arts, University of Ghana",
                  "Founder, psycheevo.",
                ].map((pill) => (
                  <span
                    key={pill}
                    className="px-4 py-2 rounded-full border border-border bg-card text-sm text-foreground"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          </FadeUp>

          <Stagger className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              {
                title: "Precision",
                body: "Every design decision has a reason. No element is accidental. I design the way I was trained to think — systematically, with purpose.",
              },
              {
                title: "Evolution",
                body: "I grow with my clients. Your brand today is the foundation for who you become. I build infrastructure that carries your vision forward.",
              },
              {
                title: "Identity",
                body: "Ghanaian excellence with global ambition. Africa is our greatest creative resource. Our stories are the foundation of something the world hasn't fully seen.",
              },
            ].map(({ title, body }) => (
              <StaggerItem key={title}>
                <div className="p-6 rounded-xl border border-border bg-card card-hover h-full">
                  <h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3>
                  <p className="text-muted-foreground">{body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── PORTFOLIO SECTION ────────────────────────────── */}
      <section id="portfolio" className="py-20 md:py-32 border-t border-border">
        <div className="container">
          <FadeUp>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <span className="text-xs font-semibold text-primary tracking-widest uppercase">
                  Portfolio
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Work that speaks for itself.
              </h2>
              <p className="text-lg text-muted-foreground">
                Every project here represents a problem solved, a vision realised,
                and a brand elevated.
              </p>
            </div>
          </FadeUp>

          <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Just Sip", tag: "Branding", src: "/portfolio/just-sip-1.jpg" },
              { title: "Kampus Crave", tag: "Branding", src: "/portfolio/kampus-crave-1.jpg" },
              { title: "Zentaprost", tag: "Pharmaceutical", src: "/portfolio/zentaprost-1.jpg" },
              { title: "BIRAK", tag: "Corporate Identity", src: "/portfolio/birak-1.jpg" },
              { title: "Safkan", tag: "Packaging", src: "/portfolio/safkan-1.png" },
              { title: "Maxduray", tag: "Branding", src: "/portfolio/maxduray-1.jpg" },
            ].map(({ title, tag, src }) => (
              <StaggerItem key={title}>
                <Link
                  href="/portfolio"
                  className="group relative rounded-xl overflow-hidden border border-border bg-card aspect-[4/3] card-hover block"
                >
                  <img
                    src={src}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-6 text-center">
                    <div className="px-2 py-0.5 rounded text-xs font-semibold text-primary bg-primary/10">
                      {tag}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{title}</h3>
                    <span className="inline-flex items-center px-3 py-1.5 text-sm border border-border rounded-md text-foreground bg-background/80 hover:bg-background transition-colors">
                      View Project →
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── PRICING SECTION ──────────────────────────────── */}
      <section id="pricing" className="py-20 md:py-32 border-t border-border bg-muted/30">
        <div className="container">
          <FadeUp>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <span className="text-xs font-semibold text-primary tracking-widest uppercase">
                  Pricing
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Bold work. Clear rates.
              </h2>
              <p className="text-lg text-muted-foreground">
                Every client is different. Every project is scoped fairly.
                These are the starting points.
              </p>
            </div>
          </FadeUp>

          <Stagger className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "GHS 800",
                period: "/month",
                desc: "Best for startups & small businesses",
                features: [
                  "4–6 deliverables per month",
                  "48hr standard turnaround",
                  "2 revisions per deliverable",
                  "Monthly check-in",
                  "Priority scheduling",
                ],
                cta: "Get Started",
                featured: false,
              },
              {
                name: "Growth",
                price: "GHS 1,200",
                period: "/month",
                desc: "Best for SMEs & growing brands",
                badge: "★ Most Popular",
                features: [
                  "8–12 deliverables per month",
                  "48hr standard turnaround",
                  "2 revisions per deliverable",
                  "Monthly strategy check-in",
                  "Priority scheduling",
                  "Rollover unused work",
                ],
                cta: "Start Retainer →",
                featured: true,
              },
              {
                name: "Premium",
                price: "GHS 2,500+",
                period: "/month",
                desc: "Best for corporates & institutions",
                features: [
                  "All design needs covered",
                  "24hr priority turnaround",
                  "Unlimited revisions",
                  "Weekly check-in",
                  "Full creative partnership",
                  "Brand strategy included",
                ],
                cta: "Contact for Quote",
                featured: false,
              },
            ].map(({ name, price, period, desc, badge, features, cta, featured }) => (
              <StaggerItem key={name}>
                <div
                  className={`p-8 rounded-xl border bg-card flex flex-col transition-all duration-300 card-hover h-full ${
                    featured
                      ? "border-primary/50 shadow-xl shadow-primary/10 scale-105"
                      : "border-border"
                  }`}
                >
                  {badge && (
                    <div className="inline-flex self-center px-3 py-1 rounded-full text-xs font-semibold text-primary bg-primary/10 mb-4">
                      {badge}
                    </div>
                  )}
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
                    {name}
                  </div>
                  <div className="text-4xl font-bold text-foreground mb-1">
                    {price}
                    <span className="text-lg font-normal text-muted-foreground">{period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">{desc}</p>
                  <ul className="space-y-3 flex-1 mb-8">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary font-bold mt-0.5">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button variant={featured ? "default" : "outline"} className="w-full" asChild>
                    <Link href="/contact">{cta}</Link>
                  </Button>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <FadeUp delay={0.1}>
            <div className="max-w-2xl mx-auto mt-12 p-6 rounded-xl border border-border bg-card text-center">
              <p className="text-sm text-muted-foreground leading-relaxed">
                All projects: <span className="font-semibold text-foreground">50% deposit upfront · 50% on delivery</span><br />
                Payments accepted via Mobile Money · Bank Transfer · Wise · PayPal · Payoneer
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CONTACT / CTA SECTION ────────────────────────── */}
      <section
        id="contact"
        className="py-20 md:py-32 border-t border-border bg-gradient-to-br from-primary/5 to-accent/5"
      >
        <div className="container max-w-2xl mx-auto text-center">
          <FadeUp>
            <div classN