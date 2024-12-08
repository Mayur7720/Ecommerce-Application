const Cart = require("../../Model/ProductModel/Cart.model");
const jwt = require("jsonwebtoken");
const Products = require("../../Model/ProductModel/ProductsModel");
const WishList = require("../../Model/ProductModel/WishList");


exports.getAllProducts = async (req, res) => {
  try {
    const products = await Products.find();
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "").trim();

    if (token) {
      try {
        // Verify the token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log(decodedToken.username);
        const userId = decodedToken._id;
        // Fetch user's wishlist
        const userWishList = await WishList.findOne({ user: userId });
        const wishlist = userWishList
          ? userWishList.products.map((item) => item.product.toString())
          : [];

        // Add wishlist status to products
        const productsWithWishlist = products.map((product) => ({
          ...product._doc,
          isInWishlist: wishlist.includes(product._id.toString()),
        }));
        
        return res.status(200).json({
          status: 200,
          data: { products: productsWithWishlist, userId },
        });
      } catch (err) {
        console.error("Token verification failed:", err.message);
        // Return products without wishlist for invalid token
        return res.status(200).json({
          status: 200,
          data: { products: products },
        });
      }
    }

    // If no token, return products without wishlist info
    res.status(200).json({
      status: 200,
      data: {products: products },
    });
  } catch (err) {
    console.error("Error fetching products:", err.message);
    res.status(400).json({
      status: 400,
      message: "Products not found!",
    });
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
