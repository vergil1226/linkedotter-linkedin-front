import React, { useEffect } from "react";
import NavBar from "../Pages/NavBar";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  let Token = localStorage.getItem("TokenLogin");
  let role = localStorage.getItem("Role");

  return Token && role == "admin" ? (
    <div style={{ width: "100%" }}>
      <div>
        <NavBar />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  ) : (
    <>
      {Token && role == "user" ? <Navigate to="/" /> : <Navigate to="/login" />}
    </>
  );
}
