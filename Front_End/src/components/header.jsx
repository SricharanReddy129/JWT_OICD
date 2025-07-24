import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const email = user?.email;
  const roles = user?.roles || [];
  const isAdmin = roles.includes("Admin") || roles.includes("Super Admin");

  return (
    <header className="w-full bg-white shadow-md px-6 py-3 flex justify-between items-center sticky top-0 z-50">
      <h1
        className="text-2xl font-semibold text-blue-700 cursor-pointer hover:text-blue-800 transition"
        onClick={() => navigate(isAdmin ? "/admin-dashboard" : "/home")}
      >
        {isAdmin ? "Admin Dashboard" : "Home"}
      </h1>

      <div className="flex items-center gap-4">
        {!isAdmin && email && (
          <FaUserCircle
            size={28}
            className="text-gray-600 hover:text-blue-600 transition cursor-pointer"
            onClick={() => navigate("/profile")}
            title="Profile"
          />
        )}
        <FaSignOutAlt
          size={24}
          className="text-red-500 hover:text-red-600 transition cursor-pointer"
          onClick={() => {
            logout();
            navigate("/");
          }}
          title="Logout"
        />
      </div>
    </header>
  );
}
