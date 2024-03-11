const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const authValidation = require("../validations/authValidation");
const { signup } = require("../controllers/authController");
router.post("/signup", validate(authValidation.signup), signup);
router.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
});
module.exports = router;
