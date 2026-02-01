import React from "react";

const Header = ({initialheader, finalHeader, textOverlay, overlayClass, headerClass}) => {
  return (
    <div className="text-8xl flex items-center justify-center relative mb-20">
        <span className={`opacity-20 font-bold ${overlayClass}`}>{textOverlay}</span>

        {/* <div className={`font-bold absolute top-[25%] right-[39%] text-5xl opacity-100 ${headerClass}`}>
          {initialheader} <span className="text-secondary-light">{finalHeader}</span>
        </div> */}
      
    </div>
  );
};

export default Header;
