const Products = require("../../Model/ProductModel/ProductsModel");
const RegisterUser = require("../../Model/UserModel/RegisterUsersModel");

exports.addToCart = async (req, res) => {
  try {
    console.log(req.params.id);
    console.log(req.body);
    const product = await Products.findById(req.params.id);
    const { title, price, images, _id } = product;
    const user = await RegisterUser.findById(req.body.userId);
    console.log(user);
    res.status(200).json({ status: 200, message: "increment" });
  } catch (err) {
    res.status(400).json({ status: 400, message: "not item found" });
  }
};
