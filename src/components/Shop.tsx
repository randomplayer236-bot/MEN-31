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
    <section id="shop" className="min-h-[35vh] bg-ivory flex flex-col">
      {/* New Collection Section - Redesigned for Above the Fold */}
      <div className="max-w-7xl mx-auto px-6 py-2 lg:py-4">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="w-10 h-[1.5px] bg-gold mb-2 mx-auto opacity-60" />
            <h2 className="text-xl md:text-2xl lg:text-3xl font-display text-navy mb-1 uppercase tracking-tight">
              {t('shop.newCollection')}
            </h2>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-4 lg:pb-6 flex-grow flex flex-col">
        <motion.div 
          id="collection-grid"
          className="flex-grow flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex justify-center gap-3 mb-4 overflow-x-auto no-scrollbar px-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-1.5 text-[8px] lg:text-[9px] uppercase tracking-[0.25em] transition-all duration-500 border whitespace-nowrap font-bold hover:scale-105 transform ${
                  activeCategory === cat.id 
                    ? 'bg-navy border-navy text-ivory shadow-lg' 
                    : 'border-platinum/20 text-charcoal/40 hover:border-navy/30 hover:text-navy'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex-grow overflow-x-auto no-scrollbar flex gap-6 items-center px-6 pb-4">
            {filteredProducts.map((product, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                key={product.id}
                className="group flex flex-col shrink-0 w-36 lg:w-48 h-full relative"
              >
                <div 
                  className="relative aspect-[3/4] overflow-hidden mb-3 shadow-md group-hover:shadow-xl transition-all duration-500 border border-platinum/5"
                  onClick={() => handleImageClick(product.id)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/5 transition-colors duration-500" />
                </div>

                <div className="text-center transform transition-transform duration-500 group-hover:translate-y-[-2px]">
                  <h3 className="text-[10px] lg:text-[12px] font-display text-navy uppercase tracking-wider truncate mb-0.5">{product.name}</h3>
                  <p className="text-gold font-bold text-[9px] lg:text-[11px] tracking-widest">{product.price} DH</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
