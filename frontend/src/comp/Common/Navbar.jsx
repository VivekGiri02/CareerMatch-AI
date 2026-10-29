import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  HiOutlineUser,
  HiBars3BottomRight,
} from "react-icons/hi2";

import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("User");

  const navigate = useNavigate();

  // Check login status
  const checkLoginStatus = () => {
    const loggedIn =
      localStorage.getItem("careerMatchLoggedIn") === "true";

    const savedUser = localStorage.getItem("careerMatchUser");

    let user = null;

    try {
      user = savedUser ? JSON.parse(savedUser) : null;
    } catch {
      user = null;
    }

    const validLogin = loggedIn && Boolean(user?.email);

    setIsLoggedIn(validLogin);
    setUserName(user?.name || "User");

    // Remove invalid login status
    if (!validLogin && loggedIn) {
      localStorage.removeItem("careerMatchLoggedIn");
    }
  };

  useEffect(() => {
    checkLoginStatus();

    // Update Navbar when login status changes in another tab
    const handleStorageChange = () => {
      checkLoginStatus();
    };

    window.addEventListener("storage", handleStorageChange);

    // Custom event for login/logout in the current tab
    window.addEventListener(
      "careerMatchAuthChanged",
      handleStorageChange
    );

    return () => {
      window.removeEventListener("storage", handleStorageChange);

      window.removeEventListener(
        "careerMatchAuthChanged",
        handleStorageChange
      );
    };
  }, []);

  const toggleNavDrawer = () => {
    setNavDrawerOpen((prev) => !prev);
  };

  // Resume Builder
  const handleResumeClick = () => {
    setNavDrawerOpen(false);

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    navigate("/resume-builder");
  };

  // Assessment
  const handleAssessmentClick = () => {
    setNavDrawerOpen(false);

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    navigate("/assessment");
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("careerMatchLoggedIn");

    // Remove legacy authentication keys
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setUserName("User");
    setNavDrawerOpen(false);

    // Update Navbar and other components in the same tab
    window.dispatchEvent(new Event("careerMatchAuthChanged"));

    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4 md:px-12">

        {/* LOGO */}
        <Link
          to="/"
          className="shrink-0 text-xl font-black uppercase tracking-tighter md:text-2xl"
        >
          CareerMatch <span className="text-blue-600">AI</span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden items-center space-x-8 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 md:flex lg:space-x-10">

          <Link to="/" className="transition-colors hover:text-black">
            Home
          </Link>

          <button
            type="button"
            onClick={handleResumeClick}
            className="font-bold uppercase tracking-[0.2em] transition-colors hover:text-black"
          >
            Resume Builder
          </button>

          <Link
            to="/jobs"
            className="transition-colors hover:text-black"
          >
            Jobs
          </Link>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex shrink-0 items-center space-x-4">

          {isLoggedIn && (
            <Link
              to="/dashboard"
              className="hidden border-b border-gray-500 pb-0.5 text-[10px] font-black uppercase tracking-widest text-black transition-all hover:border-blue-600 hover:text-blue-600 lg:block"
            >
              Dashboard
            </Link>
          )}

          {/* PROFILE / LOGIN */}
          <Link
            to={isLoggedIn ? "/profile" : "/login"}
            className="flex items-center text-gray-800 transition-colors hover:text-blue-600"
            aria-label={isLoggedIn ? "My Profile" : "Login"}
          >
            <HiOutlineUser className="h-5 w-5" />

            {isLoggedIn && (
              <span className="ml-2 hidden text-[10px] font-black uppercase tracking-wider lg:block">
                {userName}
              </span>
            )}
          </Link>

          {/* DESKTOP LOGOUT */}
          {isLoggedIn && (
            <button
              type="button"
              onClick={handleLogout}
              className="hidden text-[10px] font-bold uppercase tracking-widest text-red-500 transition-colors hover:text-red-700 md:block"
            >
              Logout
            </button>
          )}

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={toggleNavDrawer}
            className="md:hidden"
            aria-label="Open navigation menu"
          >
            <HiBars3BottomRight className="h-6 w-6 text-black" />
          </button>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      {navDrawerOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm md:hidden"
          onClick={toggleNavDrawer}
        >
          <div
            className="absolute right-0 top-0 h-full w-72 bg-white p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* DRAWER HEADER */}
            <div className="mb-12 flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-widest">
                CareerMatch AI
              </span>

              <button
                type="button"
                onClick={toggleNavDrawer}
                aria-label="Close navigation menu"
              >
                <IoMdClose size={24} />
              </button>
            </div>

            {/* MOBILE LINKS */}
            <div className="flex flex-col space-y-7 text-lg font-black uppercase tracking-tight">

              <Link
                to="/"
                onClick={toggleNavDrawer}
                className="transition-colors hover:text-blue-600"
              >
                Home
              </Link>

              <button
                type="button"
                onClick={handleResumeClick}
                className="text-left transition-colors hover:text-blue-600"
              >
                Resume Builder
              </button>

              <button
                type="button"
                onClick={handleAssessmentClick}
                className="text-left transition-colors hover:text-blue-600"
              >
                Assessment
              </button>

              <Link
                to="/jobs"
                onClick={toggleNavDrawer}
                className="transition-colors hover:text-blue-600"
              >
                Find Jobs
              </Link>

              {isLoggedIn && (
                <Link
                  to="/dashboard"
                  onClick={toggleNavDrawer}
                  className="border-t border-gray-100 pt-5 text-gray-500 transition-colors hover:text-black"
                >
                  Dashboard
                </Link>
              )}

              <Link
                to={isLoggedIn ? "/profile" : "/login"}
                onClick={toggleNavDrawer}
                className="text-gray-500 transition-colors hover:text-blue-600"
              >
                {isLoggedIn ? "My Profile" : "Login"}
              </Link>

              {!isLoggedIn && (
                <Link
                  to="/signup"
                  onClick={toggleNavDrawer}
                  className="rounded-md bg-blue-600 px-6 py-4 text-center text-sm text-white transition-colors hover:bg-blue-700"
                >
                  Get Started
                </Link>
              )}

              {isLoggedIn && (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-left text-red-500 transition-colors hover:text-red-600"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;