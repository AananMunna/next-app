"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

const trendingPhones = [
  {
    id: 1,
    brand: "Samsung",
    title: "Galaxy S25 Ultra",
    price: "$1,199",
    img: "https://res.cloudinary.com/dtiotqi9q/image/upload/v1755804371/Samsung-Galaxy-S25-Ultra-Titanium-Black-Premium-Smartphone-1_ufbo88.png",
    href: "/products/samsung-galaxy-s25-ultra",
    features: ["200MP Camera", "Snapdragon 8 Gen 4", "5000mAh Battery"]
  },
  {
    id: 2,
    brand: "Apple",
    title: "iPhone 16 Pro Max",
    price: "$1,299",
    img: "https://res.cloudinary.com/dtiotqi9q/image/upload/v1755804371/i-Phone-16-Pro-Max-Leaks-exclusive-smartphone-transparent-PNG-image_uxclfc.png",
    href: "/products/iphone-16-pro-max",
    features: ["A18 Bionic", "Titanium Design", "Action Button"]
  },
  {
    id: 3,
    brand: "Xiaomi",
    title: "Xiaomi 15 Ultra",
    price: "$999",
    img: "https://res.cloudinary.com/dtiotqi9q/image/upload/v1755804369/xiaomi-15-ultra_1_xnqk0z.png",
    href: "/products/xiaomi-15-ultra",
    features: ["Leica Optics", "120W Charging", "Ceramic Body"]
  },
 {
  id: 4,
  brand: "Oppo",
  title: "Oppo Find X8 Pro",
  price: "₹81,999 - ₹99,999", // Prices vary, so better to show a range or multiple variants
  img: "https://res.cloudinary.com/dtiotqi9q/image/upload/v1755804371/Oppo-Find-X8-Pro-Flagship-Smartphone-2205_ll5ky2.png",
  href: "/products/oppo-find-x8-pro",
  features: ["Dimensity 9400", "50MP Quad Camera", "5910mAh Battery", "4500 nits peak brightness"]
}
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === trendingPhones.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const goToNext = () => {
    setCurrentIndex(currentIndex === trendingPhones.length - 1 ? 0 : currentIndex + 1);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? trendingPhones.length - 1 : currentIndex - 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="relative w-full py-5 h-screen max-h-[800px] overflow-hidden">
      {/* Background elements for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 to-background z-0" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 z-0" />
      
      <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center justify-center">
        {/* 3D Perspective Container */}
        <div className="relative w-full h-full perspective-1000">
          <AnimatePresence mode="wait">
            {trendingPhones.map((phone, index) => {
              if (index !== currentIndex) return null;
              
              return (
                <motion.div
                  key={phone.id}
                  initial={{ opacity: 0, rotateY: 45, scale: 0.9, z: -100 }}
                  animate={{ opacity: 1, rotateY: 0, scale: 1, z: 0 }}
                  exit={{ opacity: 0, rotateY: -45, scale: 0.9, z: -100 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="absolute inset-0 flex flex-col md:flex-row items-center justify-between gap-8"
                >
                  {/* Text Content */}
                  <motion.div 
                    className="relative z-10 text-center md:text-left md:w-1/2 space-y-6"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    {/* Trending Badge */}
                    <motion.span 
                      className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide"
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      Trending Now
                    </motion.span>

                    <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                      <span className="text-primary">{phone.brand}</span> <br />
                      {phone.title}
                    </h1>
                    
                    <div className="space-y-2">
                      {phone.features.map((feature, i) => (
                        <motion.div 
                          key={i}
                          className="flex items-center gap-2 text-muted-foreground"
                          initial={{ x: -30, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.5 + (i * 0.1), duration: 0.5 }}
                        >
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span>{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                      <motion.p 
                        className="text-2xl md:text-3xl font-bold"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                      >
                        Starting at {phone.price}
                      </motion.p>
                      
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                      >
                        <Link
                          href={phone.img}
                          className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-full font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30"
                        >
                          Shop Now
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Phone Image with 3D Effect */}
                  <motion.div 
                    className="relative md:w-1/2 h-1/2 md:h-full flex items-center justify-center"
                    initial={{ x: 50, opacity: 0, rotateY: 15 }}
                    animate={{ x: 0, opacity: 1, rotateY: 0 }}
                    transition={{ delay: 0.4, duration: 0.7 }}
                  >
                    <div className="relative w-full max-w-md h-full">
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-b from-primary/10 to-accent/10 rounded-3xl transform -rotate-6"
                        animate={{ 
                          rotateZ: [0, -3, 0],
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 8,
                          ease: "easeInOut" 
                        }}
                      />
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-primary/10 to-accent/10 rounded-3xl transform rotate-6"
                        animate={{ 
                          rotateZ: [0, 3, 0],
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 6,
                          ease: "easeInOut" 
                        }}
                      />
                      <div className="relative z-10 h-full flex items-center justify-center p-8">
                        <Image
                          src={phone.img}
                          alt={phone.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          style={{ objectFit: "contain" }}
                          priority={index === 0}
                          className="drop-shadow-2xl"
                        />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 z-20">
          <button
            onClick={goToPrevious}
            className="p-2 rounded-full bg-background/80 backdrop-blur-sm border hover:bg-accent transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-full bg-background/80 backdrop-blur-sm border hover:bg-accent transition-colors"
            aria-label={isPlaying ? "Pause slider" : "Play slider"}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </button>
          
          <button
            onClick={goToNext}
            className="p-2 rounded-full bg-background/80 backdrop-blur-sm border hover:bg-accent transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {trendingPhones.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex 
                  ? "bg-primary scale-125" 
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Subtle background animation */}
      <motion.div 
        className="absolute inset-0 -z-10 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, oklch(0.65 0.23 260), transparent 40%)",
            "radial-gradient(circle at 80% 50%, oklch(0.65 0.24 300), transparent 40%)",
            "radial-gradient(circle at 50% 20%, oklch(0.65 0.23 260), transparent 40%)",
            "radial-gradient(circle at 20% 50%, oklch(0.65 0.23 260), transparent 40%)",
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
    </section>
  );
}