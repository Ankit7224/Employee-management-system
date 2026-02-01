import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users", {
        params: { startDate, endDate }, // send date filter to backend
      });
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [startDate, endDate]); // fetch on date change

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      alert("User deleted successfully");
      fetchUsers();
    } catch (err) {
      console.log(err);
      alert("Failed to delete user");
    }
  };

  return (
    <div className="pt-28 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center ">
          <h2 className="text-3xl font-bold text-gray-800">User List</h2>
          <button
            onClick={() => navigate("/create_user")}
            className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-full shadow-lg transition"
          >
            Add Member
          </button>
        </div>

        {/* Date Filter */}
        <div className="flex gap-4 mb-6 flex-wrap">
          <div>
            <label className="text-sm font-semibold">From Date</label>
            <input
              type="date"
              value={startDate}
              max={today}
              onChange={(e) => setStartDate(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">To Date</label>
            <input
              type="date"
              value={endDate}
              min={startDate}
              max={today}
              onChange={(e) => setEndDate(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>

          <button
            onClick={() => {
              setStartDate("");
              setEndDate("");
            }}
            className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded self-end"
          >
            Clear
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Password</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Gender</th>
                <th className="p-3 text-center">Actions</th>
                <th className="p-3 text-center">Bank Name</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr
                    key={user._id}
                    className={`border-b ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-indigo-50`}
                  >
                    <td className="p-3">
                      <img
                        src={`http://localhost:5000/uploads/${user.image}`}
                        alt={user.name}
                        className="w-10 h-10"
                      />
                    </td>
                    <td className="p-3 text-gray-700">{user.name || "N/A"}</td>
                    <td className="p-3 text-gray-700">{user.email}</td>
                    <td className="p-3 text-gray-600">{user.password}</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          user.role === "Admin" || user.role === "1"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {user.role === "Admin" || user.role === "1" ? "Admin" : "User"}
                      </span>
                    </td>
                    <td className="p-3 text-gray-700">{user.gender || "N/A"}</td>
                    <td className="p-3 text-center space-x-2">
                      <button
                        onClick={() => navigate(`/edit-user/${user._id}`)}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-md transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-600 hover:bg-red-500 text-white px-4 py-1.5 rounded-md transition"
                      >
                        Delete
                      </button>
                    </td>
                    <td className="p-3 text-gray-700 text-center">{user.bankName || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center p-6 text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <button
            onClick={() => navigate(-1)}
            className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg mt-4"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserList;
  


function x () {
  for (var i = 1; i <= 5; i++)  {
  setTimeout(function () {
    console.log(i)
  },1000);
}
  console.log("namste javascript");
}
x();