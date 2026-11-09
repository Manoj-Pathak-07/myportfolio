const isDev = process.env.NODE_ENV === 'development';

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isDev ? {} : { output: 'export' }),
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'motion'],
  },
  // The exported site has a static /index.html language chooser written by
  // scripts/postbuild.mjs. In development, redirect / to the default locale.
  ...(isDev
    ? {
        async rewrites() {
          return [{ source: '/', destination: '/en/' }];
        },
      }
    : {}),
};

export default nextConfig;
