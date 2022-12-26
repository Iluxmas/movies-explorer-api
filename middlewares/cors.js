const cors = require('cors');

const options = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://kino.nomoredomains.club',
    'https://kino.nomoredomains.club',
    'http://kino.nomoredomains.club/api',
    'https://kino.nomoredomains.club/api',
    'https://iluxmas.github.io',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

module.exports = cors(options);
