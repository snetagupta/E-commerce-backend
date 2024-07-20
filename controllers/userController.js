import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    // hash password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });
    if (user) {
      return res.status(201).json({ message: "User created successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const updateUser = async (req, res) => {
  try {
    const { name, address, phone,  } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.address = address || user.address;
    await user.save();
    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
