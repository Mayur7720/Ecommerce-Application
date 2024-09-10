const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId },
        image: { type: String, required: true },
        title: { type: String, required: true },
        quantity: { type: Number, default: 1 },
        totalPrice: { type: Number,default:0 },
        price:{type:Number,default:0}
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
