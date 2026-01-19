import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../types';
import { Plus, ShoppingBag, ArrowUpRight } from 'lucide-react';
import ShopifyBuyButton from './ShopifyBuyButton';

interface ProductCardProps {
  product: Product;
  textColor?: string;
  aspectRatio?: string;
  variant?: 'default' | 'creative';
}

const itemVariants = {
  hidden: { opacity: 0, y: 100 }, // Increased starting offset for a grander entrance
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 1.5, // Significantly slower duration for a silky smooth feel
      ease: [0.16, 1, 0.3, 1] // Custom ease-out curve
    } 
  }
};

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  textColor = "text-mondera-black",
  aspectRatio = "aspect-[3/4]",
  variant = 'default'
}) => {
  
  // Minimal / Editorial Style (Default - used in FeaturedCollection)
  if (variant === 'default') {
    return (
      <motion.div
        variants={itemVariants}
        className="group cursor-pointer flex flex-col"
      >
        <div className={`relative overflow-hidden w-full ${aspectRatio} mb-5 bg-gray-200`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <button 
            className="absolute bottom-4 right-4 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-black opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-mondera-gold hover:text-white"
            aria-label="Add to cart"
          >
            <Plus size={18} />
          </button>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="flex justify-between items-start">
            <h3 className={`font-serif text-lg tracking-wide ${textColor} group-hover:text-mondera-gold transition-colors duration-300`}>
              {product.name}
            </h3>
          </div>
          <div className="flex justify-between items-center text-xs tracking-widest uppercase">
               <span className="text-gray-500">{product.category}</span>
               <span className={`${textColor} font-medium`}>${product.price}</span>
          </div>
        </div>
      </motion.div>
    );
  }

  // Creative / Pop Style (Shop Page)
  return (
    <motion.div
      variants={itemVariants}
      className="group relative w-full h-full cursor-pointer perspective-[1000px]"
    >
      <div className={`relative w-full ${aspectRatio} rounded-xl overflow-hidden bg-gray-900 transition-all duration-500 ease-out shadow-[0_0_20px_-5px_rgba(255,255,255,0.15)] group-hover:shadow-[0_0_40px_-5px_rgba(255,255,255,0.4)] group-hover:-translate-y-3 border border-white/10 group-hover:border-white/40`}>
        
        {/* Image Layer */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
          />
          {/* Default Dark Overlay */}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500" />
          
          {/* Gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
        </div>

        {/* Decorative Inner Frame - Appears on Hover */}
        <div className="absolute inset-4 border border-white/0 group-hover:border-white/30 transition-all duration-700 rounded-lg pointer-events-none z-20 scale-95 group-hover:scale-100" />

        {/* Top Content: Category Badge & Arrow */}
        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start z-10">
           {/* Visible by default on mobile, hidden and shown on hover on desktop (lg) */}
           <span className="text-[10px] font-bold tracking-[0.2em] text-white/90 uppercase bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 transition-all duration-500 opacity-100 translate-y-0 lg:opacity-0 lg:-translate-y-2 lg:group-hover:opacity-100 lg:group-hover:translate-y-0">
             {product.category}
           </span>
           <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-500 delay-100 opacity-100 rotate-0 scale-100 lg:opacity-0 lg:rotate-45 lg:scale-50 lg:group-hover:opacity-100 lg:group-hover:rotate-0 lg:group-hover:scale-100">
             <ArrowUpRight size={18} />
           </div>
        </div>

        {/* Bottom Content: Info & Actions */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-10">
          <div className="transform transition-transform duration-500 ease-out translate-y-0 lg:translate-y-6 lg:group-hover:translate-y-0">
            <h3 className="font-serif text-2xl md:text-3xl text-white mb-2 leading-none group-hover:text-white transition-colors duration-300 drop-shadow-lg">
              {product.name}
            </h3>
            
            {/* Price and Add Button - Visible by default on mobile, slide reveal on desktop */}
            <div className="flex items-end justify-between mt-4 overflow-hidden transition-all duration-500 delay-75 pb-1 h-auto opacity-100 lg:h-0 lg:opacity-0 lg:group-hover:h-auto lg:group-hover:opacity-100">
               <div className="flex flex-col">
                 <span className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Price</span>
                 <span className="font-serif text-mondera-gold text-2xl italic">${product.price}</span>
               </div>
               
               {product.shopifyId ? (
                 <div className="flex items-center">
                    <ShopifyBuyButton productId={product.shopifyId} />
                 </div>
               ) : (
                 <button className="flex items-center space-x-2 bg-white text-black px-4 py-2 rounded-full hover:bg-mondera-gold hover:text-white transition-colors duration-300">
                    <span className="text-[10px] uppercase tracking-widest font-bold">Add to Bag</span>
                    <ShoppingBag size={14} />
                 </button>
               )}
            </div>
          </div>
        </div>
        
      </div>
    </motion.div>
  );
};

export default ProductCard;