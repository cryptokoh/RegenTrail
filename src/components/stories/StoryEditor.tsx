import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { useStoryStore } from '../../store/storyStore';
import { useGameStore } from '../../store/gameStore';
import { PenTool, Bold, Italic, Link as LinkIcon } from 'lucide-react';

export const StoryEditor: React.FC = () => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const { addStory } = useStoryStore();
  const { walletAddress } = useGameStore();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: '',
  });

  const handleSubmit = () => {
    if (!editor || !title.trim()) return;

    addStory({
      title,
      content: editor.getHTML(),
      authorId: walletAddress,
      tags,
    });

    // Reset form
    setTitle('');
    editor.commands.setContent('');
    setTags([]);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  return (
    <div className="space-y-6 bg-black/20 rounded-xl p-6 border border-emerald-500/20">
      <div className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Your tale's title..."
          className="w-full px-4 py-2 bg-black/20 rounded-lg border border-emerald-500/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
        />

        <div className="flex gap-2 flex-wrap">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm"
            >
              #{tag}
            </span>
          ))}
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
            placeholder="Add tags..."
            className="px-3 py-1 bg-black/20 rounded-full border border-emerald-500/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          />
        </div>

        <div className="border-b border-emerald-500/20 pb-2 mb-4">
          <div className="flex gap-2">
            <button
              onClick={() => editor?.chain().focus().toggleBold().run()}
              className={`p-2 rounded hover:bg-emerald-500/10 ${
                editor?.isActive('bold') ? 'text-emerald-400' : 'text-gray-400'
              }`}
            >
              <Bold size={18} />
            </button>
            <button
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              className={`p-2 rounded hover:bg-emerald-500/10 ${
                editor?.isActive('italic') ? 'text-emerald-400' : 'text-gray-400'
              }`}
            >
              <Italic size={18} />
            </button>
            <button
              onClick={() => {
                const url = window.prompt('Enter URL');
                if (url) {
                  editor?.chain().focus().setLink({ href: url }).run();
                }
              }}
              className={`p-2 rounded hover:bg-emerald-500/10 ${
                editor?.isActive('link') ? 'text-emerald-400' : 'text-gray-400'
              }`}
            >
              <LinkIcon size={18} />
            </button>
          </div>
        </div>

        <EditorContent
          editor={editor}
          className="prose prose-invert prose-emerald max-w-none min-h-[200px]"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!title.trim() || !editor?.getText().trim()}
        className="action-button w-full py-3 text-emerald-400 font-medium disabled:opacity-50"
      >
        <span className="flex items-center justify-center gap-2">
          <PenTool size={18} />
          Share Your Tale
        </span>
      </button>
    </div>
  );
};