const RegisterUser = require("../../Model/UserModel/RegisterUsersModel");
const LoginUser = require("../../Model/UserModel/LoginModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.UserLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existUser = await RegisterUser.findOne({ username });

    if (!existUser) {
      return res.status(404).json({ status: 404, message: "not user found" });
    }
    const correctUser = await existUser.checkUser(password);

    if (!correctUser) {
      return res
        .status(200)
        .json({ status: 200, message: "username and password is incorrect" });
    }
    const token = jwt.sign({ data: existUser }, process.env.SECRET_KEY, {
      expiresIn: "1m",
    });

    res
      .status(200)
      .json({ status: 200, message: "User Login Successfully", token });
  } catch (err) {
    res.status(400).json({ status: 400, message: "server error" });
  }
};

exports.CreateUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await RegisterUser.findOne({ username });
    if (user) {
      return res
        .status(409)
        .json({ status: 409, message: "user already exist" });
    }
    const newUser = await RegisterUser.create(req.body);
    await newUser.save();
    res.status(200).json({ status: 200, message: "created user successfully" });
  } catch (err) {
    res.status(400).json({ status: 400, message: "unable to create user" });
  }
};
