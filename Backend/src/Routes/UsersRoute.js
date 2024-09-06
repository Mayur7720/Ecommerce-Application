const express = require("express");
const router = express.Router();
const UserController = require("../Controller/User/UserController");

router.route("/newUser").post(UserController.registerUser);
router.route("/login").post(UserController.signIn);


module.exports = router;
