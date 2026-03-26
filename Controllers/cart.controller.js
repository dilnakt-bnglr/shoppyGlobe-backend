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

export async function deleteProductByIdFromCart(req, res) {
  try {
    const productId = req.params.id; // Get the product id from request params
    const { user } = req; // Getting the user details from request

    // Find and delete the product from cart
    const deletedItem = await cartModel.findOneAndDelete({
      userId: user.userId,
      productId: productId,
    });

    // Error handling for checking product in cart or not
    if (!deletedItem) {
      return res.status(404).json({ error: "Product not in your cart" });
    }

    res.status(200).json({ message: "Removed from cart" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" || error.message });
  }
}

// Upadting product quantity by ID in the carts collection
export async function updateProductQuantityById(req, res) {
  try {
    const { user } = req; // Getting the user details from request
    const productId = req.params.id; // // Get the product id from request params
    const { quantity } = req.body; // Get quantity from request body

    // Error handling for minimum quantity
    if (quantity < 1) {
      return res
        .status(400)
        .json({ message: "Product Quantiy should be minimum 1" });
    }

    // Find and update the quantity of product in cart
    const updatedProduct = await cartModel.findOneAndUpdate(
      {
        userId: user.userId,
        productId: productId,
      },
      { $set: { quantity } },
      { new: true },
    );

    // Error handling for checking product in cart or not
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not in cart" });
    }
    // Returning the updated quantity of cart products
    res.status(200).send(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" || error.message });
  }
}
