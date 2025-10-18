// Models/Note.js (Mongoose Schema)
import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  plainText: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["work", "personal", "learning"],
    default: "work",
  },
  tags: [{
    type: String,
    trim: true,
  }],
  isPinned: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: false, // Use custom createdAt/updatedAt
});

export default mongoose.model("Note", noteSchema);