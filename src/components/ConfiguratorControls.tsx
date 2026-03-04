import { Sun, SunDim } from "lucide-react";
import type {
  ModelType,
  RoofTint,
  SideWallOption,
} from "@/components/PergolaScene";

interface ConfiguratorControlsProps {
  colorIdx: number;
  setColorIdx: (i: number) => void;
  sizeIdx: number;
  setSizeIdx: (i: number) => void;
  modelType: ModelType;
  setModelType: (m: ModelType) => void;
  louverAngle: number;
  setLouverAngle: (a: number) => void;
  ledsOn: boolean;
  setLedsOn: (v: boolean) => void;
  roofTint: RoofTint;
  setRoofTint: (t: RoofTint) => void;
  sideWall: SideWallOption;
  setSideWall: (s: SideWallOption) => void;
  sceneMode: "studio" | "outdoor";
  setSceneMode: (m: "studio" | "outdoor") => void;
  colorOptions: { label: string; value: string; key: string }[];
  sizeOptions: { label: string; key: string; width: number; depth: number }[];
}

export default function ConfiguratorControls({
  colorIdx,
  setColorIdx,
  sizeIdx,
  setSizeIdx,
  modelType,
  setModelType,
  louverAngle,
  setLouverAngle,
  ledsOn,
  setLedsOn,
  roofTint,
  setRoofTint,
  sideWall,
  setSideWall,
  sceneMode,
  setSceneMode,
  colorOptions,
  sizeOptions,
}: ConfiguratorControlsProps) {
  return (
    <div className="space-y-6">
      {/* Color */}
      <div>
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
      <div>
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
      <div>
        <label className="text-xs uppercase tracking-wider text-muted-foreground mb-3 block">Model</label>
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
              Fixed clear / tinted panels for a bright, weather-protected roof
            </span>
          </button>
        </div>
      </div>

      {/* Louver Angle */}
      {modelType === "louvered" && (
        <div>
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
      <div>
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
        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground mb-3 block">Roof Tint</label>
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
      <div>
        <label className="text-xs uppercase tracking-wider text-muted-foreground mb-3 block">Side Wall</label>
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
      <div>
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
    </div>
  );
}
