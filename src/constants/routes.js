export const LOGIN_ADMIN = "/auth/login";
export const LOGOUT_ADMIN = "/auth/logout";
export const FORGET_PASSWORD = "/auth/forget-password";
export const RESET_PASSWORD = "/auth/reset-password";
// export const LOGGED_IN_ADMIN = "/auth/get-admin";
// export const CHECK_SESSION = "/auth/check-session";

//Blogs
export const FETCH_ALL_BLOGS = "/blog/getAllBlogs";
export const ADD_BLOG_POST = "/blog/blog-post";
export const EDIT_BLOG_POST = "/blog/single-blog/{id}";
export const DELETE_BLOG_POST = "/blog/delete-blog/{id}";
export const FETCH_SINGLE_BLOG_POST = "/blog/single-blog";

//Projects
export const FETCH_ALL_PROJECTS = "/project/getAllProject";
export const ADD_PROJECTS = "/project/post-project";
export const EDIT_PROJECTS = "/project/updatedProject/{id}";
export const DELETE_PROJECTS = "/project/deletedProject/{id}";
export const FETCH_SINGLE_PROJECTS = "/project/getSingleProject";

//Experience
export const FETCH_ALL_EXPERIENCE = "/experience/get-experienceInfo";
export const ADD_EXPERIENCE = "/experience/create";
export const EDIT_EXPERIENCE = "/experience/updated-experienceInfo/{id}";
export const DELETE_EXPERIENCE = "/experience/delete-eperience/{id}";

//Education
export const FETCH_ALL_EDUCATION = "/education/get-educationInfo";
export const ADD_EDUCATION = "/education/get-educationInfo";
export const EDIT_EDUCATION = "/education/updated-educationInfo/{id}";
export const DELETE_EDUCATION = "/education/updated-educationInfo/{id}";

//About
export const FETCH_ALL_ABOUT = "/about/get-aboutInfo";
export const ADD_ABOUT = "/about/about-info";
export const EDIT_ABOUT = "/about/updated-aboutInfo/{id}";
export const DELETE_ABOUT = "/about/deleted-aboutInfo/{id}";

//skill
export const FETCH_ALL_SKILL = "/skill/get-skill";
export const ADD_SKILL = "/skill/create";
export const EDIT_SKILL = "/skill/update-avatar/{skillId}/{publicId}";
export const DELETE_SKILL = "/skill/delete-avatar/{skillId}";
