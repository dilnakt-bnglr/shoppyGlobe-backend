import createProduct from "../Controllers/products.controller.js";

export function productRoutes(app) {
  app.post("/api/products", createProduct);
}
