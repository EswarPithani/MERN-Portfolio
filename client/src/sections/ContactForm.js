import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [resultType, setResultType] = useState(null);
  const [shake, setShake] = useState(false);
  const [isFocused, setIsFocused] = useState({ name: false, email: false, message: false });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    setResultType(null);

    try {
      const res = await fetch('https://evsportfolio-backend.onrender.com/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });


      const data = await res.json();

      if (res.ok) {
        setStatus('Message transmitted successfully!');
        setFormData({ name: '', email: '', message: '' });
        setResultType('success');
        setShake(false);
      } else {
        setStatus(`ERROR: ${data.error || 'Transmission failed'}`);
        setResultType('error');
        triggerShake();
      }
    } catch {
      setStatus('ERROR: Network failure');
      setResultType('error');
      triggerShake();
    }
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 600);
  };

  const handleFocus = (field) => {
    setIsFocused(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setIsFocused(prev => ({ ...prev, [field]: false }));
  };

  return (
    <div className="relative w-full">
      {/* Grid + Glow Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-white dark:bg-black opacity-90" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(20, 184, 166, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(20, 184, 166, 0.03) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            mixBlendMode: 'overlay',
          }}
        />
        <motion.div
          className="absolute inset-0 pointer-events-none mix-blend-overlay"
          animate={{ backgroundPosition: ['0% 0%', '0% 100%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{
            backgroundImage: 'linear-gradient(to bottom, transparent 95%, rgba(20, 184, 166, 0.1) 100%)',
            backgroundSize: '100% 200px',
          }}
        />
      </div>

      {/* Form Wrapper */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-12 font-mono text-center text-gray-900 dark:text-green-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typewriter
            words={[">> CONTACT_ME", ">> SEND_MESSAGE"]}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={40}
            delaySpeed={2000}
          />
        </motion.h2>

        <motion.form
          onSubmit={handleSubmit}
          className="w-full border-2 border-gray-300 dark:border-green-400 bg-white dark:bg-black/80 p-6 sm:p-8 rounded-lg space-y-8 backdrop-blur-sm"
          animate={shake ? { x: [-10, 10, -6, 6, -2, 2, 0] } : {}}
          transition={{ duration: 0.6 }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {['name', 'email', 'message'].map((field) => (
            <motion.div
              key={field}
              className="space-y-2"
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <label className="font-mono text-sm flex items-center text-gray-800 dark:text-green-300">
                {isFocused[field] && (
                  <motion.span
                    className="inline-block mr-2"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    &gt;
                  </motion.span>
                )}
                {field.toUpperCase()}
              </label>
              {field === 'message' ? (
                <textarea
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  onFocus={() => handleFocus(field)}
                  onBlur={() => handleBlur(field)}
                  required
                  rows="5"
                  className="w-full px-4 py-3 font-mono bg-white dark:bg-black/50 border-2 border-gray-400 dark:border-green-400 text-gray-800 dark:text-green-300 placeholder-gray-400 dark:placeholder-green-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-green-400 transition-all duration-300"
                />
              ) : (
                <input
                  name={field}
                  type={field === 'email' ? 'email' : 'text'}
                  value={formData[field]}
                  onChange={handleChange}
                  onFocus={() => handleFocus(field)}
                  onBlur={() => handleBlur(field)}
                  required
                  className="w-full px-4 py-3 font-mono bg-white dark:bg-black/50 border-2 border-gray-400 dark:border-green-400 text-gray-800 dark:text-green-300 placeholder-gray-400 dark:placeholder-green-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-green-400 transition-all duration-300"
                />
              )}
            </motion.div>
          ))}

          <motion.button
            type="submit"
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-400/20 to-blue-600/20 dark:from-green-400/20 dark:to-green-600/20 border-2 border-blue-400 dark:border-green-400 text-blue-700 dark:text-green-300 font-mono py-4 px-6 rounded-md hover:bg-blue-400/30 dark:hover:bg-green-400/30 transition-all duration-300 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <FiSend className="text-lg" />
            </motion.span>
            <span className="relative overflow-hidden">
              <span className="absolute inset-0 bg-green-400/30 w-0 group-hover:w-full transition-all duration-500 -z-10"></span>
              [TRANSMIT_MESSAGE]
            </span>
          </motion.button>

          <AnimatePresence>
            {status && (
              <motion.div
                key={resultType}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 500 }}
                className={`font-mono text-center p-4 rounded-md border-2 ${resultType === 'success'
                  ? 'text-blue-800 dark:text-green-300 border-blue-400 dark:border-green-400 bg-blue-100 dark:bg-green-400/10'
                  : 'text-red-600 dark:text-red-300 border-red-400 bg-red-100 dark:bg-red-400/10'
                  }`}
              >
                <div className="flex items-center justify-center gap-3">
                  {resultType === 'success' ? (
                    <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }} transition={{ duration: 0.6 }}>
                      <FiCheckCircle size={24} />
                    </motion.div>
                  ) : (
                    <motion.div animate={{ x: [-5, 5, -5, 5, 0] }} transition={{ duration: 0.5 }}>
                      <FiAlertCircle size={24} />
                    </motion.div>
                  )}
                  <span className="text-lg">{status}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>

        {/* System Footer */}
        <motion.div
          className="mt-12 bg-gray-100 dark:bg-black/50 border-2 border-gray-300 dark:border-green-400 p-4 rounded-lg max-w-md mx-auto text-center font-mono text-gray-700 dark:text-green-300 text-sm cursor-default"
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>&gt; SYSTEM: MESSAGE_TRANSMITTER</p>
          <p>&gt; STATUS: {resultType === 'success' ? 'OPERATIONAL' : 'AWAITING_INPUT'}</p>
          <motion.div
            className="h-1 bg-green-400/30 rounded-full mt-2 overflow-hidden"
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            transition={{ duration: 2, delay: 0.3 }}
            viewport={{ once: true }}
          />
        </motion.div>
      </div>
    </div>
  );
}
