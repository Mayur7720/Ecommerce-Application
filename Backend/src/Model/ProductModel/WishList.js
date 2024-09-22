const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
      addedAt: { type: Date, default: Date.now() },
    },
  ],
});

const wishlist = mongoose.model("wishlist", WishlistSchema);
module.exports = wishlist;
