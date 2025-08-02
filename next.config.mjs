/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.samsung.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.samsung.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "image-us.samsung.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "store.storeimages.cdn-apple.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i01.appmifile.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.vivoglobal.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.notebookcheck.net",
        pathname: "/fileadmin/Notebooks/News/**",
      },
      {
        protocol: "https",
        hostname: "diamu.com.bd",
        pathname: "/**",
      },
      // Added hosts from fake data below:
      {
        protocol: "https",
        hostname: "example.com",  // placeholder domain from fake images; replace with real if available
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "oppo.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "oneplus.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "google.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "xiaomi.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "sony.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "motorola.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "asus.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "realme.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
