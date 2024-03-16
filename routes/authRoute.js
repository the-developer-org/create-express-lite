const express = require("express");
const { validate } = require("../middlewares/validate");
const router = express.Router();
const authValidation = require("../validations/authValidations");
const authController = require("../controllers/authController");

router.post("/signup", validate(authValidation.signup), authController.signup);
router.post("/login", validate(authValidation.login), authController.login);
router.get(
    "/verify-email/:token",
    validate(authValidation.verifyEmail),
    authController.verifyEmail
);
module.exports = router;
