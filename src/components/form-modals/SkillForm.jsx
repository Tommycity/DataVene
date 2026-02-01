import { useState } from "react";
import { addNewSkill, updateSkill } from "../../api";
import { successMessage, errorMessage } from "../../utils/helpers";
import SkillFormInner from "./SkillFormInner";

const SkillForm = ({ type = "create", data = null, onSaved }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...newFiles]);
    setError("");
  };

  const handleRemoveFile = (indexToRemove) => {
    setSelectedFiles((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

 const handleSubmit = async (values, { setSubmitting }) => {
  if (selectedFiles.length === 0) {
      setError("Please select at least one file");
      return;
    }

  const formData = new FormData();

  selectedFiles.forEach((file) => {
      formData.append("avatarImg", file); // or "avatars[]" depending on backend
    });

  try {
    const res =
      type === "create"
        ? await addNewSkill(formData)
        : await updateSkill(data?._id, formData);

    if (res?.status === 200 || res?.status === 201) {
      successMessage(res?.data?.message || "Saved successfully");
      onSaved?.(res?.data?.data);
    } else {
      errorMessage(res?.data?.error || "Operation failed");
    }
    console.log("Files to upload:", selectedFiles);
  } catch (err) {
    errorMessage(err?.message || "Operation failed");
  } finally {
    setSubmitting(false);
  }
};


  return (
    <SkillFormInner
      type={type}
      handleSubmit={handleSubmit}
      data={data}
      selectedFiles={selectedFiles}
      handleFileChange={handleFileChange}
      handleRemoveFile={handleRemoveFile}
      fileError={error}
    />
  );
};

export default SkillForm;
