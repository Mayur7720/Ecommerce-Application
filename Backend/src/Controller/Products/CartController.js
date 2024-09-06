const Products = require("../../Model/ProductModel/ProductsModel");
const RegisterUser = require("../../Model/UserModel/RegisterUsersModel");

exports.addToCart = async (req, res) => {
    // console.log("ok")
    try {
      console.log(req.body);
      console.log(req.params.id);
      const product = await Products.findById( req.params.id );
      const {title,price,images}=product
      console.log(title,images,price)
      const user=RegisterUser.findOne()
      res.status(200).json({status:200,message:"increment"})
    } catch (err) {
     res.status(400).json({status:400,message:"not item found"})
    }
  };