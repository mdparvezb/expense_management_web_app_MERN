const mongoose = require("mongoose");

// Schema design

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email id required and should be unique"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      unique: true
    },
  },
  { timestamps: true }
);

// Creating model
const userModel = mongoose.model("users", userSchema);

// Model export
module.exports = userModel;
