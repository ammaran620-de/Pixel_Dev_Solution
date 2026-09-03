/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/careers',
        destination: '/contact',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
