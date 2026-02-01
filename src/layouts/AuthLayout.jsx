import { Outlet } from "react-router-dom";
// import { checkSession } from "../api";
// import { useEffect } from "react";

const AuthLayout = () => {
  // const { data } = checkSession();
  // useEffect(() => {
  //   if (data) {
  //     window.location.replace("/dashboard");
  //   }
  // }, [data]);
  return (
    <div className="">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
