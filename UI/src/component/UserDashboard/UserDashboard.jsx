import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState(null); // ✅ MISSING STATE
  const navigate = useNavigate();

  // Get logged-in user data from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setUserEmail(user.email);
      setUserRole(user.role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="bg-neutral-primary fixed w-full z-20 top-0 start-0 border-b border-default">
      <div className="max-w-screen flex flex-wrap items-center justify-between mx-auto p-4">

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="https://jainspark.in/wp-content/uploads/2023/12/cropped-image__2_-removebg-preview.png"
            className="h-7"
            alt="Logo"
          />
          <span className="text-xl font-semibold text-heading">JainSpark</span>
        </Link>

        {/* Mobile Button */}
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center rounded-base md:hidden hover:bg-neutral-secondary-soft focus:ring-2 focus:ring-neutral-tertiary"
          onClick={() => setOpen(!open)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14" />
          </svg>
        </button>

        {/* Nav Items */}
        <div className={`${open ? "block" : "hidden"} w-full md:block md:w-auto`}>
          <ul className="flex flex-col md:flex-row md:space-x-8 bg-neutral-secondary-soft md:bg-transparent p-4 md:p-0 rounded-base">

            {/* ADMIN ONLY */}
            {userRole === "Admin" && (
              <>
                <li>
                  <Link
                    to="/UserList"
                    className="block py-2 px-3 text-black bg-brand rounded hover:bg-amber-400"
                  >
                    User List
                  </Link>
                </li>

                <li>
                  <Link
                    to="/create_user"
                    className="block py-2 px-3 text-heading bg-brand rounded hover:bg-amber-400"
                  >
                    Create User
                  </Link>
                </li>
              </>
            )}

            <li><Link to="/About" className="w-full text-left py-2 px-3 text-heading bg-brand rounded hover:bg-amber-400">About</Link></li>
            <li><Link to="/Services" className="nav-link">Services</Link></li>
            <li><Link to="/Pricing" className="w-full text-left py-2 px-3 text-heading bg-brand rounded hover:bg-amber-400">Pricing</Link></li>
            <li><Link to="/Contact" className="w-full text-left py-2 px-3 text-heading bg-brand rounded hover:bg-amber-400">Contact</Link></li>

            {/* Logged-in Email */}
            {userEmail && (
              <li className="py-2 px-3 text-white bg-blue-600 rounded">
                {userEmail}
              </li>
            )}

            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left py-2 px-3 text-heading bg-brand rounded hover:bg-amber-400"
              >
                Logout
              </button>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
