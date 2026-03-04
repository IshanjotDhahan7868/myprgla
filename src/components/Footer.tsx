import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, Facebook, Instagram, MapPin, ArrowRight, CheckCircle, Check } from "lucide-react";
import { sendEmail } from "@/lib/emailjs";
import { toast } from "sonner";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  // Consultation form state
  const [showConsultForm, setShowConsultForm] = useState(false);
  const [consultForm, setConsultForm] = useState({ name: "", email: "", phone: "" });
  const [consultSending, setConsultSending] = useState(false);
  const [consultSent, setConsultSent] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSending(true);
    try {
      await sendEmail("newsletter", { email });
      setSubscribed(true);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const handleConsultSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setConsultSending(true);
    try {
      await sendEmail("quote", {
        name: consultForm.name,
        email: consultForm.email,
        phone: consultForm.phone,
        notes: "Free consultation request from footer",
        size: "",
        color: "",
      });
      setConsultSent(true);
    } catch {
      toast.error("Something went wrong. Please try again or call us directly.");
    } finally {
      setConsultSending(false);
    }
  };

  return (
    <footer className="border-t border-border bg-card">
      {/* Free Consultation CTA */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 lg:px-8 py-12 text-center">
          <h3 className="font-heading text-2xl md:text-3xl mb-3 text-foreground">Your Backyard Is Waiting</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            Free design consultation. Quote in 48 hours. Installed in days. What are you waiting for?
          </p>

          {consultSent ? (
            <div className="flex items-center justify-center gap-2 text-primary">
              <Check size={20} />
              <span className="text-sm font-medium">We'll be in touch within 24 hours!</span>
            </div>
          ) : showConsultForm ? (
            <form onSubmit={handleConsultSubmit} className="max-w-sm mx-auto space-y-3">
              <input
                placeholder="Your name"
                required
                value={consultForm.name}
                onChange={(e) => setConsultForm({ ...consultForm, name: e.target.value })}
                className="w-full bg-muted border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <input
                placeholder="Email address"
                type="email"
                required
                value={consultForm.email}
                onChange={(e) => setConsultForm({ ...consultForm, email: e.target.value })}
                className="w-full bg-muted border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <input
                placeholder="Phone number"
                type="tel"
                required
                value={consultForm.phone}
                onChange={(e) => setConsultForm({ ...consultForm, phone: e.target.value })}
                className="w-full bg-muted border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={consultSending}
                  className="btn-primary-glow flex-1 px-6 py-3 rounded-md text-sm font-medium disabled:opacity-50"
                >
                  {consultSending ? "Sending…" : "Get My Free Consultation"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowConsultForm(false)}
                  className="px-4 py-3 rounded-md text-sm border border-border text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => setShowConsultForm(true)}
                className="btn-primary-glow px-6 py-2.5 rounded-md text-sm font-medium inline-flex items-center justify-center gap-2"
              >
                Free Consultation <ArrowRight size={14} />
              </button>
              <a
                href="tel:6476486383"
                className="px-6 py-2.5 rounded-md text-sm font-medium border border-border text-foreground hover:bg-muted transition-colors inline-flex items-center justify-center gap-2"
              >
                <Phone size={14} /> 647-648-6383
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="md:col-span-2">
            <span className="font-heading text-2xl font-semibold tracking-wider text-foreground">
              PRGLA
            </span>
            <p className="mt-4 text-muted-foreground text-sm max-w-md">
              Premium aviation-grade aluminum pergolas with smart louvered roofs,
              built-in LED lighting, and Canadian craftsmanship.
            </p>

            {/* Newsletter in footer */}
            <div className="mt-6">
              {subscribed ? (
                <div className="flex items-center gap-2 text-primary text-sm">
                  <CheckCircle size={16} />
                  <span>Thanks for subscribing!</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-muted border border-border rounded-md px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-primary-glow px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
                  >
                    {sending ? "…" : "Subscribe"}
                  </button>
                </form>
              )}
            </div>

            <div className="flex gap-4 mt-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg mb-4 text-foreground">Navigation</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors">Products</Link>
              <Link to="/configurator" className="text-muted-foreground hover:text-foreground transition-colors">Configurator</Link>
              <Link to="/faqs" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</Link>
              <Link to="/quote" className="text-muted-foreground hover:text-foreground transition-colors">Get a Quote</Link>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg mb-4 text-foreground">Contact</h4>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <a href="tel:6476486383" className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Phone size={14} /> 647-648-6383
              </a>
              <a href="mailto:metalpergolas@gmail.com" className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Mail size={14} /> metalpergolas@gmail.com
              </a>
              <span className="flex items-center gap-2">
                <MapPin size={14} /> Caledon, Ontario
              </span>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} PRGLA — Metal Pergolas Canada. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
