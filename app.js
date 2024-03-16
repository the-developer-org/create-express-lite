const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/database');
const authRoute = require('./routes/authRoute');
const { errorHandler } = require('./middlewares/error');
const compression = require('compression');
const helmet = require('helmet');
const ApiError = require('./util/ApiError');
const { NOT_FOUND } = require('./util/errorMessages');

const app = express();
connectDB();
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:3000', '*'],
  })
);
app.use(helmet());
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth/v1', authRoute);

app.use((req, res, next) => {
  const { code, name, message } = NOT_FOUND;
  next(new ApiError(code, message, name));
});
app.use(errorHandler);

module.exports = app;
