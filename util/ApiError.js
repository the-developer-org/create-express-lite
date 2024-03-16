class ApiError extends Error {
    constructor(statusCode, message, codeName, stack = "") {
        super(message);
        this.statusCode = statusCode;
        this.name = codeName;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

module.exports = ApiError;
