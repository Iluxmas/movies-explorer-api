require('dotenv').config();

const {
  NODE_ENV, DB_URI, JWT_SECRET, PORT,
} = process.env;

module.exports = {
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'iddqd_idkfa',
  DB_URI: NODE_ENV === 'production' ? DB_URI : 'mongodb://localhost:27017/bitfilmsdb',
  PORT: NODE_ENV === 'production' ? PORT : 3000,
};
