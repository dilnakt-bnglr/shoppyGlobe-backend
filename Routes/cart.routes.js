import { addProductToCart } from "../Controllers/cart.controller.js";
import { authenticateUser } from "../Middlewares/authenticateUser.js";

// created route for cart endpoints
export default function cartRoutes(app) {
  // POST - Adding product to cart
  app.post("/api/cart", authenticateUser, addProductToCart);
}
