"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const trendingPhones = [
  {
    brand: "Samsung",
    title: "Galaxy S25 Ultra",
    price: "$1,199",
    img: "https://images.samsung.com/bd/smartphones/galaxy-s24-ultra/images/galaxy-s24-ultra-highlights-kv.jpg?imbypass=true",
    href: "/products/samsung-galaxy-s25-ultra",
  },
  {
    brand: "Apple",
    title: "iPhone 16 Pro Max",
    price: "$1,299",
    img: "https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc4/Apple-iPhone-16-Pro-Max-Nachfolger-komplett-mit-drei-48-Megapixel-Kameras.jpg",
    href: "/products/iphone-16-pro-max",
  },
  {
    brand: "Xiaomi",
    title: "Xiaomi 15 Ultra",
    price: "$999",
    img: "https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc4/Xiaomi-15-Ultra-und-globales-Xiaomi-15-Konkreter-Launchtermin-steht.jpg",
    href: "/products/xiaomi-15-ultra",
  },
  {
    brand: "Vivo",
    title: "Vivo X100 Pro",
    price: "$899",
    img: "https://diamu.com.bd/wp-content/uploads/2024/11/Vivo-X100-Pro-5G.jpg",
    href: "/products/vivo-x100-pro",
  },
];

export default function Hero() {
  return (
    <section className="relative w-full bg-gray-50 pt-4">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        loop
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        className="w-full max-w-7xl mx-auto aspect-[16/9] rounded-lg overflow-hidden shadow-lg"
      >
        {trendingPhones.map((phone, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-full">
              {/* Background Image */}
              <Image
                src={phone.img}
                alt={phone.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover", transition: "transform 0.8s ease" }}
                className="swiper-lazy brightness-90 hover:scale-105 transform transition-transform duration-700 ease-in-out"
                priority={i === 0}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

              {/* Overlay Content */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 md:px-12 text-white">
                {/* Trending Badge */}
                <span className="mb-4 inline-block bg-red-600 px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wide drop-shadow-lg">
                  Trending
                </span>

                <h2 className="text-3xl sm:text-5xl font-extrabold drop-shadow-lg leading-tight">
                  {phone.brand} <br /> {phone.title}
                </h2>
                <p className="mt-2 text-xl sm:text-2xl font-semibold drop-shadow">
                  {phone.price}
                </p>

                <Link
                  href={phone.href ?? "/"}
                  className="mt-6 inline-block px-10 py-4 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg text-lg font-bold transition"
                  aria-label={`Buy ${phone.brand} ${phone.title}`}
                >
                  Buy Now
                </Link>
              </div>

              {/* Swipe Indicator (mobile only) */}
              <div className="absolute bottom-5 right-5 text-white text-sm hidden sm:block select-none pointer-events-none animate-bounce">
                Swipe ➡️
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
