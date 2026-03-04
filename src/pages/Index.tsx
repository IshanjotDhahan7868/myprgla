import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown, Shield, SunDim, Droplets, Lightbulb, Palette, Wrench,
  ArrowRight, Phone, Mail, Star, Award, MapPin, CheckCircle } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import OptimizedImage from "@/components/OptimizedImage";
import { USE_CASE_IMAGES, PROJECT_IMAGES, IMAGES } from "@/lib/images";
import { sendEmail } from "@/lib/emailjs";
import { toast } from "sonner";

import PergolaScene from "@/components/PergolaScene";

const features = [
  { icon: Shield, title: "Aviation-Grade Aluminum", desc: "6063-T5 alloy — engineered for Ontario's -30°C winters and 35°C summers" },
  { icon: SunDim, title: "Motorized Louvers", desc: "Open for sun, close for rain — one button controls your comfort" },
  { icon: Lightbulb, title: "Built-in LEDs", desc: "Weatherproof ambient lighting for evenings that never end" },
  { icon: Droplets, title: "Self-Drainage", desc: "Engineered internal channel system — zero pooling, zero maintenance" },
  { icon: Palette, title: "Powder-Coated", desc: "Durable finish in Greece White or Anthracite Grey" },
  { icon: Wrench, title: "SS 304 Hardware", desc: "Stainless steel fasteners throughout — nothing rusts, ever" },
];

const sizes = [
  { dims: "3m × 3m", type: "Single Bay", area: "9 m²" },
  { dims: "3m × 4m", type: "Single Bay", area: "12 m²" },
  { dims: "4m × 4m", type: "Double Bay", area: "16 m²" },
  { dims: "4m × 6m", type: "Double Bay", area: "24 m²" },
];

