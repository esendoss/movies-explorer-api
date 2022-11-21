require('dotenv').config();

console.log(process.env.NODE_ENV);

const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const rateLimiter = require('./middlewares/rateLimiter');

const routes = require('./routes');
const { centralError } = require('./middlewares/centralError');
const { requestLogger, errorLoger } = require('./middlewares/logger');

const { PORT = 3010 } = process.env;
const { MONGO_URL = 'mongodb://127.0.0.1:27017/moviesdb' } = process.env;

const app = express();

app.use(requestLogger);

app.use(rateLimiter);

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const options = {
  origin: [
    'http://localhost:3010',
    'http://localhost:3000',
    'https://api.movies-esendoss.nomoredomains.icu',
    'https://movies-esendoss.nomoredomains.icu',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
};
/*
app.use(cors({
  origin: [
    'http://localhost:3010',
    'http://localhost:3000',
    'https://api.movies-esendoss.nomoredomains.icu',
    'https://movies-esendoss.nomoredomains.icu',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
}));
*/
mongoose.connect(MONGO_URL, { useNewUrlParser: true });

app.use('*', cors(options));

app.use(routes);

app.use(errorLoger);

app.use(errors());
app.use(centralError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
