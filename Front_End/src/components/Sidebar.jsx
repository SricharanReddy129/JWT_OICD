import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaTachometerAlt,
  FaUsers,
  FaUserShield,
  FaKey,
  FaObjectGroup,
  FaNetworkWired,
} from "react-icons/fa";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const roles = user?.roles || [];
  const isAdmin = roles.includes("Admin") || roles.includes("Super Admin");

  if (!isAdmin) return null;

  const links = [
    { name: "Dashboard", path: "/admin-dashboard", icon: <FaTachometerAlt /> },
    { name: "User Management", path: "/admin/users", icon: <FaUsers /> },
    { name: "Role Management", path: "/admin/roles", icon: <FaUserShield /> },
    { name: "Permission Management", path: "/admin/permissions", icon: <FaKey /> },
    { name: "Permission Groups", path: "/admin/permission-groups", icon: <FaObjectGroup /> },
    { name: "Access Points", path: "/admin/accesspoints", icon: <FaNetworkWired /> },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-white to-gray-50 border-r shadow-md h-screen sticky top-0 p-6">
      <h2 className="text-xl font-semibold text-blue-700 mb-6 pl-2">Admin Panel</h2>
      <nav className="flex flex-col gap-2">
        {links.map(({ name, path, icon }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={name}
              onClick={() => navigate(path)}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-all 
                ${isActive
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"}`}
            >
              <span className="text-base">{icon}</span>
              <span className="text-sm">{name}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
