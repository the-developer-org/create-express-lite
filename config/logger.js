const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, colorize, align, json } = format;

const logFolder = "./Logs";

const errorLogFileFormat = printf(
    ({ level, message, timestamp, errorCode, req, user }) => {
        let logMessage = timestamp ? `[${timestamp}] ` : "";
        logMessage += level ? `${level}: ` : "";
        if (req && req.method && req.originalUrl) {
            logMessage += `${req.method} request to ${req.originalUrl} failed. `;
        }
        if (errorCode) {
            logMessage += `Code: ${errorCode}. `;
        }
        if (message) {
            logMessage += `Message: ${message}. `;
        }
        if (req && req.user) {
            logMessage += `{"user": ${req.user.email}} `;
        } else if (user) {
            logMessage += `{"user": ${user.email}} `;
        }
        return logMessage;
    }
);

const customFormatConsole = printf(({ level, message, timestamp }) => {
    let logMessage = timestamp ? `[${timestamp}] ` : "";
    logMessage += level ? `${level}: ` : "";
    logMessage += message ? message : "";
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

const prodFileTransport = new transports.File({
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

exports.Logger = createLogger({
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
