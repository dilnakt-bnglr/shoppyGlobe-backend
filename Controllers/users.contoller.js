import userModel from "../Models/users.model.js";

// Creating user in the users table
export default function createUser(req, res) {
  const { userName, password, age, email } = req.body; // Get the user data from request body

  // Creating  user
  const user = new userModel({
    userName: userName,
    password: password,
    age: age,
    email: email,
  });

  // Svaing the user to db and returning the user
  user
    .save()
    .then((data) => {
      if (!data) {
        return res.status(400).json({ message: "Cannot add book" });
      }
      res.status(201).send(user);
    })
    .catch((error) => res.send(error));
}
