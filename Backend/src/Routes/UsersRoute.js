const express = require("express");
const router = express.Router();
const UserController = require("../Controller/User/UserController");

router.route("/newUser").post(UserController.CreateUser);
router.route("/login").post(UserController.UserLogin);


module.exports = router;
