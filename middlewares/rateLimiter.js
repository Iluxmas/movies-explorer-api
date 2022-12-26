const rateLimit = require('express-rate-limit');

const limiterOptions = {
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  message: 'Превышено допустимое количество запросов, повторите позже',
  standardHeaders: true,
  legacyHeaders: false,
};

module.exports = rateLimit(limiterOptions);
