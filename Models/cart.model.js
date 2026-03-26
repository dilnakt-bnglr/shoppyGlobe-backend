import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const cartModel = new mongoose.model("cart", cartSchema);

export default cartModel;
