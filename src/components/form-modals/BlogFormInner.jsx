import { useState } from "react";
import CustomFormik from "../form/CustomFormik";
import AppSubmitButton from "../form/AppSubmitButton";
import AppInputField from "../form/AppInputField";
import RichTextEditor from "../form/RichTextEditor";
import AppFileField from "../form/AppFileField";
import { addBlogPostValues } from "../../utils/initialValues";
import { validateAddBlogPost, validateAddProject } from "../../utils/validations";
import SubstackStyleEditor from "../test/SubstackStyleEditor";

const BlogFormInner = ({
  type,
  handleSubmit,
  data = null,
  mainAvatarError,
  mainAvatarText,
  handleMainAvatarChange,
  contentAvatarError,
  contentAvatarText,
  handleContentAvatarChange,
  onClearMainAvatar,
  onClearContentAvatar,
}) => {
  const initialValues = addBlogPostValues(data);
  const validationSchema = validateAddBlogPost();

 

 

  return (
    <CustomFormik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      <div className="w-full flex flex-col gap-6 p-6 text-black bg-white rounded-lg shadow-sm">
        <div className="border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {type === "create" ? "Add New Blog Post" : "Edit Blog Post"}
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
                Blog Title *
              </label>
              <AppInputField
                name="blogTitle"
                placeholder="Enter blog title"
                type="text"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-gray-600 text-sm font-medium block mb-2">
                Blog Subtitle *
              </label>
              <AppInputField
                name="subTitle"
                placeholder="Enter Blog subtitle"
                type="text"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-gray-600 text-sm font-medium block mb-2">
                Author *
              </label>
              <AppInputField
                name="author"
                placeholder="Enter Author name"
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
              Blog Description *
            </label>
            <RichTextEditor
              name="blogSubContent"
              placeholder="Enter a detailed description of your project..."
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="border-t pt-6">
          <AppSubmitButton
            title={type === "create" ? "Create Blog" : "Update Blog"}
          />
        </div>
      </div>
    </CustomFormik>
  );
};

export default BlogFormInner;
