require("dotenv").config();
const moment = require("moment");
const app = require("./app");
const config = require("./config/config");
const { Logger } = require("./config/logger");

const server = app.listen(config.port, () => {
    const serverStartTime = moment().format();
    Logger.log("info", {
        message: `Backend server started at port ${config.port} on ${serverStartTime}`,
    });
});

server.on("error", (error) => {
    console.log(error);
    process.exit(1);
});
process.on("uncaughtException", (error) => {
    console.log(error);
    process.exit(1);
});
