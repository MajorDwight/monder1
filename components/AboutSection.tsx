import React from 'react';
import { motion } from 'framer-motion';

const AboutSection: React.FC = () => {
  // Using direct link format for the provided Google Drive image ID: 1fWtsYLOI4ie8HQ6tyQXXfI3tpCDr6B9Q
  const atelierImage = "https://lh3.googleusercontent.com/d/1fWtsYLOI4ie8HQ6tyQXXfI3tpCDr6B9Q";

  return (
    <section id="about" className="py-32 bg-mondera-cream overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-24">
          
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-1/2 relative"
          >
            <div className="aspect-[4/5] relative overflow-hidden">
              <img 
                src={atelierImage}
                alt="The Mondera Atelier" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute top-6 left-6 border border-white/40 w-[calc(100%-3rem)] h-[calc(100%-3rem)] pointer-events-none" />
            </div>
            {/* Floating element */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-10 -right-4 md:-right-10 w-56 h-56 bg-white p-8 hidden md:flex items-center justify-center shadow-2xl shadow-black/5"
            >
              <p className="font-serif text-2xl text-center leading-tight italic text-mondera-black">
                "Fashion is the armor to survive everyday life."
              </p>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-1/2"
          >
            <span className="text-mondera-gold uppercase tracking-widest text-sm font-semibold block mb-6">Our Story</span>
            <h2 className="text-5xl md:text-6xl font-serif mb-10 leading-tight text-mondera-black">
              Crafting Legacy Through Design
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed font-light text-lg">
              Founded in Milan, Mondera represents the convergence of artisanal tradition and contemporary vision. We believe in the power of understated elegance, where every stitch tells a story of dedication and mastery.
            </p>
            <p className="text-gray-600 mb-12 leading-relaxed font-light text-lg">
              Our materials are sourced from the finest mills in Italy, ensuring that each garment not only looks exquisite but feels exceptional against the skin. We are committed to sustainable luxury, creating pieces that are designed to be cherished for a lifetime.
            </p>
            <button className="group text-mondera-black border-b border-mondera-black pb-1 uppercase tracking-widest text-sm hover:text-mondera-gold hover:border-mondera-gold transition-all duration-300">
              Read Our Journal
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;