
import { useLocation, useNavigate } from "react-router-dom";
import BlogForm from "../../../components/form-modals/BlogForm";

const AddBlogPost = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Receive type and optional data from location.state
  const { type = "create", data = null } = location.state || {};

  const handleSaved = () => {
    // Navigate back to blog list after save
    navigate("/blogs");
  };

  return (
    <div>
      <BlogForm type={type} data={data} onSaved={handleSaved} />
    </div>
  );
};

export default AddBlogPost;
