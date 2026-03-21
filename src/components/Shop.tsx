import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Camera } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAdmin } from '../context/AdminContext';

export const Shop = () => {
  const { t } = useTranslation();
  const { isAdminMode, products, updateProductImage } = useAdmin();
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = [
    { id: 'All', label: t('shop.categories.all') },
    { id: 'T-Shirts', label: t('shop.categories.tshirts') },
    { id: 'Hoodies', label: t('shop.categories.hoodies') },
    { id: 'Pants', label: t('shop.categories.pants') },
    { id: 'Jackets', label: t('shop.categories.jackets') },
    { id: 'Accessories', label: t('shop.categories.accessories') },
  ];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const handleImageClick = (productId: string) => {
    if (!isAdminMode) return;

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dqk8cvj5b';
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'men31_upload';

    // @ts-ignore
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName,
        uploadPreset,
        folder: 'men31/products',
        multiple: false,
        styles: {
          palette: {
            window: '#000000',
            sourceBg: '#000000',
            windowBorder: '#D4AF37',
            tabIcon: '#D4AF37',
            inactiveTabIcon: '#8E8E8E',
            menuIcons: '#D4AF37',
            link: '#D4AF37',
            action: '#D4AF37',
            inProgress: '#D4AF37',
            complete: '#D4AF37',
            error: '#FF0000',
            textDark: '#000000',
            textLight: '#FFFFFF'
          }
        }
      },
      (error: any, result: any) => {
        if (error) {
          console.error('Cloudinary Upload Error:', error);
          return;
        }
        if (result && result.event === 'success') {
          updateProductImage(productId, result.info.secure_url);
        }
      }
    );
    widget.open();
  };

  return (
    <section id="shop" className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-text uppercase tracking-tighter">{t('shop.title')}</h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-8" />
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-2 text-xs uppercase tracking-widest transition-all duration-300 border ${
                  activeCategory === cat.id 
                    ? 'bg-gold border-gold text-white' 
                    : 'border-white/20 text-white/60 hover:border-white'
                }`}
              >
                {cat.label}
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
              <div 
                className={`relative h-[400px] overflow-hidden ${isAdminMode ? 'cursor-pointer ring-2 ring-gold/20 hover:ring-gold transition-all' : ''}`}
                onClick={() => handleImageClick(product.id)}
              >
                <img
                  src={product.image}
                  alt={t(`products.${product.id}.name`)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                
                {isAdminMode && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-gold p-4 rounded-full text-white shadow-xl">
                      <Camera size={28} />
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  {!isAdminMode && (
                    <button className="bg-white text-black p-4 rounded-full hover:bg-gold hover:text-white transition-colors">
                      <ShoppingCart size={24} />
                    </button>
                  )}
                </div>
              </div>
              <div className="p-6">
                <p className="text-white/40 text-xs uppercase tracking-widest mb-2">{t(`shop.categories.${product.category.toLowerCase().replace('-', '')}`)}</p>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold tracking-tight">{t(`products.${product.id}.name`)}</h3>
                  <p className="text-gold font-bold">{product.price}</p>
                </div>
                <button className="w-full mt-6 py-3 border border-white/10 hover:border-gold hover:text-gold transition-all duration-300 uppercase text-xs tracking-widest font-bold">
                  {t('shop.addToCart')}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
