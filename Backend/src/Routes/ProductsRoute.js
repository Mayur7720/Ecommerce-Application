const express = require("express");
const router = express.Router();
const ProductsController = require("../Controller/Products/ProductsController");

router.route("/").get(ProductsController.getAllProducts);
router.route("/:id").get(ProductsController.getSingleProduct);
module.exports = router;
