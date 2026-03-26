import { createCart } from "../Controllers/cart.controller.js";
import { authenticateUser } from "../Middlewares/authenticateUser.js";

export default function cartRoutes(app) {
  // POST - Adding to cart
  app.post("/api/cart", authenticateUser, createCart);
}
