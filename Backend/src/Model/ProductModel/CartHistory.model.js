const mongoose = require("mongoose");

const cartHistorySchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId,ref:"Products" },
      image: { type: String, required: true },
      title: { type: String, required: true },
      quantity: { type: Number, default: 1 },
      price: { type: Number, default: 1 },
    },
  ],
  total: {
    type: Number,
    default: 0,
  },
  purchaseDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["purchased", "canceled"],
    default: "purchased",
  },
});

const CartHistory = mongoose.model("CartHistory", cartHistorySchema);
module.exports = CartHistory;
