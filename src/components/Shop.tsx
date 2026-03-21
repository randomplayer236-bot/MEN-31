import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart } from 'lucide-react';
import { PRODUCTS } from '../constants';

export const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'T-Shirts', 'Hoodies', 'Pants', 'Jackets', 'Accessories'];

  const filteredProducts = activeCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <section id="shop" className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-text uppercase tracking-tighter">Collections</h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-8" />
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 text-xs uppercase tracking-widest transition-all duration-300 border ${
                  activeCategory === cat 
                    ? 'bg-gold border-gold text-white' 
                    : 'border-white/20 text-white/60 hover:border-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key={product.id}
              className="group glass-card overflow-hidden"
            >
              <div className="relative h-[400px] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-white text-black p-4 rounded-full hover:bg-gold hover:text-white transition-colors">
                    <ShoppingCart size={24} />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <p className="text-white/40 text-xs uppercase tracking-widest mb-2">{product.category}</p>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold tracking-tight">{product.name}</h3>
                  <p className="text-gold font-bold">{product.price}</p>
                </div>
                <button className="w-full mt-6 py-3 border border-white/10 hover:border-gold hover:text-gold transition-all duration-300 uppercase text-xs tracking-widest font-bold">
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
