import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AboutForm from "../../../components/form-modals/AboutForm";

const AddAbout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Receive type and optional data from location.state
  const { type = "create", data = null } = location.state || {};

  const handleSaved = () => {
    // Navigate back to personal info list after save
    navigate("/about-list");
  };

  return (
    <div>
      <AboutForm type={type} data={data} onSaved={handleSaved} />
    </div>
  );
};

export default AddAbout;
