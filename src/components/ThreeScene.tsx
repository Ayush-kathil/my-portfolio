"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <mesh position={[-3, 1, -2]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <icosahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial
            color="#333"
            metalness={0.9}
            roughness={0.1}
            wireframe={true}
          />
        </mesh>
      </Float>
      
      <Float speed={3} rotationIntensity={1} floatIntensity={2.5}>
        <mesh position={[0, -2, -3]}>
          <octahedronGeometry args={[0.8, 0]} />
          <meshPhysicalMaterial
            color="#555"
            metalness={0.8}
            roughness={0.2}
            wireframe={true}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function ThreeScene() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <FloatingShapes />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
