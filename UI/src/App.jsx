
// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./component/Login/Login";
// import Register from "./component/Registeration/Register";
// import UserDashboard from "./component/UserDashboard/UserDashboard";
// import AdminDashboard from "./component/AdminDashboard/AdminDashboard";
// import ProtectedRoute from "./component/Protected/ProtectRoute";
// import GuestProtectedRoute from "./component/Protected/GuestProtectedRoute";
// import UserList from "./component/UserList/UserList";
// import EditUser from "./component/UserList/EditUser";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Guest (Login) */}
//         <Route
//           path="/"
//           element={
//             <GuestProtectedRoute>
//               <Login />
//             </GuestProtectedRoute>
//           }
//         />

//         {/* Admin only */}
//         <Route
//           path="/create_user"
//           element={
//             <ProtectedRoute role="Admin">
//               <Register />
//             </ProtectedRoute>
//           }
//         />

//         {/* User Dashboard */}
//         <Route
//           path="/user-dashboard"
//           element={
//             <ProtectedRoute role="User">
//               <UserDashboard />
//             </ProtectedRoute>
//           }
//         />

//         {/* Admin Dashboard */}
//         <Route
//           path="/admin-dashboard"
//           element={
//             <ProtectedRoute role="Admin">
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         />

//         {/* Extra routes (agar ye bhi protected chahiye to batao) */}
//         <Route path="/UserList" element={<UserList />} />
//         <Route path="/edit-user/:id" element={<EditUser />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/Login/Login";
import Register from "./component/Registeration/Register";
import UserDashboard from "./component/UserDashboard/UserDashboard";
import AdminDashboard from "./component/AdminDashboard/AdminDashboard";
import ProtectedRoute from "./component/Protected/ProtectRoute";
import GuestProtectedRoute from "./component/Protected/GuestProtectedRoute";
import UserList from "./component/UserList/UserList";
import EditUser from "./component/UserList/EditUser";
import AdminLayout from "./component/AdminDashboard/AdminLayout"; // <- import

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Guest (Login) */}
        <Route
          path="/"
          element={
            <GuestProtectedRoute>
              <Login />
            </GuestProtectedRoute>
          }
        />

        {/* Admin routes with persistent Navbar */}
        <Route
          element={
            <ProtectedRoute role="Admin">
              <AdminLayout /> {/* Navbar + Outlet */}
            </ProtectedRoute>
          }
        >
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/create_user" element={<Register />} />
          <Route path="/UserList" element={<UserList />} />
          <Route path="/edit-user/:id" element={<EditUser />} />
        </Route>

        {/* User Dashboard */}
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute role="User">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
