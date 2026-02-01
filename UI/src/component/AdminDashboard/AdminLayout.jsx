// AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import AdminDashboard from "../AdminDashboard/AdminDashboard";

const AdminLayout = () => {
  return (
    <>
    <div>
      <AdminDashboard />
      <div className="mt-16 p-4">
        <Outlet /> {/* This is where nested routes will render */}
      </div>
    </div>
    </>
  );
};

export default AdminLayout;
