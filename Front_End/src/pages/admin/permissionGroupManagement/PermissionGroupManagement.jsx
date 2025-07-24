import { useEffect, useState } from "react";
import GroupList from "./GroupList";
import GroupPermissions from "./GroupPermissions";
import AssignPermissionModal from "./AssignPermissionModal";
import { getGroups, getGroupPermissions, getUnmappedPermissions } from "../../../services/Permissionapi";

export default function PermissionGroupManagement() {
  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [unmappedPermissions, setUnmappedPermissions] = useState([]);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    const res = await getGroups();
    setGroups(res);
  };

  const handleSelectGroup = async (groupId) => {
    setSelectedGroupId(groupId);
    const groupPerms = await getGroupPermissions(groupId);
    setPermissions(groupPerms);

    const unmapped = await getUnmappedPermissions(groupId);
    setUnmappedPermissions(unmapped);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Permission Group Management</h2>

      <GroupList
        groups={groups}
        onGroupUpdated={fetchGroups}
        onSelectGroup={handleSelectGroup}
        selectedGroupId={selectedGroupId}
      />

      {selectedGroupId && (
        <>
          <GroupPermissions
            permissions={permissions}
            onAssignClick={() => setShowAssignModal(true)}
          />
          {showAssignModal && (
            <AssignPermissionModal
              groupId={selectedGroupId}
              permissions={unmappedPermissions}
              onClose={() => setShowAssignModal(false)}
              onAssigned={() => handleSelectGroup(selectedGroupId)}
            />
          )}
        </>
      )}
    </div>
  );
}
