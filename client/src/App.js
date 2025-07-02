import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Footer from './sections/Footer';
import ContactForm from './sections/ContactForm';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import Navbar from './components/Navbar';
import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import AnimatedBackground from './components/AnimatedBackground';
import LoadingScreen from './components/LoadingScreen';

export default function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showHero, setShowHero] = useState(false);

  return (
    <ThemeProvider>
      <Router>
        <div className="relative min-h-screen">
          <AnimatedBackground />

          {/* Only show loading screen on the main route */}
          {!showHero && window.location.pathname === '/' && (
            <LoadingScreen onFinish={() => setShowHero(true)} />
          )}

          <Routes>
            <Route
              path="/"
              element={
                showHero ? (
                  <>
                    <Navbar />
                    <main className="relative z-10">
                      <Hero />
                      <About />
                      <Projects />
                      <Skills />
                      <section id="contact" className="pt-0">
                        <ContactForm />
                      </section>
                      <Footer />
                    </main>
                  </>
                ) : null
              }
            />
            <Route
              path="/admin"
              element={
                isAdminLoggedIn ? (
                  <AdminDashboard onLogout={() => setIsAdminLoggedIn(false)} />
                ) : (
                  <AdminLogin onLogin={() => setIsAdminLoggedIn(true)} />
                )
              }
            />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}