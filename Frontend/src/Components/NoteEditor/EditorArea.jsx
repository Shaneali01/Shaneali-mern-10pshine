import { EditorContent } from '@tiptap/react'
import { Bold, Code, Heading1, Heading2, Italic, Link2, List, ListOrdered } from 'lucide-react'
import React from 'react'

const EditorArea = ({editor,editorState,getButtonClass,getIconClass,setLink,title,setTitle}) => {
  return (
    <div className="flex-1 overflow-y-auto">
            <div className="max-w-none lg:max-w-4xl mx-auto px-4 sm:px-8 py-4 sm:py-8">
              {/* Formatting Toolbar */}
              <div className="mb-6 p-2 sm:p-3 bg-white border border-gray-200 rounded-lg inline-flex gap-1 shadow-sm">
                <button
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={getButtonClass(editorState.bold)}
                  title="Bold"
                >
                  <Bold className={getIconClass(editorState.bold)} />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={getButtonClass(editorState.italic)}
                  title="Italic"
                >
                  <Italic className={getIconClass(editorState.italic)} />
                </button>
                <div className="w-px bg-gray-200 mx-1" />
                <button
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                  }
                  className={getButtonClass(editorState.h1)}
                  title="Heading 1"
                >
                  <Heading1 className={getIconClass(editorState.h1)} />
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                  className={getButtonClass(editorState.h2)}
                  title="Heading 2"
                >
                  <Heading2 className={getIconClass(editorState.h2)} />
                </button>
                <div className="w-px bg-gray-200 mx-1" />
                <button
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                  className={getButtonClass(editorState.bulletList)}
                  title="Bullet List"
                >
                  <List className={getIconClass(editorState.bulletList)} />
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                  className={getButtonClass(editorState.orderedList)}
                  title="Numbered List"
                >
                  <ListOrdered
                    className={getIconClass(editorState.orderedList)}
                  />
                </button>
                <div className="w-px bg-gray-200 mx-1" />
                <button
                  onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                  className={getButtonClass(editorState.codeBlock)}
                  title="Code Block"
                >
                  <Code className={getIconClass(editorState.codeBlock)} />
                </button>
                <button
                  onClick={setLink}
                  className={getButtonClass(editorState.link)}
                  title="Link"
                >
                  <Link2 className={getIconClass(editorState.link)} />
                </button>
              </div>

              {/* Title Input */}
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Untitled"
                className="w-full text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 placeholder-gray-300 bg-transparent border-none focus:outline-none mb-8"
              />

              {/* Editor */}
              <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-8 shadow-sm min-h-[500px]">
                <EditorContent editor={editor} />
              </div>

              {/* Bottom Padding */}
              <div className="h-24" />
            </div>
          </div>
  )
}

export default EditorArea
