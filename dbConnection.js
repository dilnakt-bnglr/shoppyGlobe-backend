import mongoose from "mongoose";

// Connecting to mongoDB using mongoose
export default function dbConnect() {
  mongoose.connect("mongodb://localhost:27017/shoppyGlobe");
  const db = mongoose.connection;

  db.on("open", () => {
    console.log("Connected to DB successfully");
  });

  db.on("error", (err) => {
    console.error("Connection unsuccessful");
  });

  db.on("disconnected", () => {
    console.log("Mongoose disconnected from MongoDB");
  });
}
