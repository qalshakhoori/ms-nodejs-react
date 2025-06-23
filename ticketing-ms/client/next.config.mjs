export default {
  webpack: (config) => {
    return {
      ...config,
      watchOptions: {
        poll: 1000,
      },
    };
  },
  allowedDevOrigins: ['ticketing.dev'],
};
