const Cart = require("../../Model/ProductModel/Cart.model");
const Products = require("../../Model/ProductModel/ProductsModel");
const User = require("../../Model/UserModel/UserModel");

exports.addToCart = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ status: 404, message: "Product not found" });
    }

    const { title, price, images, _id } = product;
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    let existCart = await Cart.findOne({ owner: user });

    if (existCart) {
      // Ensure that `existCart.items` is initialized properly
      existCart.items = existCart.items || [];

      const productIndex = existCart.items.findIndex((item) =>
        item.product.equals(_id)
      );

      if (productIndex > -1) {
        // Product exists in the cart, update quantity and totalPrice
        existCart.items[productIndex].quantity += 1;
        existCart.items[productIndex].totalPrice += price * 70;
      } else {
        // Add new product to the cart
        existCart.items.push({
          product: _id,
          title,
          image: images[0],
          quantity: 1,
          totalPrice: price * 70,
          price: price * 70,
        });
      }

      // Recalculate total as the sum of all items' totalPrice
      existCart.total = existCart.items.reduce(
        (acc, item) => acc + item.totalPrice,
        0
      );

      await existCart.save();
      return res.status(200).json({
        status: 200,
        message: "Cart updated successfully",
        cart: existCart,
      });
    }

    // Create a new cart if none exists
    const createCart = new Cart({
      owner: user._id,
      items: [
        {
          product: _id,
          title,
          image: images[0],
          quantity: 1,
          totalPrice: price * 70,
          price: price * 70,
        },
      ],
      total: price * 70, // Since this is the only product, total is its totalPrice
    });

    await createCart.save(); // Await the save operation
    return res.status(200).json({
      status: 200,
      message: "Cart item added successfully",
      cart: createCart,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 500,
      message: "An error occurred while adding item to cart",
      error: err.message, // Provide the actual error message
    });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ owner: req.params.id });

    if (!cart) {
      return res
        .status(404)
        .json({ status: 404, message: "product not found" });
    }
    return res
      .status(200)
      .json({ status: 200, message: "your products ", cart });
  } catch (err) {
    res.status(500).json({ status: 500, message: "server error " });
  }
};

exports.incrementCartQuantity = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    // Find the cart containing the item
    const cart = await Cart.findOne({
      owner: userId,
      "items.product": productId,
    });

    if (!cart) {
      return res.status(404).json({
        status: 404,
        message: "Cart not found",
      });
    }

    // Find the index of the item in the cart
    const itemIndex = cart.items.findIndex((item) => item.product.equals(productId));

    if (itemIndex === -1) {
      return res.status(404).json({
        status: 404,
        message: "Product not found in cart",
      });
    }

    // Check if quantity exceeds the limit of 10
    if (cart.items[itemIndex].quantity >= 10) {
      return res.status(400).json({
        status: 400,
        message: "Quantity should be less or equal to 10",
      });
    }

    // Increment quantity
    cart.items[itemIndex].quantity += 1;

    // Update total price of the item
    cart.items[itemIndex].totalPrice = cart.items[itemIndex].quantity * cart.items[itemIndex].price;

    // Update total cost of the cart
    cart.total = cart.items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );

    // Save the updated cart
    await cart.save();

    res.status(200).json({
      status: 200,
      message: "Product quantity incremented",
      cart,
    });
  } catch (err) {
    res.status(500).json({ status: 500, message: "Server error" });
  }
};


exports.decrementCartQuantity = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const cart = await Cart.findOne({
      owner: userId,
      "items.product": productId,
    });
    const itemIndex = cart.items.findIndex((item) =>
      item.product.equals(productId)
    );
    if (itemIndex == -1) {
      return res.status(404).json({
        status: 404,
        message: "product not found in cart ",
      });
    }
    if (cart.items[itemIndex].quantity <= 0) {
      return res
        .status(400)
        .json({ status: 400, message: "Quantity cannot be negative" });
    }
    cart.items[itemIndex].quantity -= 1;
    cart.items[itemIndex].totalPrice =
      cart.items[itemIndex].quantity * cart.items[itemIndex].price;

    // Update total cost of the cart
    cart.total = cart.items.reduce((acc, item) => acc + item.totalPrice, 0);
    await cart.save();

    res
      .status(200)
      .json({ status: 200, message: "Product quantity incremented" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "Server error" });
  }
};

exports.removeProduct = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const cart = await Cart.updateOne(
      { owner: userId },
      { $pull: { items: { product: productId } } }
    );
    if (cart.modifiedCount == 0) {
      return res
        .status(200)
        .json({ status: 200, message: "product not found in cart" });
    }
    return res.status(204).send();
  } catch (err) {
    res.status(500).json({ status: 500, message: "Server Error" });
  }
};
