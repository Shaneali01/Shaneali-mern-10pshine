import {
  ArrowLeft,
  Download,
  Menu,
  MoreVertical,
  Save,
  Share2,
  Sparkles,
  Trash2,
} from "lucide-react";
import React, { useEffect, useState } from "react";

const Header = ({
  handleBack,
  setShowSidebar,
  title,
  handleSave,
  isSaving,
  editor,
  menuRef,
  handleDelete,
}) => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMoreMenu(false);
      }
    };

    if (showMoreMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMoreMenu]);
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 z-40 flex-shrink-0">
      <div className="px-3 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-14">
          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
            <button
              className="lg:hidden p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setShowSidebar(true)}
              title="Open menu"
            >
              <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
            </button>
            <button
              onClick={handleBack}
              className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              title="Back to dashboard"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
            </button>
            <div className="hidden sm:block h-8 w-px bg-gray-200" />
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-md">
                <Sparkles className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white fill-white" />
                <span className="text-xs sm:text-sm font-bold text-white">
                  NoteFlow
                </span>
              </div>
              <div className="hidden sm:block h-4 w-px bg-gray-200" />
              <p className="text-xs sm:text-sm font-medium text-gray-900 truncate max-w-40 sm:max-w-xs lg:max-w-none">
                {title || "Untitled Note"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="relative">
              <button
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                title="More options"
              >
                <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
              </button>
              {showMoreMenu && (
                <div
                  ref={menuRef}
                  className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 origin-top-right transition-all duration-200"
                >
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </button>
                  <div className="border-t border-gray-200 my-1" />
                  <button
                    onClick={handleDelete}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={handleSave}
              disabled={isSaving || (!title && editor.getText().length === 0)}
              className="inline-flex items-center px-3 sm:px-4 py-1 sm:py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs sm:text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-1.5" />
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
