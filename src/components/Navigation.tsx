import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ShoppingBag, MapPin, Phone, Instagram, Facebook, Camera, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useAdmin } from '../context/AdminContext';

export const AnnouncementBar = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-gold py-2 px-6 text-center relative z-[60]">
      <p className="text-navy text-[10px] uppercase tracking-[0.4em] font-bold">
        {t('hero.subtitle')}
      </p>
    </div>
  );
};

export const Navbar = () => {
  const { t } = useTranslation();
  const { isAdminMode, siteLogo, updateSiteLogo, logout } = useAdmin();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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
      },
      (error: any, result: any) => {
        if (!error && result && result.event === 'success') {
          // Add a timestamp to bypass cache for the current session
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
    { name: t('nav.home'), href: '/#home', isInternal: true },
    { name: t('nav.shop'), href: '/#shop', isInternal: true },
    { name: t('nav.about'), href: '/#about', isInternal: true },
    { name: t('nav.gallery'), href: '/#gallery', isInternal: true },
    { name: t('nav.contact'), href: '/#contact', isInternal: true },
  ];

  const handleLinkClick = (href: string, isInternal: boolean) => {
    setIsOpen(false);
    if (isInternal && location.pathname === '/') {
      const id = href.split('#')[1];
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <AnnouncementBar />
      <nav className="bg-navy/95 backdrop-blur-md py-3 border-b border-platinum/20 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="relative group">
              {siteLogo ? (
                <img 
                  src={siteLogo} 
                  alt="Logo" 
                  className="h-14 w-auto object-contain"
                />
              ) : (
                <div className="h-14 w-14 bg-gold/10 rounded-full flex items-center justify-center text-gold">
                  <ShoppingBag size={28} />
                </div>
              )}
              {isAdminMode && (
                <button 
                  onClick={handleLogoUpload}
                  className="absolute -top-1 -right-1 bg-gold text-navy p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-xl z-20"
                  title="Change Logo (Admin Only)"
                >
                  <Camera size={12} />
                </button>
              )}
            </div>
            <Link to="/" className="text-lg font-bold tracking-[0.2em] text-ivory ml-2 hidden sm:block">
              MEN <span className="text-gold">31</span>
            </Link>
          </div>

          {/* Desktop Nav - Only visible on scroll for a cleaner look since they are now in the Hero */}
          <div className={`hidden md:flex items-center space-x-8 transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            {navLinks.map((link) => (
              link.isInternal ? (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    if (location.pathname === '/') {
                      e.preventDefault();
                      handleLinkClick(link.href, true);
                    }
                  }}
                  className="text-xs uppercase tracking-[0.2em] text-ivory/80 hover:text-gold transition-all duration-300 hover:tracking-[0.3em]"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-xs uppercase tracking-[0.2em] text-ivory/80 hover:text-gold transition-all duration-300 hover:tracking-[0.3em]"
                >
                  {link.name}
                </Link>
              )
            ))}
            <LanguageSwitcher />
          </div>

          <div className="flex items-center space-x-6">
            {isAdminMode && (
              <button 
                onClick={logout}
                className="hidden md:flex items-center gap-2 text-gold hover:text-ivory transition-colors text-[10px] uppercase tracking-widest font-bold"
                title="Logout Admin"
              >
                <LogOut size={16} />
                Logout
              </button>
            )}
            {!scrolled && <div className="hidden md:block"><LanguageSwitcher /></div>}
            <button className="text-ivory hover:text-gold transition-colors">
              <ShoppingBag size={20} />
            </button>
            <button className="md:hidden text-ivory" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

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
                    key={link.name}
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
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        onClick={() => setIsOpen(false)}
                        className="text-4xl font-bold uppercase tracking-[0.2em] text-ivory hover:text-gold transition-all duration-300 font-display"
                      >
                        {link.name}
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
      </nav>
    </header>
  );
};

export const Hero = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home'), href: '/#home' },
    { name: t('nav.shop'), href: '/#shop' },
    { name: t('nav.about'), href: '/#about' },
    { name: t('nav.gallery'), href: '/#gallery' },
    { name: t('nav.contact'), href: '/#contact' },
  ];

  const handleLinkClick = (href: string) => {
    if (location.pathname === '/') {
      const id = href.split('#')[1];
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-navy">
      <div className="absolute inset-0 z-0">
        <motion.img
          style={{ y: scrollY * 0.5 }}
          src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&q=80&w=1920"
          alt="Hero Fashion"
          className="w-full h-full object-cover opacity-40 mix-blend-overlay scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6 md:gap-12 mb-12"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.href);
              }}
              className="text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.5em] text-ivory/60 hover:text-gold transition-all duration-300 font-bold"
            >
              {link.name}
            </a>
          ))}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="text-4xl md:text-7xl font-bold mb-10 text-ivory leading-[1.1] tracking-tight"
        >
          {t('hero.title')} <br />
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="gold-gradient font-serif italic font-normal lowercase tracking-normal block mt-2"
          >
            MEN 31
          </motion.span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <a
            href="#shop"
            className="premium-button w-full md:w-auto text-center group overflow-hidden relative"
          >
            <span className="relative z-10">{t('hero.shopNow')}</span>
            <div className="absolute inset-0 bg-ivory transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </a>
          <a
            href="https://www.google.com/maps/search/?api=1&query=MAGASIN+2,+RESIDENCE+SALIMA+2,+MAHAJ+SALA+LJADIDA,+Av.+Moulay+Rachid,+Sala+Al+Jadida+11100"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 border border-platinum/30 text-ivory font-bold uppercase tracking-widest hover:bg-ivory hover:text-navy transition-all duration-500 w-full md:w-auto text-center backdrop-blur-sm"
          >
            {t('hero.visitStore')}
          </a>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gold/50"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-gold to-transparent mx-auto" />
      </motion.div>
    </section>
  );
};
