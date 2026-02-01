import { FaArrowDown, FaBars, FaShoppingBag, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import * as FaIcons from "react-icons/fa";
import { adminMenuDropdown } from "../../data/admin-dashboard/navbar";
import { logoutAdmin } from "../../api";
import Cookies from "js-cookie";
import { successMessage, errorMessage } from "../../utils/helpers";

const NavBar = ({ onToggleSidebar, data }) => {
  const [showPlusDropdown, setShowPlusDropdown] = useState(false);
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await logoutAdmin();
      console.log("logout response:", res);
      if (res?.status === 200 || res?.status === 201) {
        Cookies.remove("u-x-key");
        successMessage("Logged out successfully");
        setTimeout(() => navigate("/login"), 100);
      } else {
        errorMessage(res?.data?.message || res?.data?.error || "Logout failed");
      }
    } catch (err) {
      console.error("logout error", err);
      errorMessage("Logout failed");
    }
  };

  return (
    <div className="flex py-2 px-6 justify-between items-center text-white bg-primary-light">
      <div>
        <FaBars
          className="text-4xl p-2 border-[1px] border-[#ff7588] rounded-md text-white hover:bg-[#ff7588] hover:text-white"
          onClick={onToggleSidebar}
        />
      </div>

      <div className="flex items-center gap-3 relative">
        {/* Admin Dropdown */}
        <div
          className="flex gap-1 items-center hover:bg-secondary-light  hover:cursor-pointer p-2 rounded-md text-sm"
          onClick={() => {
            setShowAdminDropdown((prev) => !prev);
            setShowPlusDropdown(false);
          }}
        >
          <FaUser className="text-[#ff7588]" />
          <span>{data ? data?.username : "Admin"}</span>
          <FaArrowDown className="text-[#ff7588]" />
        </div>
        {showAdminDropdown && (
          <ul className="absolute top-12 right-0 bg-white shadow-md rounded-md w-40 py-2 shadow-gray-400 z-10">
            {adminMenuDropdown?.map((adminItem, index) => {
              const IconComponent = FaIcons[adminItem.icon];
              const isLogout = adminItem.title === "Log-out";
              return (
                <li key={index}>
                  {isLogout ? (
                    <button
                      onClick={() => {
                        setShowAdminDropdown(false);
                        setShowLogoutModal(true);
                      }}
                      className="w-full block px-4 py-2 text-gray-800 hover:bg-gray-200 hover:text-gray-700 text-[14px] text-left"
                    >
                      <div className="flex items-center gap-2">
                        {IconComponent && <IconComponent />}
                        <span className="hover:text-green-700">
                          {adminItem.title}
                        </span>
                      </div>
                    </button>
                  ) : (
                    <Link
                      to={adminItem.link}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200 hover:text-gray-700 text-[14px]"
                      onClick={() => setShowAdminDropdown(false)}
                    >
                      <div className="flex items-center gap-2">
                        {IconComponent && <IconComponent />}
                        <span className="hover:text-green-700">
                          {adminItem.title}
                        </span>
                      </div>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="w-screen h-screen bg-black/65 fixed top-0 left-0 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Confirm Logout
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to logout?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  handleLogout();
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
