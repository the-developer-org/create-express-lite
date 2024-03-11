const User = require("../models/userModel");
const Logger = require("../util/logger");
const createUser = async (userBody) => {
    if (await User.isEmailTaken(userBody.email)) {
        throw new Error("EMAIL_ALREADY_TAKEN");
    }

    return User.create(userBody);
};
module.exports = {
    createUser,
};
