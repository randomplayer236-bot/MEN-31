import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useAdmin } from '../context/AdminContext';
import { Instagram, MapPin, Camera } from 'lucide-react';
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
    <section id="gallery" className="py-24 px-6 bg-light-grey">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-text uppercase">{t('gallery.title')}</h2>
          <p className="text-white/40 uppercase tracking-widest text-sm">{t('gallery.subtitle')}</p>
          <div className="w-24 h-1 bg-gold mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
          {lookbook.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative group h-[500px] overflow-hidden ${isAdminMode ? 'cursor-pointer ring-2 ring-gold/20 hover:ring-gold transition-all' : ''}`}
              onClick={() => handleImageClick(item.id)}
            >
              <img
                src={item.image}
                alt={t(`lookbook.${item.id}.title`)}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-6 text-center">
                {isAdminMode ? (
                  <div className="bg-gold p-4 rounded-full text-white shadow-xl mb-4">
                    <Camera size={28} />
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold mb-2 uppercase tracking-tighter">{t(`lookbook.${item.id}.title`)}</h3>
                    <div className="w-12 h-[1px] bg-gold mb-4" />
                    <p className="text-sm text-white/60 uppercase tracking-widest">{t('gallery.viewOutfit')}</p>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {videos.length > 0 && (
          <div className="mt-24">
            <div className="text-center mb-16">
              <h3 className="text-3xl font-bold mb-4 uppercase tracking-tighter">Motion Gallery</h3>
              <div className="w-16 h-1 bg-gold mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {videos.map((video) => (
                <div key={video.id} className="aspect-video bg-white/5 border border-white/10 rounded-lg overflow-hidden relative group">
                  <video 
                    src={video.url} 
                    className="w-full h-full object-cover" 
                    controls 
                    muted 
                    loop 
                    playsInline
                  />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white text-xs uppercase tracking-widest font-bold bg-black/60 px-3 py-1 rounded-full border border-gold/30">
                      {video.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-black border-t border-white/10 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <Link to="/admin" className="text-3xl font-bold tracking-widest glow-text mb-6 inline-block">
            MEN <span className="text-gold">31</span>
          </Link>
          <p className="text-white/40 max-w-md mb-8">
            {t('footer.desc')}
          </p>
          <div className="flex space-x-6">
            <a 
              href="https://www.instagram.com/c8__men.s_wear__?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-gold transition-colors"
            >
              <Instagram size={24} />
            </a>
            <a 
              href="https://www.google.com/maps/search/?api=1&query=MAGASIN+2,+RESIDENCE+SALIMA+2,+MAHAJ+SALA+LJADIDA,+Av.+Moulay+Rachid,+Sala+Al+Jadida+11100" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/60 hover:text-gold transition-colors"
            >
              <MapPin size={24} />
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-bold mb-6 uppercase tracking-widest">{t('footer.links')}</h4>
          <ul className="space-y-4 text-white/40">
            <li><a href="#home" className="hover:text-gold transition-colors">{t('nav.home')}</a></li>
            <li><a href="#shop" className="hover:text-gold transition-colors">{t('nav.shop')}</a></li>
            <li><a href="#about" className="hover:text-gold transition-colors">{t('nav.about')}</a></li>
            <li><a href="#gallery" className="hover:text-gold transition-colors">{t('nav.gallery')}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6 uppercase tracking-widest">{t('footer.newsletter')}</h4>
          <p className="text-white/40 text-sm mb-4">{t('footer.newsletterDesc')}</p>
          <form className="flex">
            <input 
              type="email" 
              placeholder={t('footer.placeholder')}
              className="bg-white/5 border border-white/10 px-4 py-2 w-full focus:outline-none focus:border-gold"
            />
            <button className="bg-gold text-white px-4 py-2 uppercase text-xs font-bold tracking-widest">{t('footer.join')}</button>
          </form>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 text-center text-white/20 text-xs uppercase tracking-widest">
        &copy; 2026 MEN 31. {t('footer.rights')}
      </div>
    </footer>
  );
};
