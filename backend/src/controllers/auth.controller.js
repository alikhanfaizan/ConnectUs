import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const signup = async (req, res) => {
  // Logic for user signup
  const { email, fullName, password } = req.body;
  try {
    if (!email || !fullName || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long." });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists." });
    }
    //hash Passowrd
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      fullName,
      password: hashedPassword,
    });
    if (!newUser) {
      return res.status(500).json({ message: "Failed to create user." });
    } else {
      generateToken(newUser._id, res);
      await newUser.save();
      return res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
        profilePic: newUser.profilePic,
        message: "User created successfully.",
      });
    }
  } catch (error) {
    console.log("Error during signup:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials." });
    }
    const ispasswordCorrect = await bcrypt.compare(password, user.password);
    if (!ispasswordCorrect) {
      return res.status(400).json({ message: "Invalid Credentials." });
    }
    generateToken(user._id, res);
    return res.status(201).json({
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      profilePic: user.profilePic,
      message: "Login successfully.",
    });
  } catch (error) {
    console.log("Error during login:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const logout = (req, res) => {
  // Logic for user logout
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(201).json({ message: "Logout Succesful" });
    re;
  } catch (error) {
    console.log("Error during logout:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;
    if (!profilePic) {
      return res.status(400).json({ message: "Profile picture is required." });
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    // Example: update the user's profilePic
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    return res.status(200).json({
      _id: updatedUser._id,
      email: updatedUser.email,
      fullName: updatedUser.fullName,
      profilePic: updatedUser.profilePic,
      message: "Profile updated successfully.",
    });
  } catch (error) {
    console.log("Error during profile update:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
