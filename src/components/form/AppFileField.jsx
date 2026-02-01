import { useFormikContext } from "formik";
import { Upload, Image, X, File, FileText, Video, Music } from "lucide-react";

const AppFileField = ({
  name,
  label,
  handleChange,
  nameText,
  error,
  accept = "*/*",
  onClear,
}) => {
  const { setFieldValue } = useFormikContext();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue(name, file);
      handleChange && handleChange(e);
    }
  };

  const handleClear = (e) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("clear")
    
    // Clear the Formik field value
    setFieldValue(name, null);
    
    // Clear the actual file input
    const fileInput = document.getElementById(name);
    if (fileInput) {
      fileInput.value = '';
    }
    
    // Call the parent's clear handler if provided
    onClear && onClear();
  };

  // Function to determine file icon based on file type
  const getFileIcon = (fileName) => {
    if (!fileName) return Upload;
    
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'bmp'].includes(extension)) {
      return Image;
    } else if (['mp4', 'avi', 'mov', 'wmv', 'mkv', 'webm'].includes(extension)) {
      return Video;
    } else if (['mp3', 'wav', 'ogg', 'flac', 'aac'].includes(extension)) {
      return Music;
    } else if (['pdf', 'doc', 'docx', 'txt', 'csv', 'xlsx', 'xls'].includes(extension)) {
      return FileText;
    } else {
      return File;
    }
  };

  const FileIcon = nameText ? getFileIcon(nameText) : Upload;

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="relative">
        <input
          type="file"
          id={name}
          name={name}
          onChange={handleFileChange}
          accept={accept}
          className="hidden"
        />
        
        <label
          htmlFor={name}
          className={`
            flex flex-col items-center justify-center
            w-full h-32 px-4 py-6
            border-2 border-dashed rounded-lg
            cursor-pointer transition-all duration-200
            ${error 
              ? 'border-red-400 bg-red-50 hover:bg-red-100' 
              : nameText 
                ? 'border-green-400 bg-green-50 hover:bg-green-100' 
                : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400'
            }
          `}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            {nameText ? (
              <>
                <FileIcon className="w-8 h-8 text-green-600" />
                <div className="text-center">
                  <p className="text-sm font-medium text-green-700">
                    File selected
                  </p>
                  <p className="text-xs text-gray-600 mt-1 max-w-full truncate px-2">
                    {nameText}
                  </p>
                </div>
              </>
            ) : (
              <>
                <Upload className="w-8 h-8 text-gray-400" />
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-700">
                    {label || 'Upload File'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Click to browse or drag and drop
                  </p>
                </div>
              </>
            )}
          </div>
        </label>

        {nameText && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
            title="Clear file"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        )}
      </div>

      {error && (
        <span className="text-xs text-red-500 ml-1 flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </span>
      )}
    </div>
  );
};

export default AppFileField;