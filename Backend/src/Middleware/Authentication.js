const jwt = require("jsonwebtoken");

module.exports = IsAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    if (decodeToken.exp && decodeToken.exp < Math.floor(Date.now() / 1000)) {
      return res.status(401).json({ status: 401, message: "token expired!" });
    }
    const userId = decodeToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      console.log("invalid id");
    } else {
      next();
    }
  } catch (err) {
    res.status(401).json({ status: 401, message: "invalid request!" });
  }
};
