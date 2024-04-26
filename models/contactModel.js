const mongoose = require("mongoose"); //provides schema and models

const contactSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: "string",
      required: [true, "please enter a name"],
    },
    email: {
      type: "string",
      required: [true, "please add a valid email address"],
      unique: true,
    },
    phone: {
      type: "number",
      required: [true, "please add a valid phone number"],
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
