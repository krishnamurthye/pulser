"use client";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../utils/AuthContext";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";

const Header: React.FC = () => {
  const pathname = usePathname();
  const { isLoggedIn, logout } = useAuth();
  const [hideLinks, setHideLinks] = useState<boolean>(false);

useEffect(() => {
  // List of URLs where links should be hidden
  const urlsToHideLinks = ["/verifycode", "/reset-password", "/profile-schema"];

  // Determine if the links should be hidden based on the pathname
  setHideLinks(urlsToHideLinks.includes(pathname));
}, [pathname]);

  const handleLogout = () => {
    router.push("/login");
    logout();
  };

  return (
    <header className="bg-green-400 shadow">
      <div className="sm:px-6 lg:px-8 container mx-auto">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <a href="/" className="text-white text-3xl font-bold">
              PULSER
            </a>
          </div>
          <div className="flex items-center">
            {!hideLinks && !isLoggedIn && (
              <a
                href="/registration"
                className="text-white hover:text-white-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Signup
              </a>
            )}

            {!hideLinks && !isLoggedIn ? (
              <a
                href="/login"
                className="text-white hover:text-white-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </a>
            ) : (
              isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-white-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              )
            )}
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </header>
  );
};

export default Header;
