import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import { RotateCcw, ArrowRight, Settings2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PergolaScene, {
  type CameraView,
  type ModelType,
  type RoofTint,
  type SideWallOption,
  type SceneMode,
} from "@/components/PergolaScene";
import ConfiguratorControls from "@/components/ConfiguratorControls";
import { useIsMobile } from "@/hooks/use-mobile";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { sendEmail } from "@/lib/emailjs";
import { toast } from "sonner";

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
  const isMobile = useIsMobile();

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

  // Quote modal form state
  const [quoteForm, setQuoteForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [quoteSending, setQuoteSending] = useState(false);
  const [quoteSent, setQuoteSent] = useState(false);

  const currentColor = colorOptions[colorIdx];
  const currentSize = sizeOptions[sizeIdx];

  useEffect(() => {
    document.title = "3D Configurator — PRGLA Pergolas";
  }, []);

  const configSummary = `${currentColor.label}, ${currentSize.label}, ${
    modelType === "louvered"
      ? `Louver ${louverAngle}°`
      : `SkyVue (${roofTint === "clear" ? "Clear" : "Smoke"})`
  }, LEDs ${ledsOn ? "On" : "Off"}, Scene ${
    sceneMode === "studio" ? "Studio" : "Outdoor"
  }, Side Wall ${
    sideWall === "off" ? "None" : sideWall.charAt(0).toUpperCase() + sideWall.slice(1)
  }`;

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSending(true);
    try {
      await sendEmail("configuratorQuote", {
        name: quoteForm.name,
        email: quoteForm.email,
        phone: quoteForm.phone,
        notes: quoteForm.notes,
        configuration: configSummary,
      });
      setQuoteSent(true);
      setTimeout(() => {
        setShowQuote(false);
        setQuoteSent(false);
        setQuoteForm({ name: "", email: "", phone: "", notes: "" });
      }, 2500);
    } catch {
      toast.error("Something went wrong. Please try again or call us directly.");
    } finally {
      setQuoteSending(false);
    }
  };

  const handleCopyLink = async () => {
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
      // clipboard may be unavailable
    }
  };

  const controlsProps = {
    colorIdx, setColorIdx,
    sizeIdx, setSizeIdx,
    modelType, setModelType,
    louverAngle, setLouverAngle,
    ledsOn, setLedsOn: (v: boolean) => setLedsOn(v),
    roofTint, setRoofTint,
    sideWall, setSideWall,
    sceneMode, setSceneMode,
    colorOptions, sizeOptions,
  };

  const summaryBlock = (
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
  );

  const actionButtons = (
    <>
      <button
        onClick={handleCopyLink}
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
    </>
  );

  const cameraButtons = (
    <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
      <div className="text-xs text-muted-foreground bg-card/80 backdrop-blur-sm px-3 py-1.5 rounded-md border border-border">
        Drag to rotate • Scroll to zoom
      </div>
      <div className="bg-card/80 backdrop-blur-sm px-2 py-1.5 rounded-md border border-border flex flex-wrap gap-1 justify-end">
        {(["corner", "front", "top", "under"] as CameraView[]).map((v) => (
          <button
            key={v}
            onClick={() => setCameraView(v)}
            className={`px-2 py-1 rounded text-[11px] ${
              cameraView === v
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {v === "under" ? "Under roof" : v.charAt(0).toUpperCase() + v.slice(1)}
          </button>
        ))}
        <button
          onClick={() => setCameraView("corner")}
          className="ml-1 inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] border border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground"
        >
          <RotateCcw size={12} />
          Reset
        </button>
      </div>
    </div>
  );

  // Mobile: full-screen canvas + floating drawer
  if (isMobile) {
    return (
      <div className="pt-16 min-h-screen flex flex-col">
        <div className="flex-1 relative min-h-[60vh]">
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
          {cameraButtons}
        </div>

        <Drawer>
          <DrawerTrigger asChild>
            <button className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 btn-primary-glow px-6 py-3 rounded-full text-sm font-medium flex items-center gap-2 shadow-lg">
              <Settings2 size={16} /> Configure
            </button>
          </DrawerTrigger>
          <DrawerContent className="max-h-[85vh]">
            <div className="overflow-y-auto p-6 pb-8">
              <h2 className="font-heading text-2xl mb-6 text-foreground">Configure</h2>
              <ConfiguratorControls {...controlsProps} />
              <div className="mt-6">
                {summaryBlock}
                {actionButtons}
              </div>
            </div>
          </DrawerContent>
        </Drawer>

        {/* Quote Modal */}
        <QuoteModal
          show={showQuote}
          onClose={() => { setShowQuote(false); setQuoteSent(false); }}
          configSummary={configSummary}
          form={quoteForm}
          setForm={setQuoteForm}
          sending={quoteSending}
          sent={quoteSent}
          onSubmit={handleQuoteSubmit}
        />
      </div>
    );
  }

  // Desktop: side panel layout
  return (
    <div className="pt-16 min-h-screen flex flex-col lg:flex-row">
      {/* Controls Panel */}
      <div className="lg:w-80 flex-shrink-0 bg-card border-r border-border p-6 lg:pt-8 order-2 lg:order-1 overflow-y-auto">
        <h2 className="font-heading text-2xl mb-6 text-foreground">Configure</h2>
        <ConfiguratorControls {...controlsProps} />
        <div className="mt-6">
          {summaryBlock}
          {actionButtons}
        </div>
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
        {cameraButtons}
      </div>

      {/* Quote Modal */}
      <QuoteModal
        show={showQuote}
        onClose={() => { setShowQuote(false); setQuoteSent(false); }}
        configSummary={configSummary}
        form={quoteForm}
        setForm={setQuoteForm}
        sending={quoteSending}
        sent={quoteSent}
        onSubmit={handleQuoteSubmit}
      />
    </div>
  );
}

function QuoteModal({
  show,
  onClose,
  configSummary,
  form,
  setForm,
  sending,
  sent,
  onSubmit,
}: {
  show: boolean;
  onClose: () => void;
  configSummary: string;
  form: { name: string; email: string; phone: string; notes: string };
  setForm: (f: { name: string; email: string; phone: string; notes: string }) => void;
  sending: boolean;
  sent: boolean;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card p-6 w-full max-w-md"
          >
            {sent ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Check size={28} className="text-primary" />
                </div>
                <h3 className="font-heading text-2xl mb-2 text-foreground">Quote Sent!</h3>
                <p className="text-sm text-muted-foreground">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <>
                <h3 className="font-heading text-2xl mb-4 text-foreground">Request a Quote</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Config: {configSummary}
                </p>
                <form onSubmit={onSubmit} className="space-y-3">
                  <input
                    placeholder="Name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-muted border border-border rounded-md px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <input
                    placeholder="Email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-muted border border-border rounded-md px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <input
                    placeholder="Phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-muted border border-border rounded-md px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <textarea
                    placeholder="Additional notes…"
                    rows={3}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full bg-muted border border-border rounded-md px-4 py-2.5 text-sm text-foreground resize-none focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={sending}
                      className="btn-primary-glow flex-1 px-6 py-2.5 rounded-md text-sm font-medium disabled:opacity-50"
                    >
                      {sending ? "Sending…" : "Send Request"}
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2.5 rounded-md text-sm border border-border text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
