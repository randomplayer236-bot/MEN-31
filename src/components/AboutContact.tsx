import React from 'react';
import { motion } from 'motion/react';
import { Phone, MapPin, Clock, Navigation as NavIcon, MessageCircle, Camera } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useAdmin } from '../context/AdminContext';

export const Philosophy = () => {
  const { t } = useTranslation();
  const { philosophyImage, isAdminMode, updatePhilosophyImage } = useAdmin();

  const handlePhilosophyImageUpload = () => {
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
          updatePhilosophyImage(result.info.secure_url);
        }
      }
    );
    widget.open();
  };

  return (
    <section id="about" className="bg-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <div className="w-12 h-[1px] bg-gold mb-6" />
            <h2 className="text-2xl lg:text-6xl font-display text-navy mb-4 lg:mb-10 leading-tight uppercase tracking-tight">
              {t('about.philosophyTitle')}
            </h2>
            <div className="max-w-xl">
              <p className="text-charcoal/70 text-sm lg:text-xl leading-relaxed lg:leading-loose font-light mb-6 lg:mb-10">
                {t('about.philosophyText')}
              </p>
              <p className="text-charcoal/70 text-sm lg:text-xl leading-relaxed lg:leading-loose font-light">
                {t('about.p1')}
              </p>
            </div>
          </motion.div>

          {/* Right: Lifestyle Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-sm shadow-2xl ${isAdminMode ? 'cursor-pointer group/philosophy' : ''}`}
            onClick={handlePhilosophyImageUpload}
          >
            <img
              src={philosophyImage || 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=1000'}
              alt="Philosophy"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
            
            {isAdminMode && (
              <div className="absolute inset-0 bg-navy/40 flex items-center justify-center opacity-0 group-hover/philosophy:opacity-100 transition-opacity">
                <div className="bg-gold p-6 rounded-full text-ivory shadow-2xl transform scale-75 group-hover/philosophy:scale-100 transition-transform duration-500">
                  <Camera size={40} />
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const Contact = () => {
  const { t } = useTranslation();
  const { philosophyImage } = useAdmin();
  const storeLocation = "MAGASIN 2, RESIDENCE SALIMA 2, MAHAJ SALA LJADIDA, Av. Moulay Rachid, Sala Al Jadida 11100";
  const phoneNumber = "06 61 26 09 54";

  return (
    <section id="contact" className="py-20 lg:py-40 px-6 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-gold)_0%,_transparent_70%)] blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto relative z-10"
      >
        <div className="max-w-4xl mx-auto">
          <span className="text-gold uppercase tracking-[0.5em] text-[8px] lg:text-[14px] font-bold mb-4 lg:mb-10 block text-center">{t('hero.contactUs')}</span>
          <h2 className="text-2xl md:text-4xl lg:text-7xl font-display text-ivory mb-4 lg:mb-16 leading-tight text-center uppercase tracking-tight">
            {t('contact.title')}
          </h2>
          <p className="text-ivory/40 text-sm lg:text-xl leading-relaxed font-light mb-8 lg:mb-24 max-w-2xl mx-auto text-center">
            {t('contact.desc')}
          </p>
          
          <div id="contact-info" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="flex flex-col items-center text-center gap-6">
              <div className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center text-gold shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="text-ivory uppercase tracking-[0.3em] text-[10px] font-bold mb-4">{t('contact.location')}</h4>
                <p className="text-ivory/60 text-sm leading-relaxed">{storeLocation}</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center text-center gap-6">
              <div className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center text-gold shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <h4 className="text-ivory uppercase tracking-[0.3em] text-[10px] font-bold mb-4">{t('contact.phone')}</h4>
                <a href={`tel:${phoneNumber.replace(/\s/g, '')}`} className="text-ivory text-xl lg:text-2xl font-display hover:text-gold transition-all duration-300">
                  {phoneNumber}
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center text-center gap-6">
              <div className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center text-gold shrink-0">
                <svg viewBox="0 0 24 24" width="20" height="20" className="fill-currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
              <div>
                <h4 className="text-ivory uppercase tracking-[0.3em] text-[10px] font-bold mb-4">WhatsApp</h4>
                <a href="https://wa.me/212661260954" target="_blank" rel="noopener noreferrer" className="text-ivory text-xl lg:text-2xl font-display hover:text-gold transition-all duration-300">
                  {phoneNumber}
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center text-center gap-6">
              <div className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center text-gold shrink-0">
                <Clock size={20} />
              </div>
              <div>
                <h4 className="text-ivory uppercase tracking-[0.3em] text-[10px] font-bold mb-4">{t('contact.hours')}</h4>
                <p className="text-ivory/60 text-sm">{t('contact.hoursVal')}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/212661260954"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-4 lg:bottom-10 lg:left-auto lg:right-10 z-[100] bg-[#25D366] text-white p-4 lg:p-5 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group"
      aria-label="Contact on WhatsApp"
    >
      <svg 
        viewBox="0 0 24 24" 
        width="28" 
        height="28" 
        className="lg:w-10 lg:h-10 fill-currentColor transform group-hover:rotate-12 transition-transform duration-300"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    </a>
  );
};
