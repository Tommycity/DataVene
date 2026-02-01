import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../public/styles/global.css";
import HomePage from "./pages/homepage";
import AboutPage from "./pages/about";
import MainLayout from "./layouts/MainLayout";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/dashboard/login/LoginPage";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardPage from "./pages/dashboard";
import BlogPostPage from "./pages/dashboard/blogs";
import AddBlogPost from "./pages/dashboard/blogs/AddBlogPost";
import ForgetPassword from "./pages/dashboard/forget-password";
import ResetPasswordPage from "./pages/dashboard/reset-password";
import ContactPage from "./pages/contact-us";
import BlogPage from "./pages/blog";
import SingleBlogPage from "./pages/blog/SingleBlogPage";
import SingleProjectPage from "./pages/project/SingleProjectPage";
import ProjectPage from "./pages/project/index";
import AddProject from "./pages/dashboard/projects/Addproject";
import ProjectPageAdmin from "./pages/dashboard/projects/index";
import AboutPageAdmin from "./pages/dashboard/about";
import AddAbout from "./pages/dashboard/about/AddAbout";
import SkillPage from "./pages/dashboard/skill";
import AddSkill from "./pages/dashboard/skill/AddSkill";

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </Route>

          <Route element={<MainLayout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectPage />} />
            <Route path="/projects/:id" element={<SingleProjectPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blogs" element={<BlogPage />} />
            <Route path="/blogs/:id" element={<SingleBlogPage />} />
          </Route>

          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/all-blogs" element={<BlogPostPage />} />
            <Route path="/add-blogpost" element={<AddBlogPost />} />
            <Route path="/about-list" element={<AboutPageAdmin />} />
            <Route path="/add-about" element={<AddAbout />} />
            <Route path="/all-projects" element={<ProjectPageAdmin />} />
            <Route path="/add-project" element={<AddProject />} />
            <Route path="/add-about" element={<AddAbout />} />
            <Route path="/all-skills" element={<SkillPage />} />
            <Route path="/add-skill" element={<AddSkill />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
