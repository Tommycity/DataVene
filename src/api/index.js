import useSWR from "swr";
import {
  ADD_ABOUT,
  ADD_BLOG_POST,
  ADD_EDUCATION,
  ADD_EXPERIENCE,
  ADD_PROJECTS,
  ADD_SKILL,
  DELETE_ABOUT,
  DELETE_BLOG_POST,
  DELETE_EDUCATION,
  DELETE_EXPERIENCE,
  DELETE_PROJECTS,
  DELETE_SKILL,
  EDIT_ABOUT,
  EDIT_BLOG_POST,
  EDIT_EDUCATION,
  EDIT_EXPERIENCE,
  // CHECK_SESSION,
  EDIT_PROJECTS,
  EDIT_SKILL,
  FETCH_ALL_ABOUT,
  FETCH_ALL_BLOGS,
  FETCH_ALL_EDUCATION,
  FETCH_ALL_EXPERIENCE,
  FETCH_ALL_PROJECTS,
  FETCH_ALL_SKILL,
  FETCH_SINGLE_BLOG_POST,
  FETCH_SINGLE_PROJECTS,
  FORGET_PASSWORD,
  // FORGOT_PASSWORD,
  // LOGGED_IN_ADMIN,
  LOGIN_ADMIN,
  LOGOUT_ADMIN,
  RESET_PASSWORD,
} from "../constants/routes";
import { fetcher, logoutFetcher, sesionFetcher } from "./fetcher";
import { mutationRequest } from "./sender";

// Auth
export const loginAdmin = async (values) => {
  const result = await mutationRequest(LOGIN_ADMIN, "post", values);
  return result;
};
export const logoutAdmin = async () => {
  const result = await logoutFetcher(LOGOUT_ADMIN);
  return result;
};
export const forgetPassword = async (values) => {
  const result = await mutationRequest(FORGET_PASSWORD, "post", values);
  return result;
};
export const resetPassword = async (values) => {
  const result = await mutationRequest(RESET_PASSWORD, "post", values);
  return result;
};

// export const checkSession = () => {
//   const { data, error, loading, mutate } = useSWR(CHECK_SESSION, sesionFetcher);
//   return { data, error, loading, mutate };
// };

// export const fetchLoggedInAdmin = () => {
//   const { data, error, loading, mutate } = useSWR(LOGGED_IN_ADMIN, fetcher);
//   return { data, error, loading, mutate };
// };

// Blog
export const addNewBlogPost = async (values) => {
  const result = await mutationRequest(ADD_BLOG_POST, "post", values);
  return result;
};
export const updateBlogPost = async (id, values) => {
  const result = await mutationRequest(
    EDIT_BLOG_POST.replace("{id}", id),
    "put",
    values,
  );
  return result;
};
export const deleteBlogPost = async (id) => {
  const result = await mutationRequest(
    DELETE_BLOG_POST.replace("{id}", id),
    "delete",
  );
  return result;
};
export const fetchAllBlogPost = () => {
  const { data, error, loading, mutate } = useSWR(FETCH_ALL_BLOGS, fetcher);
  return { data, error, loading, mutate };
};
export const fetchSingleBlogPost = (id) => {
  const { data, error, loading, mutate } = useSWR(
    `${FETCH_SINGLE_BLOG_POST}/${id}`,
    fetcher,
  );
  return { data, error, loading, mutate };
};

// Projects
export const addNewProject = async (values) => {
  const result = await mutationRequest(ADD_PROJECTS, "post", values);
  return result;
};
export const updateProject = async (id, values) => {
  const result = await mutationRequest(
    EDIT_PROJECTS.replace("{id}", id),
    "put",
    values,
  );
  return result;
};
export const deleteProject = async (id) => {
  const result = await mutationRequest(
    DELETE_PROJECTS.replace("{id}", id),
    "delete",
  );
  return result;
};
export const fetchAllProjects = () => {
  const { data, error, loading, mutate } = useSWR(FETCH_ALL_PROJECTS, fetcher);
  return { data, error, loading, mutate };
};
export const fetchSingleProject = (id) => {
  const { data, error, loading, mutate } = useSWR(
    `${FETCH_SINGLE_PROJECTS}/${id}`,
    fetcher,
  );
  return { data, error, loading, mutate };
};

// Experience
export const addNewExperience = async (values) => {
  const result = await mutationRequest(ADD_EXPERIENCE, "post", values);
  return result;
};
export const updateExperience = async (id, values) => {
  const result = await mutationRequest(
    EDIT_EXPERIENCE.replace("{id}", id),
    "put",
    values,
  );
  return result;
};
export const fetchAllExperience = () => {
  const { data, error, loading, mutate } = useSWR(
    FETCH_ALL_EXPERIENCE,
    fetcher,
  );
  return { data, error, loading, mutate };
};
export const deleteExperience = async (id) => {
  const result = await mutationRequest(
    DELETE_EXPERIENCE.replace("{id}", id),
    "delete",
  );
  return result;
};

// Education
export const addNewEducation = async (values) => {
  const result = await mutationRequest(ADD_EDUCATION, "post", values);
  return result;
};
export const updateEducation = async (id, values) => {
  const result = await mutationRequest(
    EDIT_EDUCATION.replace("{id}", id),
    "put",
    values,
  );
  return result;
};
export const fetchAllEducation = () => {
  const { data, error, loading, mutate } = useSWR(FETCH_ALL_EDUCATION, fetcher);
  return { data, error, loading, mutate };
};
export const deleteEducation = async (id) => {
  const result = await mutationRequest(
    DELETE_EDUCATION.replace("{id}", id),
    "delete",
  );
  return result;
};

// About
export const addNewAbout = async (values) => {
  const result = await mutationRequest(ADD_ABOUT, "post", values);
  return result;
};
export const updateAbout = async (id, values) => {
  const result = await mutationRequest(
    EDIT_ABOUT.replace("{id}", id),
    "put",
    values,
  );
  return result;
};
export const fetchAllAbout = () => {
  const { data, error, loading, mutate } = useSWR(FETCH_ALL_ABOUT, fetcher);
  return { data, error, loading, mutate };
};
export const deleteAbout = async (id) => {
  const result = await mutationRequest(
    DELETE_ABOUT.replace("{id}", id),
    "delete",
  );
  return result;
};

// skill
export const addNewSkill = async (values) => {
  const result = await mutationRequest(ADD_SKILL, "post", values);
  return result;
};
export const updateSkill = async (id, values) => {
  const result = await mutationRequest(
    EDIT_SKILL.replace("{skillId}", id).replace(
      "{publicId}",
      values?.avatarImgPublicId?.[0] || "",
    ),
    "put",
    values,
  );
  return result;
};
export const fetchAllSkill = () => {
  const { data, error, loading, mutate } = useSWR(FETCH_ALL_SKILL, fetcher);
  return { data, error, loading, mutate };
};
export const deleteSkill = async (id, publicId) => {
  const result = await mutationRequest(
    DELETE_SKILL.replace("{skillId}", id),
    "delete",
    null,
    false,
    { publicId },
  );
  return result;
};
