import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { FiExternalLink } from 'react-icons/fi';

const projects = [
  {
    title: 'PORTFOLIO',
    description: 'A personal portfolio designed as a futuristic terminal interface with WebGL starscape, 3D HUD elements, animated scanlines, and interactive commands.',
    link: 'https://github.com/EswarPithani/MERN-Portfolio',
    tech: ['REACT', 'THREE.JS', 'TAILWIND', 'FRAMER-MOTION', 'MONGODB', 'NODE.JS'],
    status: 'LIVE',
  },
  {
    title: 'CT-GAN',
    description: 'A multi-stage text-to-image generator using Conditional GANs with char-CNN-RNN embeddings and progressive refinement (64x64 → 128x128 → 256x256). Evaluated with FID and Inception Score.',
    link: 'https://github.com/EswarPithani/CT-GAN',
    tech: ['PYTHON', 'TRANSFORMER', 'GAN'],
    status: 'COMPLETED',
  },
];

export default function Projects() {
  return (
    <motion.section
      id="projects"
      className="relative scroll-mt-20 min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-white dark:bg-black opacity-90 transition-colors duration-500" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(20,184,166,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(20,184,166,0.04) 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
            mixBlendMode: 'overlay',
          }}
        />
        <div className="absolute inset-0 pointer-events-none mix-blend-overlay">
          <div className="w-full h-full bg-[linear-gradient(rgba(20,184,166,0.06)_1px,transparent_1px)] bg-[length:100%_2px] animate-scanlines" />
        </div>
      </div>

      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-12 font-mono text-center text-teal-600 dark:text-green-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Typewriter
            words={[">> PROJECTS", ">> MY_WORK"]}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={40}
            delaySpeed={2000}
          />
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map(({ title, description, link, tech, status }, idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              whileHover={{
                y: -8,
                boxShadow: '0 10px 25px -5px rgba(20, 184, 166, 0.3)',
              }}
              className="group relative border border-teal-500 dark:border-green-400 bg-white/70 dark:bg-black/70 p-6 rounded-xl backdrop-blur-md overflow-hidden transition-colors duration-300"
            >
              <div className="absolute inset-0 bg-teal-500/10 dark:bg-green-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

              {/* Status Badge */}
              <motion.div
                className={`absolute top-4 right-4 px-2 py-1 rounded text-xs font-mono ${status === 'ACTIVE'
                  ? 'bg-green-400/20 text-green-600 dark:text-green-400'
                  : 'bg-blue-400/20 text-blue-600 dark:text-blue-400'
                  }`}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 + idx * 0.1 }}
              >
                {status}
              </motion.div>

              <div className="flex items-start mb-4">
                <motion.div
                  className="h-3 w-3 rounded-full bg-green-500 dark:bg-green-400 mr-3 mt-1.5"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <h3 className="text-2xl font-mono text-teal-700 dark:text-green-300">
                  {title}
                </h3>
              </div>

              <p className="font-mono text-teal-800 dark:text-green-300 mb-6 pl-8">
                {description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6 pl-8">
                {tech.map((item, techIdx) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + techIdx * 0.1 }}
                    className="px-2 py-1 text-xs font-mono bg-teal-500/20 dark:bg-green-400/20 text-teal-800 dark:text-green-300 rounded hover:bg-teal-500/30 dark:hover:bg-green-400/30 transition-colors"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>

              <div className="pl-8 relative z-10">
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-mono text-teal-600 dark:text-green-400 hover:underline relative z-50"
                >
                  View Code <FiExternalLink className="inline" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}