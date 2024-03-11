const mongoose = require("mongoose");
const config = require("./config");
const Logger = require("../util/logger");
const connectDB = async () => {
    try {
        await mongoose.connect(config.database.url);
        const databaseStartTime = new Date().toLocaleString();
        Logger.log("info", {
            message: `MongoDB server successfully connected on ${databaseStartTime}`,
        });
    } catch (error) {
        console.log("DATABASE.JS FILE");
        Logger.log("error", {
            errorCode: "MONGOOSERROR",
            message: "Error while connecting to MongoDB server",
            source: "mongodb_connect",
            reason: "connection_failure",
            stack: error.stack,
        });
    }
};
module.exports = connectDB;
