import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Hero } from './components/Navigation';
import { Shop } from './components/Shop';
import { About, Contact, WhatsAppButton } from './components/AboutContact';
import { Gallery, Footer } from './components/GalleryFooter';
import { AdminSection as Admin } from './components/Admin';
import { AdminProvider, useAdmin } from './context/AdminContext';

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

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gold uppercase tracking-widest text-xs font-bold animate-pulse">Loading MEN 31...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-black text-white selection:bg-gold selection:text-black">
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
