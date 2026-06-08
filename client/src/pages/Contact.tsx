import TopNav from "@/components/TopNav";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Phone, Clock, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { PageFade, FadeUp, FadeIn, Stagger, StaggerItem } from "@/components/Animate";

const FAQ = [
  {
    q: "How long does a brand identity project take?",
    a: "Typically 2–4 weeks from kick-off to final delivery, depending on scope and feedback rounds. Rush timelines are available at an additional fee.",
  },
  {
    q: "Do you work with clients outside Ghana?",
    a: "Yes. I work remotely with clients across Africa, Europe, and North America. All communication via WhatsApp, email, or video call. Pricing is available in GHS and USD.",
  },
  {
    q: "What do I need to provide to get started?",
    a: "Just a brief — tell me who you are, what you need, and when you need it. I'll take it from there. A voice note works too.",
  },
  {
    q: "Do you offer revisions?",
    a: "All projects include structured revision rounds (typically 2). I work collaboratively, so most projects land close to the mark on the first concept.",
  },
  {
    q: "What are the payment terms?",
    a: "50% deposit upfront before work begins, 50% on delivery. Retainers are billed on the 1st of each month. Accepted: Mobile Money, Bank Transfer, Wise, PayPal, Payoneer.",
  },
];

export default function Contact() {
  return (
    <PageFade className="min-h-screen bg-background">
      <TopNav />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container relative py-20 md:py-32">
          <div className="max-w-2xl">
            <FadeUp>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <span className="text-xs font-semibold text-primary tracking-widest uppercase">Contact</span>
              </div>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Let's build something
                <br />
                <span className="text-primary">together.</span>
              </h1>
            </FadeUp>
            <FadeUp delay={0.16}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether you have a project ready to start, a vision you're still
                shaping, or a question you don't know how to ask — reach out.
                I respond to every message within 24 hours.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Contact Methods + Process */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">

            {/* Left: Contact details */}
            <div>
              <FadeUp>
                <p className="text-xs font-bold text-primary tracking-widest uppercase mb-6">Reach Me Directly</p>
              </FadeUp>

              <Stagger className="space-y-4">
                <StaggerItem>
                  <a
                    href="https://wa.me/233552587956"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300 card-hover group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Phone size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-0.5">WhatsApp</p>
                      <p className="text-sm text-muted-foreground">+233 55-258 7956</p>
                      <p className="text-xs text-primary mt-1 font-medium">Fastest response ↗</p>
                    </div>
                  </a>
                </StaggerItem>

                <StaggerItem>
                  <a
                    href="mailto:psycheevodesign@gmail.com"
                    className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300 card-hover group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Mail size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-0.5">Email</p>
                      <p className="text-sm text-muted-foreground">psycheevodesign@gmail.com</p>
                      <p className="text-xs text-muted-foreground mt-1">For detailed briefs & contracts</p>
                    </div>
                  </a>
                </StaggerItem>

                <StaggerItem>
                  <div className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-0.5">Location</p>
                      <p className="text-sm text-muted-foreground">Accra, Ghana</p>
                      <p className="text-xs text-muted-foreground mt-1">Available globally via remote</p>
                    </div>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-0.5">Availability</p>
                      <p className="text-sm text-muted-foreground">Currently accepting new projects</p>
                      <p className="text-xs text-muted-foreground mt-1">Average response: under 4 hours</p>
                    </div>
                  </div>
                </StaggerItem>
              </Stagger>

              <Button size="lg" asChild className="mt-8 w-full sm:w-auto">
                <a href="https://wa.me/233552587956" target="_blank" rel="noopener noreferrer">
                  Start on WhatsApp
                  <ArrowRight className="ml-2" size={20} />
                </a>
              </Button>
            </div>

            {/* Right: Process */}
            <div>
              <FadeUp>
                <p className="text-xs font-bold text-primary tracking-widest uppercase mb-6">What to Expect</p>
              </FadeUp>

              <Stagger className="space-y-6 mb-10">
                {[
                  {
                    step: "1",
                    title: "Send your brief",
                    body: "Tell me what you need — the more context the better, but a quick overview is enough to start.",
                  },
                  {
                    step: "2",
                    title: "I respond with a clear scope",
                    body: "Within 24 hours I'll reply with a scope, timeline, and quote. No vague estimates.",
                  },
                  {
                    step: "3",
                    title: "50% deposit, then we begin",
                    body: "Once you approve the scope, you pay 50% upfront and I start immediately.",
                  },
                  {
                    step: "4",
                    title: "Delivery & final payment",
                    body: "I deliver everything in a structured handoff. Final 50% on delivery. Done.",
                  },
                ].map(({ step, title, body }) => (
                  <StaggerItem key={step}>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-sm font-bold text-primary">
                        {step}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground mb-1">{title}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>

              <FadeIn>
                <blockquote className="p-6 rounded-xl border border-primary/20 bg-primary/5">
                  <p className="text-foreground italic leading-relaxed mb-3">
                    "I build brands the way I was trained to solve problems — systematically,
                    with precision, and with the full picture in mind."
                  </p>
                  <cite className="text-sm text-primary font-semibold not-italic">
                    — Prince Kofi Sarfo, Founder, psycheevo.
                  </cite>
                </blockquote>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 border-t border-border bg-muted/30">
        <div className="container max-w-3xl mx-auto">
          <FadeUp>
            <div className="text-center mb-14">
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

      {/* Footer */}
      <footer className="border-t border-border bg-card