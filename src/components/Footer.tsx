import { Link } from "react-router-dom";
import { Phone, Mail, Facebook, Instagram, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <span className="font-heading text-2xl font-semibold tracking-wider text-foreground">
              PRGLA
            </span>
            <p className="mt-4 text-muted-foreground text-sm max-w-md">
              Premium aviation-grade aluminum pergolas with smart louvered roofs,
              built-in LED lighting, and Canadian craftsmanship.
            </p>
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
