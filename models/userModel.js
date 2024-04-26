const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: "String",
      required: [true, "please add userName"],
      unique: "true",
    },
    email: {
      type: "string",
      required: [true, "please add users email"],
      unique: "true",
    },
    password: {
      type: "String",
      required: [true, "please add password"],
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
