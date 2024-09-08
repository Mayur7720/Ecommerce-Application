const jwt = require("jsonwebtoken");
const User = require("../../Model/UserModel/UserModel");

exports.signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existUser = await User.findOne({ username });

    if (!existUser) {
      return res.status(404).json({ status: 404, message: "not user found" });
    }

    const correctUser = await existUser.checkUser(password);
    console.log(correctUser);
    if (!correctUser) {
      return res
        .status(401)
        .json({ status: 401, message: "username or password is incorrect" });
    }

    existUser.status = true;
    await existUser.save();

    const token = jwt.sign({ userId: existUser._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    res
      .status(200)
      .json({ status: 200, message: "User Login Successfully", token });
  } catch (err) {
    res.status(500).json({ status: 500, message: "server error" });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (user) {
      return res
        .status(409)
        .json({ status: 409, message: "user already exist" });
    }

    const newUser = new User({
      username,
      password,
      status: false,
    });

    await newUser.save();

    res.status(201).json({ status: 201, message: "created user successfully" });
  } catch (err) {
    res.status(500).json({ status: 500, message: "unable to create user" });
  }
};

