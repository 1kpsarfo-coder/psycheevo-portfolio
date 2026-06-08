import TopNav from "@/components/TopNav";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container relative py-20 md:py-32">
          <div className="max-w-2xl animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-xs font-semibold text-primary tracking-widest uppercase">About</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              A scientist who
              <br />
              <span className="text-primary">chose to create.</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I hold a BSc in Biomedical Engineering. I'm currently studying Theatre Arts at
              the University of Ghana. Between those two worlds lives psycheevo. — where
              analytical precision meets bold creative vision.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto items-start">
            <div>
              <p className="text-xs font-bold text-primary tracking-widest uppercase mb-4">The Story</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                Why psycheevo.
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I don't just design. I think about why the design needs to exist, what it needs to
                  communicate, and how it needs to perform. Then I build it.
                </p>
                <p>
                  Engineering trained me to approach every problem systematically. Theatre Arts
                  trained me to understand what moves people. Design is where both live.
                </p>
                <p>
                  psycheevo. was built on one conviction: African brands deserve the same level of
                  strategic, rigorous creative thinking that global brands take for granted.
                </p>
                <p>
                  Every project I take on — a startup's first logo or a corporate rebrand — gets
                  the same level of attention. No off-days. No templates. No shortcuts.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-3">Precision</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Every design decision has a reason. No element is accidental. I design the way
                  I was trained to think — systematically, with purpose.
                </p>
              </div>
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-3">Evolution</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  I grow with my clients. Your brand today is the foundation for who you become.
                  I build infrastructure that carries your vision forward.
                </p>
              </div>
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-3">Identity</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Ghanaian excellence with global ambition. Africa is our greatest creative
                  resource. Our stories are the foundation of something the world hasn't fully seen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-20 md:py-28 border-t border-border bg-muted/30">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-primary tracking-widest uppercase mb-4">Background</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Prince Kofi Sarfo</h2>
            <p className="text-muted-foreground mt-2">Founder & Creative Director, psycheevo.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-14">
            {[
              { val: "100+", label: "Projects Completed" },
              { val: "50+", label: "Clients Served" },
              { val: "5+", label: "Years Experience" },
              { val: "3", label: "Countries Reached" },
            ].map(({ val, label }) => (
              <div key={label} className="text-center p-6 rounded-xl border border-border bg-card">
                <div className="text-3xl font-bold text-primary mb-1">{val}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {[
              "BSc Biomedical Engineering",
              "Theatre Arts, University of Ghana",
              "Founder, psycheevo.",
              "Accra, Ghana",
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
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-border bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to work together?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Tell me about your project. I respond within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">
                Start a Project
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/portfolio">View Portfolio</Link>
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
