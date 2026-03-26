import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Camera, Trash2, Plus, Edit2, Check, X as CloseIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAdmin } from '../context/AdminContext';
import { Product } from '../types';

export const Shop = () => {
  const { t } = useTranslation();
  const { isAdminMode, products, updateProductImage, addProduct, removeProduct, aboutImage, updateAboutImage } = useAdmin();
  const [activeCategory, setActiveCategory] = useState('All');

  const handleNewCollectionImageUpload = () => {
    if (!isAdminMode) return;
    
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dqk8cvj5b';
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'men31_upload';

    // @ts-ignore
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName,
        uploadPreset,
        folder: 'men31/layout',
        multiple: false,
        sources: ['local', 'url', 'camera'],
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
        if (!error && result && result.event === 'success') {
          updateAboutImage(result.info.secure_url);
        }
      }
    );
    widget.open();
  };

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Product>>({});

  const categories = [
    { id: 'All', label: t('shop.categories.all') },
    { id: 'T-Shirts', label: t('shop.categories.tshirts') },
    { id: 'Hoodies', label: t('shop.categories.hoodies') },
    { id: 'Pants', label: t('shop.categories.pants') },
    { id: 'Jackets', label: t('shop.categories.jackets') },
    { id: 'Boots', label: t('shop.categories.boots') },
    { id: 'Accessories', label: t('shop.categories.accessories') },
  ];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const handleAddProduct = async () => {
    const newProduct: Product = {
      id: `prod_${Date.now()}`,
      name: 'New Product',
      price: '$0.00',
      category: activeCategory === 'All' ? 'T-Shirts' : activeCategory as any,
      image: 'https://images.unsplash.com/photo-1516257984877-a03a0152aa39?auto=format&fit=crop&q=80&w=800'
    };
    await addProduct(newProduct);
  };

  const handleStartEdit = (product: Product) => {
    setEditingId(product.id);
    setEditForm(product);
  };

  const handleSaveEdit = async () => {
    if (editingId && editForm.name) {
      await addProduct(editForm as Product);
      setEditingId(null);
    }
  };

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
        sources: ['local', 'url', 'camera', 'google_drive'],
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
    <section id="shop" className="bg-ivory overflow-hidden">
      {/* New Collection Section - Redesigned for Above the Fold */}
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <div className="w-12 h-[1px] bg-gold mb-6 mx-auto lg:mx-0" />
            <h2 className="text-3xl md:text-4xl lg:text-7xl font-display text-navy mb-4 lg:mb-10 leading-tight uppercase tracking-tight">
              {t('shop.newCollection')}
            </h2>
            <p className="text-charcoal/60 uppercase tracking-[0.3em] text-[10px] lg:text-[12px] font-bold mb-8 lg:mb-12 max-w-md mx-auto lg:mx-0">
              {t('shop.subtitle')}
            </p>
            <a
              href="#collection-grid"
              className="inline-block px-10 lg:px-12 py-4 lg:py-5 bg-navy text-ivory text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-gold transition-all duration-300 shadow-xl"
            >
              {t('shop.viewAll')}
            </a>
          </motion.div>

          {/* Right: Rectangular Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`relative aspect-[16/9] lg:aspect-[4/3] overflow-hidden rounded-sm shadow-2xl order-1 lg:order-2 ${isAdminMode ? 'cursor-pointer group/collection' : ''}`}
            onClick={handleNewCollectionImageUpload}
          >
            <img
              src={aboutImage || 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1000'}
              alt="New Collection"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
            
            {isAdminMode && (
              <div className="absolute inset-0 bg-navy/40 flex items-center justify-center opacity-0 group-hover/collection:opacity-100 transition-opacity">
                <div className="bg-gold p-6 rounded-full text-ivory shadow-2xl transform scale-75 group-hover/collection:scale-100 transition-transform duration-500">
                  <Camera size={40} />
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        <motion.div 
          id="collection-grid"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-4 mb-20 overflow-x-auto pb-4 md:pb-0 no-scrollbar px-4 md:px-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-8 py-3 text-[10px] uppercase tracking-[0.3em] transition-all duration-500 border whitespace-nowrap font-bold ${
                  activeCategory === cat.id 
                    ? 'bg-navy border-navy text-ivory shadow-xl' 
                    : 'border-platinum/30 text-charcoal/50 hover:border-navy hover:text-navy'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
            {filteredProducts.map((product, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                key={product.id}
                className="group flex flex-col h-full relative"
              >
                {isAdminMode && (
                  <div className="absolute top-4 right-4 z-20 flex gap-2">
                    <button 
                      onClick={() => handleStartEdit(product)}
                      className="bg-navy p-3 rounded-full text-ivory shadow-xl hover:bg-gold transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => removeProduct(product.id)}
                      className="bg-red-500 p-3 rounded-full text-ivory shadow-xl hover:bg-red-600 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}

                <div 
                  className={`relative aspect-[3/4] overflow-hidden mb-8 ${isAdminMode ? 'cursor-pointer ring-4 ring-gold/10 hover:ring-gold/40 transition-all' : ''}`}
                  onClick={() => handleImageClick(product.id)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {isAdminMode && (
                    <div className="absolute inset-0 bg-navy/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-gold p-5 rounded-full text-ivory shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-500">
                        <Camera size={32} />
                      </div>
                    </div>
                  )}

                  {!isAdminMode && (
                    <div className="absolute inset-0 bg-navy/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <button className="bg-ivory text-navy p-5 rounded-full hover:bg-gold hover:text-ivory transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-xl">
                        <ShoppingCart size={24} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex flex-col flex-grow text-center">
                  {editingId === product.id ? (
                    <div className="space-y-4 p-4 bg-navy/5 rounded-sm">
                      <input 
                        type="text" 
                        value={editForm.name}
                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                        className="w-full bg-ivory border border-navy/10 px-3 py-2 text-sm focus:outline-none focus:border-gold"
                      />
                      <input 
                        type="text" 
                        value={editForm.price}
                        onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                        className="w-full bg-ivory border border-navy/10 px-3 py-2 text-sm focus:outline-none focus:border-gold"
                      />
                      <select 
                        value={editForm.category}
                        onChange={(e) => setEditForm({...editForm, category: e.target.value as any})}
                        className="w-full bg-ivory border border-navy/10 px-3 py-2 text-sm focus:outline-none focus:border-gold"
                      >
                        {categories.filter(c => c.id !== 'All').map(c => (
                          <option key={c.id} value={c.id}>{c.label}</option>
                        ))}
                      </select>
                      <div className="flex gap-2">
                        <button onClick={handleSaveEdit} className="flex-1 bg-gold text-navy py-2 rounded-sm flex items-center justify-center"><Check size={16} /></button>
                        <button onClick={() => setEditingId(null)} className="flex-1 bg-navy/20 text-navy py-2 rounded-sm flex items-center justify-center"><CloseIcon size={16} /></button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-charcoal/30 text-[9px] uppercase tracking-[0.4em] mb-3 font-bold">{t(`shop.categories.${product.category.toLowerCase().replace('-', '')}`)}</p>
                      <h3 className="text-lg font-display text-navy mb-2">{product.name}</h3>
                      <p className="text-gold font-bold text-base">{product.price}</p>
                    </>
                  )}
                </div>
              </motion.div>
            ))}

            {isAdminMode && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={handleAddProduct}
                className="flex flex-col items-center justify-center border-2 border-dashed border-navy/10 rounded-sm aspect-[3/4] hover:border-gold hover:bg-gold/5 transition-all group"
              >
                <div className="w-16 h-16 bg-navy/5 rounded-full flex items-center justify-center text-navy/20 group-hover:text-gold group-hover:bg-gold/10 transition-all mb-4">
                  <Plus size={32} />
                </div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-navy/40 group-hover:text-gold transition-all">Add New Product</span>
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
