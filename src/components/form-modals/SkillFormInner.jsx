import CustomFormik from "../form/CustomFormik";
import AppSubmitButton from "../form/AppSubmitButton";
import AppFileFieldAvatarOnly from "../form/AppFileFieldAvatarOnly";
import { useState } from "react";
const SkillFormInner = ({
  type,
  handleSubmit,
  data = null,
  selectedFiles,
  handleFileChange,
  handleRemoveFile,
  fileError,
}) => {
  const initialValues = {};

  return (
    <CustomFormik onSubmit={handleSubmit} initialValues={initialValues}>
      <div className="w-full flex flex-col gap-5 p-5 text-black">
        <h2 className="text-xl font-bold">
          {type === "create" ? "Add New Skill" : "Edit Skill"}
        </h2>

        <p className="text-gray-500 mb-3">Fields marked with * are required.</p>

        <div className="grid grid-cols-1 gap-4 w-full">
          <div className="">
            <AppFileFieldAvatarOnly
              label="Upload Images"
              handleChange={handleFileChange}
              files={selectedFiles}
              onRemoveFile={handleRemoveFile}
              error={fileError}
              multiple={true}
            />
          </div>
        </div>

        <div className="mt-5 w-full flex">
          <AppSubmitButton
            title={type === "create" ? "Add Skill" : "Update SKill"}
          />
        </div>
      </div>
    </CustomFormik>
  );
};

export default SkillFormInner;
