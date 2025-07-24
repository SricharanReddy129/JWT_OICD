import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UpdateUserRole() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    const fetchUsersWithRoles = async () => {
      try {
        const res = await axios.get("http://localhost:8000/admin/users/roles", authHeader);
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users with roles:", err);
        alert("Error loading user roles.");
      }
    };

    fetchUsersWithRoles();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Update User Roles</h2>
      <p className="mb-6 text-gray-600">Click edit to update assigned roles for each user.</p>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Assigned Roles</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.user_id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{user.user_id}</td>
                <td className="px-4 py-2 border-b">{user.name}</td>
                <td className="px-4 py-2 border-b">
                  {user.roles.length > 0 ? user.roles.join(", ") : "No roles assigned"}
                </td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => navigate(`/admin/users/${user.user_id}/edit-role`)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit Roles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
