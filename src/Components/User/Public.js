import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import NavBar from "../Pages/NavBar";

export default function Public() {
  let Token = localStorage.getItem("TokenLogin");
  let role = localStorage.getItem("Role");
  return !role ? (
    <div style={{ width: "100%" }}>
      <div>
        {/* <NavBar /> */}
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  ) : (
    <>
      {Token && role == "admin" ? (
        <Navigate to="/admin" />
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}
