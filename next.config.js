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

  // The Flight Time Calculator downloads /data/airports.json (~270 KB compressed)
  // once. Let browsers and the CDN reuse it for a day and serve a stale copy for a
  // week while refreshing, so repeat visits never pay for it again.
  async headers() {
    return [
      {
        source: "/data/:file*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
