require("dotenv").config();
const app = require("./app");
const config = require("./config/config");
const Logger = require("./util/logger");

const server = app.listen(config.port, () => {
    const serverStartTime = new Date().toLocaleString();
    Logger.log("info", {
        message: `Backend server started at port ${config.port} on ${serverStartTime}`,
    });
});

server.on("error", (error) => {
    if (error.syscall !== "listen") {
        Logger.log("error", {
            message: `Unknown server error`,
            reason: error.message,
            stack: error.stack,
        });
        process.exit(1);
    }
});
process.on("uncaughtException", (error) => {
    Logger.log("error", {
        message: `Uncaught Exception`,
        reason: error.message,
        stack: error.stack,
    });
    process.exit(1);
});
