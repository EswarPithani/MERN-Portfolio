import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2, FiLogOut, FiMail, FiUser, FiClock } from 'react-icons/fi';

export default function AdminDashboard({ onLogout }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = () => {
    setStatus('>> Loading messages...');
    fetch('/api/admin/messages')
      .then(res => res.json())
      .then(data => {
        setMessages(data);
        setLoading(false);
        setStatus(`>> ${data.length} messages loaded`);
        setTimeout(() => setStatus(''), 3000);
      })
      .catch(err => {
        console.error('Failed to fetch messages', err);
        setStatus('>> ERROR: Failed to load messages');
        setLoading(false);
      });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('>> Confirm message deletion?')) return;

    try {
      setStatus('>> Deleting message...');
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setMessages(messages.filter(msg => msg._id !== id));
        setStatus('>> Message deleted');
        setTimeout(() => setStatus(''), 2000);
      } else {
        setStatus('>> ERROR: Failed to delete');
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      setStatus('>> ERROR: Connection failed');
    }
  };

  return (
    <motion.div
      className="relative max-w-4xl mx-auto py-10 px-4 sm:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
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
      <div className="relative z-10 border-2 border-green-400 bg-black/80 p-6 rounded-xl backdrop-blur-sm">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b border-green-400/50 pb-4">
          <div className="flex items-center gap-3">
            <FiMail className="text-green-400 text-2xl" />
            <h2 className="text-2xl font-bold font-mono text-green-300">MESSAGE_ARCHIVE</h2>
          </div>

          <motion.button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-400/20 border-2 border-red-400 text-red-300 font-mono rounded-md hover:bg-red-400/30 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiLogOut /> [LOGOUT]
          </motion.button>
        </div>

        {/* Status message */}
        <AnimatePresence>
          {status && (
            <motion.div
              className={`font-mono text-center p-3 rounded-md border-2 mb-6 ${status.includes('ERROR')
                ? 'text-red-300 border-red-400 bg-red-400/10'
                : 'text-green-300 border-green-400 bg-green-400/10'
                }`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', stiffness: 500 }}
            >
              {status}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Messages */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-green-400 rounded-full"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          </div>
        ) : messages.length === 0 ? (
          <p className="font-mono text-green-300 text-center py-10">>> NO_MESSAGES_FOUND</p>
        ) : (
          <ul className="space-y-4">
            {messages.map((msg, idx) => (
              <motion.li
                key={msg._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="border-2 border-green-400/50 bg-black/60 p-4 rounded-md relative group"
              >
                <div className="flex items-start gap-3 mb-3">
                  <FiUser className="text-green-400 mt-1 flex-shrink-0" />
                  <p className="font-mono text-green-300">{msg.name}</p>
                </div>

                <div className="flex items-start gap-3 mb-3">
                  <svg className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <p className="font-mono text-green-300">{msg.email}</p>
                </div>

                <div className="flex items-start gap-3 mb-4">
                  <svg className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <p className="font-mono text-green-300">{msg.message}</p>
                </div>

                <div className="flex items-center gap-2 text-green-400/80 text-sm">
                  <FiClock />
                  <span className="font-mono">{new Date(msg.createdAt).toLocaleString()}</span>
                </div>

                <motion.button
                  onClick={() => handleDelete(msg._id)}
                  className="absolute top-4 right-4 flex items-center gap-1 bg-red-400/20 border border-red-400 text-red-300 font-mono px-2 py-1 rounded hover:bg-red-400/30 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiTrash2 size={14} /> DELETE
                </motion.button>
              </motion.li>
            ))}
          </ul>
        )}

        {/* HUD Panel */}
        <div className="mt-8 bg-black/50 border border-green-400 p-3 rounded-lg text-center font-mono text-green-300 text-sm">
          <p>> SYSTEM: MESSAGE_ARCHIVE</p>
          <p>> STATUS: {loading ? 'LOADING' : `${messages.length}_MESSAGES`}</p>
        </div>
      </div>
    </motion.div>
  );
}