import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";

const EditRowModal = ({ table, row, onClose, onUpdated }) => {
  const { user } = useAuth();
  const [form, setForm] = useState(row);
  const [fields, setFields] = useState([]);
  const [error, setError] = useState("");

  const idKey = Object.keys(row)[0];

  useEffect(() => {
    api.get(`/meta/fields/${table}`).then(res => {
      const allowed = res.data.filter(f =>
        user.permissions.includes(f.permission)
      );
      setFields(allowed);
    });
  }, [table, user.permissions]);

  const save = async () => {
    try {
      await api.put(`/data/${table}/${row[idKey]}`, form);
      onUpdated();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <>
      <div className="modal-backdrop fade show"></div>

      <div className="modal fade show" style={{ display: "block" }}>
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">

            <div className="modal-header">
              <h5>Edit {table}</h5>
              <button className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body">
              {error && <div className="alert alert-danger">{error}</div>}

              {fields.length === 0 && (
                <div className="text-muted">
                  No editable fields available
                </div>
              )}

              <div className="row">
                {fields.map(({ field }) => (
                  <div key={field} className="col-md-6 mb-3">
                    <label className="form-label">
                      {field.replace("_", " ").toUpperCase()}
                    </label>
                    <input
                      className="form-control"
                      value={form[field] ?? ""}
                      onChange={e =>
                        setForm({ ...form, [field]: e.target.value })
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={save}
                disabled={fields.length === 0}
              >
                Save
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default EditRowModal;