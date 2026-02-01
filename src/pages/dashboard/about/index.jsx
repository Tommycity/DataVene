import Table from "../../../components/globals/Table";
import { aboutTableColumn } from "../../../data/admin-dashboard/about";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { FETCH_ALL_ABOUT } from "../../../constants/routes";
import { fetcher } from "../../../api/fetcher";
import { successMessage, errorMessage } from "../../../utils/helpers";
import AboutRowTemplate from "../../../components/admin-component/about/AboutRowTemplate";
import { deleteAbout } from "../../../api";

const AboutPageAdmin = () => {
  const navigate = useNavigate();
  const { data, error, mutate } = useSWR(FETCH_ALL_ABOUT, fetcher);

  if (error) return <div>Error loading personal info.</div>;
  if (!data) return <div>Loading...</div>;

  const handleCreate = () => {
    navigate("/add-about", { state: { type: "create" } });
  };

  const handleEdit = (item) => {
    navigate("/add-about", { state: { type: "update", data: item } });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const res = await deleteAbout(id);

      if (res?.status === 200) {
        successMessage(res?.data?.message || "Deleted successfully");
        mutate(
          data.filter((item) => item._id !== id),
          false,
        );
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
            tableColumn={aboutTableColumn}
            rowData={data}
            rowTemplate={AboutRowTemplate}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutPageAdmin;
