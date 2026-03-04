import { useState, Suspense } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { RotateCcw, Sun, SunDim, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PergolaScene from "@/components/PergolaScene";

const colorOptions = [
  { label: "Greece White", value: "#F0EDE8", key: "white" },
  { label: "Anthracite Grey", value: "#3D3D3D", key: "grey" },
];

const sizeOptions = [
  { label: "3×3m", width: 3, depth: 3 },
  { label: "3×4m", width: 3, depth: 4 },
  { label: "4×4m", width: 4, depth: 4 },
  { label: "4×6m", width: 4, depth: 6 },
];

export default function Configurator() {
  const [searchParams] = useSearchParams();
  const initialColor = searchParams.get("color") === "grey" ? 1 : 0;

  const [colorIdx, setColorIdx] = useState(initialColor);
  const [sizeIdx, setSizeIdx] = useState(0);
  const [louverAngle, setLouverAngle] = useState(30);
  const [ledsOn, setLedsOn] = useState(false);
  const [showQuote, setShowQuote] = useState(false);

  const currentColor = colorOptions[colorIdx];
  const currentSize = sizeOptions[sizeIdx];

  return (
    <div className="pt-16 min-h-screen flex flex-col lg:flex-row">
      {/* Controls Panel */}
      <div className="lg:w-80 flex-shrink-0 bg-card border-r border-border p-6 lg:pt-8 order-2 lg:order-1 overflow-y-auto">
        <h2 className="font-heading text-2xl mb-6 text-foreground">Configure</h2>

        {/* Color */}
        <div className="mb-6">
          <label className="text-xs uppercase tracking-wider text-muted-foreground mb-3 block">Color</label>
          <div className="flex gap-3">
            {colorOptions.map((c, i) => (
              <button
                key={c.key}
                onClick={() => setColorIdx(i)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md border text-sm transition-all ${
                  colorIdx === i
                    ? "border-primary bg-muted text-foreground"
                    : "border-border text-muted-foreground hover:border-muted-foreground"
                }`}
              >
                <span
                  className="w-4 h-4 rounded-full border border-border"
                  style={{ backgroundColor: c.value }}
                />
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Size */}
        <div className="mb-6">
          <label className="text-xs uppercase tracking-wider text-muted-foreground mb-3 block">Size</label>
          <div className="grid grid-cols-2 gap-2">
            {sizeOptions.map((s, i) => (
              <button
                key={s.label}
                onClick={() => setSizeIdx(i)}
                className={`px-3 py-2 rounded-md border text-sm transition-all ${
                  sizeIdx === i
                    ? "border-primary bg-muted text-foreground"
                    : "border-border text-muted-foreground hover:border-muted-foreground"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Louver Angle */}
        <div className="mb-6">
          <label className="text-xs uppercase tracking-wider text-muted-foreground mb-3 block">
            Louver Angle — {louverAngle}°
          </label>
          <input
            type="range"
            min={0}
            max={90}
            value={louverAngle}
            onChange={(e) => setLouverAngle(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Closed</span>
            <span>Open</span>
          </div>
        </div>

        {/* LED Toggle */}
        <div className="mb-8">
          <label className="text-xs uppercase tracking-wider text-muted-foreground mb-3 block">LED Lighting</label>
          <button
            onClick={() => setLedsOn(!ledsOn)}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-md border text-sm transition-all w-full ${
              ledsOn
                ? "border-primary bg-muted text-foreground"
                : "border-border text-muted-foreground"
            }`}
          >
            {ledsOn ? <Sun size={16} className="text-primary" /> : <SunDim size={16} />}
            {ledsOn ? "LEDs On" : "LEDs Off"}
          </button>
        </div>

        {/* Summary */}
        <div className="glass-card p-4 mb-4">
          <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Configuration</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Color</span>
              <span className="text-foreground">{currentColor.label}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Size</span>
              <span className="text-foreground">{currentSize.label}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Louver</span>
              <span className="text-foreground">{louverAngle}°</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">LEDs</span>
              <span className="text-foreground">{ledsOn ? "On" : "Off"}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowQuote(true)}
          className="btn-primary-glow w-full px-6 py-3 rounded-md text-sm font-medium flex items-center justify-center gap-2"
        >
          Request Quote <ArrowRight size={14} />
        </button>
      </div>

      {/* 3D Canvas */}
      <div className="flex-1 relative order-1 lg:order-2 min-h-[50vh] lg:min-h-0">
        <Suspense
          fallback={
            <div className="absolute inset-0 flex items-center justify-center bg-background">
              <span className="text-muted-foreground text-sm">Loading 3D view…</span>
            </div>
          }
        >
          <PergolaScene
            color={currentColor.value}
            width={currentSize.width}
            depth={currentSize.depth}
            louverAngle={louverAngle}
            ledsOn={ledsOn}
          />
        </Suspense>

        <div className="absolute top-4 right-4 text-xs text-muted-foreground bg-card/80 backdrop-blur-sm px-3 py-1.5 rounded-md border border-border">
          Drag to rotate • Scroll to zoom
        </div>
      </div>

      {/* Quote Modal */}
      <AnimatePresence>
        {showQuote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            onClick={() => setShowQuote(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card p-6 w-full max-w-md"
            >
              <h3 className="font-heading text-2xl mb-4 text-foreground">Request a Quote</h3>
              <p className="text-xs text-muted-foreground mb-4">
                Config: {currentColor.label}, {currentSize.label}, Louver {louverAngle}°, LEDs {ledsOn ? "On" : "Off"}
              </p>
              <form onSubmit={(e) => { e.preventDefault(); setShowQuote(false); }} className="space-y-3">
                <input placeholder="Name" required className="w-full bg-muted border border-border rounded-md px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                <input placeholder="Email" type="email" required className="w-full bg-muted border border-border rounded-md px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                <input placeholder="Phone" type="tel" className="w-full bg-muted border border-border rounded-md px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                <textarea placeholder="Additional notes…" rows={3} className="w-full bg-muted border border-border rounded-md px-4 py-2.5 text-sm text-foreground resize-none focus:outline-none focus:ring-1 focus:ring-primary" />
                <div className="flex gap-2">
                  <button type="submit" className="btn-primary-glow flex-1 px-6 py-2.5 rounded-md text-sm font-medium">
                    Send Request
                  </button>
                  <button type="button" onClick={() => setShowQuote(false)} className="px-4 py-2.5 rounded-md text-sm border border-border text-muted-foreground hover:text-foreground transition-colors">
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
