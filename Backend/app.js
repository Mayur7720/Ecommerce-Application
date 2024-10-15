require("dotenv").config(); // To use environment variables from a .env file
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const UsersRoute = require("./src/Routes/UsersRoute");
const ProductsRoute = require("./src/Routes/ProductsRoute");
const CartRoute = require("./src/Routes/CartsRoute");
const cookieParser = require("cookie-parser");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("pubic"));
app.use(cookieParser());
const dbURI = process.env.MONGODB_URI;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/v1/user", UsersRoute);
app.use("/api/v1/products", ProductsRoute);
app.use("/api/v1/cart", CartRoute);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
