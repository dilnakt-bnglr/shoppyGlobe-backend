import mongoose from "mongoose";

// Schema for user registration
const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  email: {
    type: String,
    required: [true, "Email address is required"],
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
});

//  User model - Maps to the users collection in MongoDB
const userModel = mongoose.model("users", userSchema);
export default userModel;
