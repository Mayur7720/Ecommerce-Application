require("dotenv").config(); // To use environment variables from a .env file
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const UsersRoute = require("./src/Routes/UsersRoute");
const ProductsRoute = require("./src/Routes/ProductsRoute");

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
app.use("/api/v1/user", UsersRoute);
app.use("/api/v1/products", ProductsRoute);

console.log(process.env.PORT);
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
