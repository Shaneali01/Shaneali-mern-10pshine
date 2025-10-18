
import Note from "../Model/Notes.js";
import User from "../Model/User.js";



const createNote = async (req, res) => {
    try {
      const { userId, title, content, plainText, category, tags, isPinned } = req.body;
  
      // Basic validations
      if (!userId || !title || !content) {
        return res.status(400).json({ message: "User ID, title, and content are required" });
      }
  
      // Check if user exists (optional, assuming you have User model)
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Create and save note
      const newNote = new Note({
        userId,
        title,
        content,
        plainText,
        category,
        tags,
        isPinned: isPinned || false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const savedNote = await newNote.save();
  
      // Optionally add to user's notes array
      // await User.findByIdAndUpdate(userId, { $push: { notes: savedNote._id } });
  
      res.status(201).json({
        success: true,
        message: "Note created successfully",
        note: {
          id: savedNote._id,
          title: savedNote.title,
          content: savedNote.content,
          plainText: savedNote.plainText,
          category: savedNote.category,
          tags: savedNote.tags,
          isPinned: savedNote.isPinned,
          createdAt: savedNote.createdAt,
          updatedAt: savedNote.updatedAt,
        },
      });
    } catch (error) {
      console.error("Create note error:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  
  // Example: Get notes for a user
  const getNotes = async (req, res) => {
    try {
      const { userId } = req.params;
      console.log("this is user id", userId)
      const notes = await Note.find({ userId }).sort({ updatedAt: -1 });
      console.log(notes)
      res.status(200).json({
        success: true,
        notes,
      });
    } catch (error) {
      console.error("Get notes error:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  const getNoteById = async (req, res) => {
    try {
      const { noteId } = req.params;
      const note = await Note.findById(noteId).populate('userId'); // Optional populate
      if (!note) return res.status(404).json({ message: 'Note not found' });
      res.status(200).json({ success: true, note });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  const deleteNote=async(req,res)=>{
    try{
      const {noteId}=req.params;
      const note=await Note.findOneAndDelete({_id:noteId});
      if(!note){
        return res.status(404).json({message:"Note not found"});
      }
      res.status(200).json({message:"Note deleted successfully"});

    }
    catch(error){
      res.status(500).json({message:"Server error"});

    }
  }
  const togglePin = async (req, res) => {
    try {
      const { noteId } = req.params;
      const note = await Note.findById(noteId);
      if (!note) return res.status(404).json({ message: 'Note not found' });
      note.isPinned = !note.isPinned;
      await note.save();
      res.status(200).json({ success: true, note });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  const updateNote = async (req, res) => {
    try {
      const { noteId } = req.params;
      const { title, content, plainText, category, tags, isPinned, updatedAt } = req.body;
  
      // Basic validations
      if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required" });
      }
  
      // Find and update note
      const updatedNote = await Note.findByIdAndUpdate(
        noteId,
        {
          title,
          content,
          plainText,
          category: category || 'work',
          tags: tags || [],
          isPinned: isPinned || false,
          updatedAt: updatedAt || new Date(),
        },
        { new: true, runValidators: true } // Return updated doc, run validators
      );
  
      if (!updatedNote) {
        return res.status(404).json({ message: "Note not found" });
      }
  
      res.status(200).json({
        success: true,
        message: "Note updated successfully",
        note: updatedNote,
      });
    } catch (error) {
      console.error("Update note error:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  export { createNote, getNotes, getNoteById, deleteNote,togglePin,updateNote };