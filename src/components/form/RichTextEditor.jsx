import { useFormikContext } from "formik";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Redo,
  Undo,
} from "lucide-react";

const RichTextEditor = ({ name, placeholder, className }) => {
  const { errors, values, touched, setFieldValue, setFieldTouched } =
    useFormikContext();

  const value = name && values ? values[name] : "";
  const error = name && errors ? errors[name] : "";
  const isInputTouched = name && touched ? touched[name] : false;

  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p></p>",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setFieldValue(name, html);
    },
  });

  // Update content when value changes (for edit mode)
  useEffect(() => {
    if (editor && value && editor.getHTML() !== value) {
      editor.commands.setContent(value, false);
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  const buttonClass =
    "p-2 rounded hover:bg-gray-200 transition-colors border border-gray-300 disabled:opacity-50";

  const handleBulletList = () => {
    editor.chain().focus().toggleBulletList().run();
  };

  const handleOrderedList = () => {
    editor.chain().focus().toggleOrderedList().run();
  };

  const handleHeading = () => {
    editor.chain().focus().toggleHeading({ level: 2 }).run();
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 border border-gray-300 rounded-t-md bg-gray-50 p-2">
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={buttonClass}
          title="Bold (Ctrl+B)"
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={buttonClass}
          title="Italic (Ctrl+I)"
        >
          <Italic className="w-4 h-4" />
        </button>

        <div className="border-l border-gray-300 mx-1" />

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            handleHeading();
          }}
          className={buttonClass}
          title="Heading"
        >
          <Heading2 className="w-4 h-4" />
        </button>

        <div className="border-l border-gray-300 mx-1" />

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            handleBulletList();
          }}
          className={buttonClass}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            handleOrderedList();
          }}
          className={buttonClass}
          title="Ordered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <div className="border-l border-gray-300 mx-1" />

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          disabled={!editor.can().chain().focus().undo().run()}
          className={buttonClass}
          title="Undo"
        >
          <Undo className="w-4 h-4" />
        </button>

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          disabled={!editor.can().chain().focus().redo().run()}
          className={buttonClass}
          title="Redo"
        >
          <Redo className="w-4 h-4" />
        </button>
      </div>

      {/* Editor */}
      <div
        className={`border border-t-0 border-gray-300 rounded-b-md p-3 bg-white focus-within:ring-2 focus-within:ring-blue-500 min-h-[200px] ${className}`}
        onBlur={() => setFieldTouched(name, true)}
      >
        <EditorContent
          editor={editor}
          className="prose prose-sm max-w-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[150px] [&_ul]:list-disc [&_ul]:ml-5 [&_ol]:list-decimal [&_ol]:ml-5"
        />
      </div>

      {error && isInputTouched && (
        <span className="error text-xs text-red-500">{error}</span>
      )}
    </div>
  );
};

export default RichTextEditor;
