const Joi = require("joi");
const { password } = require("./customValidation");

exports.signup = {
    body: Joi.object().keys({
        username: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(password),
        fullName: Joi.string().required(),
        phoneNumber: Joi.string().required(),
    }),
};
exports.login = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(password),
    }),
};
exports.verifyEmail = {
    params: Joi.object().keys({
        token: Joi.string().required(),
    }),
};
