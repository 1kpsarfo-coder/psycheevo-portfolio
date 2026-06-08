import TopNav from "@/components/TopNav";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

const SERVICES = [
  {
    tag: "IDENTITY",
    tagline: "Your brand's first impression. And its lasting one.",
    title: "Logo Design & Corporate Branding",
    body1:
      "A logo is not decoration. It is the distilled essence of everything your business stands for — communicated in a single glance. I build logos and brand identities that carry weight, command respect, and grow with your organisation for years.",
    body2:
      "Every identity project starts with questions before it starts with sketches: Who are you? Who do you serve? What do you want people to feel? The answers shape everything that follows.",
    included: [
      "Logo design (2–3 initial concepts)",
      "Brand colour palette",
      "Typography selection",
      "Brand guidelines document",
      "Business card design",
      "Social media profile kit",
    ],
    pricing: [
      { tier: "BASIC", price: "GHS 350–800" },
      { tier: "STANDARD", price: "GHS 1,200–2,500" },
      { tier: "PREMIUM", price: "GHS 5,000+" },
      { tier: "INTL", price: "$150–$10,000" },
    ],
  },
  {
    tag: "PRINT",
    tagline: "Print that stops people mid-stride.",
    title: "Flyer & Print Design",
    body1:
      "In a world drowning in digital noise, a well-designed physical piece carries a different kind of power. Whether it's an event flyer, a corporate brochure, or a product poster — I create print that commands the room it enters.",
    body2:
      "Every print piece I design is production-ready: correct bleed, correct resolution, print-safe colours — delivered in the formats your printer needs.",
    included: [
      "Single or multi-page layout",
      "Print-ready PDF with bleed",
      "Digital-use version",
      "2 revision rounds",
      "Source files available (add-on)",
    ],
    pricing: [
      { tier: "SINGLE", price: "GHS 80–200" },
      { tier: "PACK", price: "GHS 350–800" },
      { tier: "POSTER", price: "GHS 200–400" },
      { tier: "INTL", price: "$100–$800" },
    ],
  },
  {
    tag: "DIGITAL",
    tagline: "Creatives that stop the scroll. And start the conversion.",
    title: "Social Media Ad Campaigns",
    body1:
      "Social media advertising is not about being seen. It is about being remembered. I design ad creatives that interrupt the scroll, communicate your message in under 3 seconds, and move people toward action.",
    body2:
      "Designed for every major platform — Instagram, Facebook, LinkedIn, TikTok, X — and delivered in all required formats and dimensions.",
    included: [
      "Feed + story format exports",
      "Platform-specific sizing",
      "Copy suggestions (CTA + headline)",
      "2 revision rounds",
    ],
    pricing: [
      { tier: "SINGLE", price: "GHS 150–300" },
      { tier: "KIT", price: "GHS 800–2,000/10" },
      { tier: "RETAINER", price: "GHS 800–5,000/mo" },
      { tier: "INTL", price: "$100–$3,000" },
    ],
  },
  {
    tag: "WEB",
    tagline: "A website that works as hard as you do.",
    title: "WordPress Development",
    body1:
      "Your website is your most available team member — 24 hours a day, 7 days a week, in every timezone. I build WordPress sites that load fast, look exceptional, work on every device, and convert visitors into clients.",
    body2:
      "I bring both design and development to every web project. The site not only looks exactly right — it functions exactly right. No handoffs. One person. Full accountability.",
    included: [
      "Custom design & development",
      "Mobile-responsive layout",
      "Basic SEO setup",
      "Contact form",
      "Speed optimisation",
      "30-day post-launch support",
    ],
    pricing: [
      { tier: "LANDING", price: "GHS 1,500–3,000" },
      { tier: "BUSINESS", price: "GHS 3,000–6,000" },
      { tier: "CUSTOM", price: "GHS 6,000+" },
      { tier: "INTL", price: "$500–$10,000" },
    ],
  },
  {
    tag: "ONGOING",
    tagline: "Your in-house designer. Without the salary.",
    title: "Design Retainer",
    body1:
      "For businesses that need consistent, high-quality design work month after month — a design retainer is the most efficient creative investment you can make.",
    body2:
      "A retainer gives you priority access to my schedule, a predictable monthly cost, and a designer who already knows your brand deeply.",
    included: [
      "Defined deliverable count",
      "Priority scheduling",
      "48hr standard turnaround",
      "2 revisions per deliverable",
      "Monthly check-in",
      "Rollover unused work",
    ],
    pricing: [
      { tier: "STARTER", price: "GHS 800/mo" },
      { tier: "GROWTH", price: "GHS 1,200/mo" },
      { tier: "PREMIUM", price: "GHS 2,500+/mo" },
      { tier: "INTL", price: "$500–$3,000/mo" },
    ],
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container relative py-20 md:py-32">
          <div className="max-w-2xl animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-xs font-semibold text-primary tracking-widest uppercase">Services</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
              Every service.
              <br />
              <span className="text-primary">One standard.</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From a single logo to a full creative partnership — built to the same
              uncompromising standard every time.
            </p>
          </div>
        </div>
      </section>

      {/* Service Sections — alternating layout */}
      {SERVICES.map((svc, i) => {
        const isEven = i % 2 === 0;

        const ContentBlock = () => (
          <div className="flex flex-col justify-center">
            <p className="text-xs font-bold text-primary tracking-widest uppercase mb-3">{svc.tag}</p>
            <p className="text-muted-foreground italic mb-4">{svc.tagline}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">{svc.title}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{svc.body1}</p>
            <p className="text-muted-foreground leading-relaxed mb-8">{svc.body2}</p>
            <Button asChild className="w-fit">
              <Link href="/contact">
                Get a Quote →
              </Link>
            </Button>
          </div>
        );

        const InfoBlock = () => (
          <div className="flex flex-col gap-4">
            {/* What's included */}
            <div className="rounded-xl border border-border bg-card p-6">
              <p className="text-xs font-bold text-muted-foreground tracking-widest uppercase mb-4">
                What's Included
              </p>
              <ul className="space-y-2">
                {svc.included.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                    <span className="text-primary font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing */}
            <div className="rounded-xl border border-border bg-card p-6">
              <p className="text-xs font-bold text-muted-foreground tracking-widest uppercase mb-4">
                Pricing
              </p>
              <div className="space-y-2">
                {svc.pricing.map(({ tier, price }) => (
                  <div key={tier} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
                    <span className="text-xs font-bold text-muted-foreground tracking-widest">{tier}</span>
                    <span className="text-sm font-semibold text-primary">{price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

        return (
          <section
            key={svc.tag}
            className="py-20 md:py-28 border-t border-border"
          >
            <div className="container">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                {isEven ? (
                  <>
                    <ContentBlock />
                    <InfoBlock />
                  </>
                ) : (
                  <>
                    <InfoBlock />
                    <ContentBlock />
                  </>
                )}
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="py-24 border-t border-border bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold text-primary tracking-widest uppercase mb-4">Ready to build?</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Let's make something
            <br />
            <span className="text-primary">that matters.</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Whether it's a logo, a campaign, or your entire brand — every
            great project starts with one conversation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">
                Start a Project
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="container py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link href="/" className="flex items-center">
              <img src="/psycheevo_logo.svg" alt="psycheevo." className="h-6 w-auto" />
            </Link>
            <p className="text-sm text-muted-foreground text-center">
              © 2025 psycheevo. · Prince Kofi Sarfo · Accra, Ghana
            </p>
            <div className="flex gap-6">
              <Link href="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Services</Link>
              <Link href="/portfolio" className="text-sm text-muted-foreground hover:text-primary transition-colors">Portfolio</Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
