const {db} = require('../config/dbconnection');
// checking permission
const requirePermission = (permissionSlug) => {
    return async (req, res, next) => {
        try {
            if (!req.user || !req.user.role_id) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const query = `
                SELECT p.slug 
                FROM permissions p
                JOIN role_permissions rp ON p.permission_id = rp.permission_id
                WHERE rp.role_id = ? AND p.slug = ?
            `;

            const [rows] = await db.query(query, [req.user.role_id, permissionSlug]);

            if (rows.length > 0) {
                return next();
            }

            return res.status(403).json({
                message: "You don’t have permission to perform this action."
            });

        } catch (error) {
            console.error("RBAC Error:", error.message);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    };
};

module.exports = requirePermission;