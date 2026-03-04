import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown, Shield, SunDim, Droplets, Lightbulb, Palette, Wrench,
  ArrowRight, Quote, Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import heroBg from "@/assets/hero-pergola.jpg";

const features = [
  { icon: Shield, title: "Aviation-Grade Aluminum", desc: "6063-T5 alloy for maximum strength & longevity" },
  { icon: SunDim, title: "Louvered Roof", desc: "Button-controlled louvers for sun & rain" },
  { icon: Lightbulb, title: "Built-in LEDs", desc: "Weatherproof integrated LED lighting" },
  { icon: Droplets, title: "Self-Drainage", desc: "Engineered internal water channel system" },
  { icon: Palette, title: "Powder-Coated", desc: "Durable finish in White or Anthracite" },
  { icon: Wrench, title: "SS 304 Hardware", desc: "Stainless steel fasteners throughout" },
];

const sizes = [
  { dims: "3m × 3m", type: "Single Bay", area: "9 m²" },
  { dims: "3m × 4m", type: "Single Bay", area: "12 m²" },
  { dims: "4m × 4m", type: "Double Bay", area: "16 m²" },
  { dims: "4m × 6m", type: "Double Bay", area: "24 m²" },
];

const useCases = [
  { title: "Attach to a Wall", desc: "Seamless extension of your indoor living space with a wall-mounted pergola." },
  { title: "Cover Your Hot Tub", desc: "Year-round protection for your hot tub or swim spa with adjustable shade." },
  { title: "Outdoor Dining Area", desc: "Create the perfect BBQ and dining space with weather-controlled coverage." },
];

const projects = [
  { location: "Waterloo, ON", caption: "4×6m Double Bay — Anthracite Grey" },
  { location: "Forest Hill, Toronto", caption: "3×4m Wall Mount — Greece White" },
  { location: "Oakville, ON", caption: "4×4m Freestanding — Anthracite Grey" },
  { location: "Caledon, ON", caption: "3×3m Hot Tub Cover — Greece White" },
  { location: "Vaughan, ON", caption: "4×6m Patio — Anthracite Grey" },
  { location: "Muskoka, ON", caption: "3×4m Lakeside — Greece White" },
];

const partners = ["CH Design Co.", "Ruby Concrete", "Vaughan Electric", "Altru Design Studio"];

const wordVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: 0.3 + i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Index() {
  const headlineWords = ["Redefine", "Your", "Outdoor", "Living"];

  return (
    <div>
      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-background/70" />

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="heading-display text-5xl md:text-7xl lg:text-8xl mb-6">
            {headlineWords.map((word, i) => (
              <motion.span
                key={word}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={wordVariants}
                className={`inline-block mr-3 md:mr-5 ${
                  i === 2 || i === 3 ? "text-gold-gradient" : ""
                }`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light"
          >
            Aviation-grade aluminum pergolas with smart louvered roofs, LED
            lighting, and Canadian craftsmanship.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/configurator"
              className="btn-primary-glow px-8 py-3 rounded-md text-sm font-medium flex items-center justify-center gap-2"
            >
              Configure Yours <ArrowRight size={16} />
            </Link>
            <a
              href="#features"
              className="px-8 py-3 rounded-md text-sm font-medium border border-border text-foreground hover:bg-muted transition-colors text-center"
            >
              View Products
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown size={24} className="text-muted-foreground" />
          </motion.div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 border-b border-border">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="heading-display text-4xl md:text-5xl mb-4">Engineered Excellence</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">Every detail is designed for durability, beauty, and performance.</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 0.1}>
                <div className="glass-card p-6 hover-lift group">
                  <f.icon size={28} className="text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-heading text-xl mb-2 text-foreground">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CONFIGURATOR TEASER */}
      <section className="py-24 grid-bg relative">
        <div className="absolute inset-0 bg-background/80" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="heading-display text-4xl md:text-5xl mb-4">
              See It Before You Build It
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-10">
              Customize your pergola in real time — choose size, color, and louver angle in our interactive 3D configurator.
            </p>
            <Link
              to="/configurator"
              className="btn-primary-glow inline-flex items-center gap-2 px-10 py-4 rounded-md text-base font-medium"
            >
              Launch Configurator <ArrowRight size={18} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* STANDARD SIZES */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="heading-display text-4xl md:text-5xl mb-4">Standard Sizes</h2>
            <p className="text-muted-foreground">Available in Greece White & Anthracite Grey</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sizes.map((s, i) => (
              <AnimatedSection key={s.dims} delay={i * 0.1}>
                <div className="glass-card p-6 hover-lift text-center">
                  <span className="text-xs font-medium uppercase tracking-wider text-primary">{s.type}</span>
                  <h3 className="font-heading text-3xl mt-2 mb-1 text-foreground">{s.dims}</h3>
                  <p className="text-sm text-muted-foreground mb-6">{s.area} coverage</p>
                  <Link
                    to="/quote"
                    className="text-sm font-medium text-primary hover:text-gold-light transition-colors"
                  >
                    Get Quote →
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="heading-display text-4xl md:text-5xl mb-4">Perfect For Every Space</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {useCases.map((uc, i) => (
              <AnimatedSection key={uc.title} delay={i * 0.1}>
                <div className="glass-card overflow-hidden hover-lift group">
                  {/* Placeholder for real photo */}
                  <div className="h-48 bg-gradient-to-br from-muted to-card group-hover:scale-105 transition-transform duration-500" />
                  <div className="p-6">
                    <h3 className="font-heading text-2xl mb-2 text-foreground">{uc.title}</h3>
                    <p className="text-sm text-muted-foreground">{uc.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="heading-display text-4xl md:text-5xl mb-4">Past Projects</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((p, i) => (
              <AnimatedSection key={p.location} delay={i * 0.08}>
                <div className="relative group overflow-hidden rounded-lg cursor-pointer">
                  {/* Placeholder for real project photo */}
                  <div className={`aspect-[4/3] ${
                    i % 2 === 0
                      ? "bg-gradient-to-br from-charcoal to-muted"
                      : "bg-gradient-to-br from-muted to-card"
                  } group-hover:scale-105 transition-transform duration-500`} />
                  <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                    <span className="text-primary font-medium text-sm">{p.location}</span>
                    <span className="text-muted-foreground text-xs mt-1">{p.caption}</span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-10">
            <Link
              to="/products"
              className="text-sm font-medium text-primary hover:text-gold-light transition-colors"
            >
              View All Projects →
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* PARTNERS MARQUEE */}
      <section className="py-12 border-b border-border overflow-hidden">
        <div className="flex">
          <div className="marquee flex items-center gap-16 whitespace-nowrap">
            {[...partners, ...partners].map((p, i) => (
              <span key={i} className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT / NEWSLETTER */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <AnimatedSection>
            <h2 className="heading-display text-4xl md:text-5xl mb-4">Let's Talk</h2>
            <p className="text-muted-foreground mb-8">
              Based in Caledon, Ontario — serving the Greater Toronto Area and beyond.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12 text-sm text-muted-foreground">
              <a href="tel:6476486383" className="flex items-center gap-2 hover:text-foreground transition-colors justify-center">
                <Phone size={14} /> 647-648-6383
              </a>
              <a href="mailto:metalpergolas@gmail.com" className="flex items-center gap-2 hover:text-foreground transition-colors justify-center">
                <Mail size={14} /> metalpergolas@gmail.com
              </a>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-2 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-muted border border-border rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="submit"
                className="btn-primary-glow px-6 py-2.5 rounded-md text-sm font-medium"
              >
                Subscribe
              </button>
            </form>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
