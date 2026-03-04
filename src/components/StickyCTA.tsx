import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  const hidden = location.pathname === "/configurator";

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && !hidden && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-lg border-t border-border py-3 px-4"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          <div className="container mx-auto flex items-center justify-center gap-3 max-w-lg">
            <Link
              to="/configurator"
              className="btn-primary-glow flex-1 px-4 py-3 rounded-md text-sm font-medium flex items-center justify-center gap-2"
            >
              Build Yours <ArrowRight size={14} />
            </Link>
            <a
              href="tel:6476486383"
              className="flex-1 px-4 py-3 rounded-md text-sm font-medium border border-border text-foreground hover:bg-muted transition-colors flex items-center justify-center gap-2"
            >
              <Phone size={14} /> Call Now
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
