import React from 'react';
import { motion } from 'motion/react';
import { Phone, MapPin, Clock, Navigation as NavIcon, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const About = () => {
  const { t } = useTranslation();
  return (
    <section id="about" className="py-24 px-6 bg-light-grey">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 glow-text uppercase">{t('about.title')}</h2>
          <p className="text-white/70 text-lg leading-relaxed mb-6">
            {t('about.p1')}
          </p>
          <p className="text-white/70 text-lg leading-relaxed mb-8">
            {t('about.p2')}
          </p>
          <p className="text-white/70 text-lg leading-relaxed mb-8">
            {t('about.p3')}
          </p>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-gold text-3xl font-bold mb-2">100%</h4>
              <p className="text-white/40 uppercase text-xs tracking-widest">{t('about.quality')}</p>
            </div>
            <div>
              <h4 className="text-gold text-3xl font-bold mb-2">2026</h4>
              <p className="text-white/40 uppercase text-xs tracking-widest">{t('about.established')}</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <img
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1000"
            alt="About MEN 31"
            className="rounded-lg shadow-2xl"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-8 -left-8 glass-card p-8 hidden md:block">
            <p className="text-gold italic font-serif text-xl">"Style is a way to say who you are without having to speak."</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const Contact = () => {
  const { t } = useTranslation();
  const storeLocation = "MAGASIN 2, RESIDENCE SALIMA 2, MAHAJ SALA LJADIDA, Av. Moulay Rachid, Sala Al Jadida 11100";
  const phoneNumber = "06 61 26 09 54";

  return (
    <section id="contact" className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-text uppercase">{t('contact.title')}</h2>
          <div className="w-24 h-1 bg-gold mx-auto" />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 flex flex-col items-center text-center">
              <div className="bg-gold/10 p-4 rounded-full text-gold mb-6">
                <MapPin size={24} />
              </div>
              <h4 className="text-xl font-bold mb-4 uppercase tracking-tight">{t('contact.location')}</h4>
              <p className="text-white/60 text-sm mb-6">{storeLocation}</p>
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=MAGASIN+2,+RESIDENCE+SALIMA+2,+MAHAJ+SALA+LJADIDA,+Av.+Moulay+Rachid,+Sala+Al+Jadida+11100`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-gold hover:underline uppercase text-xs tracking-widest font-bold"
              >
                <NavIcon size={16} className="mr-2" /> {t('contact.getDirections')}
              </a>
            </div>

            <div className="glass-card p-8 flex flex-col items-center text-center">
              <div className="bg-gold/10 p-4 rounded-full text-gold mb-6">
                <Phone size={24} />
              </div>
              <h4 className="text-xl font-bold mb-4 uppercase tracking-tight">{t('contact.phone')}</h4>
              <a href={`tel:${phoneNumber.replace(/\s/g, '')}`} className="text-white/60 text-xl font-bold hover:text-gold transition-colors">
                {phoneNumber}
              </a>
              <p className="text-white/40 text-xs mt-4 uppercase tracking-widest">{t('contact.callInquiries')}</p>
            </div>

            <div className="glass-card p-8 flex flex-col items-center text-center">
              <div className="bg-gold/10 p-4 rounded-full text-gold mb-6">
                <Clock size={24} />
              </div>
              <h4 className="text-xl font-bold mb-4 uppercase tracking-tight">{t('contact.hours')}</h4>
              <div className="text-white/60 text-sm">
                <p>Mon - Sun</p>
                <p className="text-white font-bold mt-1">10:00 - 22:00</p>
                <p className="text-gold text-xs font-medium mt-4 uppercase tracking-widest">{t('contact.openDaily')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/212661260954"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center"
    >
      <MessageCircle size={32} fill="white" />
    </a>
  );
};
