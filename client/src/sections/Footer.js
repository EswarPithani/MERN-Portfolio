import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="relative py-16 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-white dark:bg-black opacity-90 transition-colors duration-500" />
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(20, 184, 166, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(20, 184, 166, 0.03) 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
            mixBlendMode: 'overlay',
          }}
        />
        <div className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay">
          <div className="w-full h-full bg-[linear-gradient(rgba(20,184,166,0.05)_1px,transparent_1px)] bg-[length:100%_2px] animate-scanlines" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="border-t border-green-400/50 pt-12">
          <h3 className="font-mono text-xl md:text-2xl mb-10 text-center text-gray-800 dark:text-green-300 transition-colors">
            <Typewriter
              words={[">> CONNECT_WITH_ME", ">> GET_IN_TOUCH"]}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={40}
              delaySpeed={2000}
            />
          </h3>

          <div className="flex justify-center gap-8 mb-12">
            {[
              {
                href: "https://github.com/EswarPithani",
                icon: <FiGithub />,
                label: "[GITHUB]",
              },
              {
                href: "https://www.linkedin.com/in/ev3/",
                icon: <FiLinkedin />,
                label: "[LINKEDIN]",
              },
              {
                href: "mailto:eswarpithani268@gmail.com",
                icon: <FiMail />,
                label: "[EMAIL]",
              },
            ].map((item, idx) => (
              <motion.a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                aria-label={item.label}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute -inset-1 bg-green-400/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-all duration-300" />
                <div className="relative flex flex-col items-center gap-2 p-4 border border-green-400/30 rounded-lg bg-white/70 dark:bg-black/70 hover:bg-green-400/10 transition-all duration-300">
                  <span className="text-2xl text-gray-700 dark:text-green-300 group-hover:text-green-400 transition-colors">
                    {item.icon}
                  </span>
                  <span className="font-mono text-gray-800 dark:text-green-300 group-hover:text-green-400 transition-colors">
                    {item.label}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>

          {/* HUD Panel */}
          <motion.div
            className="bg-white/50 dark:bg-black/50 border border-green-400 p-4 rounded-lg max-w-md mx-auto text-center font-mono text-sm mb-10 cursor-default text-gray-800 dark:text-green-300"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <p>> SYSTEM: OPERATIONAL</p>
            <p>> STATUS: {currentYear}_ACTIVE</p>
            <motion.div
              className="h-1 bg-green-400/30 rounded-full mt-2 overflow-hidden"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              transition={{ duration: 1.5, delay: 0.3 }}
              viewport={{ once: true }}
            />
          </motion.div>

          <motion.p
            className="font-mono text-green-600 dark:text-green-400/80 text-sm text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            &copy; {currentYear} ESWAR_PITHANI. ALL_RIGHTS_RESERVED.
          </motion.p>
        </div>
      </div>
    </motion.footer>
  );
}
