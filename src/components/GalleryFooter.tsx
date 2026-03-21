import React from 'react';
import { motion } from 'motion/react';
import { LOOKBOOK } from '../constants';

export const Gallery = () => {
  return (
    <section id="gallery" className="py-24 px-6 bg-light-grey">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-text uppercase">Lookbook</h2>
          <p className="text-white/40 uppercase tracking-widest text-sm">Curated Styles for the Modern Man</p>
          <div className="w-24 h-1 bg-gold mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {LOOKBOOK.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group h-[500px] overflow-hidden cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-6 text-center">
                <h3 className="text-2xl font-bold mb-2 uppercase tracking-tighter">{item.title}</h3>
                <div className="w-12 h-[1px] bg-gold mb-4" />
                <p className="text-sm text-white/60 uppercase tracking-widest">View Outfit</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <a href="#home" className="text-3xl font-bold tracking-widest glow-text mb-6 inline-block">
            MEN <span className="text-gold">31</span>
          </a>
          <p className="text-white/40 max-w-md mb-8">
            The destination for premium men's fashion in Morocco. Streetwear, classy outfits, and accessories designed for the modern man.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-white/60 hover:text-gold transition-colors"><Instagram size={24} /></a>
            <a href="#" className="text-white/60 hover:text-gold transition-colors"><Facebook size={24} /></a>
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-bold mb-6 uppercase tracking-widest">Quick Links</h4>
          <ul className="space-y-4 text-white/40">
            <li><a href="#home" className="hover:text-gold transition-colors">Home</a></li>
            <li><a href="#shop" className="hover:text-gold transition-colors">Shop</a></li>
            <li><a href="#about" className="hover:text-gold transition-colors">About Us</a></li>
            <li><a href="#gallery" className="hover:text-gold transition-colors">Lookbook</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6 uppercase tracking-widest">Newsletter</h4>
          <p className="text-white/40 text-sm mb-4">Subscribe to get special offers and style updates.</p>
          <form className="flex">
            <input 
              type="email" 
              placeholder="Your Email" 
              className="bg-white/5 border border-white/10 px-4 py-2 w-full focus:outline-none focus:border-gold"
            />
            <button className="bg-gold text-white px-4 py-2 uppercase text-xs font-bold tracking-widest">Join</button>
          </form>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 text-center text-white/20 text-xs uppercase tracking-widest">
        &copy; 2026 MEN 31. All Rights Reserved. Designed for the Modern Man.
      </div>
    </footer>
  );
};

import { Instagram, Facebook } from 'lucide-react';
