import express from "express";
import { createNote, deleteNote, getNoteById, getNotes, togglePin, updateNote } from "../Controllers/Notes.js";

const router = express.Router();

router.post("/create-note",createNote);
router.get("/get-notes/:userId",getNotes);
router.get("/get-note/:noteId",getNoteById);
router.delete("/delete-note/:noteId",deleteNote);
router.put("/toggle-pin/:noteId",togglePin);
router.post("/update-note/:noteId",updateNote);
export default router;