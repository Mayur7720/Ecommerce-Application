const express = require("express");
const CartController = require("../Controller/Products/CartController");
const router = express.Router();

router.route("/:id").post(CartController.addToCart);


module.exports=router;