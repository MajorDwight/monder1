import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { Product } from '../types';

const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "The Silk Trench",
    category: "Outerwear",
    price: 895,
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Mondera Bag",
    category: "Accessories",
    price: 1250,
    image: "https://lh3.googleusercontent.com/d/1pFht7HvT3jgfBdEcC-Ogj_zeX8kHcdxG"
  },
  {
    id: 3,
    name: "Structured Blazer",
    category: "Tailoring",
    price: 595,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "Cashmere Turtleneck",
    category: "Knitwear",
    price: 345,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const FeaturedCollection: React.FC = () => {
  return (
    <section id="collections" className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <span className="text-mondera-gold uppercase tracking-widest text-sm font-semibold block mb-4">Autumn / Winter 24</span>
          <h2 className="text-4xl md:text-6xl font-serif mb-8">Signature Collection</h2>
          <div className="w-24 h-[1px] bg-mondera-black mx-auto"></div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16"
        >
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>

        <div className="mt-24 text-center">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 border border-mondera-black text-mondera-black uppercase tracking-widest text-sm hover:bg-mondera-black hover:text-white transition-colors duration-300"
          >
            View All Products
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;