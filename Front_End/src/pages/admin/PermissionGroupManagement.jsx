import { useEffect, useState } from "react";
import axios from "axios";

export default function PermissionGroupManagement() {
  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [newGroupName, setNewGroupName] = useState("");
  const [editGroupName, setEditGroupName] = useState("");
  const [editingGroupId, setEditingGroupId] = useState(null);

  const token = localStorage.getItem("token");

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const res = await axiosInstance.get("/admin/groups");
      setGroups(res.data);
    } catch (err) {
      alert("Failed to fetch groups: " + err.response?.data?.detail || err.message);
    }
  };

  const fetchPermissions = async (groupId) => {
    try {
      setSelectedGroupId(groupId);
      const res = await axiosInstance.get(`/admin/groups/${groupId}/permissions`);
      setPermissions(res.data);
    } catch (err) {
      alert("Failed to fetch permissions: " + err.response?.data?.detail || err.message);
    }
  };

  const handleCreate = async () => {
    if (!newGroupName.trim()) return;
    try {
      await axiosInstance.post("/admin/groups", {
        group_name: newGroupName,
      });
      setNewGroupName("");
      fetchGroups();
    } catch (err) {
      alert("Failed to create group: " + err.response?.data?.detail || err.message);
    }
  };

  const handleEdit = (groupId, groupName) => {
    setEditingGroupId(groupId);
    setEditGroupName(groupName);
  };

  const handleUpdate = async () => {
    try {
      await axiosInstance.put(`/admin/groups/${editingGroupId}`, {
        group_name: editGroupName,
      });
      setEditingGroupId(null);
      setEditGroupName("");
      fetchGroups();
    } catch (err) {
      alert("Failed to update group: " + err.response?.data?.detail || err.message);
    }
  };

  const handleDelete = async (groupId) => {
    if (!window.confirm("Are you sure you want to delete this group?")) return;
    try {
      await axiosInstance.delete(`/admin/groups/${groupId}`);
      if (selectedGroupId === groupId) setPermissions([]);
      fetchGroups();
    } catch (err) {
      alert("Failed to delete group: " + err.response?.data?.detail || err.message);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Permission Group Management</h2>

      {/* Create Group */}
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="New group name"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
        >
          Create
        </button>
      </div>

      {/* List Groups */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {groups.map((group) => (
          <div
            key={group.group_id}
            className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition"
          >
            {editingGroupId === group.group_id ? (
              <>
                <input
                  type="text"
                  value={editGroupName}
                  onChange={(e) => setEditGroupName(e.target.value)}
                  className="border p-1 rounded w-full mb-2"
                />
                <div className="flex gap-2">
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    onClick={handleUpdate}
                  >
                    Save
                  </button>
                  <button
                    className="text-gray-600 underline"
                    onClick={() => setEditingGroupId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{group.group_name}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => fetchPermissions(group.group_id)}
                      className="text-blue-600 underline"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(group.group_id, group.group_name)}
                      className="text-green-600 underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(group.group_id)}
                      className="text-red-600 underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Permissions of Selected Group */}
      {selectedGroupId && (
        <div className="mt-8">
          <h4 className="text-xl font-bold text-gray-700 mb-3">Permissions in Group</h4>
          <ul className="space-y-2">
            {permissions.length === 0 ? (
              <p className="text-gray-500">No permissions linked to this group.</p>
            ) : (
              permissions.map((perm, idx) => (
                <li key={idx} className="border p-2 rounded bg-gray-50 shadow-sm">
                  <p className="font-medium text-blue-800">{perm.code}</p>
                  <p className="text-sm text-gray-600">{perm.description}</p>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
