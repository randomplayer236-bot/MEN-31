import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Hero } from './components/Navigation';
import { Shop } from './components/Shop';
import { Philosophy, Contact, WhatsAppButton } from './components/AboutContact';
import { Footer, FeaturedGrid } from './components/GalleryFooter';
import { AdminSection as Admin } from './components/Admin';
import { AdminProvider, useAdmin } from './context/AdminContext';
import { LayoutControls } from './components/LayoutControls';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

const HomePage = () => {
  const { showCollection } = useAdmin();
  return (
    <div className="flex flex-col">
      <Hero />
      {showCollection && <Shop />}
      <FeaturedGrid />
      <Philosophy />
    </div>
  );
};

const AppContent = () => {
  const { loading } = useAdmin();

  const { siteLogo } = useAdmin();

  useEffect(() => {
    if (siteLogo) {
      const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (link) {
        link.href = siteLogo;
      }
      const appleLink = document.querySelector("link[rel='apple-touch-icon']") as HTMLLinkElement;
      if (appleLink) {
        appleLink.href = siteLogo;
      }
    }
  }, [siteLogo]);

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
      autoResize: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Update lenis on content changes
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });
    resizeObserver.observe(document.body);

    return () => {
      lenis.destroy();
      resizeObserver.disconnect();
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
      <div className="min-h-screen bg-ivory text-charcoal selection:bg-gold selection:text-navy font-sans flex flex-col overflow-x-hidden">
        <Navbar />
        <LayoutControls />
        <main className="flex-grow flex flex-col pb-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
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
