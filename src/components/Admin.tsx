import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Upload, X, Plus, Trash2, LogOut } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';

export const AdminSection = () => {
  const { t } = useTranslation();
  const { setIsAdminMode } = useAdmin();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'sam' && password === 'sam2006') {
      setIsAdminMode(true);
      setIsLoggedIn(true);
      setError('');
      navigate('/');
    } else {
      setError(t('admin.invalidCredentials'));
    }
  };

  if (!isLoggedIn) {
    return (
      <section id="admin" className="py-24 px-6 bg-black flex items-center justify-center min-h-[60vh]">
        <div className="glass-card p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold mb-8 glow-text text-center uppercase">{t('admin.login')}</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">{t('admin.username')}</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-gold"
                required
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">{t('admin.password')}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-gold"
                required
              />
            </div>
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <button
              type="submit"
              className="w-full bg-gold text-white py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
            >
              {t('admin.enter')}
            </button>
          </form>
        </div>
      </section>
    );
  }

  return <AdminDashboard onLogout={() => setIsLoggedIn(false)} />;
};

const AdminDashboard = ({ onLogout }: { onLogout: () => void }) => {
  const { t } = useTranslation();
  const { setIsAdminMode } = useAdmin();
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogout = () => {
    setIsAdminMode(false);
    onLogout();
  };

  const handleUpload = async (type: 'products' | 'gallery' | 'videos') => {
    // Cloudinary Upload Widget logic would go here
    // For now, we'll simulate the UI as requested
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dqk8cvj5b';
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'men31_upload';

    // @ts-ignore
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        folder: `men31/${type}`,
        sources: ['local', 'url', 'camera'],
        multiple: true,
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
          console.log('Done! Here is the image info: ', result.info);
          setMessage(t('admin.success'));
          setTimeout(() => setMessage(''), 3000);
        }
      }
    );
    widget.open();
  };

  return (
    <section className="py-24 px-6 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-16">
          <h2 className="text-4xl font-bold glow-text uppercase">{t('admin.dashboard')}</h2>
          <button onClick={handleLogout} className="flex items-center text-white/40 hover:text-gold transition-colors">
            <LogOut size={20} className="mr-2" /> {t('admin.logout')}
          </button>
        </div>

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
          <h3 className="text-2xl font-bold mb-8 uppercase tracking-widest text-white/40">{t('admin.recentUploads')}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {/* This would ideally fetch from Cloudinary or a DB */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-white/5 border border-white/10 rounded-lg overflow-hidden relative group">
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="text-red-500 hover:scale-110 transition-transform">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
