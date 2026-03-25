export default function validateInputs(req, res, next) {
  const { userName, password, age, email } = req.body; // Get the user data from request body

  const emptyInput = []; // Created an empty array to store empty inputs

  // Validating for username and if not found pushing the value to emptyInput array.
  if (!userName) {
    emptyInput.push("userName");
  }

  // Validating for password and if not found pushing the value to emptyInput array.
  if (!password) {
    emptyInput.push("password");
  }

  // Validating for age and if not found pushing the value to emptyInput array.
  if (!age) {
    emptyInput.push("age");
  }

  // Validating for email and if not found pushing the value to emptyInput array.
  if (!email?.trim()) {
    emptyInput.push("email");
  }

  // Checks if emptyinput array has values in it
  if (emptyInput.length > 0) {
    return res.status(404).json({
      message: `Required fields are missing :${emptyInput.join(",")}`,
    });
  }

  next();
}
