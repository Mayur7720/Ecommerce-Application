const Cart = require("../../Model/ProductModel/CartModel");
const Products = require("../../Model/ProductModel/ProductsModel");

exports.getAllProducts = async (req, res) => {
  try {
    const product = await Products.find();
    res.status(200).json({ status: 200, data: { product } });
  } catch (err) {
    res.status(400).json({ status: 400, message: "products not found!" });
  }
};

exports.getSingleProduct = async (req, res) => {
  try {
    const singleProduct = await Products.findById(req.params.id);
    res.status(200).json({ status: 200, singleProduct });
  } catch (err) {
    res.status(400).json({ status: 400, message: "product not found" });
  }
};

exports.getCartItem = async (req, res) => {
  try {
    const cart = await Cart.findById(req.body._id);
    console.log(cart);
    res.status(200).json({ status: 200, cart });
  } catch (err) {
    res.status(400).json({ status: 400, message: "no item in cart" });
  }
};
