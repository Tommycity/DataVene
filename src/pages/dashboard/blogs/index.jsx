import Table from "../../../components/globals/Table";

import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { FETCH_ALL_BLOGS, DELETE_BLOG_POST } from "../../../constants/routes";
import { fetcher } from "../../../api/fetcher";
import { mutationRequest } from "../../../api/sender";
import { successMessage, errorMessage } from "../../../utils/helpers";
import { blogTableColumn } from "../../../data/admin-dashboard/blogPost";
import BlogRowTemplate from "../../../components/admin-component/blogPost/BlogRowTemplate";

const BlogPage = () => {
  const navigate = useNavigate();
  const { data, error, mutate } = useSWR(FETCH_ALL_BLOGS, fetcher);
  console.log("data", data);

  if (error) return <div>Error loading personal info.</div>;
  if (!data) return <div>Loading...</div>;

  const handleCreate = () => {
    navigate("/add-blogpost", { state: { type: "create" } });
  };

  const handleEdit = (item) => {
    navigate("/add-blogpost", { state: { type: "update", data: item } });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const res = await mutationRequest(
        DELETE_BLOG_POST.replace("{id}", id),
        "delete"
      );
      if (res?.status === 200) {
        successMessage(res?.data?.message || "Deleted successfully");
        // Optimistic update: filter out deleted item from cache
        const blogList = Array.isArray(data) ? data : data?.data || [];
        const updatedData = blogList.filter((item) => item._id !== id);
        mutate(updatedData, false);
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
            tableColumn={blogTableColumn}
            rowData={Array.isArray(data) ? data : data?.data || []}
            rowTemplate={BlogRowTemplate}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
