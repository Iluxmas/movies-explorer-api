const cors = require('cors');

const options = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://bereal.nomoredomains.club',
    'https://bereal.nomoredomains.club',
    'http://api.bereal.nomoredomains.club',
    'https://api.bereal.nomoredomains.club',
    'https://iluxmas.github.io',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

module.exports = cors(options);
