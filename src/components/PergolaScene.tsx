import { Suspense, useMemo, useRef, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, Sky, useProgress, Html } from "@react-three/drei";
import * as THREE from "three";

export type SceneMode = "studio" | "outdoor";
export type ModelType = "louvered" | "skyvue";
export type SideWallOption = "off" | "left" | "right" | "back";
export type RoofTint = "clear" | "smoke";
export type CameraView = "corner" | "front" | "top" | "under";

interface PergolaProps {
  color: string;
  width: number;
  depth: number;
  louverAngle: number;
  ledsOn: boolean;
  sceneMode?: SceneMode;
  modelType: ModelType;
  sideWall: SideWallOption;
  roofTint?: RoofTint;
}

interface SceneProps extends PergolaProps {
  view?: CameraView;
}

const POST_HEIGHT = 2.5;
const POST_SIZE = 0.1;
const BEAM_HEIGHT = 0.08;
const BEAM_WIDTH = 0.06;
const FRAME_INSET = POST_SIZE + 0.02;
const LOUVER_THICKNESS = 0.008;
const WALL_HEIGHT = 2.2;
const LED_COLOR = "#FFE4B5";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2">
        <div className="w-32 h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs text-muted-foreground">{Math.round(progress)}%</span>
      </div>
    </Html>
  );
}

