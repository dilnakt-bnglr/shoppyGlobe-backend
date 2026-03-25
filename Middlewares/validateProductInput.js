// Middleware for validation of product inputs
export default function validateInputs(req, res, next) {
  const { productName, price, description, stock } = req.body; // Get the product data from request body

  const emptyInput = []; // Created an empty array to store empty inputs

  // Validating for productName and if not found pushing the value to emptyInput array.
  if (!productName) {
    emptyInput.push("productName");
  }

  // Validating for price and if not found pushing the value to emptyInput array.
  if (!price) {
    emptyInput.push("price");
  }

  // Validating for description and if not found pushing the value to emptyInput array.
  if (!description) {
    emptyInput.push("description");
  }

  // Validating for stock and if not found pushing the value to emptyInput array.
  if (!stock) {
    emptyInput.push("stock");
  }

  // Checks if emptyinput array has values in it
  if (emptyInput.length > 0) {
    return res.status(404).json({
      message: `Required fields are missing :${emptyInput.join(",")}`,
    });
  }

  next();
}
