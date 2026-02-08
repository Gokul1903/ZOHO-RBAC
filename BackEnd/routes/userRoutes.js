const express = require('express');
const { createUser, getUsers } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const requirePermission = require('../middleware/requirePermission');

const router = express.Router();

router.post('/create', authMiddleware, requirePermission('manage_roles'), createUser);
router.get('/', authMiddleware, requirePermission('manage_roles'), getUsers);

module.exports = router;