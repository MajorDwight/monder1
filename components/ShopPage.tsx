import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '../types';

const CATEGORIES = ["All", "Outerwear", "Dresses", "Tailoring", "Knitwear", "Accessories"];

const HERO_IMAGE = "https://lh3.googleusercontent.com/d/1LkNAv8Osk1gSVGIA76LowgJ-9GttkF38";

const SHOP_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Mondera Bag",
    category: "Accessories",
    price: 895,
    // Using the direct link format for the Google Drive ID: 17_cAZQChjexxzaBq-ULlldPbOXqSrLWb
    image: "https://lh3.googleusercontent.com/d/17_cAZQChjexxzaBq-ULlldPbOXqSrLWb",
    shopifyId: "8411928527056"
  },
  {
    id: 2,
    name: "Simple Shirt",
    category: "Tailoring",
    price: 450,
    // Switched to a high-quality shirt image to match the name "Simple Shirt"
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    shopifyId: "8411868168400"
  },
  {
    id: 3,
    name: "Structured Blazer",
    category: "Tailoring",
    price: 595,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    shopifyId: "8411528069328"
  },
  {
    id: 4,
    name: "Cashmere Turtleneck",
    category: "Knitwear",
    price: 345,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    name: "Pleated Midi Skirt",
    category: "Tailoring",
    price: 420,
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    name: "Leather Crossbody",
    category: "Accessories",
    price: 650,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    name: "Wool Wrap Coat",
    category: "Outerwear",
    price: 1100,
    image: "https://images.unsplash.com/photo-1539533018447-63fce136563a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 8,
    name: "Silk Scarf",
    category: "Accessories",
    price: 180,
    image: "https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Slightly increased stagger for rhythm
      delayChildren: 0.3
    }
  }
};

const ShopPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = SHOP_PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] overflow-hidden text-white selection:bg-red-900 selection:text-white">
      
      {/* --- Background Image --- */}
      <div className="fixed inset-0 z-0 bg-black">
        <motion.div
           initial={{ scale: 1.1, opacity: 0 }}
           // We animate to scale 1.001 instead of 1 to ensure the layer remains promoted (hardware accelerated)
           // which prevents backdrop-filter glitches when the animation completes.
           animate={{ scale: 1.001, opacity: 1 }}
           transition={{ duration: 1.5 }}
           className="w-full h-full"
           style={{ willChange: 'transform, opacity' }}
        >
          <img 
            src={HERO_IMAGE} 
            alt="Background" 
            className="w-full h-full object-cover object-center opacity-60"
          />
        </motion.div>
        
        {/* Dark Overlay for text readability - Force specific layer to prevent blending issues */}
        <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm" 
            style={{ transform: 'translateZ(0)' }}
        />
        
        {/* Noise Overlay for texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] brightness-100 contrast-125 pointer-events-none" />
      </div>

      {/* --- Main Content --- */}
      <div className="relative z-10 pt-32 pb-20 px-6 md:px-12">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0.001 }} // Prevent exact zero to avoid layer collapse
            transition={{ duration: 1, ease: "backOut" }}
            className="text-6xl md:text-9xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 drop-shadow-2xl uppercase"
          >
            SHOP
          </motion.h1>
        </div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0.001 }} // Prevent exact zero to avoid layer collapse
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex justify-center mb-8 relative z-20"
        >
          <div className="relative w-full max-w-md group">
            <input 
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-full py-4 pl-14 pr-6 text-white placeholder-white/30 focus:outline-none focus:bg-white/10 focus:border-mondera-gold/50 transition-all duration-300 shadow-xl"
              style={{ transform: 'translateZ(0)' }} // Force hardware acceleration persistently
            />
            <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white/50 group-focus-within:text-mondera-gold transition-colors duration-300 pointer-events-none">
               <Search size={18} />
            </div>
          </div>
        </motion.div>

        {/* Floating Glass Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0.001 }} // Prevent exact zero
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-16"
        >
          {/* Changed rounded-full to rounded-3xl to handle multi-line wrapping gracefully on mobile */}
          <div className="flex flex-wrap justify-center gap-2 p-2 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl max-w-full mx-auto">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category 
                    ? 'bg-white text-black shadow-lg scale-105' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  variant="creative"
                  aspectRatio="aspect-[3/4]" 
                />
              ))
            ) : (
               <motion.div 
                 initial={{ opacity: 0 }} 
                 animate={{ opacity: 1 }} 
                 exit={{ opacity: 0 }}
                 className="col-span-full h-64 flex flex-col items-center justify-center text-gray-500 font-light italic"
               >
                 <span className="text-2xl mb-2">No masterpieces found</span>
                 <span className="text-sm opacity-50">Try adjusting your search or filters.</span>
               </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
};

export default ShopPage;