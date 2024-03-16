const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/database');
const authRoute = require('./routes/authRoute');
const { errorHandler } = require('./middlewares/error');

const app = express();
app.use(
  cors({
    origin: ['http://localhost:5173', "http://localhost:3000", "*"],
  })
);
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth/v1', authRoute);
app.use(errorHandler);

module.exports = app;
