import { useEffect, useState } from "react";
import axios from "axios";

export default function RoleManagement() {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState("");
  const [editingRole, setEditingRole] = useState(null);

  // Get token from localStorage
  const token = localStorage.getItem("token");

  // Axios config with JWT token
  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Fetch all roles
  const fetchRoles = async () => {
    try {
      const res = await axios.get("http://localhost:8000/admin/roles", authHeader);
      setRoles(res.data);
    } catch (err) {
      console.error("Failed to fetch roles:", err);
      if (err.response?.status === 401) {
        alert("Session expired. Please log in again.");
        // window.location.href = "/login"; // optional redirect
      }
    }
  };

  // Load roles on mount
  useEffect(() => {
    fetchRoles();
  }, []);

  // Create or update role
  const handleCreateOrUpdate = async () => {
    try {
      if (editingRole) {
        await axios.put(
          `http://localhost:8000/admin/roles/${editingRole.role_id}`,
          { role_name: newRole },
          authHeader
        );
      } else {
        await axios.post(
          "http://localhost:8000/admin/roles",
          { role_name: newRole },
          authHeader
        );
      }

      setNewRole("");
      setEditingRole(null);
      fetchRoles();
    } catch (err) {
      console.error("Error saving role:", err);
      alert("Failed to save role");
    }
  };

  // Edit role
  const handleEdit = async (role) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/admin/roles/${role.role_id}`,
        authHeader
      );
      setNewRole(res.data.role_name);
      setEditingRole(res.data);
    } catch (err) {
      console.error("Failed to fetch role details:", err);
    }
  };

  // Delete role
  const handleDelete = async (role_id) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      try {
        await axios.delete(
          `http://localhost:8000/admin/roles/${role_id}`,
          authHeader
        );
        fetchRoles();
      } catch (err) {
        console.error("Failed to delete role:", err);
      }
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Role Management</h2>

      {/* Role form */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <input
          type="text"
          placeholder="Role name"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />

        <button
          onClick={handleCreateOrUpdate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingRole ? "Update Role" : "Create Role"}
        </button>

        {editingRole && (
          <button
            onClick={() => {
              setEditingRole(null);
              setNewRole("");
            }}
            className="ml-2 text-sm text-gray-600 underline"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Role List */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-3">Existing Roles</h3>
        <ul className="space-y-2">
          {roles.map((role) => (
            <li
              key={role.role_id}
              className="flex justify-between items-center border-b pb-2"
            >
              <span className="font-medium text-gray-800">{role.role_name}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(role)}
                  className="text-blue-600 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(role.role_id)}
                  className="text-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
