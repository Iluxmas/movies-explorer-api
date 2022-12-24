require('dotenv').config();
const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const cors = require('./middlewares/cors');
const Error404 = require('./errors/error404');
const rateLimiter = require('./middlewares/rateLimiter');
const errorsHandler = require('./middlewares/errorsHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_URI = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;
const app = express();

app.use('*', cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);
app.use(helmet());
app.use(rateLimiter);

mongoose.connect(DB_URI);

app.use('/api', routes);
app.all('*', (req, res, next) => next(new Error404('Страницы по данному адресу не существует')));

app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
