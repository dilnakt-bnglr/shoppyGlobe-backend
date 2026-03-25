import userModel from "../Models/users.model.js";

export default function createUser(req, res) {
  const { userName, password, age, email } = req.body;

  const user = new userModel({
    userName: userName,
    password: password,
    age: age,
    email: email,
  });

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
