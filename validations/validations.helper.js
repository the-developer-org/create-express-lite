const validator = require("validator");

exports.passwordValidation = {
    validator: function (value) {
        if (value.length < 8) {
            throw new Error("Password must be at least 8 characters");
        }
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
            throw new Error(
                "Password must contain at least one number and one letter"
            );
        }
        return true;
    },
};

exports.emailValidation = {
    validator: function (value) {
        if (!validator.isEmail(value)) {
            throw new Error("Invalid email");
        }
        return true;
    },
};
