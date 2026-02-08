const express = require('express');
const { setPermission,getPermission,getAllPermissions } = require('../controllers/permissionController');
const authMiddleware = require('../middleware/authMiddleware');
const requirePermission = require('../middleware/requirePermission');

const router = express.Router();
//assigning permission to role
router.post('/setPermission', authMiddleware, requirePermission('manage_roles'), setPermission);
router.get('/', authMiddleware, requirePermission('manage_roles'), getPermission);
router.get("/all", authMiddleware, requirePermission("manage_roles"), getAllPermissions);

module.exports = router;