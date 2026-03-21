import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ShoppingBag, MapPin, Phone, Instagram, Facebook } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Navbar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-widest glow-text">
          MEN <span className="text-gold">31</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
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
                className="text-sm uppercase tracking-widest hover:text-gold transition-colors"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm uppercase tracking-widest hover:text-gold transition-colors"
              >
                {link.name}
              </Link>
            )
          ))}
          <LanguageSwitcher />
        </div>

        <div className="flex items-center space-x-6">
          <button className="hover:text-gold transition-colors">
            <ShoppingBag size={20} />
          </button>
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black border-b border-white/10 p-6 md:hidden"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                link.isInternal ? (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      if (location.pathname === '/') {
                        e.preventDefault();
                      }
                      handleLinkClick(link.href, true);
                    }}
                    className="text-lg uppercase tracking-widest hover:text-gold"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg uppercase tracking-widest hover:text-gold"
                  >
                    {link.name}
                  </Link>
                )
              ))}
              <div className="pt-4 border-t border-white/10">
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export const Hero = () => {
  const { t } = useTranslation();
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&q=80&w=1920"
          alt="Hero Fashion"
          className="w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gold uppercase tracking-[0.5em] mb-4 text-sm font-medium"
        >
          {t('hero.subtitle')}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold mb-8 glow-text"
        >
          {t('hero.title')} <br />
          <span className="gold-gradient">MEN 31</span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <a
            href="#shop"
            className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-gold hover:text-white transition-all duration-300 w-full md:w-auto"
          >
            {t('hero.shopNow')}
          </a>
          <a
            href="https://www.google.com/maps/search/?api=1&query=MAGASIN+2,+RESIDENCE+SALIMA+2,+MAHAJ+SALA+LJADIDA,+Av.+Moulay+Rachid,+Sala+Al+Jadida+11100"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border border-white text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 w-full md:w-auto"
          >
            {t('hero.visitStore')}
          </a>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent mx-auto" />
      </motion.div>
    </section>
  );
};
