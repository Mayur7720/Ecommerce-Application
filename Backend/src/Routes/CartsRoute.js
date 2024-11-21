const express = require("express");
const CartController = require("../Controller/Products/CartController");
const router = express.Router();
// const auth=require("../Middleware/Authentication")
const auth = require("../Middleware/auth.middleware");

router.route("/").get(auth, CartController.getCart);
router.route("/:id").post(auth, CartController.addToCart);
router
  .route("/product/:productId/increment")
  .patch(auth, CartController.incrementCartQuantity);
router
  .route("/product/:productId/decrement")
  .patch(auth, CartController.decrementCartQuantity);
router
  .route("/product/:productId/delete")
  .delete(auth, CartController.removeProduct);

module.exports = router;
