import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Hero } from './components/Navigation';
import { Shop } from './components/Shop';
import { About, Contact, WhatsAppButton } from './components/AboutContact';
import { Gallery, Footer } from './components/GalleryFooter';
import { AdminSection as Admin } from './components/Admin';
import { AdminProvider, useAdmin } from './context/AdminContext';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

const HomePage = () => (
  <>
    <Hero />
    <Shop />
    <About />
    <Gallery />
    <Contact />
  </>
);

const AppContent = () => {
  const { loading } = useAdmin();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-8 shadow-[0_0_30px_rgba(179,154,106,0.3)]"></div>
          <p className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold animate-pulse">Establishing Connection to MEN 31</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-ivory text-charcoal selection:bg-gold selection:text-navy font-sans">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
};

export default function App() {
  return (
    <AdminProvider>
      <AppContent />
    </AdminProvider>
  );
}
