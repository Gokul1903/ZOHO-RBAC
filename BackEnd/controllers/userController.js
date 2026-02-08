const { db } = require('../config/dbconnection');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
  try {
    const { email, password, role_id } = req.body;

    if (!email || !password || !role_id) {
      return res.status(400).json({ message: "All fields required" });
    }

    // hash password
    const hash = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (email, password_hash, role_id) VALUES (?, ?, ?)",
      [email, hash, role_id]
    );

    res.status(201).json({ message: "User created" });

  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ message: "User already exists" });
    }
    console.error(error);
    res.status(500).json({ message: "Failed to create user" });
  }
};

//getting user
const getUsers = async (req, res) => {
  try {
    //fetching user with roles
    const [rows] = await db.query(
      `SELECT u.user_id, u.email, r.role_name
       FROM users u
       JOIN roles r ON u.role_id = r.role_id`
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

module.exports = { createUser, getUsers };