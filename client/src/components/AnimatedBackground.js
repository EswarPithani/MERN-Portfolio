import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

// Parallax Floating Shapes
function FloatingTorus() {
  const ref = useRef();
  const { mouse } = useThree();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * 0.3;
    ref.current.rotation.y = t * 0.6;
    ref.current.position.y = Math.sin(t * 0.8) * 0.3;
    ref.current.position.x = -2.5 + mouse.x * 0.5;
    ref.current.position.z = mouse.y * 0.5;
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[1, 0.4, 16, 100]} />
      <meshStandardMaterial
        color="#14b8a6"
        roughness={0.15}
        metalness={0.7}
        emissive="#14b8a6"
        emissiveIntensity={0.4}
      />
    </mesh>
  );
}

function FloatingDodecahedron() {
  const ref = useRef();
  const { mouse } = useThree();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * 0.5;
    ref.current.rotation.z = t * 0.4;
    ref.current.position.x = Math.cos(t * 0.7) * 1.5 + mouse.x * 0.3;
    ref.current.position.y = Math.sin(t * 0.9) * 0.6 + 1 + mouse.y * 0.3;
  });

  return (
    <mesh ref={ref}>
      <dodecahedronGeometry args={[0.8, 0]} />
      <meshStandardMaterial
        color="#f59e0b"
        roughness={0.2}
        metalness={0.6}
        emissive="#f59e0b"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

function FloatingOctahedron() {
  const ref = useRef();
  const { mouse } = useThree();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.7;
    ref.current.rotation.x = t * 0.3;
    ref.current.position.x = Math.sin(t * 1.2) * 1.2 + 2 + mouse.x * 0.4;
    ref.current.position.y = Math.cos(t * 1.1) * 0.4 + mouse.y * 0.4;
  });

  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[0.6, 0]} />
      <meshStandardMaterial
        color="#3b82f6"
        roughness={0.1}
        metalness={0.8}
        emissive="#3b82f6"
        emissiveIntensity={0.35}
      />
    </mesh>
  );
}

// Instanced glowing particles
function ParticleCloud({ count = 1000 }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const positions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < count; i++) {
      pos.push([
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
      ]);
    }
    return pos;
  }, [count]);

  useFrame(({ clock }) => {
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.03;

    positions.forEach((p, i) => {
      dummy.position.set(...p);
      dummy.scale.setScalar(0.02 + Math.random() * 0.03);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial
        color="#ffffff"
        emissive="#ffffff"
        emissiveIntensity={0.8}
        transparent
        opacity={0.6}
      />
    </instancedMesh>
  );
}

// Main Canvas Scene
export default function AnimatedBackground() {
  const { darkMode } = useTheme();

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 60 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
      }}
    >
      {darkMode && (
        <Stars radius={100} depth={50} count={3000} factor={3.5} fade />
      )}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[0, 3, 3]} color="#14b8a6" intensity={1} />
      <FloatingTorus />
      <FloatingDodecahedron />
      <FloatingOctahedron />
      <ParticleCloud />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate
        dampingFactor={0.1}
        rotateSpeed={0.6}
      />
    </Canvas>
  );
}