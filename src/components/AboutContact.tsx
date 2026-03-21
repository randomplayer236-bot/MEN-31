import React from 'react';
import { motion } from 'motion/react';
import { Phone, MapPin, Clock, Navigation as NavIcon, MessageCircle } from 'lucide-react';

export const About = () => {
  return (
    <section id="about" className="py-24 px-6 bg-light-grey">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 glow-text uppercase">Our Story</h2>
          <p className="text-white/70 text-lg leading-relaxed mb-6">
            MEN 31 represents more than just clothing. It represents confidence, discipline, and modern masculinity. 
            Founded with a vision to bring premium style to the modern man, we focus on high-quality fabrics and 
            impeccable fits that make a statement.
          </p>
          <p className="text-white/70 text-lg leading-relaxed mb-8">
            Whether you're looking for the perfect streetwear ensemble or a classic outfit for a special occasion, 
            MEN 31 provides the curated selection you need to elevate your presence.
          </p>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-gold text-3xl font-bold mb-2">100%</h4>
              <p className="text-white/40 uppercase text-xs tracking-widest">Quality Assured</p>
            </div>
            <div>
              <h4 className="text-gold text-3xl font-bold mb-2">2026</h4>
              <p className="text-white/40 uppercase text-xs tracking-widest">Established</p>
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
  const storeLocation = "MAGASIN 2, RESIDENCE SALIMA 2, MAHAJ SALA LJADIDA, Av. Moulay Rachid, Sala Al Jadida, Morocco";
  const phoneNumber = "06 61 26 09 54";

  return (
    <section id="contact" className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-text uppercase">Visit Us</h2>
          <div className="w-24 h-1 bg-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="glass-card p-8 flex items-start space-x-6">
              <div className="bg-gold/10 p-4 rounded-full text-gold">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2 uppercase tracking-tight">Location</h4>
                <p className="text-white/60">{storeLocation}</p>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(storeLocation)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-4 text-gold hover:underline"
                >
                  <NavIcon size={16} className="mr-2" /> Get Directions
                </a>
              </div>
            </div>

            <div className="glass-card p-8 flex items-start space-x-6">
              <div className="bg-gold/10 p-4 rounded-full text-gold">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2 uppercase tracking-tight">Phone</h4>
                <a href={`tel:${phoneNumber.replace(/\s/g, '')}`} className="text-white/60 text-2xl font-bold hover:text-gold transition-colors">
                  {phoneNumber}
                </a>
                <p className="text-white/40 text-sm mt-2">Call us for inquiries</p>
              </div>
            </div>

            <div className="glass-card p-8 flex items-start space-x-6">
              <div className="bg-gold/10 p-4 rounded-full text-gold">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2 uppercase tracking-tight">Hours</h4>
                <div className="space-y-1 text-white/60">
                  <p className="flex justify-between w-48"><span>Mon - Sun:</span> <span>10:00 - 22:00</span></p>
                  <p className="text-gold text-sm font-medium mt-2">Open Daily</p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[500px] rounded-lg overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-700">
            <iframe
              title="Store Location"
              width="100%"
              height="100%"
              frameBorder="0"
              src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS_API_KEY || ''}&q=${encodeURIComponent(storeLocation)}`}
              allowFullScreen
            ></iframe>
            {/* Note: In a real app, you'd need a Google Maps API Key. 
                For this demo, we'll assume the iframe works or use a placeholder if needed. */}
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
