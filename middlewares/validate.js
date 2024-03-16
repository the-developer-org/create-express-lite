const Joi = require("joi");
const { pick } = require("../util/pick");
const ApiError = require("../util/ApiError");
const { BAD_REQUEST } = require("../util/errorMessages");

exports.validate = (schema) => (req, res, next) => {
    const validSchema = pick(schema, ["params", "query", "body"]);
    const object = pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
        .prefs({ errors: { label: "key" }, abortEarly: false })
        .validate(object);
    if (error) {
        const { code, name } = BAD_REQUEST;
        throw new ApiError(code, error.message, name);
    }
    Object.assign(req, value);
    return next();
};
