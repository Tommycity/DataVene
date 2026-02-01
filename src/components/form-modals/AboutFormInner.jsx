import { useEffect } from "react";
import CustomFormik from "../form/CustomFormik";
import AppSubmitButton from "../form/AppSubmitButton";
import AppInputField from "../form/AppInputField";
import RichTextEditor from "../form/RichTextEditor";
import AppFileField from "../form/AppFileField";
import { addAboutValues } from "../../utils/initialValues";
import { validateAddAbout } from "../../utils/validations";
import { X, Plus, Briefcase, GraduationCap, Award } from "lucide-react";
import { useFormikContext } from "formik";

// Separate component to access Formik context
const FormContent = ({
  type,
  cvFileError,
  cvFileText,
  handleCvFileChange,
  onClearCvFile,
  experiences,
  setExperiences,
  educations,
  setEducations,
  certifications,
  setCertifications,
}) => {
  const { values, setFieldValue } = useFormikContext();

  // Sync Formik values with state arrays
  useEffect(() => {
    if (values.experiences) {
      setExperiences(values.experiences);
    }
  }, [values.experiences]);

  useEffect(() => {
    if (values.educations) {
      setEducations(values.educations);
    }
  }, [values.educations]);

  useEffect(() => {
    if (values.certifications) {
      setCertifications(values.certifications);
    }
  }, [values.certifications]);

  // Experience handlers
  const addExperience = () => {
    const updated = [
      ...experiences,
      { course: "", duration: "", country: "", experienceContent: "" }
    ];
    setExperiences(updated);
    setFieldValue("experiences", updated);
  };

  const removeExperience = (index) => {
    if (experiences.length > 1) {
      const updated = experiences.filter((_, i) => i !== index);
      setExperiences(updated);
      setFieldValue("experiences", updated);
    }
  };

  const updateExperience = (index, field, value) => {
    const updated = [...experiences];
    updated[index][field] = value;
    setExperiences(updated);
    setFieldValue("experiences", updated);
  };

  // Education handlers
  const addEducation = () => {
    const updated = [
      ...educations,
      { course: "", duration: "", country: "" }
    ];
    setEducations(updated);
    setFieldValue("educations", updated);
  };

  const removeEducation = (index) => {
    if (educations.length > 1) {
      const updated = educations.filter((_, i) => i !== index);
      setEducations(updated);
      setFieldValue("educations", updated);
    }
  };

  const updateEducation = (index, field, value) => {
    const updated = [...educations];
    updated[index][field] = value;
    setEducations(updated);
    setFieldValue("educations", updated);
  };

  // Certification handlers
  const addCertification = () => {
    const updated = [
      ...certifications,
      { course: "", duration: "", country: "", skillMeasure: "" }
    ];
    setCertifications(updated);
    setFieldValue("certifications", updated);
  };

  const removeCertification = (index) => {
    if (certifications.length > 1) {
      const updated = certifications.filter((_, i) => i !== index);
      setCertifications(updated);
      setFieldValue("certifications", updated);
    }
  };

  const updateCertification = (index, field, value) => {
    const updated = [...certifications];
    updated[index][field] = value;
    setCertifications(updated);
    setFieldValue("certifications", updated);
  };

  return (
    <div className="w-full flex flex-col gap-6 p-6 text-black bg-white rounded-lg shadow-sm">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {type === "create" ? "Add About Information" : "Edit About Information"}
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          All fields are optional. Fill in what's relevant.
        </p>
      </div>

      {/* Basic Info Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">
          Basic Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-1">
            <label className="text-gray-600 text-sm font-medium block mb-2">
              Email
            </label>
            <AppInputField
              name="email"
              placeholder="Enter email"
              type="email"
            />
          </div>

          <div className="md:col-span-1">
            <label className="text-gray-600 text-sm font-medium block mb-2">
              CV / Resume
            </label>
            <AppFileField
              name="cvFile"
              label="Upload CV"
              handleChange={handleCvFileChange}
              nameText={cvFileText}
              error={cvFileError}
              accept=".pdf,.doc,.docx"
              onClear={onClearCvFile}
            />
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <div className="space-y-4 border-t pt-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Experience
          </h3>
          <button
            type="button"
            onClick={addExperience}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Experience
          </button>
        </div>

        {experiences.map((exp, index) => (
          <div key={index} className="p-4 border rounded-lg bg-gray-50 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">
                Experience #{index + 1}
              </span>
              {experiences.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                value={exp.course}
                onChange={(e) => updateExperience(index, "course", e.target.value)}
                placeholder="Job Title / Role"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                value={exp.duration}
                onChange={(e) => updateExperience(index, "duration", e.target.value)}
                placeholder="Duration (e.g., 2019-2021)"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                value={exp.country}
                onChange={(e) => updateExperience(index, "country", e.target.value)}
                placeholder="Country"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 block mb-1">Job Description</label>
              <RichTextEditor
                name={`experience_${index}_content`}
                placeholder="Describe your role, responsibilities, and achievements..."
              />
            </div>
          </div>
        ))}
      </div>

      {/* Education Section */}
      <div className="space-y-4 border-t pt-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            Education
          </h3>
          <button
            type="button"
            onClick={addEducation}
            className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Education
          </button>
        </div>

        {educations.map((edu, index) => (
          <div key={index} className="p-4 border rounded-lg bg-gray-50 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">
                Education #{index + 1}
              </span>
              {educations.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                value={edu.course}
                onChange={(e) => updateEducation(index, "course", e.target.value)}
                placeholder="Degree / Course"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                value={edu.duration}
                onChange={(e) => updateEducation(index, "duration", e.target.value)}
                placeholder="Duration (e.g., 2015-2019)"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                value={edu.country}
                onChange={(e) => updateEducation(index, "country", e.target.value)}
                placeholder="Institution / Country"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Certification Section */}
      <div className="space-y-4 border-t pt-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            <Award className="w-5 h-5" />
            Certifications
          </h3>
          <button
            type="button"
            onClick={addCertification}
            className="flex items-center gap-1 px-3 py-1.5 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Certification
          </button>
        </div>

        {certifications.map((cert, index) => (
          <div key={index} className="p-4 border rounded-lg bg-gray-50 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">
                Certification #{index + 1}
              </span>
              {certifications.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeCertification(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                value={cert.course}
                onChange={(e) => updateCertification(index, "course", e.target.value)}
                placeholder="Certification Name"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                value={cert.duration}
                onChange={(e) => updateCertification(index, "duration", e.target.value)}
                placeholder="Year (e.g., 2020)"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                value={cert.country}
                onChange={(e) => updateCertification(index, "country", e.target.value)}
                placeholder="Issuing Organization"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 block mb-1">Skill Level / Details</label>
              <RichTextEditor
                name={`certification_${index}_skillMeasure`}
                placeholder="Describe your proficiency level and what you learned..."
              />
            </div>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="border-t pt-6">
        <AppSubmitButton
          title={type === "create" ? "Create About" : "Update About"}
        />
      </div>
    </div>
  );
};

const AboutFormInner = ({
  type,
  handleSubmit,
  data = null,
  cvFileError,
  cvFileText,
  handleCvFileChange,
  onClearCvFile,
  experiences,
  setExperiences,
  educations,
  setEducations,
  certifications,
  setCertifications,
}) => {
  const initialValues = addAboutValues(data, experiences, educations, certifications);
  const validationSchema = validateAddAbout();

  return (
    <CustomFormik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      <FormContent
        type={type}
        cvFileError={cvFileError}
        cvFileText={cvFileText}
        handleCvFileChange={handleCvFileChange}
        onClearCvFile={onClearCvFile}
        experiences={experiences}
        setExperiences={setExperiences}
        educations={educations}
        setEducations={setEducations}
        certifications={certifications}
        setCertifications={setCertifications}
      />
    </CustomFormik>
  );
};

export default AboutFormInner;