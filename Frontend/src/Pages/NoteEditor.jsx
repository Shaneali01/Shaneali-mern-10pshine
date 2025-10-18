import "../Components/NoteEditor/NoteEditor.css";
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Check } from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import SideBar from "../Components/NoteEditor/SideBar";
import Header from "../Components/NoteEditor/Header";
import MobileMenu from "../Components/NoteEditor/MobileMenu";
import EditorArea from "../Components/NoteEditor/EditorArea";
import { axiosInstance } from "../Lib/axios"; // Assuming this is your axios setup
import Swal from 'sweetalert2';
import BarLoader from 'react-spinners/BarLoader';

const NoteEditor = () => {
  const { noteId } = useParams(); // Get noteId from route params (e.g., /editor/:noteId)
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [originalTitle, setOriginalTitle] = useState(""); // Track original title for comparison
  const [category, setCategory] = useState("work");
  const [originalCategory, setOriginalCategory] = useState("work"); // Track original category
  const [tags, setTags] = useState([]);
  const [originalTags, setOriginalTags] = useState([]); // Track original tags
  const [tagInput, setTagInput] = useState("");
  const [isPinned, setIsPinned] = useState(false);
  const [originalIsPinned, setOriginalIsPinned] = useState(false); // Track original pin
  const [isSaving, setIsSaving] = useState(false);
  const [editorState, setEditorState] = useState({});
  const [showSidebar, setShowSidebar] = useState(false);
  const [loading, setLoading] = useState(false); // New: Loading state for fetching note
  const [originalContent, setOriginalContent] = useState(""); // Track original editor content
  const menuRef = useRef(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-indigo-600 hover:underline cursor-pointer",
        },
      }),
      Placeholder.configure({
        placeholder:
          "Start writing your note... You can use formatting tools above!",
      }),
    ],
    content: "", // Start empty
    editorProps: {
      attributes: {
        class:
          "prose prose-lg prose-slate max-w-none focus:outline-none min-h-[400px] text-gray-700",
      },
    },
    onUpdate: ({ editor }) => {
      setEditorState({
        bold: editor.isActive("bold"),
        italic: editor.isActive("italic"),
        h1: editor.isActive("heading", { level: 1 }),
        h2: editor.isActive("heading", { level: 2 }),
        bulletList: editor.isActive("bulletList"),
        orderedList: editor.isActive("orderedList"),
        codeBlock: editor.isActive("codeBlock"),
        link: editor.isActive("link"),
      });
    },
    onSelectionUpdate: ({ editor }) => {
      setEditorState({
        bold: editor.isActive("bold"),
        italic: editor.isActive("italic"),
        h1: editor.isActive("heading", { level: 1 }),
        h2: editor.isActive("heading", { level: 2 }),
        bulletList: editor.isActive("bulletList"),
        orderedList: editor.isActive("orderedList"),
        codeBlock: editor.isActive("codeBlock"),
        link: editor.isActive("link"),
      });
    },
  });

  const getCategoryColor = (cat) => {
    const colors = {
      work: "from-blue-500 to-blue-600",
      personal: "from-emerald-500 to-emerald-600",
      learning: "from-purple-500 to-purple-600",
    };
    return colors[cat] || "from-gray-500 to-gray-600";
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleTagKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // Helper: Check if there are unsaved changes
  const hasUnsavedChanges = () => {
    // For new notes: prompt if any content exists
    if (!noteId) {
      return title.trim() !== "" || editor?.getText().trim() !== "";
    } else {
      // For editing: compare current vs original
      const tagsChanged = JSON.stringify(tags.sort()) !== JSON.stringify(originalTags.sort());
      return (
        title !== originalTitle ||
        editor?.getHTML() !== originalContent ||
        tagsChanged ||
        category !== originalCategory ||
        isPinned !== originalIsPinned
      );
    }
  };

  // New: Fetch and load existing note if editing
  useEffect(() => {
    if (noteId && editor) {
      const fetchNote = async () => {
        setLoading(true);
        try {
          const response = await axiosInstance.get(`/note/get-note/${noteId}`);
          const note = response.data.note;
          if (note) {
            // Load data into state
            setTitle(note.title || "");
            setOriginalTitle(note.title || "");
            setCategory(note.category || "work");
            setOriginalCategory(note.category || "work");
            setTags(note.tags || []);
            setOriginalTags(note.tags || []);
            setIsPinned(note.isPinned || false);
            setOriginalIsPinned(note.isPinned || false);
            // Load HTML content into editor
            const content = note.content || "";
            editor.commands.setContent(content);
            setOriginalContent(content);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Note Not Found',
              text: 'The note could not be loaded.',
            });
            navigate('/dashboard'); // Redirect to dashboard if not found
          }
        } catch (error) {
          console.error("Error fetching note:", error);
          Swal.fire({
            icon: 'error',
            title: 'Load Failed',
            text: error.response?.data?.message || 'Failed to load note.',
          });
          navigate('/dashboard'); // Redirect on error
        } finally {
          setLoading(false);
        }
      };

      fetchNote();
    }
  }, [noteId, editor, navigate]);

  const handleSave = async () => {
    if (!editor) return;

    setIsSaving(true);

    const userId = localStorage.getItem('userId');
    if (!userId) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'User not found. Please log in.',
      });
      setIsSaving(false);
      return;
    }

    const noteData = {
      userId: JSON.parse(userId), // Assuming userId is stringified
      title,
      content: editor.getHTML(),
      plainText: editor.getText(),
      category,
      tags,
      isPinned,
      updatedAt: new Date().toISOString(),
    };

    try {
      let endpoint = '/note/create-note';
      console.log("this console is working perfectly")
      if (noteId) {
        endpoint = `/note/update-note/${noteId}`; // Use PUT/PATCH for update
        noteData.updatedAt = new Date().toISOString();
      }
      const response = await axiosInstance.post(endpoint, noteData); // Adjust to PUT if backend uses it
      console.log("Note saved successfully:", noteData);
      Swal.fire({
        icon: 'success',
        title: 'Saved!',
        text: noteId ? 'Note updated successfully.' : 'Note saved successfully.',
        timer: 1500,
        showConfirmButton: false,
      });
      
      // After save, update originals to match current state (no more unsaved changes)
      setOriginalTitle(title);
      setOriginalContent(editor.getHTML());
      setOriginalCategory(category);
      setOriginalTags([...tags]);
      setOriginalIsPinned(isPinned);
      
      // If new note, optionally navigate back or get the new ID
      if (!noteId) {
        // Example: Navigate to edit view with new ID
        // navigate(`/editor/${response.data.note.id}`);
      }
    } catch (error) {
      console.error("Error saving note:", error);
      Swal.fire({
        icon: 'error',
        title: 'Save Failed',
        text: error.response?.data?.message || 'Something went wrong.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleBack = async () => {
    const hasUnsaved = hasUnsavedChanges();
    if (hasUnsaved) {
      const result = await Swal.fire({
        title: 'Unsaved Changes',
        text: "You have unsaved changes. Are you sure you want to leave?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Leave anyway',
        cancelButtonText: 'Stay here'
      });
      if (result.isConfirmed) {
        navigate('/dashboard'); // Use navigate for proper routing
      }
    } else {
      navigate('/dashboard');
    }
  };

  const handleDelete = async () => {
    if (!noteId) return; // Only delete if editing existing note

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/note/delete-note/${noteId}`);
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Note deleted successfully.',
          timer: 1500,
          showConfirmButton: false,
        });
        navigate('/dashboard');
      } catch (error) {
        console.error("Error deleting note:", error);
        Swal.fire({
          icon: 'error',
          title: 'Delete Failed',
          text: error.response?.data?.message || 'Something went wrong.',
        });
      }
    }
  };

  const setLink = () => {
    if (!editor) return;

    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL:", previousUrl);

    if (url === null) return;

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };
  const getWordCount = () => {
    if (!editor) return 0;
    const text = editor.getText();
    return text.split(/\s+/).filter((word) => word.length > 0).length;
  };

  const getCharCount = () => {
    if (!editor) return 0;
    return editor.getText().length;
  };

  const getButtonClass = (isActive) => {
    return `p-1.5 sm:p-2 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md"
        : "hover:bg-gray-100"
    }`;
  };
  const getIconClass = (isActive) => {
    return `w-4 h-4 ${isActive ? "text-white" : "text-gray-600"}`;
  };
  useEffect(() => {
    if (editor) {
      const hasContent = title || editor.getText().length > 0;
      if (hasContent) {
        const autoSaveTimer = setTimeout(() => {
          console.log("Auto-saving draft...");
        }, 3000);

        return () => clearTimeout(autoSaveTimer);
      }
    }
  }, [title, editor?.state.doc]);

  if (!editor || loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <BarLoader color="#6366f1" height={4} width={200} />
      </div>
    ); // Linear bar spinner for loading
  }
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      <MobileMenu
        showSidebar={showSidebar}
        isPinned={isPinned}
        setIsPinned={setIsPinned}
        category={category}
        setCategory={setCategory}
        getCategoryColor={getCategoryColor}
        tags={tags}
        tagInput={tagInput}
        setTagInput={setTagInput}
        handleTagKeyPress={handleTagKeyPress}
        getWordCount={getWordCount}
        handleAddTag={handleAddTag}
        getCharCount={getCharCount}
        removeTag={removeTag}
        setShowSidebar={setShowSidebar}
      />

      {/* Header */}
      <Header
        handleBack={handleBack}
        setShowSidebar={setShowSidebar}
        title={title}
        handleSave={handleSave}
        isSaving={isSaving}
        editor={editor}
        menuRef={menuRef}
        handleDelete={handleDelete}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full flex">
          {/* Sidebar */}
          <aside className="hidden lg:flex lg:w-72 lg:flex-col bg-white border-r border-gray-200 overflow-y-auto flex-shrink-0">
            <SideBar
              isPinned={isPinned}
              setIsPinned={setIsPinned}
              category={category}
              setCategory={setCategory}
              getCategoryColor={getCategoryColor}
              tags={tags}
              tagInput={tagInput}
              setTagInput={setTagInput}
              handleTagKeyPress={handleTagKeyPress}
              getWordCount={getWordCount}
              handleAddTag={handleAddTag}
              getCharCount={getCharCount}
              removeTag={removeTag}
            />
          </aside>

          {/* Editor Area */}
          <EditorArea
            editor={editor}
            editorState={editorState}
            getButtonClass={getButtonClass}
            getIconClass={getIconClass}
            setLink={setLink}
            title={title}
            setTitle={setTitle}
          />
        </div>
      </main>
    </div>
  );
};

export default NoteEditor;