const { db } = require("../config/dbconnection");

// fetching tables to handle
const getTables = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM data_tables");

  const allowed = rows.filter(t =>
    req.user.permissions.includes(`view_${t.table_name}`)
  );

  res.json(allowed);
};
const getEditableFields = async (req, res) => {
  const table = req.params.table;

  // all columns
  const [columns] = await db.query(`show columns from \`${table}\``);

  // sensitive columns
  const [sensitive] = await db.query(
    `SELECT column_name FROM sensitive_fields WHERE table_name = ?`,
    [table]
  );

  const sensitiveSet = new Set(sensitive.map(s => s.column_name));

  const editable = columns.map(col => {
    const name = col.Field;

    if (name.endsWith("_id")) return null;

    if (sensitiveSet.has(name)) {
      return {
        field: name,
        permission: `edit_${table}_${name}`,
      };
    }

    return {
      field: name,
      permission: `edit_${table}`,
    };
  }).filter(Boolean);

  res.json(editable);
};

module.exports = { getTables,getEditableFields };