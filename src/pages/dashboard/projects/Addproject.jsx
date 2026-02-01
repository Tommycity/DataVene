
import { useLocation, useNavigate } from "react-router-dom";
import ProjectForm from "../../../components/form-modals/ProjectForm";

const AddProject = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Receive type and optional data from location.state
  const { type = "create", data = null } = location.state || {};

  const handleSaved = () => {
    // Navigate back to project list after save
    navigate("/all-projects");
  };

  return (
    <div>
      <ProjectForm type={type} data={data} onSaved={handleSaved} />
    </div>
  );
};

export default AddProject;
