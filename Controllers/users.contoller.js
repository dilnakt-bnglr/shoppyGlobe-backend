import userModel from "../Models/users.model.js";
import jwt from "jsonwebtoken";

// Creating user in the users collection
export function createUser(req, res) {
  const { userName, password, age, email } = req.body; // Get the user data from request body

  // Creating  user
  const user = new userModel({
    userName: userName,
    password: password,
    age: age,
    email: email,
  });

  // Svaing the user to db and returning the user and handling the error
  user
    .save()
    .then((data) => {
      if (!data) {
        return res.status(400).json({ message: "Cannot add a user" });
      }
      res.status(201).send(user);
    })
    .catch((error) => res.send(error));
}

// User login and jwt key generation
export async function userLogin(req, res) {
  try {
    const { userName, password } = req.body; // Get the userName and password from request body

    // Find the user in the database by userName
    const user = await userModel.findOne({ userName });
    // Error handling if user not found
    if (!user) {
      return res
        .status(401)
        .json({ message: "Authentication failed. Invalid user or password." });
    }

    // Find the user in the database by password
    const isPasswordValid = await userModel.findOne({ password });

    // Error handling if user not found
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Authentication failed. Invalid user or password." });
    }

    // Generate the JWT token
    const token = jwt.sign(
      { userId: user._id, userNmae: userName, password: password },
      "hiddenekeyforlogin",
      { expiresIn: "1h" },
    );

    // Send the token in the response
    res.status(200).json({ token: token, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" || error.message });
  }
}
