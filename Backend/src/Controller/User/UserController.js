const jwt = require("jsonwebtoken");
const User = require("../../Model/UserModel/User.model");
const WishList = require("../../Model/ProductModel/WishList");
const Products = require("../../Model/ProductModel/ProductsModel");

const generateAccessAndRefershToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = await user.generateAccessToken();
    const refershToken = await user.generateRefreshToken();

    user.refershToken = refershToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refershToken };
  } catch (err) {
    // throw new ApiError(
    //   500,
    //   "Something went wrong while generating refresh and access token"
    // );
    console.log("something went wrong while generating refersh access tokekn");
  }
};

exports.signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existUser = await User.findOne({ username });

    if (!existUser) {
      return res.status(404).json({ status: 404, message: "not user found" });
    }

    const correctUser = await existUser.checkUser(password);

    if (!correctUser) {
      return res
        .status(401)
        .json({ status: 401, message: "username or password is incorrect" });
    }
    // existUser.status = true;
    // await existUser.save();

    // const token = jwt.sign({ userId: existUser._id }, process.env.SECRET_KEY, {
    //   expiresIn: "1d",
    // });

    const { accessToken, refershToken } = await generateAccessAndRefershToken(
      existUser._id
    );
    const loggedInUser = await User.findById(existUser._id);
    const options = {
      httpOnly: true,
      secure: true,
    };

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refershToken", refershToken, options)
      .json({
        status: 200,
        message: "User Login Successfully",
        token: accessToken,
        refershToken,
        role: loggedInUser.role,
      });
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
  const userId = req.params.userId;
  try {
    let wishlist = await WishList.findOne({ user: userId });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }
    let wishlistProducts = [];

    if (wishlist.products && wishlist.products.length > 0) {
      const productIds = wishlist.products.map((item) => item.product);
      wishlistProducts = await Products.find({
        _id: { $in: productIds },
      });
    }

    if (!wishlistProducts.length) {
      return res.status(404).json({ message: "No products found in wishlist" });
    }

    res.status(200).json({
      message: "Getting wishlist successfully",
      data: wishlistProducts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.refershAccessToken = async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refereshToken || req.body.refereshToken;

  if (!incomingRefreshToken) {
    console.log("Unauthorize request");
    // throw new ApiError(401, "Unauthorize request");
  }

  try {
    const decodeToken = jwt.verify(
      incomingRefreshToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    const user = await User.findById(decodeToken?._id);
    if (!user) {
      console.log("invalid refresh Token");
      // throw new ApiError(401, "Invalid Refresh Token");
    }
    if (incomingRefreshToken !== user?.refershToken) {
      console.log("refersh token is  expiry or used");
      // throw new ApiError(401, "Refresh Token is expiry or used");
    }
    const options = { httpOnly: true, secure: true };
    const { accessToken, refereshToken } = await generateAccessAndRefershToken(
      user._id
    );
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refershToken", refereshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refereshToken },
          "accessToken refersh Successfully"
        )
      );
  } catch (error) {
    console.log("invalid refersh Token ");
    // throw new ApiError(401, error?.message || "Invalid refersh Token");
  }
};

exports.updateWishlist = async (req, res) => {
  const { productId } = req.params;
  try {
    let wishlist = await WishList.findOne({ user: req.user._id });
    if (!wishlist) {
      wishlist = new WishList({ user: req.user._id, products: [] });
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
