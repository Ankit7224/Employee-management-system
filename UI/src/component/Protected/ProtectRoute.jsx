
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // ✅ Normalize role (ONLY Admin / User)
  const userRole =
    user.role === 1 || user.role === "1" || user.role === "Admin"
      ? "Admin"
      : "User";

  // ❌ Role mismatch → correct dashboard
  if (role && role !== userRole) {
    return (
      <Navigate
        to={userRole === "Admin"
          ? "/admin-dashboard"
          : "/user-dashboard"}
        replace
      />
    );
  }

  // ✅ Allowed
  return children;
};

export default ProtectedRoute;