const useCases = [
  { title: "Extend Your Home", desc: "A wall-mounted PRGLA adds 100–250 sq ft of living space — for a fraction of a home addition." },
  { title: "Hot Tub All Year", desc: "Rain, snow, or sun — your hot tub is always ready. No more dragging covers." },
  { title: "Host Like You Mean It", desc: "The backyard dinner party that runs until midnight, rain or shine. That's a PRGLA." },
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

const trustBadges = [
  { icon: Award, label: "5-Year Structural Warranty" },
  { icon: Wrench, label: "Installed in 1–2 Days" },
  { icon: MapPin, label: "Proudly Canadian" },
];

const testimonials = [
  {
    quote: "We went from never using our backyard to hosting dinner out there every weekend. Our neighbours keep asking who built it.",
    name: "Sarah & Mike T.",
    location: "Oakville, ON",
  },
  {
    quote: "Installed in 2 days, looks like it cost double what we paid. The LED lighting at night turns our patio into a resort.",
    name: "David R.",
    location: "Vaughan, ON",
  },
  {
    quote: "We used our pergola through the entire fall and winter. Best money we've ever spent on our home — and that includes the kitchen reno.",
    name: "Jennifer L.",
    location: "Caledon, ON",
  },
];

const howItWorks = [
  { step: "1", title: "Design It", desc: "Build your dream pergola in our 3D configurator. See exactly what it looks like before we build it." },
  { step: "2", title: "We Quote It", desc: "Get a detailed quote within 48 hours. No surprises, no hidden fees." },
  { step: "3", title: "We Install It", desc: "Our crew installs in 1–2 days. You just show up to enjoy it." },
];

const wordVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: 0.3 + i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Index() {
  const headlineWords = ["Stop", "Wasting", "Your", "Backyard"];

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSending, setNewsletterSending] = useState(false);
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  useEffect(() => {
    document.title = "PRGLA — Premium Aluminum Pergolas | Toronto & GTA | Louvered Roofs";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", "PRGLA builds premium aviation-grade aluminum pergolas with motorized louvered roofs, built-in LED lighting, and 5-year warranty. Serving Toronto, Oakville, Vaughan, Caledon & the GTA. Installed in days.");
    }
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSending(true);
    try {
      await sendEmail("newsletter", { email: newsletterEmail });
      setNewsletterSubscribed(true);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setNewsletterSending(false);
    }
  };

  return (
    <div>
      {/* HERO with 3D pergola */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Scene background */}
        <div className="absolute inset-0">
          <Suspense fallback={<div className="w-full h-full bg-background" />}>
            <PergolaScene
              color="#F0EDE8"
              width={4}
              depth={4}
              louverAngle={0}
              ledsOn={true}
              modelType="louvered"
              sideWall="off"
              roofTint="clear"
              sceneMode="studio"
              autoRotate
              autoRotateSpeed={0.3}
              interactive={false}
            />
          </Suspense>
        </div>

        {/* Gradient overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background/90 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60 pointer-events-none" />

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-primary text-sm font-medium tracking-wider uppercase mb-6"
          >
            GTA's Premier Luxury Pergola
          </motion.p>

          <h1 className="heading-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-6">
            {headlineWords.map((word, i) => (
              <motion.span
                key={word}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={wordVariants}
                className={`inline-block mr-3 md:mr-5 ${
                  i >= 2 ? "text-gold-gradient" : ""
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
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-4 font-light"
          >
            Motorized aluminum pergolas that turn your backyard into a year-round
            living space. Engineered for Canadian weather. Installed in days, not months.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.5 }}
            className="text-muted-foreground/70 text-sm max-w-lg mx-auto mb-10"
          >
            From $199/month • 5-Year Warranty • Full-Service Installation
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/configurator"
              className="btn-primary-glow px-8 py-3.5 rounded-md text-sm font-medium flex items-center justify-center gap-2"
            >
              Design Yours in 3D <ArrowRight size={16} />
            </Link>
            <Link
              to="/quote"
              className="px-8 py-3.5 rounded-md text-sm font-medium border border-border text-foreground hover:bg-muted transition-colors text-center"
            >
              Get a Free Quote
            </Link>
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

      {/* TRUST BADGES */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 md:gap-16">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                <badge.icon size={20} className="text-primary" />
                <span className="font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 border-b border-border">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="heading-display text-4xl md:text-5xl mb-4">Built to Outlast Everything</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">Every component is designed for Canadian weather, zero maintenance, and decades of use.</p>
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
              See Exactly What Yours Will Look Like
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-10">
              Pick your size, color, and features in our interactive 3D configurator.
              No guessing. No surprises. Design it yourself in under 2 minutes.
            </p>
            <Link
              to="/configurator"
              className="btn-primary-glow inline-flex items-center gap-2 px-10 py-4 rounded-md text-base font-medium"
            >
              Build Yours Now <ArrowRight size={18} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="heading-display text-4xl md:text-5xl mb-4">From Bare Backyard to Backyard Resort</h2>
            <p className="text-muted-foreground">We handle everything. You just show up to enjoy it.</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {howItWorks.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.15}>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-heading text-lg font-bold">{item.step}</span>
                  </div>
                  <h3 className="font-heading text-xl mb-2 text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
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
            <h2 className="heading-display text-4xl md:text-5xl mb-4">Your Neighbours Will Ask Who Built It</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {useCases.map((uc, i) => (
              <AnimatedSection key={uc.title} delay={i * 0.1}>
                <div className="glass-card overflow-hidden hover-lift group">
                  <OptimizedImage
                    src={USE_CASE_IMAGES[i]}
                    alt={uc.title}
                    className="h-40 sm:h-48 w-full group-hover:scale-105 transition-transform duration-500"
                  />
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
                  <OptimizedImage
                    src={PROJECT_IMAGES[i]}
                    alt={`${p.location} — ${p.caption}`}
                    className="aspect-[4/3] w-full group-hover:scale-105 transition-transform duration-500"
                  />
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

      {/* TESTIMONIALS */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="heading-display text-4xl md:text-5xl mb-4">Don't Take Our Word For It</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <AnimatedSection key={t.name} delay={i * 0.1}>
                <div className="glass-card p-6 hover-lift">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={14} className="text-primary fill-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 italic">"{t.quote}"</p>
                  <div>
                    <p className="text-sm font-medium text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.location}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
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

            {newsletterSubscribed ? (
              <div className="flex items-center justify-center gap-2 text-primary">
                <CheckCircle size={18} />
                <span className="text-sm font-medium">Thanks for subscribing!</span>
              </div>
            ) : (
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 bg-muted border border-border rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  type="submit"
                  disabled={newsletterSending}
                  className="btn-primary-glow px-6 py-2.5 rounded-md text-sm font-medium disabled:opacity-50"
                >
                  {newsletterSending ? "Sending…" : "Subscribe"}
                </button>
              </form>
            )}
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
