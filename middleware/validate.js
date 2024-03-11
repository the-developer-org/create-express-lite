const Joi = require("joi");
const pick = require("../util/pick");

const { sendErrorResponseAndLogError } = require("../util/errorHandler");

const validate = (schema) => (req, res, next) => {
    const validSchema = pick(schema, ["params", "query", "body"]);
    const object = pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
        .prefs({ errors: { label: "key" }, abortEarly: false })
        .validate(object);

    if (error) {
        return sendErrorResponseAndLogError(400, "error", error, req, res);
    }
    Object.assign(req, value);
    return next();
};

module.exports = validate;
