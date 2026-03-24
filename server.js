import express from "express";
import dbConnect from "./dbConnection.js";

// Creating an express server
const app = new express();

dbConnect(); // Establishing the db connection

// Allocation port 3000 to the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
