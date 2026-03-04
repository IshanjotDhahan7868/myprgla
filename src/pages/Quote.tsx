import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { sendEmail } from "@/lib/emailjs";
import { toast } from "sonner";

export default function QuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", size: "3x3", color: "white", notes: "",
  });

  useEffect(() => {
    document.title = "Get a Free Pergola Quote — PRGLA | Toronto & GTA";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Get a free detailed quote for your premium aluminum pergola within 48 hours. Serving Toronto, Oakville, Vaughan, Caledon, and the Greater Toronto Area.");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await sendEmail("quote", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        size: form.size,
        color: form.color,
        notes: form.notes,
      });
      setSubmitted(true);
    } catch {
      toast.error("Something went wrong. Please try again or call us directly.");
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
            <Check size={32} className="text-primary" />
          </div>
          <h2 className="heading-display text-4xl mb-2">Thank You!</h2>
          <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-lg">
          <AnimatedSection className="text-center mb-12">
            <h1 className="heading-display text-5xl md:text-6xl mb-4">Get a Quote</h1>
            <p className="text-muted-foreground">Tell us about your project and we'll prepare a custom quote.</p>
          </AnimatedSection>

          <AnimatedSection>
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { label: "Name", type: "text", key: "name" },
                { label: "Email", type: "email", key: "email" },
                { label: "Phone", type: "tel", key: "phone" },
              ].map((field) => (
                <motion.div key={field.key} whileFocus={{ scale: 1.01 }}>
                  <label className="text-sm text-muted-foreground mb-1.5 block">{field.label}</label>
                  <input
                    type={field.type}
                    required
                    value={form[field.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    className="w-full bg-muted border border-border rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </motion.div>
              ))}

              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Pergola Size</label>
                <select
                  value={form.size}
                  onChange={(e) => setForm({ ...form, size: e.target.value })}
                  className="w-full bg-muted border border-border rounded-md px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="3x3">3m × 3m (Single Bay)</option>
                  <option value="3x4">3m × 4m (Single Bay)</option>
                  <option value="4x4">4m × 4m (Double Bay)</option>
                  <option value="4x6">4m × 6m (Double Bay)</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Color Preference</label>
                <select
                  value={form.color}
                  onChange={(e) => setForm({ ...form, color: e.target.value })}
                  className="w-full bg-muted border border-border rounded-md px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="white">Greece White</option>
                  <option value="grey">Anthracite Grey</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Additional Notes</label>
                <textarea
                  rows={4}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full bg-muted border border-border rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="btn-primary-glow w-full px-6 py-3.5 rounded-md text-sm font-medium disabled:opacity-50"
              >
                {sending ? "Sending…" : "Submit Request"}
              </button>
            </form>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
