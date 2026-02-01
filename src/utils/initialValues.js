export const loginAdminValues = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  return initialValues;
};

export const addBlogPostValues = (data) => {
  const initialValues = {
    blogTitle: data?.blogTitle || "",
    subTitle: data?.subTitle || "",
    blogSubContent: data?.blogSubContent || "",
    author: data?.author || "",
  };
  return initialValues;
};

export const addProjectValues = (data) => {
  const initialValues = {
    projectTitle: data?.projectTitle || "",
    subTitle: data?.subTitle || "",
    projectSubContent: data?.projectContent?.projectSubContent || "",
  };
  return initialValues;
};

export const addAboutValues = (data, experiences, educations, certifications) => {
  const initialValues = {
    email: data?.email || "",
    experiences: experiences || [
      { course: "", duration: "", country: "", experienceContent: "" }
    ],
    educations: educations || [
      { course: "", duration: "", country: "" }
    ],
    certifications: certifications || [
      { course: "", duration: "", country: "", skillMeasure: "" }
    ],
  };
  
  // Add dynamic fields for RichTextEditor
  experiences?.forEach((exp, index) => {
    initialValues[`experience_${index}_content`] = exp.experienceContent || "";
  });
  
  certifications?.forEach((cert, index) => {
    initialValues[`certification_${index}_skillMeasure`] = cert.skillMeasure || "";
  });
  
  return initialValues;
};




