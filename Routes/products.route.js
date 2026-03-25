import createProduct from "../Controllers/products.controller.js";
import validateInputs from "../Middlewares/validateProductInput.js";

// created route for products endpoints
export function productRoutes(app) {
  // POST - Adding product
  app.post("/api/products", validateInputs, createProduct);
}
