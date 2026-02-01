import { MoveUpRight } from "lucide-react";
import React from "react";

const ViewMoreButtonPrim = ({ title, href, download = false, onClick }) => {
  const buttonClass =
    "bg-black rounded-full flex gap-[16px] items-center py-[12px] px-[32px] w-fit group hover:bg-transparent border border-primary-light cursor-pointer transition duration-1000 ease-in-out";

  const content = (
    <>
      <span className="text-white text-lg group-hover:text-black ">
        {title}
      </span>
      <div className="rotate-16 bg-white rounded-full flex items-center p-[10.39px] group-hover:bg-black">
        <MoveUpRight className="group-hover:text-white text-black w-[16px] h-[16px]"/>
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        download={download}
        className={buttonClass}
      >
        {content}
      </a>
    );
  }

  return (
    <div onClick={onClick} className={buttonClass}>
      {content}
    </div>
  );
};

export default ViewMoreButtonPrim;
