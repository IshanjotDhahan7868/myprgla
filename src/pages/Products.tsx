import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import OptimizedImage from "@/components/OptimizedImage";
import { IMAGES } from "@/lib/images";

const specs = [
  "Aluminum Alloy 6063-T5",
  "Powder-coated finish",
  "Integrated LED lighting",
  "Stainless Steel 304 hardware",
  "Self-drainage system",
  "Button-controlled louvers",
];

const skyvueSpecs = [
  "Aluminum Alloy 6063-T5",
  "Powder-coated finish",
  "Integrated LED lighting",
  "Stainless Steel 304 hardware",
  "Self-drainage system",
  "Fixed polycarbonate panels",
];

const products = [
  {
    name: "Greece White",
    image: IMAGES.productWhite,
    desc: "A clean, modern white finish that brings brightness and elegance to any outdoor space.",
    colorParam: "white",
    specs,
  },
  {
    name: "Anthracite Grey",
    image: IMAGES.productGrey,
    desc: "A bold, architectural dark finish that makes a statement of refined sophistication.",
    colorParam: "grey",
    specs,
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

const included = [
  "Complete aluminum frame & roof system",
  "Integrated LED light strips",
  "Motorized louver control (PRGLA) or fixed polycarbonate panels (SkyVue)",
  "Stainless steel 304 hardware kit",
  "Self-drainage gutter system",
  "Professional installation",
  "5-year structural warranty",
];

export default function Products() {
  useEffect(() => {
    document.title = "Aluminum Pergolas — Louvered & Polycarbonate | PRGLA Products";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Explore PRGLA's premium aluminum pergolas — motorized louvered roofs and SkyVue polycarbonate models in Greece White and Anthracite Grey. 5-year warranty, professional installation in the GTA.");
  }, []);

  return (
    <div className="pt-20">
      {/* PRGLA LOUVERED */}
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
                  <OptimizedImage
                    src={p.image}
                    alt={`PRGLA Pergola — ${p.name}`}
                    className="h-40 sm:h-48 w-full"
                  />
                  <div className="p-6">
                    <h3 className="font-heading text-2xl text-foreground mb-3">{p.name}</h3>
                    <p className="text-sm text-muted-foreground mb-6">{p.desc}</p>

                    <ul className="space-y-2 mb-6">
                      {p.specs.map((s) => (
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

      {/* SKYVUE POLYCARBONATE */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <AnimatedSection className="text-center mb-12">
            <h2 className="heading-display text-3xl md:text-4xl mb-4">SkyVue Polycarbonate</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Fixed clear or tinted panels for a bright, weather-protected roof. Perfect for year-round outdoor living.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="glass-card p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-heading text-xl mb-4 text-foreground">Features</h3>
                  <ul className="space-y-2">
                    {skyvueSpecs.map((s) => (
                      <li key={s} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check size={14} className="text-primary flex-shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Link
                      to="/configurator?model=skyvue"
                      className="btn-primary-glow inline-flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-medium"
                    >
                      Configure SkyVue <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="glass-card p-4">
                    <h4 className="text-sm font-medium text-foreground mb-1">Clear Panels</h4>
                    <p className="text-xs text-muted-foreground">Maximum light transmission while blocking rain, snow, and UV.</p>
                  </div>
                  <div className="glass-card p-4">
                    <h4 className="text-sm font-medium text-foreground mb-1">Smoke Tinted</h4>
                    <p className="text-xs text-muted-foreground">Reduced glare with a modern aesthetic and UV protection.</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <AnimatedSection className="text-center mb-12">
            <h2 className="heading-display text-3xl md:text-4xl mb-4">What's Included</h2>
            <p className="text-muted-foreground">Every PRGLA pergola comes complete — no hidden costs.</p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="glass-card p-6 md:p-8">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check size={14} className="text-primary flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* MATERIAL DETAILS */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <AnimatedSection className="text-center mb-12">
            <h2 className="heading-display text-3xl md:text-4xl mb-4">Material Details</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatedSection delay={0}>
              <div className="glass-card overflow-hidden hover-lift">
                <OptimizedImage
                  src={IMAGES.detailAluminum}
                  alt="Aviation-grade aluminum detail"
                  className="h-48 w-full"
                />
                <div className="p-4">
                  <h3 className="font-heading text-lg text-foreground mb-1">Aviation-Grade Aluminum</h3>
                  <p className="text-xs text-muted-foreground">6063-T5 alloy with powder-coated finish for maximum durability.</p>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="glass-card overflow-hidden hover-lift">
                <OptimizedImage
                  src={IMAGES.detailLED}
                  alt="Integrated LED lighting detail"
                  className="h-48 w-full"
                />
                <div className="p-4">
                  <h3 className="font-heading text-lg text-foreground mb-1">Integrated LED Lighting</h3>
                  <p className="text-xs text-muted-foreground">Weatherproof LED strips built into the beam undersides.</p>
                </div>
              </div>
            </AnimatedSection>
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
            <div className="glass-card overflow-x-auto">
              <table className="w-full text-sm min-w-[400px]">
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
