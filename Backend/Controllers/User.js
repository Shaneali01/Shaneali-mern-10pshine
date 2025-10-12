import express from "express";
import bcrypt from "bcryptjs";
import User from "../Model/User.js";
import multer from "multer";
import cloudinary from "../Config/Cloudinary.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

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

        },
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
const GetUser=async(req,res)=>{
  try{
    console.log(req.params.id)
    const user=await User.findById(req.params.id);
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        profession: user.profession,
        image: user.image,
        joinedAt:user.createdAt,
      },
    });

  }
  catch(error){
    res.status(500).json({ message: error.message });
  }
}
const updateUser = async (req, res) => {
  try {
    const { name, email, phone, address, profession, image } = req.body;
    
    // Validate email format if provided
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    
    // Check if email is already in use by another user
    if (email) {
      const existingUser = await User.findOne({ 
        email, 
        _id: { $ne: req.params.id } 
      });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }
    }
    
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, address, profession, image },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      success: true,
      message: "User updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.address,
        profession: updatedUser.profession,
        image: updatedUser.image,
        joinedAt: updatedUser.createdAt,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const GetHeaderInfo=async(req,res)=>{
  try{
    const user=await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user: {
        name: user.name,
        email: user.email,
        image: user.image,
      },
    });

  }
  catch(error){
    res.status(500).json({ message: error.message });
  }
}
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate reset token (expires in 1 hour)
    const token = jwt.sign(
      { id: user._id },
      'secret_key',
      { expiresIn: '15m' }
    );

    // Store token in user (or use a separate collection for resets; here we add to user temporarily)

    // Email transporter (using Gmail; adjust for your service)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetUrl = `http://localhost:5173/reset-password/${token}`; // Adjust for production domain
    const mailOptions = {
      to: email,
      subject: 'Password Reset - NoteFlow',
      html: `
        <h2>Password Reset Request</h2>
        <p>You requested a password reset. Click the link below to set a new password:</p>
        <a href="${resetUrl}" style="background: #6366f1; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <p>This link expires in 1 hour. If you didn't request this, ignore this email.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Server error occurred' });
  }
};
const resetPassword =  async (req, res) => {
  console.log("reset password")
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Verify token
    const decoded = jwt.verify(token, 'secret_key');
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'Invalid token' });
    }

    // Check if token is expired (via stored expiration)


    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Update password and clear reset fields
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(400).json({ message: 'Invalid token' });
    }
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Server error occurred' });
  }
};
export { register, upload, login,CheckLoginUser,logout,GetUser,updateUser,GetHeaderInfo,forgotPassword,resetPassword };