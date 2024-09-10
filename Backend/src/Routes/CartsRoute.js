const express = require("express");
const CartController = require("../Controller/Products/CartController");
const router = express.Router();

router.route("/:id").post(CartController.addToCart).get(CartController.getCart);
router
  .route("/:userId/product/:productId/increment")
  .patch(CartController.incrementCartQuantity);
router
  .route("/:userId/product/:productId/decrement")
  .patch(CartController.decrementCartQuantity);
router
  .route("/:userId/product/:productId/delete")
  .delete(CartController.removeProduct);
module.exports = router;
