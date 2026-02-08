const { db } = require('../config/dbconnection');

const hasPermission = (user, slug) => user.permissions.includes(slug);

// get data
const getTableData = async (req, res) => {
  try {
    const table = req.params.table?.toLowerCase().trim();

    const [rows] = await db.query(`SELECT * FROM \`${table}\``);

    // fetch sensitive fields for this table
    const [sensitive] = await db.query(
      `SELECT column_name FROM sensitive_fields WHERE table_name = ?`,
      [table]
    );

    const sensitiveColumns = sensitive.map(r => r.column_name);

    const sanitized = rows.map(row => {
      const newRow = { ...row };

      sensitiveColumns.forEach(column => {
        const slug = `view_${table}_${column}`;
        if (!hasPermission(req.user, slug)) {
          delete newRow[column];
        }
      });

      return newRow;
    });

    res.status(200).json(sanitized);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Fetch failed" });
  }
};


// update data
const updateTableData = async (req, res) => {
  try {
    const table = req.params.table?.toLowerCase().trim();
    const id = req.params.id;
    const body = req.body;

    //fetch sensitive column
    const [sensitive] = await db.query(
      `SELECT column_name FROM sensitive_fields WHERE table_name = ?`,
      [table]
    );

    const sensitiveColumns = sensitive.map(r => r.column_name);

    //filter based of permission
    const allowedFields = Object.keys(body).filter(column => {
      if (!sensitiveColumns.includes(column)) return true;

      const slug = `edit_${table}_${column}`;
      return hasPermission(req.user, slug);
    });

    if (allowedFields.length === 0) {
      return res.status(403).json({ message: "No editable fields allowed" });
    }

    const setClause = allowedFields.map(f => `\`${f}\` = ?`).join(", ");
    const values = allowedFields.map(f => body[f]);

    //updating data
    await db.query(
      `UPDATE \`${table}\` SET ${setClause} WHERE ${table.slice(0, -1)}_id = ?`,
      [...values, id]
    );

    res.status(200).json({ message: "Update successful" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update failed" });
  }
};

module.exports = { getTableData, updateTableData };