import React from "react";
import { RiArrowDownSFill } from "react-icons/ri";

const ProductListFilterInput = ({ legendTag, placeholder }) => {
  return (
    <div>
      <form className="">
        <fieldset className="border border-[#e4e6fc] rounded-sm px-2 py-1">
          <legend className="text-black text-[12px]">{legendTag}</legend>
          <div className="flex items-center justify-between">
            <input
              type="text"
              className="outline-none text-[#7c5cc4] text-[14px] placeholder:text-[#7c5cc4]"
              placeholder={placeholder}
            />
            <RiArrowDownSFill />
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default ProductListFilterInput;
