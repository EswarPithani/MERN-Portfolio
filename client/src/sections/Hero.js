import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Typewriter } from 'react-simple-typewriter';

function CRTGridOverlay() {
  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
        backgroundSize: '20px 20px',
        mixBlendMode: 'overlay',
        maskImage: 'radial-gradient(circle, rgba(255,255,255,1), transparent)',
      }}
    />
  );
}

function Scanlines() {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay">
      <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:100%_2px] animate-scanlines" />
    </div>
  );
}

function AnimatedShape() {
  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 60 }} shadows style={{ width: '100vw', height: '100vh' }}>
      <Stars radius={100} depth={50} count={4000} factor={4} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[0, 3, 3]} color="#14b8a6" intensity={1} />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} dampingFactor={0.1} rotateSpeed={0.6} />
    </Canvas>
  );
}

function HUDPanel() {
  return (
    <div className="absolute top-24 right-6 z-20 bg-white/5 backdrop-blur p-4 border border-green-400 text-green-200 text-xs font-mono shadow-xl animate-fadeInUp rounded-lg">
      <p>SYS: ONLINE</p>
      <p>MODE: DEVELOPER</p>
      <p>STATUS: ACTIVE</p>
      <p>3D SCAN: ENABLED</p>
    </div>
  );
}

function Terminal() {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState(['>> system boot complete', '>> Type "help" for available commands']);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const input = command.trim().toLowerCase();
      let response = '';

      switch (input) {
        case 'help':
          response = [
            'Available commands:',
            'help      - Show this help message',
            'about     - About the developer',
            'projects  - View my projects',
            'skills    - View my skills',
            'contact   - How to contact me',
            'clear     - Clear terminal',
            'github    - Open GitHub profile',
            'linkedin  - Open LinkedIn profile'
          ].join('\n');
          break;

        case 'about':
          response = 'Eswar is a fullstack developer specializing in React, Node.js, and Three.js. Navigating to About section...';
          scrollToSection('about');
          break;

        case 'projects':
          response = 'Displaying my projects. Navigating to Projects section...';
          scrollToSection('projects');
          break;

        case 'skills':
          response = 'Here are my technical skills. Navigating to Skills section...';
          scrollToSection('skills');
          break;

        case 'contact':
          response = 'You can reach me at: email@example.com. Navigating to Contact section...';
          scrollToSection('contact');
          break;

        case 'github':
          response = 'Opening GitHub profile in new tab...';
          window.open('https://github.com/EswarPithani', '_blank');
          break;

        case 'linkedin':
          response = 'Opening LinkedIn profile in new tab...';
          window.open('https://www.linkedin.com/in/ev3/', '_blank');
          break;

        case 'resume':
          response = 'Opening resume in new tab...';
          window.open('https://drive.google.com/file/d/1gO5z2buGli52_ev0c_DVNvneUiO3_sir/view', '_blank');
          break;

        case 'clear':
          setHistory([]);
          setCommand('');
          return;

        default:
          response = `Command not found: ${input}. Type "help" for available commands.`;
      }

      setHistory((prev) => [...prev, '>> ' + input, response]);
      setCommand('');
    }
  };

  return (
    <div className="absolute bottom-6 left-6 right-6 z-20 bg-black/80 p-4 border border-green-500 text-green-300 font-mono text-sm rounded shadow-inner max-h-60 overflow-y-auto">
      {history.map((line, idx) => (
        <div key={idx} className="whitespace-pre-wrap">{line}</div>
      ))}
      <div className="flex items-center">
        <span>>></span>
        <input
          ref={inputRef}
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={handleCommand}
          className="bg-transparent outline-none ml-2 w-full caret-green-300 text-green-300"
          autoFocus
        />
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="relative pt-10 min-h-screen flex items-center justify-center bg-black text-white overflow-hidden"> {/* Changed pt-20 to pt-10 */}
      <div className="absolute inset-0 z-0">
        <AnimatedShape />
        <CRTGridOverlay />
        <Scanlines />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row w-full items-center">
        <div className="flex flex-col items-start justify-center md:w-1/2 space-y-6 text-left px-6 md:px-20 mt-[-50px]"> {/* Added mt-[-50px] and reduced space-y-10 to space-y-6 */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 font-mono"> {/* Reduced mb-6 to mb-4 */}
              <Typewriter
                words={[">> Hi, I'm Eswar_", '>> FullStack Developer_']}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={65}
                deleteSpeed={40}
                delaySpeed={1000}
              />
            </h1>
            <p className="text-lg md:text-xl max-w-xl font-mono text-green-300">
              I'm a fullstack developer and ML enthusiast with hands-on experience in React, Node.js, GANs, and Android app development.
            </p>
          </div>
        </div>
        <div className="md:w-1/2" />
      </div>

      <HUDPanel />
      <Terminal />
    </section>
  );
}
