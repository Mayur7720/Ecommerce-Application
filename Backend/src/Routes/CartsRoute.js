const express = require("express");
const CartController = require("../Controller/Products/CartController");
const router = express.Router();
const auth=require("../Middleware/Authentication")


router.route("/:id").post(auth,CartController.addToCart).get(auth,CartController.getCart);
router
  .route("/:userId/product/:productId/increment")
  .patch(auth,CartController.incrementCartQuantity);
router
  .route("/:userId/product/:productId/decrement")
  .patch(auth,CartController.decrementCartQuantity);
router
  .route("/:userId/product/:productId/delete")
  .delete(auth,CartController.removeProduct);
module.exports = router;
