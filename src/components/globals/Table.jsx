import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
const Table = ({
  tableColumn,
  rowData,
  rowTemplate,
  deleIcon,
  view,
  handleEdit,
  handleDelete,
}) => {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <table className="overflow-x-auto w-full">
      <thead
        className={
          view
            ? "bg-white mb-3 text-gray-700 text-center w-full border-collapse border-[1px] border-[rgb(228,230,252)]"
            : "bg-white mb-3 text-gray-700 w-full border-collapse border-b border-gray-700"
        }
      >
        <tr className="">
          {tableColumn?.map((item, i) => (
            <th
              key={i}
              className={` ${item.className} text-start  text-[13px]`}
            >
              <div className="">{item.title}</div>
            </th>
          ))}
          {deleIcon && (
            <th>
              <RiDeleteBin6Line />
            </th>
          )}
        </tr>
      </thead>
      <tbody className="mt-20 overflow-y-scroll">
        {rowData?.map((item, i) =>
          rowTemplate(
            item,
            i,
            openIndex,
            setOpenIndex,
            handleEdit,
            handleDelete
          )
        )}
      </tbody>
    </table>
  );
};

export default Table;
