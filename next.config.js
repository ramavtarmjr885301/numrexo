/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },

  // Next.js kills a static-generation worker after 60 seconds by default and
  // fails the whole build after three attempts. One slow external request (the
  // WordPress blog API) was enough to jam the worker pool and take the entire
  // deploy down with it — including pages like /terms that fetch nothing.
  //
  // app/wordpress.ts now hard-times-out every blog request, so this should
  // rarely be needed. It stays as headroom for slow builds on a cold cache.
  staticPageGenerationTimeout: 180,
};

module.exports = nextConfig;
