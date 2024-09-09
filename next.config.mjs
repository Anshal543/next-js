/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'res.cloudinary.com',
          },
          {
            protocol: 'https',
            hostname: 'soeyviholxzuwjafthxi.supabase.co',
          },
        ],
      },
};

export default nextConfig;
