const { db } = require('../config/dbconnection');

const setPermission = async (req, res) => {
  try {
    const { role_id, grant = [], revoke = [] } = req.body;

    if (!role_id) {
      return res.status(400).json({ message: "role_id is required" });
    }

    // get permission_id from slug
    const getPermissionIds = async (slugs) => {
      if (slugs.length === 0) return [];
      const [rows] = await db.query(
        `SELECT permission_id FROM permissions WHERE slug IN (?)`,
        [slugs]
      );
      return rows.map(r => r.permission_id);
    };

    // grant permissions
    const grantIds = await getPermissionIds(grant);
    if (grantIds.length > 0) {
      const values = grantIds.map(pid => [role_id, pid]);
      await db.query(
        `INSERT IGNORE INTO role_permissions (role_id, permission_id)
         VALUES ?`,
        [values]
      );
    }

    //revoke permissions
    const revokeIds = await getPermissionIds(revoke);
    if (revokeIds.length > 0) {
      await db.query(
        `DELETE FROM role_permissions
         WHERE role_id = ? AND permission_id IN (?)`,
        [role_id, revokeIds]
      );
    }

    res.status(200).json({
      message: "Permissions updated successfully",
      granted: grant,
      revoked: revoke
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update permissions" });
  }
};
const getPermission = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT role_id, permission_id FROM role_permissions");
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch roles" });
  }
};

//getting all permission
const getAllPermissions = async (req, res) => {
  const [rows] = await db.query(
    "SELECT permission_id, slug FROM permissions"
  );
  res.json(rows);
};

module.exports = { setPermission,getPermission,getAllPermissions };