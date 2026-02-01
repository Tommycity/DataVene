// aboutTableColumn.js
export const aboutTableColumn = [
  {
    title: "Email",
    className: "font-semibold",
  },
  {
    title: "CV",
    className: "font-semibold",
  },
  {
    title: "Experience",
    className: "font-semibold",
  },
  {
    title: "Education",
    className: "font-semibold",
  },
  {
    title: "Certifications",
    className: "font-semibold",
  },
  {
    title: "Actions",
    className: "font-semibold",
  },
];

// AboutRowTemplate.jsx
import { RiDeleteBin6Line } from "react-icons/ri";
import { FileText, ExternalLink } from "lucide-react";

function AboutRowTemplate(
  item,
  i,
  openIndex,
  setOpenIndex,
  handleEdit,
  handleDelete,
) {
  return (
    <tr
      key={i}
      className={`text-xs text-gray-600 border-t-gray-200 border-t-[1px] hover:bg-[#f8f9fa] cursor-pointer text-[14px] ${
        i % 2 === 0 ? "bg-white" : "bg-[#f8f9fa]"
      }`}
    >
      {/* Email */}
      <td className="px-4 py-3 text-start">
        {item?.email || "N/A"}
      </td>

      {/* CV Link */}
      <td className="px-4 py-3 text-start">
        {item?.cvUrl ? (
          <a
            href={item.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
          >
            <FileText className="w-4 h-4" />
            <span>View CV</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        ) : (
          <span className="text-gray-400">No CV</span>
        )}
      </td>

      {/* Experience Count */}
      <td className="px-4 py-3 text-start">
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
          {item?.experience?.length || 0} roles
        </span>
      </td>

      {/* Education Count */}
      <td className="px-4 py-3 text-start">
        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
          {item?.education?.length || 0} degrees
        </span>
      </td>

      {/* Certifications Count */}
      <td className="px-4 py-3 text-start">
        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
          {item?.certification?.length || 0} certs
        </span>
      </td>

      {/* Actions */}
      <td className="px-4 py-3">
        <div className="flex justify-center gap-2">
          <button
            onClick={() => handleEdit(item)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(item._id)}
            className="px-3 py-1 bg-red-500 text-white rounded flex items-center gap-1 hover:bg-red-600 transition-colors"
          >
            <RiDeleteBin6Line />
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

export default AboutRowTemplate;