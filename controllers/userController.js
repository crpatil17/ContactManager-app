const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    res.json({ mesage: "all fields are mandatory" });
  }
  const availableUser = await User.findOne({ email });
  if (availableUser) {
    res.status(400);
    res.json({ mesage: "user already exist" });
  }
  // create hash password
  //sample example
  //const bcrypt = require('bcrypt');
  // const saltRounds = 10;
  // const myPlaintextPassword = 's0/\/\P4$$w0rD';
  // bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
  // Store hash in your password DB.
  // }
  const hashedPassword = await bcrypt.hash(password, 10);
  // console.log("hashed password:" + hashedPassword);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  console.log("user:" + user);
  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
    });
  } else {
    res.status(400);
    res.json({ mesage: "unable to create user" });
  }
  res.json({ message: "register new user" });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("all fields are required");
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          //payload
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET, //SECRET
      { expiresIn: "10m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(400);
    throw new Error("invalid email or password");
  }
});

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
