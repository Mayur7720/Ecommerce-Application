const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    items: [
      {
        quantity: { type: Number, default: 1 },
        item: { type: mongoose.Schema.Types.ObjectId },
        price: { type: Number, default: 1 },
      },
    ],
    total: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
