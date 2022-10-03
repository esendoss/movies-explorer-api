require('dotenv').config();

const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

const { createUser, login } = require('./controllers/user');
const auth = require('./middlewares/auth');
const { centralError } = require('./middlewares/centralError');
const { validateLogin, validateRegister } = require('./middlewares/validation');
const { requestLogger, errorLoger } = require('./middlewares/logger');

const userRouter = require('./routes/user');
const movieRouter = require('./routes/movie');
const wayRouter = require('./routes/wrongway');

const { PORT = 3000 } = process.env;
const { MONGO_URL = 'mongodb://127.0.0.1:27017/moviesdb' } = process.env;

const app = express();

app.use(requestLogger);

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', validateRegister, createUser);
app.post('/signin', validateLogin, login);

app.use(cors({
  origin: [
    'http://localhost:3010',
    'https://api.movies-esendoss.nomoredomains.icu',
    'https://movies-esendoss.nomoredomains.icu',
  ],
}));

mongoose.connect(MONGO_URL, { useNewUrlParser: true });

app.use(auth);

app.use('/', userRouter);
app.use('/', movieRouter);
app.use(wayRouter);

app.use(errorLoger);

app.use(errors());
app.use(centralError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
