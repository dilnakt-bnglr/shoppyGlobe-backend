import {
  createProduct,
  getAllProducts,
  getProductById,
} from "../Controllers/products.controller.js";
import validateInputs from "../Middlewares/validateProductInput.js";

// created route for products endpoints
export function productRoutes(app) {
  // POST - Adding product
  app.post("/api/products", validateInputs, createProduct);
  // GET - Fetching all products
  app.get("/api/products", getAllProducts);
  // GET - Fetching product by id
  app.get("/api/products/:id", getProductById);
}
