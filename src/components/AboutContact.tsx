import React from 'react';
import { motion } from 'motion/react';
import { Phone, MapPin, Clock, Navigation as NavIcon, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const About = () => {
  const { t } = useTranslation();
  return (
    <section id="about" className="py-32 px-6 bg-ivory overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center"
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-10 text-navy uppercase tracking-tighter leading-tight">{t('about.title')}</h2>
          <div className="w-24 h-1.5 bg-gold mb-12" />
          <p className="text-charcoal/80 text-lg leading-relaxed mb-8 font-medium">
            {t('about.p1')}
          </p>
          <p className="text-charcoal/70 text-lg leading-relaxed mb-8">
            {t('about.p2')}
          </p>
          <p className="text-charcoal/70 text-lg leading-relaxed mb-12 italic font-serif">
            {t('about.p3')}
          </p>
          <div className="grid grid-cols-2 gap-12">
            <div className="border-l-2 border-platinum pl-6">
              <h4 className="text-gold text-4xl font-bold mb-2 font-display">100%</h4>
              <p className="text-charcoal/40 uppercase text-[10px] tracking-[0.3em] font-bold">{t('about.quality')}</p>
            </div>
            <div className="border-l-2 border-platinum pl-6">
              <h4 className="text-gold text-4xl font-bold mb-2 font-display">2026</h4>
              <p className="text-charcoal/40 uppercase text-[10px] tracking-[0.3em] font-bold">{t('about.established')}</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative"
        >
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(15,26,43,0.3)] border border-platinum/30">
            <img
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1000"
              alt="About MEN 31"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-12 -left-12 bg-navy p-10 shadow-2xl hidden md:block z-20 border-l-8 border-gold max-w-sm">
            <p className="text-ivory italic font-serif text-2xl leading-tight">"{t('about.quote') || 'Style is a way to say who you are without having to speak.'}"</p>
            <p className="text-gold uppercase tracking-widest text-[10px] mt-6 font-bold">— Rachel Zoe</p>
          </div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl -z-10" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export const Contact = () => {
  const { t } = useTranslation();
  const storeLocation = "MAGASIN 2, RESIDENCE SALIMA 2, MAHAJ SALA LJADIDA, Av. Moulay Rachid, Sala Al Jadida 11100";
  const phoneNumber = "06 61 26 09 54";

  return (
    <section id="contact" className="py-32 px-6 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-gold)_0%,_transparent_70%)] blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto relative z-10"
      >
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-ivory uppercase tracking-tighter leading-tight">{t('contact.title')}</h2>
          <div className="w-32 h-1.5 bg-gold mx-auto" />
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-navy/40 border border-platinum/10 backdrop-blur-xl p-10 flex flex-col items-center text-center group hover:border-gold/30 transition-all duration-500"
            >
              <div className="bg-gold/10 p-6 rounded-full text-gold mb-8 group-hover:bg-gold group-hover:text-navy transition-all duration-500">
                <MapPin size={32} />
              </div>
              <h4 className="text-xl font-bold mb-6 uppercase tracking-[0.2em] text-ivory">{t('contact.location')}</h4>
              <p className="text-ivory/60 text-sm mb-10 leading-relaxed">{storeLocation}</p>
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=MAGASIN+2,+RESIDENCE+SALIMA+2,+MAHAJ+SALA+LJADIDA,+Av.+Moulay+Rachid,+Sala+Al+Jadida+11100`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-gold hover:text-ivory uppercase text-[10px] tracking-[0.3em] font-bold transition-all duration-300"
              >
                <NavIcon size={16} className="mr-3" /> {t('contact.getDirections')}
              </a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-navy/40 border border-platinum/10 backdrop-blur-xl p-10 flex flex-col items-center text-center group hover:border-gold/30 transition-all duration-500"
            >
              <div className="bg-gold/10 p-6 rounded-full text-gold mb-8 group-hover:bg-gold group-hover:text-navy transition-all duration-500">
                <Phone size={32} />
              </div>
              <h4 className="text-xl font-bold mb-6 uppercase tracking-[0.2em] text-ivory">{t('contact.phone')}</h4>
              <a href={`tel:${phoneNumber.replace(/\s/g, '')}`} className="text-ivory text-2xl font-bold hover:text-gold transition-all duration-300 font-display">
                {phoneNumber}
              </a>
              <p className="text-ivory/40 text-[10px] mt-6 uppercase tracking-[0.3em] font-bold">{t('contact.callInquiries')}</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-navy/40 border border-platinum/10 backdrop-blur-xl p-10 flex flex-col items-center text-center group hover:border-gold/30 transition-all duration-500"
            >
              <div className="bg-gold/10 p-6 rounded-full text-gold mb-8 group-hover:bg-gold group-hover:text-navy transition-all duration-500">
                <Clock size={32} />
              </div>
              <h4 className="text-xl font-bold mb-6 uppercase tracking-[0.2em] text-ivory">{t('contact.hours')}</h4>
              <div className="text-ivory/60 text-sm">
                <p className="uppercase tracking-widest text-[10px] mb-2">Mon - Sun</p>
                <p className="text-ivory text-3xl font-bold font-display">10:00 - 22:00</p>
                <p className="text-gold text-[10px] font-bold mt-8 uppercase tracking-[0.3em]">{t('contact.openDaily')}</p>
              </div>
            </motion.div>
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
      className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
      aria-label="Contact on WhatsApp"
    >
      <svg 
        viewBox="0 0 24 24" 
        width="32" 
        height="32" 
        fill="currentColor" 
        className="transform group-hover:rotate-12 transition-transform duration-300"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    </a>
  );
};
