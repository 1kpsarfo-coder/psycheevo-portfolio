import TopNav from "@/components/TopNav";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "wouter";
import { PageFade, FadeUp, FadeIn, Stagger, StaggerItem } from "@/components/Animate";

const RETAINER_TIERS = [
  {
    name: "Starter",
    desc: "Best for: Startups & small businesses",
    price: "GHS 800",
    period: "/month",
    features: [
      "4–6 deliverables/month",
      "48hr turnaround",
      "2 revisions/piece",
      "Monthly check-in",
      "Priority scheduling",
    ],
    cta: "Get Started",
    featured: false,
  },
  {
    name: "Growth",
    badge: "★ MOST POPULAR",
    desc: "Best for: SMEs, event companies",
    price: "GHS 1,200",
    period: "/month",
    features: [
      "8–12 deliverables/month",
      "48hr turnaround",
      "2 revisions/piece",
      "Monthly strategy check-in",
      "Priority scheduling",
      "Rollover unused work",
    ],
    cta: "Start Retainer →",
    featured: true,
  },
  {
    name: "Premium",
    desc: "Best for: Corporates & institutions",
    price: "GHS 2,500+",
    period: "/month",
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
];

const PER_PROJECT = [
  { service: "Logo Design & Branding", price: "GHS 350–5,000+" },
  { service: "Flyer & Print Design", price: "GHS 80–800" },
  { service: "Social Media Campaign", price: "GHS 150–2,000" },
  { service: "WordPress Development", price: "GHS 1,500–6,000+" },
  { service: "Motion Graphics", price: "GHS 2,500+" },
  { service: "International Projects", price: "USD rates available" },
];

const PAYMENT_METHODS = ["MOBILE MONEY", "BANK TRANSFER", "WISE", "PAYPAL", "PAYONEER"];

const FAQ = [
  {
    q: "Do you work with international clients?",
    a: "Yes. I work with clients across Africa, Europe, and North America. All pricing in GHS is also available in USD — reach out and I'll quote you directly in your currency.",
  },
  {
    q: "How does a retainer work exactly?",
    a: "You choose a monthly tier, pay at the start of each cycle, and I handle your design needs within that scope. Any unused work rolls over to the following month.",
  },
  {
    q: "What if I'm not sure which plan fits?",
    a: "Tell me what you need — I'll recommend the right fit with no pressure. Most clients start with a one-off project before committing to a retainer.",
  },
  {
    q: "Can I upgrade or downgrade my retainer?",
    a: "Yes. Retainers renew monthly, so you can adjust your tier at the start of any new cycle with 5 days' notice.",
  },
];

export default function Pricing() {
  return (
    <PageFade className="min-h-screen bg-background">
      <TopNav />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container relative py-20 md:py-32">
          <FadeUp>
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <span className="text-xs font-semibold text-primary tracking-widest uppercase">Pricing</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
                Transparent rates.
                <br />
                <span className="text-primary">Zero surprises.</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every project is quoted clearly. Every retainer is flexible. You always know exactly
                what you are paying — and exactly what you are getting.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Retainer Plans */}
      <section className="py-20 md:py-32">
        <div className="container">
          <FadeUp>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <p className="text-xs font-bold text-primary tracking-widest uppercase mb-3">Retainer Plans</p>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Monthly Design Retainer
              </h2>
              <p className="text-lg text-muted-foreground">
                Your in-house designer without the salary.
              </p>
            </div>
          </FadeUp>

          <Stagger className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
            {RETAINER_TIERS.map(({ name, badge, desc, price, period, features, cta, featured }) => (
              <StaggerItem key={name}>
                <div
                  className={`rounded-2xl border bg-card p-8 flex flex-col transition-all duration-300 h-full ${
                    featured
                      ? "border-primary/50 shadow-xl shadow-primary/10 ring-1 ring-primary/20"
                      : "border-border"
                  }`}
                >
                  {badge && (
                    <div className="inline-flex self-start px-3 py-1 rounded-full text-xs font-semibold text-primary bg-primary/10 mb-4">
                      {badge}
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-foreground mb-1">{name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{desc}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-foreground">{price}</span>
                    <span className="text-muted-foreground text-base ml-1">{period}</span>
                  </div>
                  <ul className="space-y-2.5 flex-1 mb-8">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check size={14} className="text-primary mt-0.5 flex-shrink-0" />
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
        </div>
      </section>

      {/* Per-Project Rates */}
      <section className="py-20 md:py-28 border-t border-border bg-muted/30">
        <div className="container">
          <FadeUp>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <p className="text-xs font-bold text-primary tracking-widest uppercase mb-3">Per-Project</p>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Single Project Rates
              </h2>
              <p className="text-lg text-muted-foreground">
                Not ready for a retainer? Single projects are welcome.
              </p>
            </div>
          </FadeUp>

          <Stagger className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-3">
            {PER_PROJECT.map(({ service, price }) => (
              <StaggerItem key={service}>
                <div className="flex items-center justify-between px-6 py-4 rounded-xl border border-border bg-card h-full">
                  <span className="text-sm font-medium text-foreground">{service}</span>
                  <span className="text-sm font-semibold text-primary ml-4 text-right">{price}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Payment */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="container max-w-2xl mx-auto text-center">
          <FadeUp>
            <p className="text-xs font-bold text-primary tracking-widest uppercase mb-4">Payment</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How Payment Works</h2>
            <p className="text-lg text-muted-foreground mb-2">50% upfront · 50% on delivery</p>
            <p className="text-muted-foreground mb-8">Retainer billed on the 1st of each month</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {PAYMENT_METHODS.map((m) => (
                <span
                  key={m}
                  className="px-4 py-2 rounded-full border border-border bg-card text-xs font-semibold text-muted-foreground tracking-wider"
                >
                  {m}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 border-t border-border bg-muted/30">
        <div className="container max-w-3xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <p className="text-xs font-bold text-primary tracking-widest uppercase mb-3">FAQ</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Common questions.</h2>
            </div>
          </FadeUp>
          <Stagger className="space-y-4">
            {FAQ.map(({ q, a }) => (
              <StaggerItem key={q}>
                <div className="p-6 rounded-xl border border-border bg-card">
                  <h3 className="font-semibold text-foreground mb-2">{q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-border bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container max-w-2xl mx-auto text-center">
          <FadeUp>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Not sure which plan fits?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Tell me about your project — I'll recommend what makes sense, no pressure.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">
                Let's Talk
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
          </FadeUp>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="container py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link href="/" className="flex items-center">
              <img src="/psycheevo_logo.svg" alt="psycheevo." className="h-6 w-auto" />
            </Link>
            <p classNam