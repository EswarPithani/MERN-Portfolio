import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';

export default function AnimatedShape() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 60 }}
      shadows
      style={{ width: '100vw', height: '100vh' }}
    >
      <Stars radius={100} depth={50} count={4000} factor={4} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[0, 3, 3]} color="#14b8a6" intensity={1} />

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        enableRotate={true}
        dampingFactor={0.1}
        rotateSpeed={0.6}
      />
    </Canvas>
  );
}
