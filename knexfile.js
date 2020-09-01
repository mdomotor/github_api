if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
};

module.exports = {
  test: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL_TEST,
  },
  
  development: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    }
  }
};
