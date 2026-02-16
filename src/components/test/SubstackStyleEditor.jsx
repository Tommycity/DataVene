// src/components/SubstackStyleEditor.jsx
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import { createLowlight } from 'lowlight';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import html from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import typescript from 'highlight.js/lib/languages/typescript';
import json from 'highlight.js/lib/languages/json';
import bash from 'highlight.js/lib/languages/bash';
import sql from 'highlight.js/lib/languages/sql';
import 'highlight.js/styles/github-dark.css';

import { 
  FaBold, FaItalic, FaUnderline, FaStrikethrough, 
  FaCode, FaLink, FaImage, FaListUl, FaListOl, 
  FaQuoteLeft, FaUndo, FaRedo, FaHighlighter,
  FaAlignLeft, FaAlignCenter, FaAlignRight
} from 'react-icons/fa';
import { useState, useRef } from 'react';
import '../../../public/styles/SubstackStyleEditor.css';

const lowlight = createLowlight();
lowlight.register('javascript', javascript);
lowlight.register('python', python);
lowlight.register('html', html);
lowlight.register('css', css);
lowlight.register('typescript', typescript);
lowlight.register('json', json);
lowlight.register('bash', bash);
lowlight.register('sql', sql);

const MenuBar = ({ editor }) => {
  const [showStyleDropdown, setShowStyleDropdown] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  if (!editor) return null;

  // Handle image upload from computer

const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Validate file type
  if (!file.type.startsWith('image/')) {
    alert('Please select an image file');
    return;
  }

  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    alert('Image size should be less than 5MB');
    return;
  }

  setUploading(true);

  try {
    // Create FormData to send image to YOUR backend
    const formData = new FormData();
    formData.append('image', file); // The image file

    // Send to YOUR backend
    const response = await fetch('YOUR_API_URL/upload/image', {
      method: 'POST',
      body: formData, // Don't set Content-Type header, browser will set it automatically with boundary
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();
    
    // Backend should return: { success: true, imageUrl: "https://cloudinary.../image.jpg" }
    if (data.success && data.imageUrl) {
      // Insert image URL into editor
      editor.chain().focus().setImage({ src: data.imageUrl }).run();
    } else {
      throw new Error('Invalid response from server');
    }
    
  } catch (error) {
    console.error('Upload error:', error);
    alert('Failed to upload image. Please try again.');
  } finally {
    setUploading(false);
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }
};

  const openImagePicker = () => {
    fileInputRef.current?.click();
  };

  const setLink = () => {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl('');
      setShowLinkInput(false);
    }
  };

  const removeLink = () => {
    editor.chain().focus().unsetLink().run();
  };

  const addCodeBlock = () => {
    editor.chain().focus().toggleCodeBlock().run();
  };

  const setHeading = (level) => {
    editor.chain().focus().toggleHeading({ level }).run();
    setShowStyleDropdown(false);
  };

  const setParagraph = () => {
    editor.chain().focus().setParagraph().run();
    setShowStyleDropdown(false);
  };

  return (
    <div className="menubar">
      {/* Undo/Redo */}
      <button 
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        title="Undo"
        className="menu-btn"
      >
        <FaUndo />
      </button>
      <button 
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        title="Redo"
        className="menu-btn"
      >
        <FaRedo />
      </button>

      <div className="menubar-divider"></div>

      {/* Style Dropdown */}
      <div className="dropdown">
        <button 
          onClick={() => setShowStyleDropdown(!showStyleDropdown)}
          className="menu-btn dropdown-btn"
        >
          Style ▼
        </button>
        {showStyleDropdown && (
          <div className="dropdown-menu">
            <button onClick={setParagraph}>
              <span className="preview-text">Normal Text</span>
            </button>
            <button onClick={() => setHeading(1)}>
              <span className="preview-h1">Heading 1</span>
            </button>
            <button onClick={() => setHeading(2)}>
              <span className="preview-h2">Heading 2</span>
            </button>
            <button onClick={() => setHeading(3)}>
              <span className="preview-h3">Heading 3</span>
            </button>
          </div>
        )}
      </div>

      <div className="menubar-divider"></div>

      {/* Text Formatting */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`menu-btn ${editor.isActive('bold') ? 'is-active' : ''}`}
        title="Bold (Ctrl+B)"
      >
        <FaBold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`menu-btn ${editor.isActive('italic') ? 'is-active' : ''}`}
        title="Italic (Ctrl+I)"
      >
        <FaItalic />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`menu-btn ${editor.isActive('underline') ? 'is-active' : ''}`}
        title="Underline (Ctrl+U)"
      >
        <FaUnderline />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`menu-btn ${editor.isActive('strike') ? 'is-active' : ''}`}
        title="Strikethrough"
      >
        <FaStrikethrough />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={`menu-btn ${editor.isActive('code') ? 'is-active' : ''}`}
        title="Inline Code"
      >
        <FaCode />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={`menu-btn ${editor.isActive('highlight') ? 'is-active' : ''}`}
        title="Highlight"
      >
        <FaHighlighter />
      </button>

      <div className="menubar-divider"></div>

      {/* Link */}
      <div className="link-wrapper">
        <button
          onClick={() => {
            if (editor.isActive('link')) {
              removeLink();
            } else {
              setShowLinkInput(!showLinkInput);
            }
          }}
          className={`menu-btn ${editor.isActive('link') ? 'is-active' : ''}`}
          title="Add Link"
        >
          <FaLink />
        </button>
        
        {showLinkInput && (
          <div className="link-input-popup">
            <input
              type="url"
              placeholder="Enter URL..."
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setLink();
                } else if (e.key === 'Escape') {
                  setShowLinkInput(false);
                  setLinkUrl('');
                }
              }}
              autoFocus
            />
            <button onClick={setLink} className="link-set-btn">Set</button>
            <button 
              onClick={() => {
                setShowLinkInput(false);
                setLinkUrl('');
              }}
              className="link-cancel-btn"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Image Upload Button */}
      <button 
        onClick={openImagePicker} 
        className="menu-btn" 
        title="Add Image"
        disabled={uploading}
      >
        <FaImage />
      </button>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />

      {/* Upload Status */}
      {uploading && (
        <span style={{ fontSize: '12px', color: '#4f46e5', marginLeft: '8px' }}>
          Uploading...
        </span>
      )}

      <div className="menubar-divider"></div>

      {/* Text Alignment */}
      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={`menu-btn ${editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}`}
        title="Align Left"
      >
        <FaAlignLeft />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={`menu-btn ${editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}`}
        title="Align Center"
      >
        <FaAlignCenter />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={`menu-btn ${editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}`}
        title="Align Right"
      >
        <FaAlignRight />
      </button>

      <div className="menubar-divider"></div>

      {/* Lists */}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`menu-btn ${editor.isActive('bulletList') ? 'is-active' : ''}`}
        title="Bullet List"
      >
        <FaListUl />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`menu-btn ${editor.isActive('orderedList') ? 'is-active' : ''}`}
        title="Numbered List"
      >
        <FaListOl />
      </button>

      <div className="menubar-divider"></div>

      {/* Quote */}
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`menu-btn ${editor.isActive('blockquote') ? 'is-active' : ''}`}
        title="Quote"
      >
        <FaQuoteLeft />
      </button>

      <div className="menubar-divider"></div>

      {/* More Dropdown */}
      <div className="dropdown">
        <button 
          onClick={() => setShowMoreDropdown(!showMoreDropdown)}
          className="menu-btn dropdown-btn"
        >
          More ▼
        </button>
        {showMoreDropdown && (
          <div className="dropdown-menu">
            <button 
              onClick={() => {
                addCodeBlock();
                setShowMoreDropdown(false);
              }}
              className={editor.isActive('codeBlock') ? 'is-active' : ''}
            >
              💻 Code block
            </button>
            <button 
              onClick={() => {
                editor.chain().focus().setHorizontalRule().run();
                setShowMoreDropdown(false);
              }}
            >
              ➖ Divider
            </button>
            <button onClick={() => {
              editor.chain().focus().setHardBreak().run();
              setShowMoreDropdown(false);
            }}>
              ⏎ Line break
            </button>
            <button onClick={() => {
              editor.chain().focus().clearNodes().unsetAllMarks().run();
              setShowMoreDropdown(false);
            }}>
              🧹 Clear formatting
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const SubstackStyleEditor = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: 'javascript',
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            if (node.attrs.level === 1) return 'Post title...';
            if (node.attrs.level === 2) return 'Subtitle (optional)...';
            if (node.attrs.level === 3) return 'Section heading...';
          }
          if (node.type.name === 'paragraph') {
            return 'Tell your story...';
          }
          return '';
        },
      }),
      Image.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: {
          class: 'editor-image',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'editor-link',
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      }),
      Highlight.configure({
        multicolor: false,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
    ],
    content: content || `
      <h1></h1>
      <h2></h2>
      <p></p>
    `,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg focus:outline-none',
      },
    },
  });

  return (
    <div className="substack-editor">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="editor-content" />
    </div>
  );
};

export default SubstackStyleEditor;