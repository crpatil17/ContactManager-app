const asyncHandler = require("express-async-handler"); //it handles exception and error from async function
const Contact = require("../models/contactModel");

const getAllContacts = asyncHandler(async (req, res) => {
  //get all contacts
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

const getContacts = asyncHandler(async (req, res) => {
  // getting single contacts
  const contacts = await Contact.findById(req.params.id);
  if (!contacts) {
    res.status(404);
    throw new error("Contact Not Found");
  }
  if (contacts.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new error("user dont have permission to update other user contacts");
  }

  res.json(contacts);
});

const createContacts = asyncHandler(async (req, res) => {
  //creating new contacts
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new error("All Field Are Mandatory");
  }
  const contacts = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contacts);
});

const updateContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!contacts) {
    res.status(404);
    throw new error("Contact Not Found");
  }
  res.json(contacts);
});

const deleteContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.findById(req.params.id).deleteOne(contacts);
  if (!contacts) {
    res.status(404);
    throw new error("Contact Not Found");
  }

  res.json(contacts);
});

module.exports = {
  getAllContacts,
  createContacts,
  updateContacts,
  deleteContacts,
  getContacts,
};
