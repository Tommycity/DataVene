import { MoveDown, MoveDownLeft, MoveUpRight } from "lucide-react";
import React from "react";

const ViewMoreButtonSec = ({
  title,
  onClick,
  slantedbg,
  arrowDown,
  backArrow,
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-transparent font-semibold text-primary-light border border-primary-light rounded-full flex gap-[14px] items-center py-[10px] px-[32px] w-fit group hover:bg-black  cursor-pointer transition duration-1000 ease-in-out"
    >
      {backArrow ? (
        <>
          <div
            className={`rotate-16 rounded-full flex items-center p-[10.39px] ${slantedbg ? "bg-primary-light text-white group-hover:bg-white" : ""}`}
          >
            <MoveDownLeft
              className={` w-[18px] h-[18px] ${slantedbg ? "group-hover:text-black" : "group-hover:text-white"}`}
            />
          </div>
          <span className="text-primary-light text-lg group-hover:text-white ">
            {title}
          </span>

        </>
      ) : (
        <>
          <span className="text-primary-light text-lg group-hover:text-white ">
            {title}
          </span>

          <div
            className={`rotate-16 rounded-full flex items-center p-[10.39px] ${slantedbg ? "bg-primary-light text-white group-hover:bg-white" : ""}`}
          >
            {arrowDown ? (
              <MoveDown
                className={` w-[18px] h-[18px] -rotate-[16deg] ${slantedbg ? "group-hover:text-black" : "group-hover:text-white"}`}
              />
            ) : (
              <MoveUpRight
                className={` w-[18px] h-[18px] ${slantedbg ? "group-hover:text-black" : "group-hover:text-white"}`}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ViewMoreButtonSec;
