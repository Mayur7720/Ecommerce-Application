const jwt = require("jsonwebtoken");
const User = require("../Model/UserModel/User.model");

const verifyToken = async (req, res, next) => {
  try {
    const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "").trim();
    console.log(req.cookies)
    if (!token) {
      req.user = null;
      return next();
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id);

    if (!user) {
      return res.status(401).json({ message: "Invalid access token" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    req.user = null; // Proceed without a user for unauthenticated requests
    next();
  }
};

module.exports = verifyToken;

