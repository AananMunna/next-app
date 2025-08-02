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
        hostname: "www.notebookcheck.net",
        pathname: "/fileadmin/Notebooks/News/**",
      },
      {
        protocol: "https",
        hostname: "diamu.com.bd",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
