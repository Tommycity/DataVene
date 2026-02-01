import { CloudUpload, X } from "lucide-react";
import { useId } from "react";

const AppFileFieldAvatarOnly = ({
  label = "Upload file",
  handleChange,
  files = [], // Array of selected files
  onRemoveFile, // Callback to remove a file
  error,
  multiple = false,
}) => {
  const inputId = useId();

  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        className="text-xs text-gray-400 flex items-center cursor-pointer gap-2"
        htmlFor={inputId}
      >
        <CloudUpload className="w-16" />
        <span>{files.length > 0 ? `${files.length} file(s) selected` : label}</span>
      </label>
      
      <input
        type="file"
        id={inputId}
        className="hidden"
        onChange={handleChange}
        multiple={multiple}
        accept="image/*"
      />

      {/* Display selected files */}
      {files.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded text-xs"
            >
              <span className="text-gray-700 truncate">{file.name}</span>
              <button
                type="button"
                onClick={() => onRemoveFile(index)}
                className="ml-2 text-red-500 hover:text-red-700 flex-shrink-0"
                aria-label={`Remove ${file.name}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {error?.length ? <p className="text-xs text-red-400">{error}</p> : null}
    </div>
  );
};

export default AppFileFieldAvatarOnly;