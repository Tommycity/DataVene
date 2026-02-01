import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import {
  FETCH_ALL_SKILL,
} from "../../../constants/routes";
import { fetcher } from "../../../api/fetcher";
import { successMessage, errorMessage } from "../../../utils/helpers";
import Table from "../../../components/globals/Table";
import { deleteExperience, deleteSkill } from "../../../api";
import { skillTableColumn } from "../../../data/admin-dashboard/skill";
import SkillRowTemplate from "../../../components/admin-component/skill/skill";

const SkillPage = () => {
  const navigate = useNavigate();
  const { data, error, mutate } = useSWR(FETCH_ALL_SKILL, fetcher);

  if (error) return <div>Error loading personal info.</div>;
  if (!data) return <div>Loading...</div>;

  /// Flatten the data so each image gets its own row
  const flattenedData = data.flatMap((skill) => {
    // If no images, return the skill with a placeholder
    if (!skill.avatarImg || skill.avatarImg.length === 0) {
      return [
        {
          ...skill,
          avatarImg: null, // or a placeholder image URL
          avatarImgPublicId: null,
          imageIndex: 0,
          originalSkillId: skill._id,
        },
      ];
    }

    // If has images, map each one
    return skill.avatarImg.map((img, index) => ({
      ...skill,
      avatarImg: img,
      avatarImgPublicId: skill.avatarImgPublicId[index],
      imageIndex: index,
      originalSkillId: skill._id,
    }));
  });

  const handleCreate = () => {
    navigate("/add-skill", { state: { type: "create" } });
  };

  const handleEdit = (item) => {
    navigate("/add-skill", { state: { type: "update", data: item } });
  };

  const handleDelete = async (id, publicId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const res = await deleteSkill(id, publicId);
      if (res?.status === 200) {
        successMessage(res?.data?.message || "Deleted successfully");

        // Refetch the data after deletion instead of manual filtering
        mutate();
      } else {
        errorMessage(res?.data?.error || "Delete failed");
      }
    } catch (err) {
      console.error("Delete error:", err);
      errorMessage("Delete failed");
    }
  };

  return (
    <div
      className="w-full h-screen bg-white p-5 rounded-lg shadow-sm overflow-y-visible"
      style={{ boxShadow: "2px 2px 6px #000" }}
    >
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold">Personal Info</h2>
            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Create New
            </button>
          </div>

          <Table
            tableColumn={skillTableColumn}
            rowData={flattenedData} // Use flattened data
            rowTemplate={SkillRowTemplate}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};
export default SkillPage;
