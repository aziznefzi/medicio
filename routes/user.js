import express from "express";
import User from "../models/UserSchrema.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password, role = "user" } = req.body || {};

  if (!req.body) {
    return res.status(400).json({ message: "Request body is missing or invalid JSON" });
  }

  // Validate user input
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: "User already exists" });
  
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role
  });

  // Create token
  const token = jwt.sign({ email, id: newUser._id, role: newUser.role }, process.env.SECRET_KEY, {
    expiresIn: "1w",
  });

  return res.status(201).json({
    message: "User registered successfully",
    token,
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    },
  });
});

router.post("/signin", async (req, res) => {
  const {email, password} = req.body;

    // Validate user input
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

   // Email Verification 
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User does not exist" });

    // Password Verification
  const match = await bcrypt.compare(password, user.password);
  if(!match) return res.status(400).json({ message: "password is not correct" });

    // apporter token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY, {
      expiresIn: "1w",
    });

    return res.status(200).json({
    message: "Login successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    },
  });
})

  
  

export default router;