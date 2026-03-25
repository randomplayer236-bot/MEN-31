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
    <section id="shop" className="py-32 px-6 bg-ivory">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-navy uppercase tracking-tighter leading-tight">{t('shop.title')}</h2>
          <div className="w-32 h-1.5 bg-gold mx-auto mb-12" />
          
          <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-4 mb-16 overflow-x-auto pb-4 md:pb-0 no-scrollbar px-4 md:px-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-8 py-3 text-[10px] uppercase tracking-[0.3em] transition-all duration-500 border whitespace-nowrap font-bold ${
                  activeCategory === cat.id 
                    ? 'bg-navy border-navy text-ivory shadow-xl scale-105' 
                    : 'border-platinum/30 text-charcoal/50 hover:border-navy hover:text-navy'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredProducts.map((product, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              key={product.id}
              className="group premium-card overflow-hidden flex flex-col h-full"
            >
              <div 
                className={`relative aspect-[3/4] overflow-hidden ${isAdminMode ? 'cursor-pointer ring-4 ring-gold/10 hover:ring-gold/40 transition-all' : ''}`}
                onClick={() => handleImageClick(product.id)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                
                {isAdminMode && (
                  <div className="absolute inset-0 bg-navy/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-gold p-5 rounded-full text-ivory shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-500">
                      <Camera size={32} />
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 bg-navy/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  {!isAdminMode && (
                    <button className="bg-ivory text-navy p-5 rounded-full hover:bg-gold hover:text-ivory transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-xl">
                      <ShoppingCart size={28} />
                    </button>
                  )}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <p className="text-charcoal/40 text-[10px] uppercase tracking-[0.3em] mb-3 font-bold">{t(`shop.categories.${product.category.toLowerCase().replace('-', '')}`)}</p>
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-bold tracking-tight text-navy font-display">{product.name}</h3>
                  <p className="text-gold font-bold text-lg font-display">{product.price}</p>
                </div>
                <div className="mt-auto">
                  <button className="w-full py-4 bg-navy text-ivory hover:bg-gold transition-all duration-500 uppercase text-[10px] tracking-[0.3em] font-bold shadow-md hover:shadow-xl active:scale-95">
                    {t('shop.addToCart')}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
