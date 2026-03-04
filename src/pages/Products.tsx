import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const specs = [
  "Aluminum Alloy 6063-T5",
  "Powder-coated finish",
  "Integrated LED lighting",
  "Stainless Steel 304 hardware",
  "Self-drainage system",
  "Button-controlled louvers",
];

const products = [
  {
    name: "Greece White",
    swatch: "#F0EDE8",
    desc: "A clean, modern white finish that brings brightness and elegance to any outdoor space.",
    colorParam: "white",
  },
  {
    name: "Anthracite Grey",
    swatch: "#3D3D3D",
    desc: "A bold, architectural dark finish that makes a statement of refined sophistication.",
    colorParam: "grey",
  },
];

const comparison = [
  { feature: "Configuration", single: "Single Bay", double: "Double Bay" },
  { feature: "Available Sizes", single: "3×3m, 3×4m", double: "4×4m, 4×6m" },
  { feature: "Posts", single: "4", double: "6" },
  { feature: "Louver Zones", single: "1", double: "2 (independent)" },
  { feature: "LED Strips", single: "2", double: "4" },
  { feature: "Max Span", single: "4m", double: "6m" },
];

export default function Products() {
  return (
    <div className="pt-20">
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h1 className="heading-display text-5xl md:text-6xl mb-4">Our Pergolas</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Two timeless finishes. Infinite possibilities.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {products.map((p, i) => (
              <AnimatedSection key={p.name} delay={i * 0.15}>
                <div className="glass-card overflow-hidden hover-lift">
                  <div
                    className="h-48"
                    style={{ backgroundColor: p.swatch }}
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="w-5 h-5 rounded-full border border-border"
                        style={{ backgroundColor: p.swatch }}
                      />
                      <h3 className="font-heading text-2xl text-foreground">{p.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-6">{p.desc}</p>

                    <ul className="space-y-2 mb-6">
                      {specs.map((s) => (
                        <li key={s} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check size={14} className="text-primary flex-shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>

                    <div className="text-xs text-muted-foreground mb-6">
                      Available in: 3×3m, 3×4m, 4×4m, 4×6m
                    </div>

                    <Link
                      to={`/configurator?color=${p.colorParam}`}
                      className="btn-primary-glow inline-flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-medium"
                    >
                      Configure This <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <AnimatedSection className="text-center mb-12">
            <h2 className="heading-display text-3xl md:text-4xl mb-4">Single Bay vs Double Bay</h2>
          </AnimatedSection>

          <AnimatedSection>
            <div className="glass-card overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-muted-foreground font-medium">Feature</th>
                    <th className="text-center p-4 text-foreground font-medium">Single Bay</th>
                    <th className="text-center p-4 text-foreground font-medium">Double Bay</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row) => (
                    <tr key={row.feature} className="border-b border-border/50">
                      <td className="p-4 text-muted-foreground">{row.feature}</td>
                      <td className="p-4 text-center text-foreground">{row.single}</td>
                      <td className="p-4 text-center text-foreground">{row.double}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
