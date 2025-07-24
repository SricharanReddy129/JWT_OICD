import axios from "axios";

const token = localStorage.getItem("token");
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  headers: { Authorization: `Bearer ${token}` },
});

export const getGroups = async () => {
  const res = await axiosInstance.get("/admin/groups");
  return res.data;
};

export const createGroup = async (group_name) =>
  await axiosInstance.post("/admin/groups", { group_name });

export const updateGroup = async (groupId, group_name) =>
  await axiosInstance.put(`/admin/groups/${groupId}`, { group_name });

export const deleteGroup = async (groupId) =>
  await axiosInstance.delete(`/admin/groups/${groupId}`);

export const getGroupPermissions = async (groupId) => {
  const res = await axiosInstance.get(`/admin/groups/${groupId}/permissions`);
  return res.data;
};

export const getUnmappedPermissions = async (groupId) => {
  const res = await axiosInstance.get(`/admin/groups/${groupId}/permissions/unmapped`);
  return res.data;
};

export const assignPermissionToGroup = async (permissionId, groupId) =>
  await axiosInstance.put(`/admin/permissions/${permissionId}/group`, { group_id: groupId });

// Role Management APIs
export const updateRoleGroups = async (roleId, groupIds) =>
  await axiosInstance.put(`/admin/roles/${roleId}/groups`, { group_ids: groupIds });
