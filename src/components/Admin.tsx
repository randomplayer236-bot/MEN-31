import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Upload, X, Plus, Trash2, LogOut } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { Product } from '../types';
import { useNavigate } from 'react-router-dom';

export const AdminSection = () => {
  const { t } = useTranslation();
  const { isAdminMode, login, logout } = useAdmin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(username, password);
    if (!success) {
      setError('Invalid credentials');
      setTimeout(() => setError(''), 3000);
    }
  };

  if (!isAdminMode) {
    return (
      <section id="admin" className="py-24 px-6 bg-black flex items-center justify-center min-h-[60vh]">
        <div className="glass-card p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold mb-8 glow-text text-center uppercase">{t('admin.login')}</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2">Username</label>
              <input 
                type="text"
                required
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-gold outline-none transition-colors"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2">Password</label>
              <input 
                type="password"
                required
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-gold outline-none transition-colors"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-[10px] uppercase tracking-widest text-center">{error}</p>}
            <button
              type="submit"
              className="w-full bg-gold text-white py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
            >
              Access Panel
            </button>
          </form>
        </div>
      </section>
    );
  }

  return <AdminDashboard onLogout={logout} />;
};

const AdminDashboard = ({ onLogout }: { onLogout: () => void }) => {
  const { t } = useTranslation();
  const { 
    addProduct, 
    addLookbookItem, 
    addVideo, 
    products, 
    lookbook, 
    videos, 
    removeProduct, 
    removeLookbookItem, 
    removeVideo,
    siteLogo,
    heroImage,
    philosophyImage,
    aboutImage,
    updateSiteLogo,
    updateHeroImage,
    updatePhilosophyImage,
    updateAboutImage
  } = useAdmin();
  const [message, setMessage] = useState('');
  const [pendingProduct, setPendingProduct] = useState<{ id: string, image: string } | null>(null);
  const [newProductData, setNewProductData] = useState<{ name: string, price: string, category: Product['category'] }>({ name: '', price: '', category: 'T-Shirts' });

  const categories = [
    { id: 'T-Shirts', label: t('shop.categories.tshirts') },
    { id: 'Hoodies', label: t('shop.categories.hoodies') },
    { id: 'Pants', label: t('shop.categories.pants') },
    { id: 'Jackets', label: t('shop.categories.jackets') },
    { id: 'Boots', label: t('shop.categories.boots') },
    { id: 'Accessories', label: t('shop.categories.accessories') },
  ];

  const handleUpload = async (type: 'products' | 'gallery' | 'videos' | 'logo' | 'hero' | 'philosophy' | 'about') => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dqk8cvj5b';
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'men31_upload';

    // @ts-ignore
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        folder: `men31/${type}`,
        sources: ['local', 'url', 'camera'],
        multiple: type === 'products' || type === 'gallery' || type === 'videos',
        defaultSource: 'local',
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
          setMessage(`Upload Error: ${error.message || 'Check console'}`);
          setTimeout(() => setMessage(''), 5000);
          return;
        }
        if (result && result.event === 'success') {
          const secure_url = result.info.secure_url;
          const id = result.info.public_id.split('/').pop() || Date.now().toString();

          if (type === 'products') {
            setPendingProduct({ id, image: secure_url });
          } else if (type === 'gallery') {
            addLookbookItem({
              id,
              image: secure_url,
              title: 'New Look'
            });
            setMessage(t('admin.success'));
            setTimeout(() => setMessage(''), 3000);
          } else if (type === 'videos') {
            addVideo({
              id,
              url: secure_url,
              title: 'New Video'
            });
            setMessage(t('admin.success'));
            setTimeout(() => setMessage(''), 3000);
          } else if (type === 'logo') {
            updateSiteLogo(secure_url);
            setMessage(t('admin.success'));
            setTimeout(() => setMessage(''), 3000);
          } else if (type === 'hero') {
            updateHeroImage(secure_url);
            setMessage(t('admin.success'));
            setTimeout(() => setMessage(''), 3000);
          } else if (type === 'philosophy') {
            updatePhilosophyImage(secure_url);
            setMessage(t('admin.success'));
            setTimeout(() => setMessage(''), 3000);
          } else if (type === 'about') {
            updateAboutImage(secure_url);
            setMessage(t('admin.success'));
            setTimeout(() => setMessage(''), 3000);
          }
        }
      }
    );
    widget.open();
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pendingProduct) return;

    await addProduct({
      id: pendingProduct.id,
      image: pendingProduct.image,
      name: newProductData.name,
      price: newProductData.price,
      category: newProductData.category
    });

    setPendingProduct(null);
    setNewProductData({ name: '', price: '', category: 'T-Shirts' });
    setMessage(t('admin.success'));
    setTimeout(() => setMessage(''), 3000);
  };

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: '', price: '', title: '' });

  const startEditing = (item: any, type: 'product' | 'lookbook') => {
    setEditingId(item.id);
    if (type === 'product') {
      setEditForm({ name: item.name, price: item.price, title: '' });
    } else {
      setEditForm({ name: '', price: '', title: item.title });
    }
  };

  const saveEdit = (type: 'product' | 'lookbook') => {
    if (!editingId) return;
    if (type === 'product') {
      const product = products.find(p => p.id === editingId);
      if (product) {
        addProduct({ ...product, name: editForm.name, price: editForm.price });
      }
    } else {
      const item = lookbook.find(l => l.id === editingId);
      if (item) {
        addLookbookItem({ ...item, title: editForm.title });
      }
    }
    setEditingId(null);
  };

  return (
    <section className="py-24 px-6 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-16">
          <h2 className="text-4xl font-bold glow-text uppercase">{t('admin.dashboard')}</h2>
          <button onClick={onLogout} className="flex items-center text-white/40 hover:text-gold transition-colors">
            <LogOut size={20} className="mr-2" /> {t('admin.logout')}
          </button>
        </div>

        {pendingProduct && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm"
          >
            <div className="glass-card p-8 w-full max-w-lg relative">
              <button 
                onClick={() => setPendingProduct(null)}
                className="absolute top-4 right-4 text-white/40 hover:text-white"
              >
                <X size={24} />
              </button>
              <h3 className="text-2xl font-bold mb-6 text-gold uppercase tracking-widest">Product Details</h3>
              <div className="flex gap-6 mb-8">
                <div className="w-32 h-32 rounded overflow-hidden flex-shrink-0 border border-white/10">
                  <img src={pendingProduct.image} className="w-full h-full object-cover" alt="Preview" />
                </div>
                <form onSubmit={handleAddProduct} className="flex-grow space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-1">Name</label>
                    <input 
                      required
                      className="w-full bg-white/5 border border-white/10 px-4 py-2 text-sm focus:border-gold outline-none"
                      value={newProductData.name}
                      onChange={e => setNewProductData({...newProductData, name: e.target.value})}
                      placeholder="e.g. Red T-Shirt"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-1">Price</label>
                    <input 
                      required
                      className="w-full bg-white/5 border border-white/10 px-4 py-2 text-sm focus:border-gold outline-none"
                      value={newProductData.price}
                      onChange={e => setNewProductData({...newProductData, price: e.target.value})}
                      placeholder="e.g. 250 DH"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-1">Category</label>
                    <select 
                      className="w-full bg-white/5 border border-white/10 px-4 py-2 text-sm focus:border-gold outline-none appearance-none"
                      value={newProductData.category}
                      onChange={e => setNewProductData({...newProductData, category: e.target.value as Product['category']})}
                    >
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id} className="bg-black text-white">{cat.label}</option>
                      ))}
                    </select>
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-gold text-white py-3 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 mt-4"
                  >
                    Add to Collection
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-8 flex flex-col items-center text-center">
            <div className="bg-gold/10 p-6 rounded-full text-gold mb-6">
              <Plus size={32} />
            </div>
            <h3 className="text-xl font-bold mb-4 uppercase">{t('admin.uploadProduct')}</h3>
            <button
              onClick={() => handleUpload('products')}
              className="px-8 py-3 border border-gold text-gold hover:bg-gold hover:text-white transition-all duration-300 uppercase text-xs font-bold tracking-widest"
            >
              {t('admin.selectFile')}
            </button>
          </div>

          <div className="glass-card p-8 flex flex-col items-center text-center">
            <div className="bg-gold/10 p-6 rounded-full text-gold mb-6">
              <Upload size={32} />
            </div>
            <h3 className="text-xl font-bold mb-4 uppercase">{t('admin.uploadGallery')}</h3>
            <button
              onClick={() => handleUpload('gallery')}
              className="px-8 py-3 border border-gold text-gold hover:bg-gold hover:text-white transition-all duration-300 uppercase text-xs font-bold tracking-widest"
            >
              {t('admin.selectFile')}
            </button>
          </div>

          <div className="glass-card p-8 flex flex-col items-center text-center">
            <div className="bg-gold/10 p-6 rounded-full text-gold mb-6">
              <Upload size={32} />
            </div>
            <h3 className="text-xl font-bold mb-4 uppercase">{t('admin.uploadVideo')}</h3>
            <button
              onClick={() => handleUpload('videos')}
              className="px-8 py-3 border border-gold text-gold hover:bg-gold hover:text-white transition-all duration-300 uppercase text-xs font-bold tracking-widest"
            >
              {t('admin.selectFile')}
            </button>
          </div>
        </div>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-gold text-white px-8 py-4 rounded-full shadow-2xl z-50"
          >
            {message}
          </motion.div>
        )}

        <div className="mt-24">
          <h3 className="text-2xl font-bold mb-8 uppercase tracking-widest text-white/40">Layout Images</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-6 flex flex-col items-center text-center">
              <div className="w-full aspect-video bg-white/5 rounded mb-4 overflow-hidden border border-white/10 flex items-center justify-center">
                {siteLogo ? (
                  <img src={siteLogo} alt="Logo" className="max-h-full object-contain" />
                ) : (
                  <span className="text-[10px] text-white/20 uppercase">No Logo</span>
                )}
              </div>
              <h4 className="text-sm font-bold mb-4 uppercase tracking-widest">Site Logo</h4>
              <button
                onClick={() => handleUpload('logo')}
                className="w-full py-2 border border-gold/50 text-gold hover:bg-gold hover:text-white transition-all duration-300 uppercase text-[10px] font-bold tracking-widest"
              >
                Change Logo
              </button>
            </div>

            <div className="glass-card p-6 flex flex-col items-center text-center">
              <div className="w-full aspect-video bg-white/5 rounded mb-4 overflow-hidden border border-white/10 flex items-center justify-center">
                {heroImage ? (
                  <img src={heroImage} alt="Hero" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[10px] text-white/20 uppercase">No Hero Image</span>
                )}
              </div>
              <h4 className="text-sm font-bold mb-4 uppercase tracking-widest">Hero Background</h4>
              <button
                onClick={() => handleUpload('hero')}
                className="w-full py-2 border border-gold/50 text-gold hover:bg-gold hover:text-white transition-all duration-300 uppercase text-[10px] font-bold tracking-widest"
              >
                Change Hero
              </button>
            </div>

            <div className="glass-card p-6 flex flex-col items-center text-center">
              <div className="w-full aspect-video bg-white/5 rounded mb-4 overflow-hidden border border-white/10 flex items-center justify-center">
                {philosophyImage ? (
                  <img src={philosophyImage} alt="Philosophy" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[10px] text-white/20 uppercase">No Philosophy Image</span>
                )}
              </div>
              <h4 className="text-sm font-bold mb-4 uppercase tracking-widest">Philosophy Image</h4>
              <button
                onClick={() => handleUpload('philosophy')}
                className="w-full py-2 border border-gold/50 text-gold hover:bg-gold hover:text-white transition-all duration-300 uppercase text-[10px] font-bold tracking-widest"
              >
                Change Image
              </button>
            </div>

            <div className="glass-card p-6 flex flex-col items-center text-center">
              <div className="w-full aspect-video bg-white/5 rounded mb-4 overflow-hidden border border-white/10 flex items-center justify-center">
                {aboutImage ? (
                  <img src={aboutImage} alt="About" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[10px] text-white/20 uppercase">No Collection Image</span>
                )}
              </div>
              <h4 className="text-sm font-bold mb-4 uppercase tracking-widest">Collection Section Image</h4>
              <button
                onClick={() => handleUpload('about')}
                className="w-full py-2 border border-gold/50 text-gold hover:bg-gold hover:text-white transition-all duration-300 uppercase text-[10px] font-bold tracking-widest"
              >
                Change Image
              </button>
            </div>
          </div>
        </div>

        <div className="mt-24">
          <h3 className="text-2xl font-bold mb-8 uppercase tracking-widest text-white/40">{t('admin.recentUploads')}</h3>
          
          <div className="space-y-12">
            {products.length > 0 && (
              <div>
                <h4 className="text-gold text-sm uppercase tracking-widest mb-4">Products</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div key={product.id} className="glass-card p-4 flex gap-4 items-center">
                      <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-grow">
                        {editingId === product.id ? (
                          <div className="space-y-2">
                            <input 
                              className="w-full bg-white/5 border border-white/10 px-2 py-1 text-xs"
                              value={editForm.name}
                              onChange={e => setEditForm({...editForm, name: e.target.value})}
                              placeholder="Name"
                            />
                            <input 
                              className="w-full bg-white/5 border border-white/10 px-2 py-1 text-xs"
                              value={editForm.price}
                              onChange={e => setEditForm({...editForm, price: e.target.value})}
                              placeholder="Price"
                            />
                            <button onClick={() => saveEdit('product')} className="text-[10px] text-gold uppercase font-bold">Save</button>
                          </div>
                        ) : (
                          <>
                            <p className="text-sm font-bold">{product.name}</p>
                            <p className="text-xs text-gold">{product.price}</p>
                            <button onClick={() => startEditing(product, 'product')} className="text-[10px] text-white/40 uppercase hover:text-gold">Edit</button>
                          </>
                        )}
                      </div>
                      <button onClick={() => removeProduct(product.id)} className="text-red-500 hover:scale-110 transition-transform p-2">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {lookbook.length > 0 && (
              <div>
                <h4 className="text-gold text-sm uppercase tracking-widest mb-4">Gallery</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {lookbook.map((item) => (
                    <div key={item.id} className="glass-card p-4 flex gap-4 items-center">
                      <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-grow">
                        {editingId === item.id ? (
                          <div className="space-y-2">
                            <input 
                              className="w-full bg-white/5 border border-white/10 px-2 py-1 text-xs"
                              value={editForm.title}
                              onChange={e => setEditForm({...editForm, title: e.target.value})}
                              placeholder="Title"
                            />
                            <button onClick={() => saveEdit('lookbook')} className="text-[10px] text-gold uppercase font-bold">Save</button>
                          </div>
                        ) : (
                          <>
                            <p className="text-sm font-bold">{item.title}</p>
                            <button onClick={() => startEditing(item, 'lookbook')} className="text-[10px] text-white/40 uppercase hover:text-gold">Edit</button>
                          </>
                        )}
                      </div>
                      <button onClick={() => removeLookbookItem(item.id)} className="text-red-500 hover:scale-110 transition-transform p-2">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {videos.length > 0 && (
              <div>
                <h4 className="text-gold text-sm uppercase tracking-widest mb-4">Videos</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {videos.map((video) => (
                    <div key={video.id} className="aspect-square bg-white/5 border border-white/10 rounded-lg overflow-hidden relative group">
                      <video src={video.url} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button onClick={() => removeVideo(video.id)} className="text-red-500 hover:scale-110 transition-transform">
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
