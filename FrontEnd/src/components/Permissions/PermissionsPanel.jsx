import { useEffect, useState } from "react";
import api from "../../api/axios";

const PermissionsPanel = ({ onClose }) => {
  const [roles, setRoles] = useState([]);
  const [allPermissions, setAllPermissions] = useState([]);
  const [rolePermissions, setRolePermissions] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [checked, setChecked] = useState({});

  // Load roles + permissions + mappings
  useEffect(() => {
  const load = async () => {
    try {
      const [rolesRes, mapRes, allPermsRes] = await Promise.all([
        api.get("/roles"),              // list of roles
        api.get("/permissions"),        // role-permission mapping
        api.get("/permissions/all"),    // full permissions list
      ]);

      setRoles(rolesRes.data);
      setRolePermissions(mapRes.data);
      setAllPermissions(allPermsRes.data);
    } catch (err) {
      console.error("Failed to load permissions data", err);
    }
  };

  load();
}, []);

  // When role changes, compute checked permissions
  useEffect(() => {
    if (!selectedRole) return;

    const permsForRole = rolePermissions
      .filter(rp => rp.role_id === Number(selectedRole))
      .map(rp => rp.permission_id);

    const map = {};
    permsForRole.forEach(pid => (map[pid] = true));
    setChecked(map);
  }, [selectedRole, rolePermissions]);

  const toggle = (permission_id) => {
    setChecked(prev => ({
      ...prev,
      [permission_id]: !prev[permission_id],
    }));
  };

  const save = async () => {
    if (!selectedRole) return;

    const grant = [];
    const revoke = [];

    allPermissions.forEach(p => {
      const isChecked = checked[p.permission_id];
      const exists = rolePermissions.some(
        rp =>
          rp.role_id === Number(selectedRole) &&
          rp.permission_id === p.permission_id
      );

      if (isChecked && !exists) grant.push(p.slug);
      if (!isChecked && exists) revoke.push(p.slug);
    });

    await api.post("/permissions/setPermission", {
      role_id: selectedRole,
      grant,
      revoke,
    });

    onClose();
  };

  return (
    <>
      <div className="modal-backdrop fade show"></div>

      <div className="modal fade show" style={{ display: "block" }}>
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content card-zoho">

            <div className="modal-header border-0">
              <h5 className="modal-title">Permissions</h5>
              <button className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body">
              {/* Role selector */}
              <select
                className="form-select mb-3"
                value={selectedRole}
                onChange={e => setSelectedRole(e.target.value)}
              >
                <option value="">Select role</option>
                {roles.map(r => (
                  <option key={r.role_id} value={r.role_id}>
                    {r.role_name}
                  </option>
                ))}
              </select>

              {/* Permission list */}
              {selectedRole && (
                <div className="row">
                  {allPermissions.map(p => (
                    <div className="col-md-6 mb-2" key={p.permission_id}>
                      <label className="d-flex align-items-center gap-2">
                        <input
                          type="checkbox"
                          checked={!!checked[p.permission_id]}
                          onChange={() => toggle(p.permission_id)}
                        />
                        {p.slug}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn btn-zoho-outline-danger" onClick={onClose}>
                Cancel
              </button>
              <button className="btn btn-zoho-warning" onClick={save}>
                Save
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default PermissionsPanel;