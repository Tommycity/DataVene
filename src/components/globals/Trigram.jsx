import React, { useState, useEffect } from "react";
import { menuList } from "../../data/home/menu";
import { Link } from "react-router-dom";

const Trigram = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show trigram when scrolled down more than 100px (past the navbar)
      // Adjust this value based on your navbar height
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        // Close menu when scrolling back up
        setActiveMenu(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative">
      {/* Trigram button with slide-in animation */}
      <div
        className={`flex items-center justify-center rounded-full z-50 w-[60px] h-[60px] p-[4px] bg-[#8B8B8B] right-[90px] top-[40px] fixed cursor-pointer transition-all duration-300 ease-in-out ${
          isVisible 
            ? "opacity-100 translate-x-0" 
            : "opacity-0 translate-x-20 pointer-events-none"
        }`}
        onClick={() => setActiveMenu(!activeMenu)}
      >
        <img src="/images/trigram-menubar.png" alt="Menu" />
      </div>

      {/* Menu card with fade-in animation */}
      {activeMenu && isVisible && (
        <div className="bg-[#8B8B8B] w-[428px] py-8 px-4 fixed top-[20px] right-[90px] z-50 rounded-lg animate-fadeIn">
          {/* Cancel button */}
          <div
            className="rounded-full bg-primary-light p-[16px] flex items-center w-fit justify-self-end cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setActiveMenu(!activeMenu)}
          >
            <img src="/public/images/cancel.png" alt="Close" />
          </div>

          {/* Menu section */}
          <div className="flex flex-col gap-3 mb-7">
            <span className="text-[18px]">Menu</span>

            <div className="w-full bg-white h-[1px]"></div>

            <div className="flex flex-col px-6 gap-[33px]">
              {menuList?.map((item, index) => (
                <Link
                  to={item?.url}
                  key={index}
                  className="flex items-center justify-between hover:opacity-80 transition-opacity"
                  onClick={() => setActiveMenu(false)}
                >
                  <span className="text-[32px] text-[#535353] hover:text-white transition-colors">
                    {item?.title}
                  </span>
                  <div className="w-[22px] h-[6px] bg-transparent"></div>
                </Link>
              ))}
            </div>
          </div>

          {/* Admin section */}
          <div className="flex flex-col gap-3">
            <span className="text-[18px]">Admin</span>

            <div className="w-full bg-white h-[1px]"></div>

            <div className="flex justify-between px-4">
              <Link 
                to="/admin/login" 
                className="text-[32px] text-[#535353] hover:text-white transition-colors"
                onClick={() => setActiveMenu(false)}
              >
                Admin Login
              </Link>
              <div className="w-[22px] h-[6px] bg-white border border-white"></div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Trigram;