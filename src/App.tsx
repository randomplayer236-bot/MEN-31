import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Hero } from './components/Navigation';
import { Shop } from './components/Shop';
import { About, Contact, WhatsAppButton } from './components/AboutContact';
import { Gallery, Footer } from './components/GalleryFooter';
import { AdminSection as Admin } from './components/Admin';

import { AdminProvider } from './context/AdminContext';

const HomePage = () => (
  <>
    <Hero />
    <Shop />
    <About />
    <Gallery />
    <Contact />
  </>
);

export default function App() {
  return (
    <AdminProvider>
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
    </AdminProvider>
  );
}
