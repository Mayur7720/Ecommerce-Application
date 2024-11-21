const express = require("express");
const router = express.Router();
const UserController = require("../Controller/User/UserController");
const auth = require("../Middleware/auth.middleware");


router.route("/newUser").post(UserController.registerUser);
router.route("/login").post(UserController.signIn);
router.route("/refersh-token").post(UserController.refershAccessToken);
router.route("/:userId/wishlist").get(UserController.getWishlist);
router
  .route("/product/:productId/wishlist")
  .patch(auth,UserController.updateWishlist);

module.exports = router;
