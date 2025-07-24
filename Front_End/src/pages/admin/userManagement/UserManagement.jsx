import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

// ... (imports remain the same)

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => {
        console.error("Failed to fetch users:", err);
        if (err.response?.status === 403 || err.response?.status === 401) {
          alert("Access denied. Admins only.");
          navigate("/home");
        }
      });
  }, []);

  const handleDelete = async (userId) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Are you sure you want to deactivate this user?"))
      return;

    try {
      await axios.delete(`http://localhost:8000/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(
        users.map((u) =>
          u.user_id === userId ? { ...u, is_active: false } : u
        )
      );
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to deactivate user.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">User Management</h2>

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => navigate("/admin/users/create")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add New User
        </button>
      </div>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => navigate(`/admin/users/roles`)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          User Roles
        </button>
      </div>

      <p className="mb-6 text-gray-600">
        View and manage all registered users.
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Contact</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.user_id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{user.user_id}</td>
                  <td className="px-4 py-2 border-b">
                    {user.first_name} {user.last_name}
                  </td>
                  <td className="px-4 py-2 border-b">{user.mail}</td>
                  <td className="px-4 py-2 border-b">{user.contact}</td>
                  <td className="px-4 py-2 border-b">
                    <span
                      className={
                        user.is_active ? "text-green-600" : "text-red-500"
                      }
                    >
                      {user.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-2 border-b space-x-2">
                    <button
                      onClick={() =>
                        navigate(`/admin/users/${user.user_id}/edit`)
                      }
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.user_id)}
                      className="text-red-500 hover:underline"
                      disabled={!user.is_active}
                    >
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
