import User from "../models/user.js";
import jwt from "jsonwebtoken";


const generateToken = (user) => {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "30d" }
  );
};

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    
    const userExists = await User.findOne({ email });
    if (userExists) {
      
      return res.status(400).json({ message: "User already exists" });
    }
    
    const user = await User.create({
      name,
      email,
      password,
      role
      
    });
    
   res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    
    });
  } catch (error) {
    console.log("somthing wrong")
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      console.log("Invalid email or password");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log("Login success");

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user)
    });
  } catch (error) {
    console.error("Error occurred:", error.message);
    res.status(400).json({ message: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
