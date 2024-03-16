const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {
    passwordValidation,
    emailValidation,
} = require("../validations/validations.helper");

const toJSON = require("./plugins/toJSON.plugin");

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        phoneNumber: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate: emailValidation,
        },
        password: {
            type: String,
            required: true,
            trim: true,
            validate: passwordValidation,
            private: true,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        emailVerificationToken: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.plugin(toJSON);

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
};

userSchema.methods.isPasswordMatch = async function (password) {
    const user = this;
    return bcrypt.compare(password, user.password);
};

userSchema.pre("save", async function (next) {
    const user = this;
    const salt = Number(process.env.HASH_SALT);
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, salt);
    }
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
