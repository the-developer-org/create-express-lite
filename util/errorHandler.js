const Logger = require("./logger");
const sendErrorResponseAndLogError = (status, level, error, req, res) => {
    Logger.log(level, {
        req: req,
        errorCode: error.name,
        message: error.message,
        user: req.body || req.user || "User data not provided",
    });
    return res.status(status).json({
        error: {
            errorCode: error.name,
            message: error.message,
        },
    });
};
module.exports = {
    sendErrorResponseAndLogError,
};