function PergolaModel({
  color,
  width,
  depth,
  louverAngle,
  ledsOn,
  modelType,
  sideWall,
  roofTint,
}: PergolaProps) {
  const materialColor = new THREE.Color(color);
  const halfW = width / 2;
  const halfD = depth / 2;

  const innerWidth = Math.max(0.2, width - 2 * FRAME_INSET);
  const innerDepth = Math.max(0.2, depth - 2 * FRAME_INSET);

  const louverCount = Math.max(4, Math.floor(innerWidth / 0.18));
  const louvers = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < louverCount; i++) {
      const x = -innerWidth / 2 + (i + 0.5) * (innerWidth / louverCount);
      positions.push(x);
    }
    return positions;
  }, [innerWidth, louverCount]);

  const angleRad = THREE.MathUtils.degToRad(louverAngle);
  const louverSpanDepth = innerDepth * 0.98;

  const slatThickness = 0.02;

  const wallMaterial = (
    <meshStandardMaterial
      color={materialColor.clone().offsetHSL(0, 0, -0.08)}
      roughness={0.4}
      metalness={0.4}
    />
  );

  // Dynamic LED lights distributed along beams
  const ledLights = useMemo(() => {
    if (!ledsOn) return null;

    const lights: JSX.Element[] = [];
    const ledY = POST_HEIGHT - 0.12;

    // LEDs along width beams (front and back)
    const wCount = Math.max(2, Math.ceil(width / 1.5));
    for (let side = -1; side <= 1; side += 2) {
      const z = side * (halfD - BEAM_WIDTH / 2);
      for (let i = 0; i < wCount; i++) {
        const x = -halfW + (i + 0.5) * (width / wCount);
        lights.push(
          <pointLight
            key={`led-w-${side}-${i}`}
            position={[x, ledY, z]}
            color={LED_COLOR}
            intensity={0.8}
            distance={3}
          />
        );
      }
    }

    // LEDs along depth beams (left and right)
    const dCount = Math.max(2, Math.ceil(depth / 1.5));
    for (let side = -1; side <= 1; side += 2) {
      const x = side * (halfW - BEAM_WIDTH / 2);
      for (let i = 0; i < dCount; i++) {
        const z = -halfD + (i + 0.5) * (depth / dCount);
        lights.push(
          <pointLight
            key={`led-d-${side}-${i}`}
            position={[x, ledY, z]}
            color={LED_COLOR}
            intensity={0.8}
            distance={3}
          />
        );
      }
    }

    return lights;
  }, [ledsOn, width, depth, halfW, halfD]);

  // Visible LED strip meshes along beam undersides
  const ledStrips = useMemo(() => {
    if (!ledsOn) return null;

    const strips: JSX.Element[] = [];
    const stripY = POST_HEIGHT - 0.06;
    const stripH = 0.015;
    const stripW = 0.02;

    // Along width beams
    for (let side = -1; side <= 1; side += 2) {
      const z = side * (halfD - BEAM_WIDTH / 2);
      strips.push(
        <mesh key={`strip-w-${side}`} position={[0, stripY, z]}>
          <boxGeometry args={[width * 0.9, stripH, stripW]} />
          <meshStandardMaterial
            color={LED_COLOR}
            emissive={LED_COLOR}
            emissiveIntensity={2}
          />
        </mesh>
      );
    }

    // Along depth beams
    for (let side = -1; side <= 1; side += 2) {
      const x = side * (halfW - BEAM_WIDTH / 2);
      strips.push(
        <mesh key={`strip-d-${side}`} position={[x, stripY, 0]}>
          <boxGeometry args={[stripW, stripH, depth * 0.9]} />
          <meshStandardMaterial
            color={LED_COLOR}
            emissive={LED_COLOR}
            emissiveIntensity={2}
          />
        </mesh>
      );
    }

    return strips;
  }, [ledsOn, width, depth, halfW, halfD]);

  const renderSideWall = () => {
    if (sideWall === "off") return null;

    if (sideWall === "left" || sideWall === "right") {
      const isLeft = sideWall === "left";
      const wallX = (isLeft ? -1 : 1) * (halfW - FRAME_INSET);
      const count = Math.max(4, Math.floor(innerDepth / 0.18));
      const spacing = innerDepth / count;
      const slatDepth = spacing * 0.8;

      const slats = [];
      for (let i = 0; i < count; i++) {
        const z = -innerDepth / 2 + (i + 0.5) * spacing;
        slats.push(
          <mesh
            key={`wall-${sideWall}-${i}`}
            position={[wallX, WALL_HEIGHT / 2, z]}
            castShadow
          >
            <boxGeometry args={[slatThickness, WALL_HEIGHT, slatDepth]} />
            {wallMaterial}
          </mesh>,
        );
      }
      return slats;
    }

    if (sideWall === "back") {
      const wallZ = halfD - FRAME_INSET;
      const count = Math.max(4, Math.floor(innerWidth / 0.18));
      const spacing = innerWidth / count;
      const slatWidth = spacing * 0.8;

      const slats = [];
      for (let i = 0; i < count; i++) {
        const x = -innerWidth / 2 + (i + 0.5) * spacing;
        slats.push(
          <mesh
            key={`wall-back-${i}`}
            position={[x, WALL_HEIGHT / 2, wallZ]}
            castShadow
          >
            <boxGeometry args={[slatWidth, WALL_HEIGHT, slatThickness]} />
            {wallMaterial}
          </mesh>,
        );
      }
      return slats;
    }

    return null;
  };

  const renderSkyVueRoof = () => {
    if (modelType !== "skyvue") return null;

    const panelCount = 3;
    const panelThickness = 0.02;
    const panelWidth = innerWidth / panelCount;

    const colorClear = "#E8F4FF";
    const colorSmoke = "#9BA8BC";
    const tintColor = roofTint === "smoke" ? colorSmoke : colorClear;

    const panels = [];
    for (let i = 0; i < panelCount; i++) {
      const x = -innerWidth / 2 + (i + 0.5) * panelWidth;
      panels.push(
        <mesh
          key={`panel-${i}`}
          position={[x, POST_HEIGHT - 0.03, 0]}
          castShadow
        >
          <boxGeometry args={[panelWidth * 0.98, panelThickness, louverSpanDepth]} />
          <meshPhysicalMaterial
            color={tintColor}
            roughness={0.1}
            metalness={0}
            transmission={0.9}
            thickness={0.35}
            clearcoat={1}
            clearcoatRoughness={0.1}
            reflectivity={0.9}
            ior={1.5}
            opacity={0.92}
            transparent
          />
        </mesh>,
      );
    }

    return panels;
  };

  return (
    <group>
      {/* Posts */}
      {[
        [-halfW + POST_SIZE / 2, POST_HEIGHT / 2, -halfD + POST_SIZE / 2],
        [halfW - POST_SIZE / 2, POST_HEIGHT / 2, -halfD + POST_SIZE / 2],
        [-halfW + POST_SIZE / 2, POST_HEIGHT / 2, halfD - POST_SIZE / 2],
        [halfW - POST_SIZE / 2, POST_HEIGHT / 2, halfD - POST_SIZE / 2],
      ].map((pos, i) => (
        <mesh key={`post-${i}`} position={pos as [number, number, number]} castShadow>
          <boxGeometry args={[POST_SIZE, POST_HEIGHT, POST_SIZE]} />
          <meshStandardMaterial
            color={materialColor}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
      ))}

      {/* Top beams - along length (X) */}
      {[-1, 1].map((side, i) => (
        <mesh
          key={`beam-l-${i}`}
          position={[0, POST_HEIGHT, side * (halfD - BEAM_WIDTH / 2)]}
          castShadow
        >
          <boxGeometry args={[width + BEAM_WIDTH, BEAM_HEIGHT, BEAM_WIDTH]} />
          <meshStandardMaterial
            color={materialColor}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
      ))}

      {/* Top beams - along depth (Z) */}
      {[-1, 1].map((side, i) => (
        <mesh
          key={`beam-w-${i}`}
          position={[side * (halfW - BEAM_WIDTH / 2), POST_HEIGHT, 0]}
          castShadow
        >
          <boxGeometry args={[BEAM_WIDTH, BEAM_HEIGHT, depth + BEAM_WIDTH]} />
          <meshStandardMaterial
            color={materialColor}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
      ))}

      {/* Louvered roof — blades rotate around their Z (span) axis like venetian blinds */}
      {modelType === "louvered" &&
        louvers.map((x, i) => (
          <mesh
            key={`louver-${i}`}
            position={[x, POST_HEIGHT - 0.05, 0]}
            rotation={[0, 0, angleRad]}
            castShadow
          >
            <boxGeometry
              args={[(innerWidth / louverCount) * 0.92, LOUVER_THICKNESS, louverSpanDepth]}
            />
            <meshStandardMaterial
              color={materialColor}
              roughness={0.4}
              metalness={0.6}
            />
          </mesh>
        ))}

      {/* SkyVue polycarbonate roof */}
      {renderSkyVueRoof()}

      {/* Side wall slats */}
      {renderSideWall()}

      {/* LED lights + visible strips */}
      {ledLights}
      {ledStrips}
    </group>
  );
}

