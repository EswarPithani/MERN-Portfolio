import React, { useEffect, useState, useRef } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { darkMode, toggleDarkMode } = useTheme();
  const navItemsRef = useRef([]);
  const toggleRef = useRef(null);

  const sections = ['about', 'projects', 'skills', 'contact'];

  // Magnetic effect setup
  useEffect(() => {
    const navItems = navItemsRef.current;
    const toggleBtn = toggleRef.current;

    const handleMouseMove = (e, element) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const distanceX = x - centerX;
      const distanceY = y - centerY;

      element.style.transform = `translate(${distanceX * 0.1}px, ${distanceY * 0.1}px)`;
    };

    const handleMouseLeave = (element) => {
      element.style.transform = 'translate(0, 0)';
    };

    navItems.forEach(item => {
      if (item) {
        item.addEventListener('mousemove', (e) => handleMouseMove(e, item));
        item.addEventListener('mouseleave', () => handleMouseLeave(item));
      }
    });

    if (toggleBtn) {
      toggleBtn.addEventListener('mousemove', (e) => handleMouseMove(e, toggleBtn));
      toggleBtn.addEventListener('mouseleave', () => handleMouseLeave(toggleBtn));
    }

    return () => {
      navItems.forEach(item => {
        if (item) {
          item.removeEventListener('mousemove', (e) => handleMouseMove(e, item));
          item.removeEventListener('mouseleave', () => handleMouseLeave(item));
        }
      });

      if (toggleBtn) {
        toggleBtn.removeEventListener('mousemove', (e) => handleMouseMove(e, toggleBtn));
        toggleBtn.removeEventListener('mouseleave', () => handleMouseLeave(toggleBtn));
      }
    };
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  // Scrollspy logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      for (let section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const offset = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= offset - 100 && scrollY < offset + height - 100) {
            setActiveSection(section);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400 hover:scale-105 transition-transform duration-200">Eswar</h1>

        <div className="hidden md:flex items-center space-x-8 font-medium">
          {sections.map((section, index) => (
            <li
              key={section}
              ref={el => navItemsRef.current[index] = el}
              className={`list-none cursor-pointer capitalize transition-all duration-300 ${darkMode
                ? `hover:text-blue-400 ${activeSection === section ? 'text-blue-300 font-semibold underline' : 'text-gray-200'}`
                : `hover:text-blue-600 ${activeSection === section ? 'text-blue-600 font-semibold underline' : 'text-gray-800'}`
                }`}
              onClick={() => scrollToSection(section)}
            >
              {section}
            </li>
          ))}
          <li
            ref={el => navItemsRef.current[sections.length] = el}
            className="list-none cursor-pointer transition-all duration-300"
            onClick={toggleDarkMode}
          >
            {darkMode ? <Sun size={20} className="text-gray-200" /> : <Moon size={20} className="text-gray-800" />}
          </li>
        </div>

        <button
          ref={toggleRef}
          className="md:hidden transition-all duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} className={darkMode ? "text-gray-200" : "text-gray-800"} /> : <Menu size={24} className={darkMode ? "text-gray-200" : "text-gray-800"} />}
        </button>
      </div>

      {isOpen && (
        <ul className="md:hidden flex flex-col items-center py-4 space-y-4">
          {sections.map((section, index) => (
            <li
              key={section}
              className={`cursor-pointer capitalize text-lg transition-all duration-300 ${darkMode
                ? `hover:text-blue-400 ${activeSection === section ? 'text-blue-300 font-semibold underline' : 'text-gray-200'}`
                : `hover:text-blue-600 ${activeSection === section ? 'text-blue-600 font-semibold underline' : 'text-gray-800'}`
                }`}
              onClick={() => scrollToSection(section)}
            >
              {section}
            </li>
          ))}
          <li
            className="cursor-pointer transition-all duration-300"
            onClick={toggleDarkMode}
          >
            {darkMode ? <Sun size={20} className="text-gray-200" /> : <Moon size={20} className="text-gray-800" />}
          </li>
        </ul>
      )}
    </nav>
  );
}