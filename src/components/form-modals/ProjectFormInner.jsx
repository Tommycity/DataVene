import { useState } from "react";
import CustomFormik from "../form/CustomFormik";
import AppSubmitButton from "../form/AppSubmitButton";
import AppInputField from "../form/AppInputField";
import RichTextEditor from "../form/RichTextEditor";
import AppFileField from "../form/AppFileField";
import { addProjectValues } from "../../utils/initialValues";
import { validateAddProject } from "../../utils/validations";
import { X, Plus, Link as LinkIcon, Tag } from "lucide-react";

const ProjectFormInner = ({
  type,
  handleSubmit,
  data = null,
  mainAvatarError,
  mainAvatarText,
  handleMainAvatarChange,
  contentAvatarError,
  contentAvatarText,
  handleContentAvatarChange,
  projectLinks,
  setProjectLinks,
  projectStack,
  setProjectStack,
  onClearMainAvatar,
  onClearContentAvatar,
}) => {
  const initialValues = addProjectValues(data);
  const validationSchema = validateAddProject();

  // Handle project links
  const handleLinkChange = (index, value) => {
    const updated = [...projectLinks];
    updated[index] = value;
    setProjectLinks(updated);
  };

  const addLink = () => {
    setProjectLinks([...projectLinks, ""]);
  };

  const removeLink = (index) => {
    if (projectLinks.length > 1) {
      setProjectLinks(projectLinks.filter((_, i) => i !== index));
    }
  };

  // Handle project stack
  const [stackInput, setStackInput] = useState("");

  const addStack = () => {
    const trimmed = stackInput.trim();
    if (trimmed && !projectStack.includes(trimmed)) {
      setProjectStack([...projectStack, trimmed]);
      setStackInput("");
    }
  };

  const removeStack = (stackToRemove) => {
    setProjectStack(projectStack.filter((s) => s !== stackToRemove));
  };

  const handleStackKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addStack();
    }
  };

  return (
    <CustomFormik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      <div className="w-full flex flex-col gap-6 p-6 text-black bg-white rounded-lg shadow-sm">
        <div className="border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {type === "create" ? "Add New Project" : "Edit Project"}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Fields marked with * are required.
          </p>
        </div>

        {/* Basic Info Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            Basic Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Project Title */}
            <div className="md:col-span-2">
              <label className="text-gray-600 text-sm font-medium block mb-2">
                Project Title *
              </label>
              <AppInputField
                name="projectTitle"
                placeholder="Enter project title"
                type="text"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-gray-600 text-sm font-medium block mb-2">
                Project Subtitle *
              </label>
              <AppInputField
                name="subTitle"
                placeholder="Enter project subtitle"
                type="text"
              />
            </div>

            {/* Main Project Image */}
            <div className="md:col-span-1">
              <label className="text-gray-600 text-sm font-medium block mb-2">
                Main Project Image *
              </label>
              <AppFileField
                name="mainAvatar"
                label="Upload Main Image"
                handleChange={handleMainAvatarChange}
                nameText={mainAvatarText}
                error={mainAvatarError}
                accept="image/*"
                onClear={onClearMainAvatar}
              />
            </div>

            {/* Content Image */}
            <div className="md:col-span-1">
              <label className="text-gray-600 text-sm font-medium block mb-2">
                Content Image *
              </label>
              <AppFileField
                name="contentAvatar"
                label="Upload Content Image"
                handleChange={handleContentAvatarChange}
                nameText={contentAvatarText}
                error={contentAvatarError}
                accept="image/*"
                onClear={onClearContentAvatar}
              />
            </div>
          </div>

          {/* Project Description - Full Width */}
          <div>
            <label className="text-gray-600 text-sm font-medium block mb-2">
              Project Description *
            </label>
            <RichTextEditor
              name="projectSubContent"
              placeholder="Enter a detailed description of your project..."
            />
          </div>
        </div>

        {/* Project Links Section */}
        <div className="space-y-4 border-t pt-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <LinkIcon className="w-5 h-5" />
              Project Links
            </h3>
            <button
              type="button"
              onClick={addLink}
              className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Link
            </button>
          </div>

          <div className="space-y-3">
            {projectLinks.map((link, index) => (
              <div key={index} className="flex gap-3">
                <input
                  type="url"
                  value={link}
                  onChange={(e) => handleLinkChange(index, e.target.value)}
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., https://github.com/username/project"
                />
                {projectLinks.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeLink(index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    title="Remove link"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Project Stack Section */}
        <div className="space-y-4 border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            <Tag className="w-5 h-5" />
            Tech Stack
          </h3>

          <div className="flex gap-3">
            <input
              type="text"
              value={stackInput}
              onChange={(e) => setStackInput(e.target.value)}
              onKeyDown={handleStackKeyDown}
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., Python, Power BI, React"
            />
            <button
              type="button"
              onClick={addStack}
              className="flex items-center gap-1 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>

          {/* Display tech stack tags */}
          {projectStack.length > 0 && (
            <div className="flex gap-2 flex-wrap p-3 bg-gray-50 rounded-md">
              {projectStack.map((stack, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-sm shadow-sm"
                >
                  <span className="font-medium text-gray-700">{stack}</span>
                  <button
                    type="button"
                    onClick={() => removeStack(stack)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    title={`Remove ${stack}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="border-t pt-6">
          <AppSubmitButton
            title={type === "create" ? "Create Project" : "Update Project"}
          />
        </div>
      </div>
    </CustomFormik>
  );
};

export default ProjectFormInner;
