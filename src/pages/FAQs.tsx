import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

const faqs = [
  { q: "What sizes are available?", a: "We offer four standard sizes: 3×3m, 3×4m (single bay), and 4×4m, 4×6m (double bay). Custom sizes may be available upon request." },
  { q: "Can I customize the size?", a: "Yes, we can accommodate custom dimensions for an additional fee. Contact us with your requirements and we'll provide a quote." },
  { q: "What colors are offered?", a: "Our pergolas come in two premium finishes: Greece White (#F0EDE8) and Anthracite Grey (#3D3D3D), both powder-coated for durability." },
  { q: "How is it installed?", a: "Our professional installation team handles everything. Typical installation takes 1-2 days depending on the size and site conditions." },
  { q: "Is it weatherproof?", a: "Absolutely. Our pergolas feature a self-drainage system, weatherproof LED lighting, and aviation-grade aluminum that withstands Canadian winters." },
  { q: "What is the warranty?", a: "We offer a comprehensive warranty on all structural components, powder coating, and electrical systems. Contact us for full warranty details." },
  { q: "Do you ship across Canada?", a: "Yes, we ship nationwide across Canada. Shipping costs vary by location. Installation services are currently available in the Greater Toronto Area." },
  { q: "How long does installation take?", a: "Most installations are completed within 1-2 business days. Larger double-bay configurations may take up to 3 days." },
];

export default function FAQs() {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    document.title = "Pergola FAQ — Pricing, Installation & Warranty | PRGLA";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Answers to common questions about PRGLA aluminum pergolas — sizes, pricing, installation timeline, weatherproofing, warranty, and shipping across Canada.");
  }, []);

  return (
    <div className="pt-20">
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-2xl">
          <AnimatedSection className="text-center mb-16">
            <h1 className="heading-display text-5xl md:text-6xl mb-4">FAQ</h1>
            <p className="text-muted-foreground">Common questions about our pergolas.</p>
          </AnimatedSection>

          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full text-left glass-card p-5 rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground text-sm">{faq.q}</span>
                    <motion.span
                      animate={{ rotate: open === i ? 45 : 0 }}
                      className="text-primary text-lg flex-shrink-0 ml-4"
                    >
                      +
                    </motion.span>
                  </div>
                  <AnimatePresence>
                    {open === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
