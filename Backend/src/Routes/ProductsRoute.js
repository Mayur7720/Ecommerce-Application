const express = require("express");
const router = express.Router();
const ProductsController = require("../Controller/Products/ProductsController");
const verifyToken = require("../Middleware/auth.middleware"); // for login

router.route("/").get(ProductsController.getAllProducts);
router.route("/:id").get(verifyToken, ProductsController.getSingleProduct);
module.exports = router;
