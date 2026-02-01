import { useState } from "react";
import { addNewBlogPost, updateBlogPost } from "../../api";
import { successMessage, errorMessage } from "../../utils/helpers";
import BlogFormInner from "./BlogFormInner";

const BlogForm = ({ type = "create", data = null, onSaved }) => {
  // Main blog image
  const [mainAvatar, setMainAvatar] = useState(null);
  const [mainAvatarError, setMainAvatarError] = useState("");
  const [mainAvatarText, setMainAvatarText] = useState("");

  // Content image (nested in blogContent)
  const [contentAvatar, setContentAvatar] = useState(null);
  const [contentAvatarError, setContentAvatarError] = useState("");
  const [contentAvatarText, setContentAvatarText] = useState("");

 
  const handleMainAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainAvatar(file);
      setMainAvatarError("");
      setMainAvatarText(file.name);
    }
  };

  const handleContentAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setContentAvatar(file);
      setContentAvatarError("");
      setContentAvatarText(file.name);
    }
  };

  const handleClearMainAvatar = () => {
    setMainAvatar(null);
    setMainAvatarText("");
    setMainAvatarError("");
  };

  const handleClearContentAvatar = () => {
    setContentAvatar(null);
    setContentAvatarText("");
    setContentAvatarError("");
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log("Form values:", values);
    // Validation
    if (!mainAvatar && type === "create") {
      setMainAvatarError("Main blog image is required");
      setSubmitting(false);
      return;
    }
    if (!contentAvatar && type === "create") {
      setContentAvatarError("Content image is required");
      setSubmitting(false);
      return;
    }

    const formData = new FormData();

    // Add text fields
    formData.append("blogTitle", values.blogTitle);
    formData.append("subTitle", values.subTitle);
    formData.append("author", values.author);

    // Add main image
    if (mainAvatar) {
      formData.append("avatarImg", mainAvatar);
    }

    // Add blogContent - send as object with nested fields
    formData.append(
      "blogContent",
      JSON.stringify({
        blogSubContent: values.blogSubContent,
      }),
    );

    // Add content avatar image with blogContent reference
    if (contentAvatar) {
      formData.append("blogContentAvatar", contentAvatar);
    }
    console.log("formData", formData);

    try {
      const res =
        type === "create"
          ? await addNewBlogPost(formData)
          : await updateBlogPost(data?._id, formData);

      if (res && (res.status === 200 || res.status === 201)) {
        successMessage(res?.data?.message || "BlogPost saved successfully");
        if (typeof onSaved === "function") {
          onSaved(res?.data?.data || formData);
        }
      } else {
        errorMessage(res?.data?.error || "Operation failed");
      }
    } catch (err) {
      console.error("Save blogpost error:", err);
      errorMessage(err?.message || "Operation failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <BlogFormInner
      type={type}
      handleSubmit={handleSubmit}
      data={data}
      // Main avatar props
      mainAvatarError={mainAvatarError}
      mainAvatarText={mainAvatarText}
      handleMainAvatarChange={handleMainAvatarChange}
      onClearMainAvatar={handleClearMainAvatar}
      // Content avatar props
      contentAvatarError={contentAvatarError}
      contentAvatarText={contentAvatarText}
      handleContentAvatarChange={handleContentAvatarChange}
      onClearContentAvatar={handleClearContentAvatar}
    />
  );
};

export default BlogForm;
