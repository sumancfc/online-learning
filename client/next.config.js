/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["online-learning-bucket.s3.amazonaws.com"],
  },
};

module.exports = nextConfig;
