require("dotenv").config(); // To use environment variables from a .env file
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const UsersRoute = require("./src/Routes/UsersRoute");
const ProductsRoute = require("./src/Routes/ProductsRoute");
const CartRoute = require("./src/Routes/CartsRoute");
// const Product = require("./src/Model/ProductModel/ProductsModel");
// const Category = require("./src/Model/ProductModel/Category.model");

app.use(cors());
app.use(express.json());

const dbURI = process.env.MONGODB_URI;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
  // async function migrateCategories() {
  //   try {
  //     const distinctCategories = await Product.distinct("category");
  //     const categoryMap = {};
  //     for (let catName of distinctCategories) {
  //       let category = await Category.findOne({ name: catName });
  //       if (!category) {
  //         category = new Category({ name: catName });
  //         await category.save();
  //       }
  //       categoryMap[catName] = category._id;
  //     }
  //     const products = await Product.find({});
  //     for (let product of products) {
  //       const categoryId = categoryMap[product.category];
  //       product.category = categoryId;
  //       await product.save();
  //     }
  //     console.log("Migrate Compelete!");
  //     mongoose.disconnect();
  //   } catch (err) {
  //     console.log("error during migration ", err);
  //   }
  // }
  // migrateCategories();
app.use("/api/v1/user", UsersRoute);
app.use("/api/v1/products", ProductsRoute);
app.use("/api/v1/cart", CartRoute);


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
