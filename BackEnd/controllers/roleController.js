const { db } = require('../config/dbconnection');
//creating roles
const createRole = async (req, res) => {
  try {
    const { role_name } = req.body;

    if (!role_name) {
      return res.status(400).json({ message: "Role name required" });
    }

    await db.query(
      "INSERT INTO roles (role_name) VALUES (?)",
      [role_name.toUpperCase()]
    );

    res.status(201).json({ message: "Role created" });

  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ message: "Role already exists" });
    }
    console.error(error);
    res.status(500).json({ message: "Failed to create role" });
  }
};

//gettting roles
const getRoles = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT role_id, role_name FROM roles");
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch roles" });
  }
};

module.exports = { createRole, getRoles };