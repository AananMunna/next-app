/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // Cloudinary base domain
        pathname: "/**", // allow all Cloudinary paths
      },
      {
        protocol: "https",
        hostname: "www.samsung.com", // Samsung official images
        pathname: "/**", // allow all Samsung paths
      },
      {
        protocol: "https",
        hostname: "image-us.samsung.com", // Samsung's US CDN
        pathname: "/**", // allow product images/videos from Samsung
      },
    ],
  },
};

export default nextConfig;
