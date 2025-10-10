import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from "cors"
import UserRoutes from "./Routes/User.js"
import cookieParser from "cookie-parser"
dotenv.config();

const app=express();

app.use(cors({
    origin: "http://localhost:5173",  // Allow only your frontend origin
    methods: "GET,POST,PUT,DELETE",   // Allowed HTTP methods
    credentials: true                 // Allow cookies and authorization headers
  }));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended:true}))
app.use(cookieParser()); // ✅ add this line!
mongoose.connect((process.env.Mongo_URI))
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
})
app.get("/",(req,res)=>{
    res.send("Hello World")
})
app.use("/api/user",UserRoutes);
app.listen(5000, () => {
    console.log("Server is running on port 5000");
})