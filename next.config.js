/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/ddegkqlmz/image/upload/**",
      },
      {
        protocol: "https",
        hostname: "uzum.uz",
        port: "",
        pathname: "/static/img/**",
      },
    ],
  },
};

module.exports = nextConfig;
