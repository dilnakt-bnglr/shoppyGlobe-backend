import productModel from "../Models/products.model.js";

// Creating product in the products collection
export function createProduct(req, res) {
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

// Fetching all products
export function getAllProducts(req, res) {
  productModel
    .find()
    .then((data) => {
      if (!data) {
        return res.status(400).json({ message: "Something went wrong" });
      }
      res.status(200).send(data);
    })
    .catch((error) =>
      res
        .status(500)
        .json({ message: "Internal server error" || error.message }),
    );
}

// Fetching product by its id
export async function getProductById(req, res) {
  const productId = req.params.id; // // Get the product id from request params

  try {
    const product = await productModel.findById(productId);
    if (product) {
      res.status(200).send(product);
    } else {
      res
        .status(400)
        .json({ message: `Product with id:${productId} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" || error.message });
  }
}
