const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    rating: { type: Number },
    images: { type: String },
    rating: {
      rate: { type: Number },
      count: { type: Number },
    },
    images: [],

  },
  { timestamps: true }
);

const Products = mongoose.model("Products", productsSchema, "Products"); // Explicitly define the collection name
module.exports = Products;
