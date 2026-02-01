
import { useLocation, useNavigate } from "react-router-dom";
import SkillForm from "../../../components/form-modals/SkillForm";

const AddSkill = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Receive type and optional data from location.state
  const { type = "create", data = null } = location.state || {};

  const handleSaved = () => {
    // Navigate back to personal info list after save
    navigate("/all-skills");
  };

  return (
    <div>
      <SkillForm type={type} data={data} onSaved={handleSaved} />
    </div>
  );
};

export default AddSkill;
