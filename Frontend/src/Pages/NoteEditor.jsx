import "../Components/NoteEditor/NoteEditor.css";
import React, { useState, useEffect, useRef } from "react";
import { Check } from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import SideBar from "../Components/NoteEditor/SideBar";
import Header from "../Components/NoteEditor/Header";
import MobileMenu from "../Components/NoteEditor/MobileMenu";
import EditorArea from "../Components/NoteEditor/EditorArea";

const NoteEditor = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("work");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [isPinned, setIsPinned] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [editorState, setEditorState] = useState({});
  const [showSidebar, setShowSidebar] = useState(false);
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
    content: "",
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

  const handleSave = async () => {
    if (!editor) return;

    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const noteData = {
      title,
      content: editor.getHTML(),
      plainText: editor.getText(),
      category,
      tags,
      isPinned,
      updatedAt: new Date().toISOString(),
    };

    console.log("Saving note:", noteData);
    setIsSaving(false);
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  const handleBack = () => {
    const hasContent = title || (editor && editor.getText().length > 0);
    if (hasContent) {
      const confirmLeave = window.confirm(
        "You have unsaved changes. Are you sure you want to leave?"
      );
      if (confirmLeave) {
        console.log("Navigate back to dashboard");
        alert("Navigate back to dashboard - implement your routing logic here");
      }
    } else {
      console.log("Navigate back to dashboard");
      alert("Navigate back to dashboard - implement your routing logic here");
    }
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (confirmDelete) {
      console.log("Delete note");
      alert("Delete note - implement your delete logic here");
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

  if (!editor) {
    return null;
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

      {/* Success Toast */}
      {showSaveSuccess && (
        <div className="fixed top-20 right-4 sm:right-6 bg-white border border-gray-200 text-gray-900 px-4 py-3 rounded-lg shadow-lg z-50 animate-slide-in">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
              <Check className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-medium">Saved successfully</span>
          </div>
        </div>
      )}

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
