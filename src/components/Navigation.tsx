import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ShoppingBag, MapPin, Phone, Instagram, Facebook, Camera, LogOut, User, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useAdmin } from '../context/AdminContext';

export const AnnouncementBar = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-gold py-1 lg:py-2 px-6 text-center relative z-[60]">
      <p className="text-navy text-[8px] lg:text-[10px] uppercase tracking-[0.4em] font-bold">
        {t('hero.subtitle')}
      </p>
    </div>
  );
};

export const Navbar = () => {
  const { t } = useTranslation();
  const { isAdminMode, siteLogo, updateSiteLogo, logout, login, setShowCollection } = useAdmin();
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      setShowLoginModal(false);
      setUsername('');
      setPassword('');
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleLogoUpload = () => {
    if (!isAdminMode) return;
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dqk8cvj5b';
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'men31_upload';
    // @ts-ignore
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName,
        uploadPreset,
        folder: 'men31/site',
        publicId: 'logo',
        overwrite: true,
        multiple: false,
        sources: ['local', 'url', 'camera', 'google_drive'],
      },
      (error: any, result: any) => {
        if (!error && result && result.event === 'success') {
          const urlWithVersion = `${result.info.secure_url}?v=${Date.now()}`;
          updateSiteLogo(urlWithVersion);
        }
      }
    );
    widget.open();
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', name: 'HOME', href: '/#home', isInternal: true },
    { id: 'shop', name: 'SHOP', href: '/#shop', isInternal: true },
    { id: 'about', name: 'ABOUT', href: '/#about', isInternal: true },
    { id: 'contact', name: 'CONTACT', href: '/#contact', isInternal: true },
  ];

  const handleLinkClick = (href: string, isInternal: boolean) => {
    setIsOpen(false);
    if (isInternal && location.pathname === '/') {
      const id = href.split('#')[1];
      if (id === 'shop') {
        setShowCollection(true);
        const gridElement = document.getElementById('collection-grid');
        if (gridElement) {
          gridElement.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* Persistent Blue Bar */}
      <div className="bg-navy py-2 lg:py-4 px-6 shadow-xl">
        <nav className="max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-3 items-center gap-4 lg:gap-0">
          {/* Left: Logo */}
          <div className="flex items-center justify-center lg:justify-start gap-1 lg:gap-4 w-full lg:w-auto">
            <div className="relative group">
              {siteLogo ? (
                <img 
                  src={siteLogo} 
                  alt="Logo" 
                  className="h-14 lg:h-14 w-auto object-contain transition-all duration-500"
                />
              ) : (
                <div className="bg-gold/10 h-14 lg:h-14 w-14 lg:w-14 rounded-full flex items-center justify-center text-gold">
                  <ShoppingBag size={20} className="lg:w-8 lg:h-8" />
                </div>
              )}
              {isAdminMode && (
                <button 
                  onClick={handleLogoUpload}
                  className="absolute -top-1 -right-1 bg-gold text-navy p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-xl z-20"
                >
                  <Camera size={10} />
                </button>
              )}
            </div>
            <span className="text-xl lg:text-3xl font-bold tracking-[0.1em] lg:tracking-[0.2em] text-ivory font-display whitespace-nowrap">
              MEN <span className="text-gold">31</span>
            </span>
          </div>
          
          {/* Middle: Nav Links */}
          <div className="flex items-center justify-center space-x-4 lg:space-x-10 w-full lg:w-auto">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  if (location.pathname === '/') {
                    e.preventDefault();
                    handleLinkClick(link.href, true);
                  }
                }}
                className="text-[10px] lg:text-[13px] uppercase tracking-[0.2em] lg:tracking-[0.3em] text-ivory/90 hover:text-gold transition-all duration-300 font-bold whitespace-nowrap"
              >
                {t(`nav.${link.id}`)}
              </a>
            ))}
          </div>

          {/* Right: Language & Admin */}
          <div className="flex items-center justify-center lg:justify-end space-x-3 lg:space-x-8 w-full lg:w-auto">
            <div className="block">
              <LanguageSwitcher />
            </div>
            {isAdminMode ? (
              <button 
                onClick={() => logout()}
                className="text-gold hover:text-ivory transition-colors flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            ) : (
              <button 
                onClick={() => setShowLoginModal(true)}
                className="text-ivory/40 hover:text-gold transition-colors"
              >
                <User size={18} />
              </button>
            )}
            <button className="md:hidden text-ivory" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-navy/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-ivory p-10 rounded-sm max-w-md w-full shadow-2xl relative"
            >
              <button 
                onClick={() => setShowLoginModal(false)}
                className="absolute top-6 right-6 text-navy/40 hover:text-navy transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-navy/5 rounded-full flex items-center justify-center mx-auto mb-6 text-gold">
                  <Lock size={24} />
                </div>
                <h3 className="text-2xl font-display text-navy uppercase tracking-widest">Admin Access</h3>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-navy/40 font-bold">Username</label>
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-navy/5 border-b border-navy/10 py-4 px-4 text-navy focus:outline-none focus:border-gold transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-navy/40 font-bold">Password</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-navy/5 border-b border-navy/10 py-4 px-4 text-navy focus:outline-none focus:border-gold transition-all"
                    required
                  />
                </div>
                
                {loginError && (
                  <p className="text-red-500 text-[10px] uppercase tracking-widest text-center font-bold">Invalid credentials</p>
                )}

                <button 
                  type="submit"
                  className="w-full py-5 bg-navy text-ivory uppercase tracking-[0.4em] text-[10px] font-bold hover:bg-gold transition-all duration-500 shadow-xl"
                >
                  Login
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-navy z-[100] flex flex-col items-center justify-center p-12 md:hidden"
          >
            <button 
              className="absolute top-10 right-10 text-ivory hover:text-gold transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <X size={40} />
            </button>
            
            <div className="flex flex-col items-center space-y-10 text-center">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  {link.isInternal ? (
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if (location.pathname === '/') {
                          e.preventDefault();
                        }
                        handleLinkClick(link.href, true);
                      }}
                      className="text-4xl font-bold uppercase tracking-[0.2em] text-ivory hover:text-gold transition-all duration-300 font-display"
                    >
                      {t(`nav.${link.id}`)}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-4xl font-bold uppercase tracking-[0.2em] text-ivory hover:text-gold transition-all duration-300 font-display"
                    >
                      {t(`nav.${link.id}`)}
                    </Link>
                  )}
                </motion.div>
              ))}
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="pt-12 border-t border-platinum/10 w-full flex flex-col items-center"
              >
                <LanguageSwitcher />
                <div className="mt-12 flex space-x-8 text-ivory/40">
                  <Instagram size={24} />
                  <Facebook size={24} />
                  <Phone size={24} />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export const Hero = () => {
  const { t } = useTranslation();
  const { setShowCollection, heroImage, isAdminMode, updateHeroImage } = useAdmin();

  const handleImageUpload = () => {
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
          updateHeroImage(result.info.secure_url);
        }
      }
    );
    widget.open();
  };

  const scrollToProducts = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowCollection(true);
    setTimeout(() => {
      const element = document.getElementById('collection-grid');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <section id="home" className="min-h-[300px] lg:h-[85vh] bg-navy flex flex-col pt-10 lg:pt-32 overflow-hidden">
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 h-full">
        {/* Left Side: Title & Button */}
        <div className="relative flex items-center justify-center p-3 lg:p-16 bg-navy">
          <div className="relative z-10 text-center lg:text-left max-w-xl">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gold uppercase tracking-[0.4em] text-[6px] lg:text-[12px] font-bold mb-1 lg:mb-4"
            >
              {t('hero.subtitle')}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-xl md:text-3xl lg:text-7xl font-display text-ivory leading-[1.1] mb-2 lg:mb-8 uppercase tracking-tight"
            >
              {t('hero.title')}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-2 lg:gap-6 justify-center lg:justify-start"
            >
              <a
                href="#shop"
                onClick={scrollToProducts}
                className="inline-block px-5 lg:px-12 py-2 lg:py-5 bg-gold text-navy text-[7px] lg:text-[12px] font-bold uppercase tracking-[0.3em] hover:bg-ivory transition-all duration-300 shadow-xl"
              >
                {t('hero.shopNow')}
              </a>
              <a
                href="#contact-info"
                className="inline-block px-5 lg:px-12 py-2 lg:py-5 border border-gold text-gold text-[7px] lg:text-[12px] font-bold uppercase tracking-[0.3em] hover:bg-gold hover:text-navy transition-all duration-300"
              >
                {t('hero.contactUs')}
              </a>
            </motion.div>
          </div>
        </div>

        {/* Right Side: Large Image */}
        <div 
          className={`relative h-full overflow-hidden hidden lg:block ${isAdminMode ? 'cursor-pointer group/hero' : ''}`}
          onClick={handleImageUpload}
        >
          <motion.img
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5 }}
            src={heroImage || 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&q=80&w=1920'}
            alt="Hero"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-navy/20" />
          
          {isAdminMode && (
            <div className="absolute inset-0 bg-navy/40 flex items-center justify-center opacity-0 group-hover/hero:opacity-100 transition-opacity">
              <div className="bg-gold p-6 rounded-full text-ivory shadow-2xl transform scale-75 group-hover/hero:scale-100 transition-transform duration-500">
                <Camera size={40} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
