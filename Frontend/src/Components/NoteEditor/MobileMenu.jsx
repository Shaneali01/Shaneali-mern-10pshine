import React from "react";
import SideBar from "./SideBar";
import { X } from "lucide-react";

const MobileMenu = ({
  showSidebar,
  setShowSidebar,
  isPinned,
  setIsPinned,
  category,
  setCategory,
  getCategoryColor,
  tags,
  tagInput,
  setTagInput,
  handleTagKeyPress,
  getWordCount,
  handleAddTag,
  getCharCount,
  removeTag,
}) => {
  return (
    <div>
      {showSidebar && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            onClick={() => setShowSidebar(false)}
          />
          <div className="fixed left-0 top-0 h-full w-80 bg-white border-r border-gray-200 z-50 lg:hidden transform transition-transform duration-300 ease-in-out translate-x-0 shadow-2xl">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Note Settings
              </h3>
              <button
                onClick={() => setShowSidebar(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>
            <div className="overflow-y-auto h-full">
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
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MobileMenu;
