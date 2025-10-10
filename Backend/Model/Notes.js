import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // Reference to User
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String, // Will store HTML content from Tiptap or any editor
      required: true,
    },
    plainText: {
      type: String, // Optional: extracted plain text (if you want search or preview)
    },
    category: {
      type: String,
      default: "general",
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    isPinned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt
);

export default mongoose.model("Note", noteSchema);
