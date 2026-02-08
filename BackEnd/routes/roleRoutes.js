const express = require('express');
const { createRole, getRoles } = require('../controllers/roleController');
const authMiddleware = require('../middleware/authMiddleware');
const requirePermission = require('../middleware/requirePermission');

const router = express.Router();
//create role
router.post('/create', authMiddleware, requirePermission('manage_roles'), createRole);
router.get('/', authMiddleware, requirePermission('manage_roles'), getRoles);

module.exports = router;