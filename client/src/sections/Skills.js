import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { FiCode, FiCpu, FiDatabase, FiLayers } from 'react-icons/fi';

const skills = [
  { name: 'REACT', level: 85, icon: <FiLayers className="text-green-500 dark:text-green-400" /> },
  { name: 'NODE.JS', level: 75, icon: <FiCpu className="text-green-500 dark:text-green-400" /> },
  { name: 'EXPRESS', level: 70, icon: <FiCode className="text-green-500 dark:text-green-400" /> },
  { name: 'MONGODB', level: 70, icon: <FiDatabase className="text-green-500 dark:text-green-400" /> },
  { name: 'JAVA', level: 80, icon: <FiLayers className="text-green-500 dark:text-green-400" /> },
  { name: 'PYTHON', level: 75, icon: <FiCode className="text-green-500 dark:text-green-400" /> },
  { name: 'HTML/CSS', level: 90, icon: <FiCode className="text-green-500 dark:text-green-400" /> },
  { name: 'SQL', level: 75, icon: <FiDatabase className="text-green-500 dark:text-green-400" /> },
];

export default function Skills() {
  return (
    <motion.section
      id="skills"
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

        <motion.div
          className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay"
          animate={{
            backgroundPosition: ['0% 0%', '0% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            backgroundImage:
              'linear-gradient(to bottom, transparent 95%, rgba(34,197,94,0.05) 100%)',
            backgroundSize: '100% 200px',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-12 font-mono text-green-500 dark:text-green-300 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Typewriter
            words={[">> SKILLS", ">> TECHNOLOGIES"]}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={40}
            delaySpeed={2000}
          />
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{
                scale: 1.03,
                boxShadow: '0 10px 25px -5px rgba(34,197,94,0.2)',
              }}
              className="group relative border border-green-400 bg-white/70 dark:bg-black/70 p-6 rounded-xl backdrop-blur-md overflow-hidden"
            >
              <div className="absolute inset-0 bg-green-100 dark:bg-green-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="relative flex items-start gap-4 mb-3">
                <motion.div
                  className="text-2xl p-2 bg-green-200/20 dark:bg-green-400/10 rounded-lg"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                >
                  {skill.icon}
                </motion.div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-mono text-green-700 dark:text-green-300 text-lg">
                      {skill.name}
                    </h3>
                    <motion.span
                      className="font-mono text-green-600 dark:text-green-400 text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 + idx * 0.05 }}
                    >
                      {skill.level}%
                    </motion.span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2.5 mt-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.5, delay: 0.5 + idx * 0.1 }}
                      className="h-full bg-green-500 dark:bg-green-400 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
