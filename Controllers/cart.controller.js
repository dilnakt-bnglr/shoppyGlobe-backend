import cartModel from "../Models/cart.model.js";
import productModel from "../Models/products.model.js";
import mongoose from "mongoose";

// Adding product to cart
export async function addProductToCart(req, res) {
  try {
    const { user } = req; // Getting the user details from request
    const { productId, quantity } = req.body; // Getting the cart data from request body

    // Check if valid ObjectId format
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        error: "Invalid product ID format",
      });
    }

    // Check for the product if exist or not in products collection
    const product = await productModel.findOne({ _id: productId });

    // Error handling if product not found
    if (!product) {
      return res
        .status(404)
        .json({ message: `Product with ${productId} not found` });
    }

    // Creating the cart
    const cartItem = new cartModel({
      userId: user.userId,
      productId: productId,
      quantity: quantity,
    });

    // Saving the cart data to db and returning the cart data and handling the error
    cartItem
      .save()
      .then((data) => {
        if (!data) {
          return res.status(400).json({ message: "Cannot add to cart" });
        }
        res.status(201).send(data);
      })
      .catch((error) =>
        res
          .status(500)
          .json({ message: "Internal server error" || error.message }),
      );
  } catch (error) {
    res.status(500).json({ message: "Internal server error" || error.message });
  }
}

// Fetching all products from cart
export async function getAllCartProducts(req, res) {
  try {
    const { user } = req; // Getting the user details from request
    // Getting cart data using user id
    const cartData = await cartModel.find({ userId: user?.userId });
    // Error handling if cart is empty
    if (cartData.length == 0) {
      return res.status(400).json({ message: "No products in the cart" });
    }

    // getting the id's of product in cart data
    const productIds = cartData.map((product) => product.productId);

    // Finding products using product id
    const products = await productModel.find({
      _id: { $in: productIds },
    });
    // Returning the product data
    res.status(200).send(products);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}
