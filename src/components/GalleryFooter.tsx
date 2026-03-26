import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useAdmin } from '../context/AdminContext';
import { Instagram, MapPin, ShoppingBag, Phone, Mail, Camera } from 'lucide-react';

export const FeaturedGrid = () => {
  const { t } = useTranslation();
  const { lookbook, isAdminMode, updateLookbookImage } = useAdmin();
  
  // Take first 3 items for the grid
  const featuredItems = lookbook.slice(0, 3);

  const handleImageUpload = (id: string) => {
    if (!isAdminMode) return;
    
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dqk8cvj5b';
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'men31_upload';

    // @ts-ignore
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName,
        uploadPreset,
        folder: 'men31/lookbook',
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
          updateLookbookImage(id, result.info.secure_url);
        }
      }
    );
    widget.open();
  };

  return (
    <section className="py-12 lg:py-20 bg-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className={`group relative aspect-[4/5] overflow-hidden rounded-sm shadow-xl ${isAdminMode ? 'cursor-pointer' : ''}`}
              onClick={() => handleImageUpload(item.id)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-navy/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-8 text-center">
                <div className="flex flex-col items-center gap-4">
                  <h3 className="text-ivory text-xl font-display uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {item.title}
                  </h3>
                  {isAdminMode && (
                    <div className="bg-gold p-4 rounded-full text-ivory shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-500">
                      <Camera size={24} />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  const { t } = useTranslation();
  const { siteLogo } = useAdmin();
  const phoneNumber = "06 61 26 09 54";
  const storeLocation = "MAGASIN 2, RESIDENCE SALIMA 2, MAHAJ SALA LJADIDA, Av. Moulay Rachid, Sala Al Jadida 11100";

  return (
    <footer className="bg-navy py-16 lg:py-32 px-6 border-t border-platinum/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
        {/* Column 1: Logo & Social */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-4 mb-8">
            {siteLogo ? (
              <img src={siteLogo} alt="Logo" className="h-12 w-auto object-contain" />
            ) : (
              <div className="h-12 w-12 bg-gold/10 rounded-full flex items-center justify-center text-gold">
                <ShoppingBag size={24} />
              </div>
            )}
            <span className="text-2xl font-bold tracking-[0.2em] text-ivory font-display">
              MEN <span className="text-gold">31</span>
            </span>
          </div>
          <p className="text-ivory/40 text-[10px] lg:text-sm leading-relaxed max-w-xs mb-8">
            {t('footer.desc')}
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-ivory/60 hover:text-gold transition-colors"><Instagram size={20} /></a>
            <a href="#" className="text-ivory/60 hover:text-gold transition-colors"><MapPin size={20} /></a>
          </div>
        </div>

        {/* Column 2: Links */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h4 className="text-gold uppercase tracking-[0.3em] text-[8px] lg:text-[10px] font-bold mb-8">{t('footer.links')}</h4>
          <ul className="space-y-4 text-ivory/40 text-[10px] lg:text-xs uppercase tracking-widest font-bold">
            <li><a href="#home" className="hover:text-gold transition-colors">{t('nav.home')}</a></li>
            <li><a href="#shop" className="hover:text-gold transition-colors">{t('nav.shop')}</a></li>
            <li><a href="#about" className="hover:text-gold transition-colors">{t('nav.about')}</a></li>
            <li><a href="#contact" className="hover:text-gold transition-colors">{t('nav.contact')}</a></li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h4 className="text-gold uppercase tracking-[0.3em] text-[8px] lg:text-[10px] font-bold mb-8">{t('contact.title')}</h4>
          <div className="space-y-4">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <Phone size={14} className="text-gold" />
              <span className="text-ivory/60 text-[10px] lg:text-xs">{phoneNumber}</span>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <svg viewBox="0 0 24 24" width="14" height="14" className="fill-gold">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <a href="https://wa.me/212661260954" target="_blank" rel="noopener noreferrer" className="text-ivory/60 text-[10px] lg:text-xs hover:text-gold transition-colors">WhatsApp: {phoneNumber}</a>
            </div>
            <div className="flex items-start gap-3 justify-center md:justify-start">
              <MapPin size={14} className="text-gold mt-1" />
              <span className="text-ivory/60 text-[10px] lg:text-xs max-w-[200px]">{storeLocation}</span>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <Mail size={14} className="text-gold" />
              <span className="text-ivory/60 text-[10px] lg:text-xs">contact@men31.com</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-platinum/5 text-center text-ivory/20 text-[9px] uppercase tracking-[0.4em] font-bold">
        &copy; 2026 MEN 31. {t('footer.rights')}
      </div>
    </footer>
  );
};
