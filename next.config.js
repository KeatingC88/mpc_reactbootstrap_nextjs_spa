/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://192.168.56.1:5177/api/:path*',
      },
    ];
  },
};