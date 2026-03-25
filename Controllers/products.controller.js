import productModel from "../Models/products.model.js";

export default function createProduct(req, res) {
  const { productName, price, description, stock } = req.body;

  const product = new productModel({
    productName: productName,
    price: price,
    description: description,
    stock: stock,
  });

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
