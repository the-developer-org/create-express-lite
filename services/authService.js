const ApiError = require("../util/ApiError");
const {
    PASSWORD_MISSMATCH,
    EMAIL_NOT_VERIFIED,
} = require("../util/errorMessages");
const userService = require("./userService");

exports.loginUserWithEmailAndPassword = async (email, password) => {
    const user = await userService.getUserByEmail(email);
    if (!user || !user.isPasswordMatch(password)) {
        const { code, message, name } = PASSWORD_MISSMATCH;
        throw new ApiError(code, message, name);
    }
    if (!user.isEmailVerified) {
        const { code, message, name } = EMAIL_NOT_VERIFIED;
        throw new ApiError(code, message, name);
    }
    return user;
};
