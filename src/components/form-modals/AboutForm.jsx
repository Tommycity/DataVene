import { useState } from "react";
import { addNewAbout, updateAbout } from "../../api";
import { successMessage, errorMessage } from "../../utils/helpers";
import AboutFormInner from "./AboutFormInner";

const AboutForm = ({ type = "create", data = null, onSaved }) => {
  // CV file
  const [cvFile, setCvFile] = useState(null);
  const [cvFileError, setCvFileError] = useState("");
  const [cvFileText, setCvFileText] = useState("");

  // Experience array
  const [experiences, setExperiences] = useState(
    data?.experience || [
      { course: "", duration: "", country: "", experienceContent: "" }
    ]
  );

  // Education array
  const [educations, setEducations] = useState(
    data?.education || [
      { course: "", duration: "", country: "" }
    ]
  );

  // Certification array
  const [certifications, setCertifications] = useState(
    data?.certification || [
      { course: "", duration: "", country: "", skillMeasure: "" }
    ]
  );

  const handleCvFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCvFile(file);
      setCvFileError("");
      setCvFileText(file.name);
    }
  };

  const handleClearCvFile = () => {
    setCvFile(null);
    setCvFileText("");
    setCvFileError("");
  };

  const handleSubmit = async (values, { setSubmitting }) => {

  const formData = new FormData();

  // Add email
  formData.append("email", values.email);

  // Add CV file
  if (cvFile) {
    formData.append("cvFile", cvFile);
  }

  // Sync RichTextEditor content back to experiences array
  const updatedExperiences = experiences.map((exp, index) => ({
    ...exp,
    experienceContent: values[`experience_${index}_content`] || ""
  }));

  // Sync RichTextEditor content back to certifications array
  const updatedCertifications = certifications.map((cert, index) => ({
    ...cert,
    skillMeasure: values[`certification_${index}_skillMeasure`] || ""
  }));

  // Add arrays as JSON with synced content
  formData.append("experience", JSON.stringify(updatedExperiences));
  formData.append("education", JSON.stringify(educations));
  formData.append("certification", JSON.stringify(updatedCertifications));

  // console.log("FormData being sent:");
  // for (let pair of formData.entries()) {
  //   console.log(pair[0], pair[1]);
  // }

    try {
      const res =
        type === "create"
          ? await addNewAbout(formData)
          : await updateAbout(data?._id, formData);

      if (res && (res.status === 200 || res.status === 201)) {
        successMessage(res?.data?.message || "About saved successfully");
        if (typeof onSaved === "function") {
          onSaved(res?.data?.data || formData);
        }
      } else {
        errorMessage(res?.data?.error || "Operation failed");
      }
    } catch (err) {
      console.error("Save about error:", err);
      errorMessage(err?.message || "Operation failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AboutFormInner
      type={type}
      handleSubmit={handleSubmit}
      data={data}
      // CV file props
      cvFileError={cvFileError}
      cvFileText={cvFileText}
      handleCvFileChange={handleCvFileChange}
      onClearCvFile={handleClearCvFile}
      // Experience props
      experiences={experiences}
      setExperiences={setExperiences}
      // Education props
      educations={educations}
      setEducations={setEducations}
      // Certification props
      certifications={certifications}
      setCertifications={setCertifications}
    />
  );
};

export default AboutForm;