import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { FiCode, FiCpu, FiGlobe, FiUserCheck } from 'react-icons/fi';

export default function About() {
  const stats = [
    { label: "EXPERIENCE", value: "Fresher", icon: <FiCpu className="text-green-500 dark:text-green-400" /> },
    { label: "SPECIALTY", value: "AI / Fullstack Dev", icon: <FiCode className="text-green-500 dark:text-green-400" /> },
    { label: "LOCATION", value: "Remote", icon: <FiGlobe className="text-green-500 dark:text-green-400" /> },
    { label: "STATUS", value: "Available", icon: <FiUserCheck className="text-green-500 dark:text-green-400" /> }
  ];

  return (
    <motion.section
      id="about"
      className="relative scroll-mt-20 min-h-screen flex flex-col items-center justify-center px-6 py-20"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-white dark:bg-black opacity-90 transition-colors duration-500" />
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34,197,94,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34,197,94,0.03) 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
            mixBlendMode: 'overlay',
          }}
        />
        <div className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay">
          <div className="w-full h-full bg-[linear-gradient(rgba(34,197,94,0.05)_1px,transparent_1px)] bg-[length:100%_2px] animate-scanlines" />
        </div>

        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-green-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-12 font-mono text-green-500 dark:text-green-300 text-center"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            textShadow: ['0 0 0px rgba(34,197,94,0)', '0 0 10px rgba(34,197,94,0.3)', '0 0 0px rgba(34,197,94,0)']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        >
          <Typewriter
            words={[">> About_Me", ">> Who_Am_I?"]}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={40}
            delaySpeed={2000}
          />
        </motion.h2>

        {/* Paragraph Container */}
        <motion.div
          className="border border-green-400 bg-white/70 dark:bg-black/70 p-8 rounded-xl shadow-xl backdrop-blur-md"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {[
            "I'm Eswar, a Computer Science student at NIT Andhra Pradesh and a full-stack developer passionate about crafting intelligent, interactive web experiences.",
            "I specialize in MERN stack, React, and 3D graphics using Three.js. My work includes building a multi-stage CT-GAN for text-to-image generation and a secure Android app that transcribes speech to notes.",
            "I've participated in few challenges, solved 150+ DSA problems, and recently qualified GATE 2025. When I'm not coding, I dive into AI, App dev or explore new tech in cybersecurity and machine learning."
          ].map((text, idx) => (
            <motion.p
              key={idx}
              className="text-lg md:text-xl leading-relaxed font-mono text-green-600 dark:text-green-300 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + idx * 0.2 }}
            >
              <motion.span
                className="text-green-600 dark:text-green-400 mr-2 inline-block"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 1 + idx * 0.3
                }}
              >
                $
              </motion.span>
              <motion.span
                animate={{
                  textShadow: ['0 0 0px rgba(34,197,94,0)', '0 0 5px rgba(34,197,94,0.5)', '0 0 0px rgba(34,197,94,0)']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: idx * 0.5
                }}
              >
                {text}
              </motion.span>
            </motion.p>
          ))}
        </motion.div>

        {/* Stats HUD */}
        <motion.div
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              className="bg-white/60 dark:bg-black/60 border border-green-400 p-4 rounded-xl group relative overflow-hidden"
              whileHover={{
                y: -5,
                boxShadow: '0 10px 25px -5px rgba(34,197,94,0.3)'
              }}
              transition={{ type: 'spring', stiffness: 300 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4 + idx * 0.1 }}
            >
              <div className="flex items-center gap-3 relative z-10">
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                >
                  {stat.icon}
                </motion.div>
                <div>
                  <p className="text-green-600 dark:text-green-300 text-sm">{stat.label}</p>
                  <motion.p
                    className="text-green-700 dark:text-green-400 font-medium"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {stat.value}
                  </motion.p>
                </div>
              </div>

              {/* Glowing dots */}
              <div className="absolute bottom-2 right-2 flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 bg-green-400 rounded-full"
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.3
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Terminal Cursor */}
        <motion.div
          className="fixed bottom-8 right-8 w-4 h-8 bg-green-500 dark:bg-green-400 rounded-sm"
          animate={{
            opacity: [0, 1, 0],
            y: [0, -5, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity
          }}
        >
          <motion.div
            className="absolute -left-1 top-1 w-2 h-6 bg-green-400/50 rounded-sm"
            animate={{
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: 0.3
            }}
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
