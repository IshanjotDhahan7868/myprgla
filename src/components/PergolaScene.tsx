import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";

interface PergolaProps {
  color: string;
  width: number;
  depth: number;
  louverAngle: number;
  ledsOn: boolean;
}

function PergolaModel({ color, width, depth, louverAngle, ledsOn }: PergolaProps) {
  const groupRef = useRef<THREE.Group>(null);
  const materialColor = new THREE.Color(color);
  const postHeight = 2.5;
  const postSize = 0.1;
  const beamHeight = 0.08;
  const beamWidth = 0.06;
  const louverCount = Math.floor(width / 0.2);
  const louverThickness = 0.015;
  const louverWidth = depth - 0.1;

  // Smooth transitions
  useFrame(() => {
    if (groupRef.current) {
      const target = new THREE.Vector3(width, 1, depth);
      groupRef.current.scale.lerp(target, 0.08);
    }
  });

  const postPositions: [number, number, number][] = [
    [-0.5, postHeight / 2, -0.5],
    [0.5, postHeight / 2, -0.5],
    [-0.5, postHeight / 2, 0.5],
    [0.5, postHeight / 2, 0.5],
  ];

  const louvers = useMemo(() => {
    const items = [];
    for (let i = 0; i < louverCount; i++) {
      const x = -0.5 + (i + 0.5) * (1 / louverCount);
      items.push(x);
    }
    return items;
  }, [louverCount]);

  const angleRad = (louverAngle / 90) * (Math.PI / 2);

  return (
    <group ref={groupRef} scale={[width, 1, depth]}>
      {/* Posts */}
      {postPositions.map((pos, i) => (
        <mesh key={`post-${i}`} position={pos} castShadow>
          <boxGeometry args={[postSize, postHeight, postSize]} />
          <meshStandardMaterial color={materialColor} roughness={0.3} metalness={0.7} />
        </mesh>
      ))}

      {/* Top beams - length */}
      {[-0.5, 0.5].map((z, i) => (
        <mesh key={`beam-l-${i}`} position={[0, postHeight, z]} castShadow>
          <boxGeometry args={[1 + postSize, beamHeight, beamWidth]} />
          <meshStandardMaterial color={materialColor} roughness={0.3} metalness={0.7} />
        </mesh>
      ))}

      {/* Top beams - width */}
      {[-0.5, 0.5].map((x, i) => (
        <mesh key={`beam-w-${i}`} position={[x, postHeight, 0]} castShadow>
          <boxGeometry args={[beamWidth, beamHeight, 1 + postSize]} />
          <meshStandardMaterial color={materialColor} roughness={0.3} metalness={0.7} />
        </mesh>
      ))}

      {/* Louvers */}
      {louvers.map((x, i) => (
        <mesh
          key={`louver-${i}`}
          position={[x, postHeight - 0.05, 0]}
          rotation={[angleRad, 0, 0]}
          castShadow
        >
          <boxGeometry args={[1 / louverCount - 0.005, louverThickness, louverWidth]} />
          <meshStandardMaterial color={materialColor} roughness={0.4} metalness={0.6} />
        </mesh>
      ))}

      {/* LED lights */}
      {ledsOn && (
        <>
          <pointLight
            position={[0, postHeight - 0.15, 0]}
            color="#FFB347"
            intensity={2}
            distance={4}
          />
          <pointLight
            position={[-0.25, postHeight - 0.15, 0]}
            color="#FFB347"
            intensity={1}
            distance={3}
          />
          <pointLight
            position={[0.25, postHeight - 0.15, 0]}
            color="#FFB347"
            intensity={1}
            distance={3}
          />
        </>
      )}
    </group>
  );
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#111111" roughness={0.9} />
    </mesh>
  );
}

function GridFloor() {
  return (
    <gridHelper args={[20, 40, "#222222", "#1a1a1a"]} position={[0, 0.01, 0]} />
  );
}

interface SceneProps extends PergolaProps {}

export default function PergolaScene(props: SceneProps) {
  return (
    <Canvas
      shadows
      camera={{ position: [5, 4, 5], fov: 45 }}
      style={{ background: "#0A0A0A" }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[8, 10, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <Ground />
      <GridFloor />
      <PergolaModel {...props} />
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={3}
        maxDistance={15}
        maxPolarAngle={Math.PI / 2.1}
        enablePan
      />
      <Environment preset="night" />
    </Canvas>
  );
}
