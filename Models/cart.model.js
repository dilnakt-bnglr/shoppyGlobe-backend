import mongoose from "mongoose";

// Schema for cart
const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  quantity: { type: Number, required: true },
});

// Cart model - Maps to the carts collection in MongoDB
const cartModel = new mongoose.model("cart", cartSchema);

export default cartModel;
