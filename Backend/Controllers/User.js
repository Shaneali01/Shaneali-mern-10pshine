import express from "express";
import bcrypt from "bcryptjs";
import User from "../Model/User.js";
import multer from "multer";
import cloudinary from "../Config/Cloudinary.js";
import jwt from "jsonwebtoken";

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

// Helper: Promise-wrapped Cloudinary upload
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { resource_type: "image", folder: "user_profiles" },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    ).end(buffer);
  });
};

const register = async (req, res) => {
  try {
    const { name, email, password, phone, address, profession } = req.body;

    // Basic validations
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Handle image upload if present
    let imageUrl = null;
    if (req.file) {
      try {
        imageUrl = await uploadToCloudinary(req.file.buffer);
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return res.status(500).json({ message: "Image upload failed; user registered without image" });
      }
    }

    // Create and save user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      profession,
      image: imageUrl,
    });
    const savedUser = await newUser.save();

    // Response (exclude sensitive fields)
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        phone: savedUser.phone,
        address: savedUser.address,
        profession: savedUser.profession,
        image: savedUser.image,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
const login = async(req,res)=>{
    try{
        const {email,password} = req.body;

    // Basic validations
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }
      const user = await User.findOne({email});
      if(!user){
        return res.status(400).json({ message: "User not found" });
      }
      const isMatch = await bcrypt.compare(password,user.password);
      if(!isMatch){
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const token = jwt.sign({ id: user._id }, "secret_key");
      res.cookie("token", token, {
        httpOnly: true,       // not accessible via JS
        secure: true,         // only over HTTPS
        sameSite: "lax",      // protects from CSRF a bit
        maxAge: 7 * 24 * 60 * 60 * 1000 // 15 minutes
      });
      res.status(200).json({
        success: true,
        message: "User logged in successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          profession: user.profession,
          image: user.image,
        },
        token:token
      });

    }
    catch(error){
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "Server error during login" });
    }
   
}
const CheckLoginUser=async(req,res)=>{
    console.log("working")
    const token = req.cookies.token; // or from headers if using localStorage
    console.log(token)
  if (!token) return res.json({ loggedIn: false });

  try {
    const decoded = jwt.verify(token, "secret_key");
    return res.json({ loggedIn: true, user: decoded });
  } catch {
    return res.json({ loggedIn: false });
  }
}

const logout=async(req,res)=>{
    try{
        res.clearCookie("token");
        res.status(200).json({ message: "User logged out successfully" });

    }
    catch(error){
        console.error("Logout error:", error);
        res.status(500).json({ success: false, message: "Server error during logout" });

    }
}

export { register, upload, login,CheckLoginUser,logout };