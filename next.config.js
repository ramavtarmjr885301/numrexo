/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;








// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     unoptimized: true,
//   },

//   async redirects() {
//     return [
//       {
//         source: '/calculators/:slug',
//         destination: '/health/:slug',
//         permanent: true,
//       },
//       {
//         source: '/calculators/:path*',
//         destination: '/health/:path*',
//         permanent: true,
//       },
//     ];
//   },
// };

// module.exports = nextConfig;







// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     unoptimized: true,
//   },

//   // Redirect `/calculator` to `/calculators` - future cache issues se bachne ke liye
//   async redirects() {
//     return [
//       {
//         source: '/calculator',
//         destination: '/calculators',
//         permanent: true,  // 301 redirect
//       },
//       {
//         source: '/calculator/:path*',
//         destination: '/calculators/:path*',
//         permanent: true,
//       },
//     ];
//   },
// };

// module.exports = nextConfig;