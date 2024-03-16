const User = require("../models/User");
const { EMAIL_ALREADY_IN_USE, NOT_FOUND } = require("../util/errorMessages");
const ApiError = require("../util/ApiError");

exports.createUser = async (userBody) => {
    if (await User.isEmailTaken(userBody.email)) {
        const { code, name, message } = EMAIL_ALREADY_IN_USE;
        throw new ApiError(code, message, name);
    }
    return User.create(userBody);
};
exports.getUserByEmail = async (email) => {
    return User.findOne({ email });
};
exports.updateVerificationToken = async (user, token) => {
    const foundUser = await User.findOne({ email: user.email });
    if (!foundUser) {
        const { code, name, message } = NOT_FOUND;
        throw new ApiError(code, message, name);
    }
    foundUser.emailVerificationToken = token;
    await foundUser.save();
};
exports.verifyUser = async (token) => {
    const user = await User.findOne({ emailVerificationToken: token });
    if (!user) {
        const { code, name, message } = NOT_FOUND;
        throw new ApiError(code, message, name);
    }
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    await user.save();
    return user;
};
