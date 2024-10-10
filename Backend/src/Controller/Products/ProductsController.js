const jwt = require("jsonwebtoken");
const Cart = require("../../Model/ProductModel/Cart.model");
const Products = require("../../Model/ProductModel/ProductsModel");
const WishList = require("../../Model/ProductModel/WishList");

exports.getAllProducts = async (req, res) => {
  const token = req.headers.authorization;
  let userId;
  if (token) {
    const decode = jwt.decode(token);
    userId = decode?.userId;
  }
  try {
    const products = await Products.find();
    let wishlist = [];
    if (userId) {
      const userWishList = await WishList.findOne({ user: userId });
      if (userWishList) {
        wishlist = userWishList.products.map((item) => item.toString());
      }
      const productsWithlist = products.map((product) => {
        const isInWishlist = wishlist.includes(product._id.toString());
        return { ...product._doc, isInWishlist: isInWishlist };
      });
      res
        .status(200)
        .json({ status: 200, data: { products: productsWithlist } });
    }
    res.status(200).json({ status: 200, data: { products: products } });
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
