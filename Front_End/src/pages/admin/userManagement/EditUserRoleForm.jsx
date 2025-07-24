import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

export default function EditUserRoleForm() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { admin } = useAuth();

  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [selectedRoleIds, setSelectedRoleIds] = useState([]);

  const token = localStorage.getItem("token");
  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    fetchUser();
    fetchAllRoles();
    fetchAssignedRoles();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/admin/users/${userId}`, authHeader);
      setUser(res.data);
    } catch (err) {
      console.error("Failed to load user info", err);
      alert("Failed to load user.");
    }
  };

  const fetchAllRoles = async () => {
    try {
      const res = await axios.get("http://localhost:8000/admin/roles", authHeader);
      setRoles(res.data);
    } catch (err) {
      console.error("Failed to load roles", err);
    }
  };

  const fetchAssignedRoles = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/admin/users/${userId}/roles`, authHeader);
      setSelectedRoleIds(res.data.map((r) => r.role_id));
    } catch (err) {
      console.error("Failed to load assigned roles", err);
    }
  };

  const toggleRole = (roleId) => {
    setSelectedRoleIds((prev) =>
      prev.includes(roleId)
        ? prev.filter((id) => id !== roleId)
        : [...prev, roleId]
    );
  };

  const handleSave = async () => {
  try {
    await axios.put(
      `http://localhost:8000/admin/users/${userId}/role`,
      { role_ids: selectedRoleIds },
      authHeader
    );
    alert("Roles updated successfully!");
    navigate(`/admin/users/roles`);
  } catch (err) {
    console.error("Failed to update roles", err);
    alert("Update failed.");
  }
};


  if (!user) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">
        Edit Roles for {user.first_name} {user.last_name}
      </h2>

      <div className="bg-white p-4 rounded shadow mb-6">
        <p className="mb-3 text-gray-600">Assign or unassign roles:</p>
        <div className="grid grid-cols-2 gap-2">
          {roles.map((role) => (
            <label key={role.role_id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedRoleIds.includes(role.role_id)}
                onChange={() => toggleRole(role.role_id)}
              />
              {role.role_name}
            </label>
          ))}
        </div>

        <div className="mt-6">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
          <button
            onClick={() => navigate(`/admin/users/roles`)}
            className="ml-4 text-gray-600 underline"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
