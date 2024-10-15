const User = require("../Model/UserModel/User.model");
const ApiError = require("../utils/ApiError");

exports.verifyToken = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer", "");
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }
    const decodeToken = jwt.verifyToken(token, process.env.ACCESS_TOKEN_EXPIRY);
    const user = await User.findById(decodeToken?._id).select("-password");

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }
    req.user = user;
    next();
  } catch (err) {
    throw new ApiError(401, err?.message || "Invalid access Token");
  }
});
 