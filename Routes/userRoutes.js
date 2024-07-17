const express = require("express");
const { registeruser, logIn, logOutUser, forgotPassword, resetPassword } = require("../Controllers/userController");
const router = express.Router();

router.route("/register").post(registeruser)
router.route("/login").post(logIn)
router.route("/password/forget").post(forgotPassword);
router.route("/password/reset").put(resetPassword);
router.route("/logout").get(logOutUser);


module.exports = router;