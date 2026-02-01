import * as yup from "yup";

export const validateLogin = () => {
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email provided")
      .required("Email is missing"),
    password: yup.string().required("Password is missing"),
  });
  return validationSchema;
};

export const validateAddBlogPost = () => {
  const validationSchema = yup.object({
    blogTitle: yup.string().required("Blog title is missing"),
    subTitle : yup.string().required("Blog subtitle is missing"),
    blogSubContent: yup.string().required("Blog description is missing"),
    author: yup.string().required("Author name is missing"),
  });

  return validationSchema;
};
export const validateAddProject = () => {
  const validationSchema = yup.object({
    projectTitle: yup.string().required("Project title is missing"),
    subTitle : yup.string().required("Project subtitle is missing"),
    projectSubContent: yup.string().required("Project description is missing"),
  });

  return validationSchema;
};



export const validateAddAbout = () => {
  const validationSchema = yup.object({
    // Email is optional, but if provided must be valid
    email: yup
      .string()
      .email("Invalid email format")
      .nullable()
      .optional(),
    
    // Dynamic RichTextEditor fields - all optional
    // These are validated by name pattern: experience_0_content, certification_1_skillMeasure, etc.
    // Since they're dynamic and optional, we don't need explicit validation
    
    // Arrays (experiences, educations, certifications) are managed outside Formik
    // and don't need validation here
  }).test(
    'dynamic-fields',
    'Dynamic fields validation',
    function(values) {
      // You can add custom validation for dynamic fields if needed
      // For now, all fields are optional so this just returns true
      return true;
    }
  );

  return validationSchema;
};

