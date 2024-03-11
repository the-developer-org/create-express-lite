const userService = require("../services/userServices");
const { sendErrorResponseAndLogError } = require("../util/errorHandler");
const signup = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        return res.status(200).json({ success: true, user: user.toJSON() });
    } catch (error) {
        if (error.message === "EMAIL_ALREADY_TAKEN") {
            error.name = "CONFLICT";
            error.message = "Email is already in use";
            return sendErrorResponseAndLogError(409, "error", error, req, res);
        }
        return sendErrorResponseAndLogError(500, "error", error, req, res);
    }
};
module.exports = {
    signup,
};
