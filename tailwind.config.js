/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"], // ক্লাস বেজড ডার্ক মোড ইनेবল করে (recommended for shadcn)
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",      // new Next.js app dir
    "./pages/**/*.{js,ts,jsx,tsx}",    // old pages dir if আছে
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",      // যদি src ফোল্ডার থাকে
  ],
  theme: {
    extend: {
      // তোমার কাস্টম থিম এক্সটেনশন এখানে দিতে পারো
    },
  },
  plugins: [
    require("tailwindcss-animate"),  // shadcn ui uses this plugin for animation
  ],
};
