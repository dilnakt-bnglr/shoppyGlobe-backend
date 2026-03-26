import {
  addProductToCart,
  getAllCartProducts,
  deleteProductByIdFromCart,
  updateProductQuantityById,
} from "../Controllers/cart.controller.js";
import { authenticateUser } from "../Middlewares/authenticateUser.js";

// created route for cart endpoints
export default function cartRoutes(app) {
  // POST - Adding product to cart
  app.post("/api/cart", authenticateUser, addProductToCart);
  // GET - Fetching products from cart
  app.get("/api/cart/", authenticateUser, getAllCartProducts);
  // DELETE - Deleting product by id from cart
  app.delete("/api/cart/:id", authenticateUser, deleteProductByIdFromCart);
  // PUT - Updating the quantity of product by id
  app.put("/api/cart/:id", authenticateUser, updateProductQuantityById);
}
