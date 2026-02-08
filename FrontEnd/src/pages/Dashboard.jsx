import { useEffect, useState } from "react";
import api from "../api/axios";
import DataTable from "./DataTable";

const Dashboard = () => {
  const [tables, setTables] = useState([]);
  const [active, setActive] = useState("");
  //getting all the view tables
  useEffect(() => {
    api.get("/meta/tables").then(res => {
      setTables(res.data);
      setActive(res.data[0]?.table_name);
    });
  }, []);


// no data found
if (tables.length === 0) {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-muted">
        No data found for this table
      </div>
    </div>
  );

}
  return (
    <>
      <ul className="nav nav-tabs px-3">
        {tables.map(t => (
          <li className="nav-item" key={t.table_name}>
            <button
              className={`nav-link ${active === t.table_name ? "active" : ""}`}
              onClick={() => setActive(t.table_name)}
            >
              {t.display_name}
            </button>
          </li>
        ))}
      </ul>

      {active && <DataTable table={active} />}
    </>
  );
};

export default Dashboard;