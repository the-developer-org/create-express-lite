const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");

const {
    createUser,
    updateVerificationToken,
    verifyUser,
} = require("../services/userService");
const { sendVerificationEmail } = require("../services/emailServices");
const { loginUserWithEmailAndPassword } = require("../services/authService");
const { catchAsync } = require("../util/async");
const ApiError = require("../util/ApiError");

const signup = catchAsync(async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const user = await createUser(req.body, { session });
        const token = uuidv4();
        await updateVerificationToken(user, token, { session });
        await sendVerificationEmail(user.email, token);
        await session.commitTransaction();
        return res.status(201).json({ success: true });
    } catch (error) {
        await session.abortTransaction();
        throw new ApiError(error.statusCode, error.message, error.name);
    } finally {
        session.endSession();
    }
});

const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await loginUserWithEmailAndPassword(email, password);
    return res.status(200).json({ success: true, user: user.toJSON() });
});

const verifyEmail = catchAsync(async (req, res) => {
    const user = await verifyUser(req.params.token);
    if (!user) {
        res.status(204).json();
    }
    res.status(200).json({ success: true });
});
module.exports = {
    signup,
    login,
    verifyEmail,
};
