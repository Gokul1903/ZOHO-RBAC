import { useEffect, useState } from "react";
import api from "../../api/axios";
import CreateRoleForm from "./CreateRoleForm";

const RolesPanel = ({ onClose }) => {
  const [roles, setRoles] = useState([]);

  const loadRoles = async () => {
    const res = await api.get("/roles");
    setRoles(res.data);
  };

  useEffect(() => {
    loadRoles();
  }, []);
  
  return (
    <>
      
      <div className="modal-backdrop fade show"></div>

      
      <div className="modal fade show" style={{ display: "block" }}>
        <div className="modal-dialog modal-md modal-dialog-centered">
          <div className="modal-content card-zoho">

            <div className="modal-header border-0">
              <h5 className="modal-title">Roles</h5>
              <button className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body">
              
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Role Name</th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map(r => (
                    <tr key={r.role_id}>
                      <td>
                        <span className="badge badge-zoho">
                          {r.role_name}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <hr />

              
              <CreateRoleForm onCreated={loadRoles} />
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default RolesPanel;