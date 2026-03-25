import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useAdmin } from '../context/AdminContext';
import { Instagram, MapPin, Camera, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Gallery = () => {
  const { t } = useTranslation();
  const { isAdminMode, lookbook, videos, updateLookbookImage } = useAdmin();

  const handleImageClick = (id: string) => {
    if (!isAdminMode) return;

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dqk8cvj5b';
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'men31_upload';

    // @ts-ignore
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName,
        uploadPreset,
        folder: 'men31/gallery',
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
          updateLookbookImage(id, result.info.secure_url);
        }
      }
    );
    widget.open();
  };

  return (
    <section id="gallery" className="py-32 px-6 bg-ivory">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-navy uppercase tracking-tighter leading-tight">{t('gallery.title')}</h2>
          <p className="text-charcoal/40 uppercase tracking-[0.3em] text-[10px] font-bold">{t('gallery.subtitle')}</p>
          <div className="w-32 h-1.5 bg-gold mx-auto mt-10" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {lookbook.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className={`relative group h-[600px] overflow-hidden premium-card ${isAdminMode ? 'cursor-pointer ring-4 ring-gold/10 hover:ring-gold/40 transition-all' : ''}`}
              onClick={() => handleImageClick(item.id)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-navy/80 opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col items-center justify-center p-10 text-center backdrop-blur-sm">
                {isAdminMode ? (
                  <div className="bg-gold p-6 rounded-full text-ivory shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-500">
                    <Camera size={32} />
                  </div>
                ) : (
                  <>
                    <h3 className="text-3xl font-bold mb-4 uppercase tracking-tighter text-ivory font-display">{item.title}</h3>
                    <div className="w-16 h-1 bg-gold mb-8" />
                    <p className="text-[10px] text-ivory/60 uppercase tracking-[0.4em] font-bold border border-ivory/20 px-6 py-3 hover:bg-gold hover:border-gold hover:text-navy transition-all duration-300 cursor-pointer">{t('gallery.viewOutfit')}</p>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {videos.length > 0 && (
          <div className="mt-32">
            <div className="text-center mb-20">
              <h3 className="text-4xl font-bold mb-6 uppercase tracking-tighter text-navy font-display">Motion Gallery</h3>
              <div className="w-20 h-1.5 bg-gold mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {videos.map((video) => (
                <div key={video.id} className="aspect-video bg-navy/5 border border-platinum/20 rounded-2xl overflow-hidden relative group shadow-2xl">
                  <video 
                    src={video.url} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" 
                    controls 
                    muted 
                    loop 
                    playsInline
                  />
                  <div className="absolute bottom-6 left-6">
                    <p className="text-ivory text-[10px] uppercase tracking-[0.3em] font-bold bg-navy/80 px-5 py-2 rounded-full border border-gold/30 backdrop-blur-md">
                      {video.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export const Footer = () => {
  const { t } = useTranslation();
  const { siteLogo } = useAdmin();
  return (
    <footer className="bg-navy border-t border-platinum/10 py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20 relative z-10">
        <div className="col-span-1 md:col-span-2">
          <Link to="/admin" className="flex items-center gap-6 mb-10 group">
            {siteLogo ? (
              <img src={siteLogo} alt="Logo" className="h-16 md:h-20 w-auto object-contain transition-transform duration-500 group-hover:scale-105" />
            ) : (
              <div className="h-16 w-16 md:h-20 md:w-20 bg-gold/10 rounded-full flex items-center justify-center text-gold transition-transform duration-500 group-hover:scale-105">
                <ShoppingBag size={32} />
              </div>
            )}
            <span className="text-3xl md:text-4xl font-bold tracking-[0.3em] text-ivory font-display">
              MEN <span className="text-gold">31</span>
            </span>
          </Link>
          <p className="text-ivory/40 max-w-md mb-12 leading-relaxed text-sm">
            {t('footer.desc')}
          </p>
          <div className="flex space-x-8">
            <a 
              href="https://www.instagram.com/c8__men.s_wear__?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-ivory/60 hover:text-gold transition-all duration-300 transform hover:scale-110"
            >
              <Instagram size={28} />
            </a>
            <a 
              href="https://www.google.com/maps/search/?api=1&query=MAGASIN+2,+RESIDENCE+SALIMA+2,+MAHAJ+SALA+LJADIDA,+Av.+Moulay+Rachid,+Sala+Al+Jadida+11100" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-ivory/60 hover:text-gold transition-all duration-300 transform hover:scale-110"
            >
              <MapPin size={28} />
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-bold mb-10 uppercase tracking-[0.3em] text-ivory border-b border-gold/30 pb-4 inline-block">{t('footer.links')}</h4>
          <ul className="space-y-6 text-ivory/40 text-sm uppercase tracking-widest">
            <li><a href="#home" className="hover:text-gold transition-all duration-300 flex items-center group"><span className="w-0 group-hover:w-4 h-[1px] bg-gold mr-0 group-hover:mr-3 transition-all duration-300" />{t('nav.home')}</a></li>
            <li><a href="#shop" className="hover:text-gold transition-all duration-300 flex items-center group"><span className="w-0 group-hover:w-4 h-[1px] bg-gold mr-0 group-hover:mr-3 transition-all duration-300" />{t('nav.shop')}</a></li>
            <li><a href="#about" className="hover:text-gold transition-all duration-300 flex items-center group"><span className="w-0 group-hover:w-4 h-[1px] bg-gold mr-0 group-hover:mr-3 transition-all duration-300" />{t('nav.about')}</a></li>
            <li><a href="#gallery" className="hover:text-gold transition-all duration-300 flex items-center group"><span className="w-0 group-hover:w-4 h-[1px] bg-gold mr-0 group-hover:mr-3 transition-all duration-300" />{t('nav.gallery')}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold mb-10 uppercase tracking-[0.3em] text-ivory border-b border-gold/30 pb-4 inline-block">{t('footer.newsletter')}</h4>
          <p className="text-ivory/40 text-sm mb-8 leading-relaxed">{t('footer.newsletterDesc')}</p>
          <form className="flex flex-col space-y-4">
            <input 
              type="email" 
              placeholder={t('footer.placeholder')}
              className="bg-navy/40 border border-platinum/20 px-6 py-4 w-full focus:outline-none focus:border-gold text-ivory text-sm transition-all duration-300"
            />
            <button className="bg-gold text-navy px-8 py-4 uppercase text-[10px] font-bold tracking-[0.3em] hover:bg-ivory transition-all duration-500 shadow-lg">
              {t('footer.join')}
            </button>
          </form>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-platinum/10 text-center text-ivory/20 text-[10px] uppercase tracking-[0.4em] font-bold">
        &copy; 2026 MEN 31. {t('footer.rights')}
      </div>
    </footer>
  );
};
