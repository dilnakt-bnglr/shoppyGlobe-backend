import productModel from "../Models/products.model.js";

// Creating product in the products collection
export default function createProduct(req, res) {
  const { productName, price, description, stock } = req.body; // Get the product data from request body

  // Creating the product
  const product = new productModel({
    productName: productName,
    price: price,
    description: description,
    stock: stock,
  });

  // / Svaing the product to db and returning the product and handling the error
  product
    .save()
    .then((data) => {
      if (!data) {
        return res.status(400).json({ message: "Cannot add product" });
      }
      res.status(201).send(data);
    })
    .catch((error) => res.send(error));
}
