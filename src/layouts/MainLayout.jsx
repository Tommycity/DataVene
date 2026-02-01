
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <Outlet />
    </div>
  );
};

export default MainLayout;
