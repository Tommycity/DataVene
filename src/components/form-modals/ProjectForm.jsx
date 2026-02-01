import { useState } from "react";
import { addNewProject, updateProject } from "../../api";
import { successMessage, errorMessage } from "../../utils/helpers";
import ProjectFormInner from "./ProjectFormInner";

const ProjectForm = ({ type = "create", data = null, onSaved }) => {
  // Main project image
  const [mainAvatar, setMainAvatar] = useState(null);
  const [mainAvatarError, setMainAvatarError] = useState("");
  const [mainAvatarText, setMainAvatarText] = useState("");

  // Content image (nested in projectContent)
  const [contentAvatar, setContentAvatar] = useState(null);
  const [contentAvatarError, setContentAvatarError] = useState("");
  const [contentAvatarText, setContentAvatarText] = useState("");

  // Project links state
  const [projectLinks, setProjectLinks] = useState(data?.projectLink || [""]);

  // Project stack state
  const [projectStack, setProjectStack] = useState(data?.projectStack || []);

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
      setMainAvatarError("Main project image is required");
      setSubmitting(false);
      return;
    }
    if (!contentAvatar && type === "create") {
      setContentAvatarError("Content image is required");
      setSubmitting(false);
      return;
    }

    // Filter out empty links
    const validLinks = projectLinks.filter((link) => link.trim() !== "");
    if (validLinks.length === 0) {
      errorMessage("Please add at least one project link");
      setSubmitting(false);
      return;
    }

    if (projectStack.length === 0) {
      errorMessage("Please add at least one tech stack");
      setSubmitting(false);
      return;
    }

    const formData = new FormData();

    // Add text fields
    formData.append("projectTitle", values.projectTitle);
    formData.append("subTitle", values.subTitle);

    // Add main image
    if (mainAvatar) {
      formData.append("avatarImg", mainAvatar);
    }

    // Add projectContent - send as object with nested fields
    formData.append(
      "projectContent",
      JSON.stringify({
        projectSubContent: values.projectSubContent,
      }),
    );

    // Add content avatar image with projectContent reference
    if (contentAvatar) {
      formData.append("projectContentAvatar", contentAvatar);
    }

    // Add project links as JSON string
    formData.append("projectLink", JSON.stringify(validLinks));

    // Add project stack as JSON string
    formData.append("projectStack", JSON.stringify(projectStack));

    console.log("formData", formData);

    try {
      const res =
        type === "create"
          ? await addNewProject(formData)
          : await updateProject(data?._id, formData);

      if (res && (res.status === 200 || res.status === 201)) {
        successMessage(res?.data?.message || "Project saved successfully");
        if (typeof onSaved === "function") {
          onSaved(res?.data?.data || formData);
        }
      } else {
        errorMessage(res?.data?.error || "Operation failed");
      }
    } catch (err) {
      console.error("Save project error:", err);
      errorMessage(err?.message || "Operation failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ProjectFormInner
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
      // Links and stack
      projectLinks={projectLinks}
      setProjectLinks={setProjectLinks}
      projectStack={projectStack}
      setProjectStack={setProjectStack}
    />
  );
};

export default ProjectForm;
