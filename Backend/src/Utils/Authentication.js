const jwt = require("jsonwebtoken");

exports.IsAuthenticated = async (token) => {
  const IsUserAuth = jwt.verify(token, process.env.SECRET_KEY);
  console.log(IsUserAuth);
  if (!IsUserAuth) {
    return false;
  }
  return true;
};
