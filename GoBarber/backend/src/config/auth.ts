export default {
  jwt: {
    // secret: '481b2922727e63f8a9eb921220a7173c',
    secret: process.env.APP_SECRET,
    expiresIn: '1d',
  },
};
