const jwt = require("jsonwebtoken");
const User = require("../../Model/UserModel/UserModel");
const WishList = require("../../Model/ProductModel/WishList");

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

exports.getWishlist = async (req, res) => {
  const userId = req.params;
  try {
    const wishlist = await WishList.findOne({ user: userId });
    console.log(wishlist);
    if (!wishlist) {
      res.status(404).json({ message: "product in wishlist not found" });
    }
    res
      .status(200)
      .json({ message: "getting wishlist successfully", data: wishlist });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateWishlist = async (req, res) => {
  const { userId, productId } = req.params;
  try {
    let wishlist = await WishList.findOne({ user: userId });
    if (!wishlist) {
      wishlist = new WishList({ user: userId, products: [] });
    }

    const productIndex = wishlist.products.findIndex(
      (items) => items.product == productId
    );

    if (productIndex === -1) {
      wishlist.products.push({ product: productId });
      await wishlist.save();
      return res.status(200).json({ message: "product added in wishlist" });
    } else {
      wishlist.products.splice(productIndex, 1);
      await wishlist.save();
      return res.status(200).json({ message: "Product removed from wishlist" });
    }
  } catch (err) {
    console.log("error during updating wishlist");
    res.status(500).json({ message: "server error" });
  }
};
