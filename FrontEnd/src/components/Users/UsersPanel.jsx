import { useEffect, useState } from "react";
import api from "../../api/axios";
import CreateUserForm from "./CreateUserForm";

const UsersPanel = ({ onClose }) => {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <>
      
      <div className="modal-backdrop fade show"></div>

      
      <div className="modal fade show" style={{ display: "block" }}>
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">Users</h5>
              <button className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body">
              
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.user_id}>
                      <td>{u.email}</td>
                      <td>{u.role_name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <hr />

              
              <CreateUserForm onCreated={loadUsers} />
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default UsersPanel;