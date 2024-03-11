const Joi = require("joi");
const { password } = require("./customValidation");

const signup = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(password),
    }),
};

module.exports = {
    signup,
};
