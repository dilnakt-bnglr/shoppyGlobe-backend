import mongoose from "mongoose";

// Schema for product
const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  stock: { type: Number, required: true },
});

// Product model - Maps to the products collection in MongoDB
const productModel = mongoose.model("products", productSchema);

export default productModel;
