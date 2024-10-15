const express = require("express");
const router = express.Router();
const UserController = require("../Controller/User/UserController");
const auth = require("../Middleware/Authentication");

// print=(req,res,next)=>{
//   console.log(req.params)
//   next()
// }
router.route("/newUser").post(UserController.registerUser);
router.route("/login").post(UserController.signIn);
router.route("/refersh-token").post(UserController.refershAccessToken);
router.route("/:userId/wishlist").get(UserController.getWishlist);
router
  .route("/:userId/product/:productId/wishlist")
  .patch(UserController.updateWishlist);

module.exports = router;
