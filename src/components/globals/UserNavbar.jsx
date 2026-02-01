import React, { useState, useEffect } from "react";
import { menuList } from "../../data/home/menu";
import { Link, useLocation } from "react-router-dom";
import LiveTimeClock from "../../utils/LiveTimeClock";

export const UserNavbar = () => {
  const [activeMenu, setActiveMenu] = useState("Home");
  const location = useLocation();

  useEffect(() => {
    // Find the active menu based on current route
    let currentMenu = menuList?.find(
      (menu) => menu?.url === location?.pathname,
    );

    // If no exact match and path starts with /projects/, consider it as Projects menu
    if (!currentMenu && location?.pathname.startsWith("/projects/")) {
      currentMenu = menuList?.find((menu) => menu?.url === "/projects");
    }

    // If no exact match and path starts with /blogs/, consider it as Blogs menu
    if (!currentMenu && location?.pathname.startsWith("/blogs/")) {
      currentMenu = menuList?.find((menu) => menu?.url === "/blogs");
    }

    if (currentMenu) {
      setActiveMenu(currentMenu?.title);
    }
  }, [location?.pathname]);

  return (
    <div className="flex items-center justify-between pt-[40px] mx-[230px]">
      <div className="flex items-center gap-1 p-[8px]">
        <img
          src="/images/web-dark-theme.png"
          alt="web_image"
          className="w-[20px] h-[20px]"
        />
        <LiveTimeClock className="text-primary-light font-semibold" />
      </div>
      <div className="flex items-center gap-[30px]">
        {menuList?.map((menu, index) => (
          <Link
            key={index}
            to={menu?.url}
            className={`${
              activeMenu === menu?.title
                ? "text-black font-medium border-b-2 text-lg"
                : "text-lg font-medium text-primary-light"
            } `}
            onClick={() => setActiveMenu(menu?.title)}
          >
            {menu?.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserNavbar;
