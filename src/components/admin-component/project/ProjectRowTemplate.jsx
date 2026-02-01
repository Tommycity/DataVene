import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import RichTextDisplay from "../../form/RichTextDisplay";

function ProjectRowTemplate(
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
      {/* Main Project Image */}
      <td className="w-1/5 p-3 table-cell text-start">
        <img
          src={item?.mainAvatar || item?.avatarImg}
          alt={item?.projectTitle || "Project"}
          className="h-12 w-12 object-cover rounded"
        />
      </td>

      {/* Project Title */}
      <td className="w-1/5 p-3 table-cell text-start">
        {item?.projectTitle || "Untitled"}
      </td>

      {/* Project Description */}
      <td className="w-1/5 p-3 table-cell text-start">
        {/* {item?.projectContent?.projectSubContent?.slice(0, 100)}
        {item?.projectContent?.projectSubContent?.length > 100 && '...'} */}
        <RichTextDisplay
          content={item?.projectContent?.projectSubContent}
          maxLength={100}
          preview={true}
        />
      </td>

      {/* Tech Stack */}
      <td className="w-1/5 p-3 table-cell text-start">
        <div className="flex flex-wrap gap-1">
          {item?.projectStack?.slice(0, 2).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-[10px]"
            >
              {tech}
            </span>
          ))}
          {item?.projectStack?.length > 2 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-[10px]">
              +{item.projectStack.length - 2}
            </span>
          )}
        </div>
      </td>

      {/* Actions */}
      <td className="w-1/5 p-3 flex justify-center gap-2">
        <button
          onClick={() => handleEdit(item)}
          className="px-2 py-1 bg-blue-500 text-white rounded flex items-center gap-1 text-xs"
        >
          <FiEdit2 size={12} />
          Edit
        </button>
        <button
          onClick={() => handleDelete(item._id)}
          className="px-2 py-1 bg-red-500 text-white rounded flex items-center gap-1 text-xs"
        >
          <RiDeleteBin6Line size={12} />
          Delete
        </button>
      </td>
    </tr>
  );
}

export default ProjectRowTemplate;
