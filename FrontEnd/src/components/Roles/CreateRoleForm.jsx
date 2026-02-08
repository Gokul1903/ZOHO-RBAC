import { useState } from "react";
import api from "../../api/axios";

const CreateRoleForm = ({ onCreated }) => {
  const [roleName, setRoleName] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!roleName.trim()) {
      setError("Role name required");
      return;
    }

    try {
      await api.post("/roles/create", {
        role_name: roleName,
      });

      setRoleName("");
      onCreated();

    } catch (err) {
      setError(err.response?.data?.message || "Create failed");
    }
  };

  return (
    <>
      <h6 className="mb-2">Create Role</h6>

      {error && <div className="alert alert-danger py-1">{error}</div>}

      <form onSubmit={submit} className="d-flex gap-2">
        <input
          className="form-control form-control-sm"
          placeholder="Role name"
          value={roleName}
          onChange={e => setRoleName(e.target.value)}
        />

        <button className="btn btn-sm btn-zoho-primary">
          Add
        </button>
      </form>
    </>
  );
};

export default CreateRoleForm;