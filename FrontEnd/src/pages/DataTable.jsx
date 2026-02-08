import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";
import EditRowModal from "../components/EditRowModal";

//creating the table
const DataTable = ({ table }) => {
  const { user } = useAuth();
  const [rows, setRows] = useState([]);
  const [editingRow, setEditingRow] = useState(null);

  useEffect(() => {
    api.get(`/data/${table}`).then((res) => setRows(res.data));
  }, [table]);

  // loading state
  if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-muted">Loading user session...</div>
      </div>
    );
  }

  // data loading
  if (!rows) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-muted">Loading data...</div>
      </div>
    );
  }

  // no data found
  if (rows.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-muted">No data found for this table</div>
      </div>
    );
  }
  
  const columns = Object.keys(rows[0]);
  if (user.permissions.includes(`edit_${table}`)) {
    columns.push("edit");
  }

  return (
    <div className="container mt-4">
      <h4 className="text-capitalize">{table}</h4>

      <table className="table mt-3">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>
                {col === "edit" ? "EDIT" : col.replace("_", " ").toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={Object.values(row)[0]}>
              {columns.map((col) => (
                <td key={col}>
                  {col === "edit" ? (
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => setEditingRow(row)}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                  ) : (
                    (row[col] ?? "—")
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {editingRow && (
        <EditRowModal
          table={table}
          row={editingRow}
          onClose={() => setEditingRow(null)}
          onUpdated={() =>
            api.get(`/data/${table}`).then((res) => setRows(res.data))
          }
        />
      )}
    </div>
  );
};

export default DataTable;
