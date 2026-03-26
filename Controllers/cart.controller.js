import cartModel from "../Models/cart.model.js";
import productModel from "../Models/products.model.js";
import mongoose from "mongoose";

export async function createCart(req, res) {
  const { user } = req;
  const { productId, quantity } = req.body;

  // 1. Check if valid ObjectId format (24 hex chars)
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({
      error: "Invalid product ID format",
    });
  }
  const product = await productModel.findOne({ _id: productId });

  if (!product) {
    return res
      .status(404)
      .json({ message: `Product with ${productId} not found` });
  }

  const cartItem = new cartModel({
    userId: user.userId,
    productId: productId,
    quantity: quantity,
  });

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
}
