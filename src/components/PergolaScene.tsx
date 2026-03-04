import { useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, Sky } from "@react-three/drei";
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
const FRAME_INSET = POST_SIZE + 0.02; // inner offset from posts/beams
const LOUVER_THICKNESS = 0.015;
const WALL_HEIGHT = 2.2;

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

  // Inner span based on actual frame dimensions (posts + beams)
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
  const louverSpanDepth = innerDepth * 0.98; // small inset inside beams

  const slatThickness = 0.02;

  const wallMaterial = (
    <meshStandardMaterial
      color={materialColor.clone().offsetHSL(0, 0, -0.08)}
      roughness={0.4}
      metalness={0.4}
    />
  );

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

    // Back wall
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

      {/* Louvered roof */}
      {modelType === "louvered" &&
        louvers.map((x, i) => (
          <mesh
            key={`louver-${i}`}
            position={[x, POST_HEIGHT - 0.05, 0]}
            rotation={[angleRad, 0, 0]}
            castShadow
          >
            <boxGeometry
              args={[(innerWidth / louverCount) * 0.9, LOUVER_THICKNESS, louverSpanDepth]}
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

      {/* LED lights */}
      {ledsOn && (
        <>
          <pointLight
            position={[0, POST_HEIGHT - 0.15, 0]}
            color="#FFB347"
            intensity={2}
            distance={4}
          />
          <pointLight
            position={[-0.25, POST_HEIGHT - 0.15, 0]}
            color="#FFB347"
            intensity={1}
            distance={3}
          />
          <pointLight
            position={[0.25, POST_HEIGHT - 0.15, 0]}
            color="#FFB347"
            intensity={1}
            distance={3}
          />
        </>
      )}
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
      <meshStandardMaterial color="#DADFE7" roughness={0.8} />
    </mesh>
  );
}

function SceneContents({ view = "corner", sceneMode = "studio", ...props }: SceneProps) {
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();

  const targetCamera = useRef(new THREE.Vector3(9, 6, 9));
  const targetLookAt = useRef(new THREE.Vector3(0, 1.4, 0));

  // Update desired camera + target for smooth transitions when view changes
  useEffect(() => {
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
  }, [view]);

  // Smooth camera + controls target interpolation
  useFrame(() => {
    camera.position.lerp(targetCamera.current, 0.08);
    if (controlsRef.current) {
      controlsRef.current.target.lerp(targetLookAt.current, 0.1);
      controlsRef.current.update();
    }
  });

  return (
    <>
      {/* Background / environment */}
      {sceneMode === "studio" ? (
        <>
          <color attach="background" args={["#050608"]} />
          <ambientLight intensity={0.28} />
          <directionalLight
            position={[10, 12, 6]}
            intensity={1.05}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          <StudioGround />
          <Environment preset="night" />
        </>
      ) : (
        <>
          {/* Outdoor / live look */}
          <color attach="background" args={["#E6EEF7"]} />
          <Sky sunPosition={[12, 14, 8]} inclination={0.45} azimuth={0.25} />
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[12, 14, 8]}
            intensity={1.35}
            castShadow
            shadow-mapSize={[2048, 2048]}
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
      />
    </>
  );
}

export default function PergolaScene(props: SceneProps) {
  const sceneMode = props.sceneMode ?? "studio";

  return (
    <Canvas
      shadows
      camera={{ position: [9, 6, 9], fov: 42 }}
    >
      <SceneContents {...props} sceneMode={sceneMode} />
    </Canvas>
  );
}
