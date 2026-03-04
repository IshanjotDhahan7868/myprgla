import { useState, Suspense } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { RotateCcw, Sun, SunDim, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PergolaScene, {
  type CameraView,
  type ModelType,
  type RoofTint,
  type SideWallOption,
  type SceneMode,
} from "@/components/PergolaScene";

const colorOptions = [
  { label: "Greece White", value: "#F0EDE8", key: "white" },
  { label: "Anthracite Grey", value: "#3D3D3D", key: "grey" },
];

const sizeOptions = [
  { label: "3×3m", key: "3x3", width: 3, depth: 3 },
  { label: "3×4m", key: "3x4", width: 3, depth: 4 },
  { label: "4×4m", key: "4x4", width: 4, depth: 4 },
  { label: "4×6m", key: "4x6", width: 4, depth: 6 },
];

export default function Configurator() {
  const [searchParams] = useSearchParams();

  const initialColorKey = searchParams.get("color") ?? "white";
  const initialColorIndex = colorOptions.findIndex((c) => c.key === initialColorKey);
  const safeInitialColorIndex = initialColorIndex >= 0 ? initialColorIndex : 0;

  const initialSizeKey = searchParams.get("size") ?? sizeOptions[0].key;
  const initialSizeIndex = sizeOptions.findIndex((s) => s.key === initialSizeKey);
  const safeInitialSizeIndex = initialSizeIndex >= 0 ? initialSizeIndex : 0;

  const initialModel = (searchParams.get("model") as ModelType) ?? "louvered";
  const initialScene =
    (searchParams.get("scene") as SceneMode) === "outdoor" ? "outdoor" : "studio";
  const initialLouverAngle = Number(searchParams.get("louverAngle") ?? "30");
  const initialLedsOn = searchParams.get("led") === "on";
  const initialSideWall =
    (searchParams.get("sideWall") as SideWallOption) ?? "off";
  const initialRoofTint = (searchParams.get("roofTint") as RoofTint) ?? "clear";

  const [colorIdx, setColorIdx] = useState(safeInitialColorIndex);
  const [sizeIdx, setSizeIdx] = useState(safeInitialSizeIndex);
  const [modelType, setModelType] = useState<ModelType>(initialModel);
  const [louverAngle, setLouverAngle] = useState(initialLouverAngle);
  const [ledsOn, setLedsOn] = useState(initialLedsOn);
  const [sceneMode, setSceneMode] = useState<SceneMode>(initialScene);
  const [sideWall, setSideWall] = useState<SideWallOption>(initialSideWall);
  const [roofTint, setRoofTint] = useState<RoofTint>(initialRoofTint);
  const [cameraView, setCameraView] = useState<CameraView>("corner");
  const [showQuote, setShowQuote] = useState(false);
  const [copied, setCopied] = useState(false);

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
                key={s.key}
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

        {/* Model Type */}
        <div className="mb-6">
          <label className="text-xs uppercase tracking-wider text-muted-foreground mb-3 block">
            Model
          </label>
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => setModelType("louvered")}
              className={`px-3 py-2 rounded-md border text-sm text-left transition-all ${
                modelType === "louvered"
                  ? "border-primary bg-muted text-foreground"
                  : "border-border text-muted-foreground hover:border-muted-foreground"
              }`}
            >
              PRGLA Louvered
              <span className="block text-[11px] text-muted-foreground mt-0.5">
                Adjustable aluminum louvers with angle control
              </span>
            </button>
            <button
              onClick={() => setModelType("skyvue")}
              className={`px-3 py-2 rounded-md border text-sm text-left transition-all ${
                modelType === "skyvue"
                  ? "border-primary bg-muted text-foreground"
                  : "border-border text-muted-foreground hover:border-muted-foreground"
              }`}
            >
              SkyVue Polycarbonate
              <span className="block text-[11px] text-muted-foreground mt-0.5">
                Fixed clear / tinted panels for a bright, weather‑protected roof
              </span>
            </button>
          </div>
        </div>

        {/* Louver Angle (louvered model only) */}
        {modelType === "louvered" && (
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
        )}

        {/* LED Toggle */}
        <div className="mb-6">
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

        {/* Roof Tint (SkyVue only) */}
        {modelType === "skyvue" && (
          <div className="mb-6">
            <label className="text-xs uppercase tracking-wider text-muted-foreground mb-3 block">
              Roof Tint
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setRoofTint("clear")}
                className={`px-3 py-2 rounded-md border text-sm transition-all ${
                  roofTint === "clear"
                    ? "border-primary bg-muted text-foreground"
                    : "border-border text-muted-foreground hover:border-muted-foreground"
                }`}
              >
                Clear
              </button>
              <button
                onClick={() => setRoofTint("smoke")}
                className={`px-3 py-2 rounded-md border text-sm transition-all ${
                  roofTint === "smoke"
                    ? "border-primary bg-muted text-foreground"
                    : "border-border text-muted-foreground hover:border-muted-foreground"
                }`}
              >
                Smoke
              </button>
            </div>
          </div>
        )}

        {/* Side Wall */}
        <div className="mb-8">
          <label className="text-xs uppercase tracking-wider text-muted-foreground mb-3 block">
            Side Wall
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Off", value: "off" as SideWallOption },
              { label: "Left", value: "left" as SideWallOption },
              { label: "Right", value: "right" as SideWallOption },
              { label: "Back", value: "back" as SideWallOption },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSideWall(opt.value)}
                className={`px-3 py-2 rounded-md border text-sm transition-all ${
                  sideWall === opt.value
                    ? "border-primary bg-muted text-foreground"
                    : "border-border text-muted-foreground hover:border-muted-foreground"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Vertical aluminum slats sized to your chosen span.
          </p>
        </div>

        {/* Scene Mode */}
        <div className="mb-6">
          <label className="text-xs uppercase tracking-wider text-muted-foreground mb-3 block">Scene</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setSceneMode("studio")}
              className={`px-3 py-2 rounded-md border text-sm transition-all ${
                sceneMode === "studio"
                  ? "border-primary bg-muted text-foreground"
                  : "border-border text-muted-foreground hover:border-muted-foreground"
              }`}
            >
              Dark / Studio
            </button>
            <button
              onClick={() => setSceneMode("outdoor")}
              className={`px-3 py-2 rounded-md border text-sm transition-all ${
                sceneMode === "outdoor"
                  ? "border-primary bg-muted text-foreground"
                  : "border-border text-muted-foreground hover:border-muted-foreground"
              }`}
            >
              Outdoor / Live
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Studio is a premium dark showroom; Outdoor adds sky, sun and a brighter terrace.
          </p>
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
              <span className="text-muted-foreground">Model</span>
              <span className="text-foreground">
                {modelType === "louvered" ? "PRGLA Louvered" : "SkyVue Polycarbonate"}
              </span>
            </div>
            {modelType === "louvered" && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Louver</span>
                <span className="text-foreground">{louverAngle}°</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">LEDs</span>
              <span className="text-foreground">{ledsOn ? "On" : "Off"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Scene</span>
              <span className="text-foreground">
                {sceneMode === "studio" ? "Studio" : "Outdoor"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Side Wall</span>
              <span className="text-foreground">
                {sideWall === "off"
                  ? "None"
                  : sideWall.charAt(0).toUpperCase() + sideWall.slice(1)}
              </span>
            </div>
            {modelType === "skyvue" && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Roof Tint</span>
                <span className="text-foreground">
                  {roofTint === "clear" ? "Clear" : "Smoke"}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Copy link */}
        <button
          onClick={async () => {
            const params = new URLSearchParams();
            params.set("model", modelType);
            params.set("size", currentSize.key);
            params.set("color", currentColor.key);
            if (modelType === "louvered") {
              params.set("louverAngle", String(louverAngle));
            }
            params.set("led", ledsOn ? "on" : "off");
            params.set("scene", sceneMode);
            params.set("sideWall", sideWall);
            if (modelType === "skyvue") {
              params.set("roofTint", roofTint);
            }

            const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
            try {
              await navigator.clipboard.writeText(url);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            } catch {
              // no-op; clipboard may be unavailable
            }
          }}
          className="w-full mb-3 px-4 py-2.5 rounded-md border border-border text-xs text-muted-foreground hover:text-foreground hover:border-muted-foreground transition-colors flex items-center justify-center gap-2"
        >
          <span>{copied ? "Link copied" : "Copy configuration link"}</span>
        </button>

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
            sceneMode={sceneMode}
            modelType={modelType}
            sideWall={sideWall}
            roofTint={roofTint}
            view={cameraView}
          />
        </Suspense>

        <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
          <div className="text-xs text-muted-foreground bg-card/80 backdrop-blur-sm px-3 py-1.5 rounded-md border border-border">
            Drag to rotate • Scroll to zoom
          </div>
          <div className="bg-card/80 backdrop-blur-sm px-2 py-1.5 rounded-md border border-border flex flex-wrap gap-1 justify-end">
            <button
              onClick={() => setCameraView("corner")}
              className={`px-2 py-1 rounded text-[11px] ${
                cameraView === "corner"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Corner
            </button>
            <button
              onClick={() => setCameraView("front")}
              className={`px-2 py-1 rounded text-[11px] ${
                cameraView === "front"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Front
            </button>
            <button
              onClick={() => setCameraView("top")}
              className={`px-2 py-1 rounded text-[11px] ${
                cameraView === "top"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Top
            </button>
            <button
              onClick={() => setCameraView("under")}
              className={`px-2 py-1 rounded text-[11px] ${
                cameraView === "under"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Under roof
            </button>
            <button
              onClick={() => setCameraView("corner")}
              className="ml-1 inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] border border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground"
            >
              <RotateCcw size={12} />
              Reset
            </button>
          </div>
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
                Config: {currentColor.label}, {currentSize.label},{" "}
                {modelType === "louvered"
                  ? `Louver ${louverAngle}°`
                  : `SkyVue (${roofTint === "clear" ? "Clear" : "Smoke"})`}
                , LEDs {ledsOn ? "On" : "Off"}, Scene{" "}
                {sceneMode === "studio" ? "Studio" : "Outdoor"}, Side Wall{" "}
                {sideWall === "off"
                  ? "None"
                  : sideWall.charAt(0).toUpperCase() + sideWall.slice(1)}
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
