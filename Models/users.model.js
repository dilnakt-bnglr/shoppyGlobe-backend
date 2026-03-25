import mongoose from "mongoose";

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

const userModel = mongoose.model("users", userSchema);
export default userModel;
