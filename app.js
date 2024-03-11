const express = require("express");
const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoute");

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth/v1", authRoutes);

module.exports = app;
