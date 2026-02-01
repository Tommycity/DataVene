import { useEffect, useState } from "react";
import { marqueeData } from "../../data/home/marquee";
import { roleData } from "../../data/home/role";
import UserNavbar from "../globals/UserNavbar";

const Herosection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roleData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roleData]);

  return (
    <div className="relative w-full bg-gradient-to-r from-[#D5D5D5] via-[#B5B3AF] to-[#87837d5c] flex flex-col">
      <UserNavbar />

      <div className="flex items-center justify-center w-[800px] h-full mx-auto mt-4">
        <img
          src="/images/Ayewa-hero-image.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="animate-scroll absolute top-[563px] text-primary-light text-[180px] font-semibold tracking-[100%] -leading-[4%]">
        {
          marqueeData.map((text, i) => (
            <span key={i} className="flex justify-center items-center flex-shrink-0">
              {text}
            </span>
          ))
        }
      </div>

      <div className="absolute top-[481px] right-[326px] flex items-center gap-2">
        <img src="/images/arrow-left-outline.png" alt="" />
        <div key={index} className="text-[32px]">
          {roleData[index]}
        </div>
      </div>
    </div>
  );
};

export default Herosection;
