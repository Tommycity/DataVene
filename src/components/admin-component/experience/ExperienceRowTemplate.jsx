import { RiDeleteBin6Line } from "react-icons/ri";

function ExperienceRowTemplate(
  item,
  i,
  openIndex,
  setOpenIndex,
  handleEdit,
  handleDelete
) {
  return (
    <tr
      key={i}
      className={`w-4 text-xs text-gray-600 border-t-gray-200 border-t-[1px] hover:bg-[#f8f9fa] cursor-pointer text-[14px] ${
        i % 2 === 0 ? "bg-white" : "bg-[#f8f9fa]"
      }`}
    >
      <td className="w-1/4 table-cell text-start">{item?.skill}</td>
      <td className="w-1/4 table-cell text-start">{item?.description}</td>
      <td className="w-1/4 table-cell text-start">{item?.duration}</td>
      <td className="w-1/4 flex justify-center gap-2">
        <button
          onClick={() => handleEdit(item)}
          className="px-2 py-1 bg-blue-500 text-white rounded"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(item._id)}
          className="px-2 py-1 bg-red-500 text-white rounded flex items-center gap-1"
        >
          <RiDeleteBin6Line />
          Delete
        </button>
      </td>
    </tr>
  );
}

export default ExperienceRowTemplate;
