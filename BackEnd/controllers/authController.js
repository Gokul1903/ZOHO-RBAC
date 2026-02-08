const { db } = require("../config/dbconnection");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // find user
    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ? AND is_active = true",
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = rows[0];

    // password check
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // fetch permission for user role
    const [permissions] = await db.query(
      `SELECT p.slug 
       FROM permissions p
       JOIN role_permissions rp ON p.permission_id = rp.permission_id
       WHERE rp.role_id = ?`,
      [user.role_id]
    );

    const permissionSlugs = permissions.map(p => p.slug);

    // create token with permissions
    const token = jwt.sign(
      { 
        user_id: user.user_id,
        role_id: user.role_id,
        permissions: permissionSlugs
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // send cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24*60 * 60 * 1000,
    });

    //send responce
    res.status(200).json({
      message: "Login successful",
      token,
      permissions: permissionSlugs
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { login };