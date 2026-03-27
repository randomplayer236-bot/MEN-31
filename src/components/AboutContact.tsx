import React from 'react';
import { motion } from 'motion/react';
import { Phone, MapPin, Clock, Navigation as NavIcon, MessageCircle, Camera, Instagram } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useAdmin } from '../context/AdminContext';
import { DraggableResizable } from './DraggableResizable';

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
    <section id="about" className="bg-ivory flex flex-col justify-center pt-0 pb-6 lg:pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <DraggableResizable id="philosophy_content">
              <div>
                <div className="w-8 h-[1.5px] bg-gold mb-2 mx-auto opacity-60" />
                <h2 className="text-xl md:text-2xl lg:text-3xl font-display text-navy mb-2 uppercase tracking-tight">
                  {t('about.philosophyTitle')}
                </h2>
                <div className="space-y-3 lg:space-y-4">
                  <p className="text-navy text-[10px] lg:text-[12px] leading-relaxed font-light tracking-wide">
                    {t('about.philosophyText')}
                  </p>
                  <p className="text-navy text-[10px] lg:text-[12px] leading-relaxed font-light tracking-wide">
                    {t('about.p1')}
                  </p>
                </div>
              </div>
            </DraggableResizable>
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
    <section id="contact" className="min-h-[25vh] py-4 lg:py-6 pb-12 lg:pb-16 px-6 bg-navy relative flex flex-col justify-center">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-gold)_0%,_transparent_70%)] blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto relative z-10 w-full"
      >
        <div className="max-w-4xl mx-auto">
          <DraggableResizable id="contact_header">
            <div>
              <span className="text-gold uppercase tracking-[0.6em] text-[7px] lg:text-[8px] font-bold mb-1 block text-center opacity-80">{t('hero.contactUs')}</span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-display text-ivory mb-2 leading-[1.1] text-center uppercase tracking-tight">
                {t('contact.title')}
              </h2>
            </div>
          </DraggableResizable>
          
          <div id="contact-info" className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 mt-4">
            <DraggableResizable id="contact_item_location">
              <div className="flex flex-col items-center text-center gap-2 group">
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(storeLocation)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-gold/20 flex items-center justify-center text-gold shrink-0 transition-all duration-500 group-hover:bg-gold group-hover:text-navy group-hover:scale-110 shadow-sm"
                >
                  <MapPin size={14} />
                </a>
                <div>
                  <h4 className="text-ivory uppercase tracking-[0.4em] text-[7px] font-bold mb-1 opacity-60">{t('contact.location')}</h4>
                  <p className="text-ivory/80 text-[8px] leading-tight max-w-[150px] mx-auto">{storeLocation}</p>
                </div>
              </div>
            </DraggableResizable>
            
            <DraggableResizable id="contact_item_phone">
              <div className="flex flex-col items-center text-center gap-2 group">
                <div className="w-8 h-8 rounded-full border border-gold/20 flex items-center justify-center text-gold shrink-0 transition-all duration-500 group-hover:bg-gold group-hover:text-navy group-hover:scale-110 shadow-sm">
                  <Phone size={14} />
                </div>
                <div>
                  <h4 className="text-ivory uppercase tracking-[0.4em] text-[7px] font-bold mb-1 opacity-60">{t('contact.phone')}</h4>
                  <a href={`tel:${phoneNumber.replace(/\s/g, '')}`} className="text-ivory text-[10px] lg:text-xs font-display hover:text-gold transition-all duration-300 hover:scale-105 inline-block">
                    {phoneNumber}
                  </a>
                </div>
              </div>
            </DraggableResizable>

            <DraggableResizable id="contact_item_instagram">
              <div className="flex flex-col items-center text-center gap-2 group">
                <div className="w-8 h-8 rounded-full border border-gold/20 flex items-center justify-center text-gold shrink-0 transition-all duration-500 group-hover:bg-gold group-hover:text-navy group-hover:scale-110 shadow-sm">
                  <Instagram size={14} />
                </div>
                <div>
                  <h4 className="text-ivory uppercase tracking-[0.4em] text-[7px] font-bold mb-1 opacity-60">Instagram</h4>
                  <a 
                    href="https://www.instagram.com/c8__men.s_wear__?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-ivory text-[10px] lg:text-xs font-display hover:text-gold transition-all duration-300 hover:scale-105 inline-block"
                  >
                    @c8__men.s_wear__
                  </a>
                </div>
              </div>
            </DraggableResizable>

            <DraggableResizable id="contact_item_facebook">
              <div className="flex flex-col items-center text-center gap-2 group">
                <div className="w-8 h-8 rounded-full border border-gold/20 flex items-center justify-center text-gold shrink-0 transition-all duration-500 group-hover:bg-gold group-hover:text-navy group-hover:scale-110 shadow-sm">
                  <MessageCircle size={14} />
                </div>
                <div>
                  <h4 className="text-ivory uppercase tracking-[0.4em] text-[7px] font-bold mb-1 opacity-60">Facebook</h4>
                  <a 
                    href="https://web.facebook.com/profile.php?id=100083246295413" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-ivory text-[10px] lg:text-xs font-display hover:text-gold transition-all duration-300 hover:scale-105 inline-block"
                  >
                    MEN 31
                  </a>
                </div>
              </div>
            </DraggableResizable>

            <DraggableResizable id="contact_item_hours">
              <div className="flex flex-col items-center text-center gap-2 group">
                <div className="w-8 h-8 rounded-full border border-gold/20 flex items-center justify-center text-gold shrink-0 transition-all duration-500 group-hover:bg-gold group-hover:text-navy group-hover:scale-110 shadow-sm">
                  <Clock size={14} />
                </div>
                <div>
                  <h4 className="text-ivory uppercase tracking-[0.4em] text-[7px] font-bold mb-1 opacity-60">{t('contact.hours')}</h4>
                  <p className="text-ivory/80 text-[8px] tracking-wide">{t('contact.hoursVal')}</p>
                </div>
              </div>
            </DraggableResizable>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export const WhatsAppButton = () => {
  return (
    <DraggableResizable id="whatsapp_button" className="fixed bottom-4 left-4 lg:bottom-6 lg:right-6 z-[100]">
      <a
        href="https://wa.me/212661260954"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#25D366] text-white p-3 lg:p-4 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group"
        aria-label="Contact on WhatsApp"
      >
        <div className="absolute -top-10 left-0 lg:left-auto lg:right-0 bg-navy text-ivory text-[8px] py-1 px-3 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase tracking-widest font-bold border border-gold/20">
          Contactez-nous
        </div>
        <svg 
          viewBox="0 0 24 24" 
          width="20" 
          height="20" 
          className="lg:w-6 lg:h-6 fill-currentColor transform group-hover:rotate-12 transition-transform duration-300"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
    </DraggableResizable>
  );
};
