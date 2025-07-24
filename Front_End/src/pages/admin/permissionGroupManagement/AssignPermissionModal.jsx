import { useState } from "react";
import { assignPermissionToGroup } from "../../../services/Permissionapi";

export default function AssignPermissionModal({ groupId, permissions, onClose, onAssigned }) {
  const [selectedIds, setSelectedIds] = useState([]);

  const handleAssign = async () => {
    await Promise.all(
      selectedIds.map((pid) => assignPermissionToGroup(pid, groupId))
    );
    onAssigned(); // Refresh permissions list
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96 shadow-lg">
        <h3 className="text-lg font-bold mb-4">Assign Permissions</h3>
        <div className="h-40 overflow-y-auto mb-4">
          {permissions.map((perm) => (
            <div key={perm.permission_id}>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={perm.permission_id}
                  onChange={(e) =>
                    setSelectedIds((prev) =>
                      e.target.checked
                        ? [...prev, perm.permission_id]
                        : prev.filter((id) => id !== perm.permission_id)
                    )
                  }
                />
                <span>{perm.code}</span>
              </label>
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <button className="text-gray-500" onClick={onClose}>
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-1 rounded"
            onClick={handleAssign}
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
}
