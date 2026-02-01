

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  // Get logged-in user email from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setUserEmail(user.email); // store email
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/"); // redirect to login
  };

  return (
    <> 
      
       <nav className="bg-blue-600 fixed w-full z-20 top-0 start-0 border-b border-default">
      <div className="max-w-screen flex flex-wrap items-center justify-between mx-auto p-4">

        {/* Logo */}
        <a href="#" className="flex items-center space-x-3">
          <img
            src="https://jainspark.in/wp-content/uploads/2023/12/cropped-image__2_-removebg-preview.png"
            className="h-7"
            alt="Logo"
          />
          <span className="text-xl font-semibold text-heading">JainSpark</span>
        </a>

        {/* Mobile Button */}
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center rounded-base md:hidden hover:bg-neutral-secondary-soft focus:ring-2 focus:ring-neutral-tertiary"
          onClick={() => setOpen(!open)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeWidth="2"
              d="M5 7h14M5 12h14M5 17h14"
            />
          </svg>
        </button>

        {/* Nav Items */}
        <div className={`${open ? "block" : "hidden"} w-full md:block md:w-auto `}>
          <ul className="flex flex-col md:flex-row md:space-x-8 bg-neutral-secondary-soft md:bg-transparent p-4 md:p-0 rounded-base">

            <li>
              <a href="/UserList" className="block py-2 px-3 text-black bg-brand rounded md:bg-transparent md:text-fg-brand hover:bg-amber-400">
                User List
              </a>
            </li>
            <li>
              <a href="/About" className="block py-2 px-3 text-heading hover:text-fg-brand hover:bg-amber-400 bg-brand rounded">
                About
              </a>
            </li>
            <li>
              <a href="Services" className="block py-2 px-3 text-heading hover:text-fg-brand bg-brand rounded hover:bg-amber-400">
                Services
              </a>
            </li>
            <li>
              <a href="/Pricing" className="block py-2 px-3 text-heading hover:text-fg-brand bg-brand rounded hover:bg-amber-400">
                Pricing
              </a>
            </li>
            <li>
              <a href="Contact" className="block py-2 px-3 text-heading hover:text-fg-brand bg-brand rounded hover:bg-amber-400">
                Contact
              </a>
            </li>
            <li>
              <a href="/create_user" className="block py-2 px-3 text-heading hover:text-fg-brand bg-brand rounded hover:bg-amber-400">
                Create User
              </a>
            </li>

            {/* Show logged-in email */}
            {userEmail && (
              <li className="block py-2 px-3 text-white bg-blue-600 rounded ">
             {userEmail}
              </li>
            )}

            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left py-2 px-3 text-heading hover:text-fg-brand bg-brand rounded hover:bg-amber-400"
              >
                Logout
              </button>
            </li>

          </ul>
        </div>
      </div>
    </nav>
    </>

  );
};

export default Navbar;
