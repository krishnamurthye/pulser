"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "../utils/AuthContext";
import { ToastContainer } from "react-toastify";

const Header: React.FC = () => {
  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();

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
            {!isLoggedIn && (
              <a
                href="/registration"
                className="text-white hover:text-white-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Signup
              </a>
            )}

            {!isLoggedIn ? (
              <a
                href="/login"
                className="text-white hover:text-white-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </a>
            ) : (
              <button
                onClick={handleLogout}
                className="text-white hover:text-white-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
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
