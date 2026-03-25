import express from "express";
import dbConnect from "./dbConnection.js";
import { userRoutes } from "./Routes/users.route.js";
import { productRoutes } from "./Routes/products.route.js";

// Creating an express server
const app = new express();

app.use(express.json());

dbConnect(); // Establishing the db connection

// Allocation port 3000 to the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

userRoutes(app);
productRoutes(app);
