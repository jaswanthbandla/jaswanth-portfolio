"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";
import * as THREE from "three";

export default function Scene3D() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const { x, y } = state.pointer;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      x * 0.12,
      0.05
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -y * 0.08,
      0.05
    );
  });

  return (
    <group ref={groupRef} position={[1.2, -0.6, 0]}>
      {/* Wooden Desk Surface */}
      <mesh position={[0, -0.7, 0]}>
        <boxGeometry args={[4.2, 0.08, 2.0]} />
        <meshStandardMaterial color="#1a120b" roughness={0.7} />
      </mesh>

      {/* Monitor Display */}
      <group position={[0, 0.4, -0.3]}>
        <mesh>
          <boxGeometry args={[2.5, 1.25, 0.05]} />
          <meshStandardMaterial color="#050505" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0, 0.028]}>
          <planeGeometry args={[2.42, 1.17]} />
          <meshBasicMaterial color="#0c1829" />
        </mesh>
        <Text position={[-0.45, 0.2, 0.04]} fontSize={0.11} color="#ffffff" anchorX="left">
          Build What Matters.
        </Text>
        <Text position={[-0.45, -0.15, 0.04]} fontSize={0.065} color="#F59E0B" anchorX="left">
          Jaswanth Bandla
        </Text>
      </group>

      {/* Laptop */}
      <group position={[1.2, -0.35, 0.1]} rotation={[0, -0.35, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.75, 0.02, 0.55]} />
          <meshStandardMaterial color="#222" />
        </mesh>
        <mesh position={[0, 0.25, -0.25]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.75, 0.5, 0.015]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        <Text
          position={[0, 0.25, -0.23]}
          rotation={[0.2, 0, 0]}
          fontSize={0.055}
          color="#F59E0B"
          anchorX="center"
        >
          {"Same Person\nBigger Goals"}
        </Text>
      </group>

      {/* Neon Sign */}
      <Float speed={1.2} rotationIntensity={0.02} floatIntensity={0.1}>
        <Text
          position={[1.1, 1.5, -1.0]}
          fontSize={0.18}
          color="#ffb74d"
          anchorX="center"
          maxWidth={2}
          lineHeight={1.1}
        >
          {"Discipline\nCreates\nFreedom"}
        </Text>
      </Float>
    </group>
  );
}