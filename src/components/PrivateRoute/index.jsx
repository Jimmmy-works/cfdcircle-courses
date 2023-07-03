import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { PATHS } from "../../constant/pathnames";
import { LOCAL_STORAGE } from "../../constant/localstorage";
import { useAuthen } from "../AuthenContext";

export default function PrivateRoute({ redirectPath = `${PATHS.HOME}` }) {
  const { openAuthenModal } = useAuthen();
  let isLogin = localStorage.getItem(LOCAL_STORAGE.token);
  if (!isLogin) {
    openAuthenModal();
    return <Navigate to={redirectPath} />;
  }
  return (
    <>
      <Outlet />
    </>
  );
}
