import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    image: {
      type: String,
      default:
        "https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png",
    },
    phone: { type: String },
    address: { type: String },
    profession: {
      type: String,
      default: "",
      trim: true,
      maxlength: 100, // optional limit
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
