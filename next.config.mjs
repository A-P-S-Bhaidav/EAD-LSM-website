/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/register-ead',
        destination: 'https://docs.google.com/forms/d/e/1FAIpQLSdKt9Gdi38ylyrosM1tvcxfjtBnSNtJtsUloC_0g5u_ctCRuw/viewform',
        permanent: false,
      },
      {
        source: '/register-lsm',
        destination: 'https://docs.google.com/forms/d/1GAFX0tb9pRztjLgdCw4_650h4piK1RTvXw8GzNiZJdA/viewform?edit_requested=false',
        permanent: false,
      },
      {
        source: '/ead/login',
        destination: '/',
        permanent: false,
      },
      {
        source: '/lsm/login',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

