import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiLock, FiTerminal } from 'react-icons/fi';

export default function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [shake, setShake] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('>> Authenticating...');
    setShake(false);

    try {
      const res = await fetch('https://evsportfolio-backend.onrender.com/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus('>> Access granted!');
        setTimeout(() => onLogin(), 1000);
      } else {
        setStatus(`>> ERROR: ${data.error || 'Invalid credentials'}`);
        triggerShake();
      }
    } catch {
      setStatus('>> ERROR: Connection failed');
      triggerShake();
    }
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 600);
  };

  return (
    <motion.div
      className="relative max-w-md mx-auto mt-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black opacity-90 rounded-xl"></div>
        <div className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(20, 184, 166, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(20, 184, 166, 0.03) 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
            mixBlendMode: 'overlay',
          }}
        />
      </div>

      {/* Content */}
      <motion.form
        onSubmit={handleSubmit}
        className="relative z-10 border-2 border-green-400 bg-black/80 p-8 rounded-xl space-y-6 backdrop-blur-sm"
        animate={shake ? { x: [-10, 10, -6, 6, -2, 2, 0] } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <FiTerminal className="text-green-400 text-2xl" />
          <h2 className="text-2xl font-bold font-mono text-green-300">SYSTEM_LOGIN</h2>
        </div>

        <div className="space-y-1">
          <label className="font-mono text-green-300 text-sm flex items-center gap-2">
            <FiLock className="text-green-400" />
            PASSWORD
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 font-mono bg-black/50 border-2 border-green-400 text-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:shadow-glow transition-all duration-300"
          />
        </div>

        <motion.button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-green-400/20 border-2 border-green-400 text-green-300 font-mono py-3 px-6 rounded-md hover:bg-green-400/30 transition-all duration-300 group"
          whileHover={{
            scale: 1.02,
            boxShadow: '0 0 15px rgba(20, 184, 166, 0.5)'
          }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative overflow-hidden">
            <span className="absolute inset-0 bg-green-400/30 w-0 group-hover:w-full transition-all duration-500 -z-10"></span>
            [AUTHENTICATE]
          </span>
        </motion.button>

        {status && (
          <motion.p
            className={`font-mono text-center p-3 rounded-md border-2 ${status.includes('ERROR')
              ? 'text-red-300 border-red-400 bg-red-400/10'
              : 'text-green-300 border-green-400 bg-green-400/10'
              }`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 500 }}
          >
            {status}
          </motion.p>
        )}

        {/* HUD Panel */}
        <div className="mt-4 bg-black/50 border border-green-400 p-3 rounded-lg text-center font-mono text-green-300 text-xs">
          <p>> SYSTEM: AUTHENTICATION_PORTAL</p>
          <p>> STATUS: {status.includes('granted') ? 'ACCESS_GRANTED' : 'AWAITING_CREDENTIALS'}</p>
        </div>
      </motion.form>
    </motion.div>
  );
}
