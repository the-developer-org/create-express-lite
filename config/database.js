const mongoose = require("mongoose");
const moment = require("moment");
const config = require("./config");
const { Logger } = require("./logger");
exports.connectDB = async () => {
    try {
        await mongoose.connect(config.database.url);
        const databaseStartTime = moment().format();
        Logger.log("info", {
            message: `MongoDB server successfully connected on ${databaseStartTime}`,
        });
    } catch (error) {
        Logger.log("error", {
            errorCode: "MONGOOSERROR",
            message: "Error while connecting to MongoDB server",
            source: "mongodb_connect",
            reason: "connection_failure",
            stack: error.stack,
        });
    }
};
