import { useEffect, useState } from "react";
import api from "../../api/axios";

const CreateUserForm = ({ onCreated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState("");
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/roles").then(res => setRoles(res.data));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/users/create", {
        email,
        password,
        role_id: roleId,
      });

      setEmail("");
      setPassword("");
      setRoleId("");
      onCreated();
    } catch (err) {
      setError(err.response?.data?.message || "Create failed");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card-zoho ">
        <h6 className="mb-3 ">Create User</h6>

        {error && <div className="alert alert-danger py-2 mb-3">{error}</div>}

        <form onSubmit={submit} className="row gy-3">
          
          <div className="col-12 col-md-4">
            <label className="form-label mb-1 text-secondary">Email</label>
            <input
              className="form-control form-control-sm"
              placeholder="Enter email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          
          <div className="col-12 col-md-4">
            <label className="form-label mb-1 text-secondary">Password</label>
            <input
              type="password"
              className="form-control form-control-sm"
              placeholder="Enter password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          
          <div className="col-12 col-md-3">
            <label className="form-label mb-1 text-secondary">Role</label>
            <select
              className="form-select form-select-sm"
              value={roleId}
              onChange={e => setRoleId(e.target.value)}
            >
              <option value="">Select role</option>
              {roles.map(r => (
                <option key={r.role_id} value={r.role_id}>
                  {r.role_name}
                </option>
              ))}
            </select>
          </div>

          
          <div className="col-12 col-md-1 d-grid align-self-end">
            <button className="btn btn-sm btn-zoho-success">
               Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserForm;