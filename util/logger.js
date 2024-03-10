const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, colorize, align, json } = format;
const DailyRotateFile = require("winston-daily-rotate-file");

const logFolder = "./Logs";

const errorLogFileFormat = printf(
    ({ level, message, req, timestamp, errorCode, user, uuid }) => {
        let logMessage = timestamp ? `[${timestamp}] ` : "";
        logMessage += level ? `${level}: ` : "";

        if (req && req.method && req.url) {
            logMessage += `${req.method} request to ${req.url} `;
        }

        logMessage += `failed. Error code: ${errorCode}. Error message: ${message}. {"user": ${
            req && req.user ? req.user.email : user
        }} `;

        return logMessage;
    }
);

const customFormatConsole = printf(({ level, message, timestamp }) => {
    let logMessage = timestamp ? `[${timestamp}] ` : "";
    logMessage += level ? `${level}: ` : "";
    if (message) logMessage += `Message: ${message}`;
    return logMessage;
});

const devConsoleTransport = new transports.Console({
    level: "debug",
    format: combine(
        colorize({ all: true }),
        timestamp({
            format: "YYYY-MM-DD hh:mm:ss.SSS A",
        }),
        align(),
        customFormatConsole
    ),
});

const devFileTransport = new transports.File({
    filename: `${logFolder}/devLogs.log`,
    level: "debug",
    datePattern: "YYYY-MM-DD",
    maxSize: "1m",
    maxFiles: "1m",
    format: combine(
        timestamp({
            format: "YYYY-MM-DD hh:mm:ss.SSS A",
        }),
        json(),
        errorLogFileFormat
    ),
});

const prodFileTransport = new DailyRotateFile({
    filename: `${logFolder}/prodLogs-%DATE%.log`,
    datePattern: "YYYY-MM-DD",
    maxSize: "1m",
    maxFiles: "7d",
    level: "warn",
    format: combine(
        timestamp({
            format: "YYYY-MM-DD hh:mm:ss.SSS A",
        }),
        json(),
        errorLogFileFormat
    ),
});

const Logger = createLogger({
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        debug: 4,
        silly: 5,
    },
    transports: [
        devConsoleTransport,
        process.env.NODE_ENV === "production"
            ? prodFileTransport
            : devFileTransport,
    ],
});

process.on("unhandledRejection", (reason, promise) => {
    Logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
});

process.on("uncaughtException", (error) => {
    Logger.error(`Uncaught Exception: ${error.message}`);
    process.exit(1);
});

module.exports = Logger;
