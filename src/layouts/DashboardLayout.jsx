import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
// import { fetchLoggedInAdmin } from "../api";
import LeftsideBar from "../components/globals/LeftsideBar";
import NavBar from "../components/globals/NavBar";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  // const { data, loading } = fetchLoggedInAdmin();
  // useEffect(() => {
  //   if (!loading && !data) {
  //     window.location.replace("/login");
  //   }
  // }, [data]);
  return (
    <div className="flex w-screen h-full">
      {/* left side */}
      <div className={`${sidebarOpen ? "block" : "hidden"} flex w-[20%]`}>
        <LeftsideBar />
      </div>
      {/* right side */}
      <div className="w-full flex flex-col gap-1">
        {/* navbar side */}
        <NavBar
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          // data={data?.data}
        />
        {/* main  */}
        <div className=" p-3 lg:p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
