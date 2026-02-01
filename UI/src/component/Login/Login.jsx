
import React from "react";
import { useNavigate } from "react-router-dom"; // navigate hook

function Login() {
  const navigate = useNavigate(); // hook for navigation

const handleLogin = async (e) => {
  e.preventDefault();

  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }

    if (!data.user) {
      alert("User data not received from server");
      return;
    }

    const role =
      data.user.role === 1 ||
      data.user.role === "1" ||
      data.user.role?.toLowerCase() === "admin"
        ? "Admin"
        : "User";

    localStorage.setItem(
      "user",
      JSON.stringify({
        email: data.user.email,
        role,
      })
    );

    navigate(role === "Admin" ? "/admin-dashboard" : "/user-dashboard");
  } catch (err) {
    console.error(err);
    alert("Server not reachable");
  }
};

  
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://jainspark.in/wp-content/uploads/2023/12/cropped-image__2_-removebg-preview.png"
          className="mx-auto h-10"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-white"
            >
              Sign in
            </button>
          </div>
        </form>
        {/* <p className="mt-10 text-center text-sm/6 text-gray-400">
          Not a member?{" "}
          <a href="/Register" className="font-semibold text-indigo-400 hover:text-indigo-300">
            Create account for Registration
          </a>
        </p> */}
      </div>
    </div>
  );
}

export default Login;
