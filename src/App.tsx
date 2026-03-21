import React from 'react';
import { Navbar, Hero } from './components/Navigation';
import { Shop } from './components/Shop';
import { About, Contact, WhatsAppButton } from './components/AboutContact';
import { Gallery, Footer } from './components/GalleryFooter';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-gold selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <Shop />
        <About />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