function StudioGround() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#111111" roughness={0.9} />
      </mesh>
      <gridHelper args={[20, 40, "#222222", "#1a1a1a"]} position={[0, 0.01, 0]} />
    </>
  );
}

function OutdoorGround() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[40, 40]} />
      <meshStandardMaterial color="#C5B9A8" roughness={0.85} />
    </mesh>
  );
}

function SceneContents({ view = "corner", sceneMode = "studio", ...props }: SceneProps) {
  const controlsRef = useRef<any>(null);
  const { camera, invalidate } = useThree();
  const isAnimating = useRef(false);

  const targetCamera = useRef(new THREE.Vector3(9, 6, 9));
  const targetLookAt = useRef(new THREE.Vector3(0, 1.4, 0));

  // When view changes, start animating
  useEffect(() => {
    isAnimating.current = true;
    switch (view) {
      case "front":
        targetCamera.current.set(0, 4.2, 10);
        targetLookAt.current.set(0, 1.4, 0);
        break;
      case "top":
        targetCamera.current.set(0, 12, 0.01);
        targetLookAt.current.set(0, 0, 0);
        break;
      case "under":
        targetCamera.current.set(0, 1.5, 3.5);
        targetLookAt.current.set(0, 2.1, 0);
        break;
      case "corner":
      default:
        targetCamera.current.set(9, 6, 9);
        targetLookAt.current.set(0, 1.4, 0);
        break;
    }
    invalidate();
  }, [view, invalidate]);

  // Invalidate on prop changes so demand rendering works
  const invalidateOnChange = useCallback(() => {
    invalidate();
  }, [invalidate]);

  useEffect(() => {
    invalidateOnChange();
  }, [props.color, props.width, props.depth, props.louverAngle, props.ledsOn, props.modelType, props.sideWall, props.roofTint, sceneMode, invalidateOnChange]);

  // Only lerp camera when animating; stop when converged
  useFrame(() => {
    if (!isAnimating.current) return;

    camera.position.lerp(targetCamera.current, 0.08);
    if (controlsRef.current) {
      controlsRef.current.target.lerp(targetLookAt.current, 0.1);
      controlsRef.current.update();
    }

    const dist = camera.position.distanceTo(targetCamera.current);
    if (dist < 0.05) {
      isAnimating.current = false;
    }
    invalidate();
  });

  return (
    <>
      {sceneMode === "studio" ? (
        <>
          <color attach="background" args={["#050608"]} />
          <ambientLight intensity={0.28} />
          <directionalLight
            position={[10, 12, 6]}
            intensity={1.05}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-left={-8}
            shadow-camera-right={8}
            shadow-camera-top={8}
            shadow-camera-bottom={-8}
          />
          <StudioGround />
          <Environment preset="night" />
        </>
      ) : (
        <>
          <color attach="background" args={["#E6EEF7"]} />
          <Sky sunPosition={[12, 14, 8]} inclination={0.45} azimuth={0.25} />
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[12, 14, 8]}
            intensity={1.35}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-left={-8}
            shadow-camera-right={8}
            shadow-camera-top={8}
            shadow-camera-bottom={-8}
          />
          <OutdoorGround />
          <Environment preset="city" />
        </>
      )}

      <PergolaModel {...props} />

      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.06}
        minDistance={5}
        maxDistance={22}
        maxPolarAngle={Math.PI / 2.05}
        enablePan
        target={[0, 1.4, 0]}
        onChange={() => invalidate()}
      />
    </>
  );
}

export default function PergolaScene(props: SceneProps) {
  const sceneMode = props.sceneMode ?? "studio";

  return (
    <Canvas
      shadows
      frameloop="demand"
      camera={{ position: [9, 6, 9], fov: 42 }}
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={<Loader />}>
        <SceneContents {...props} sceneMode={sceneMode} />
      </Suspense>
    </Canvas>
  );
}
