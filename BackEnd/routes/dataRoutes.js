const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const requirePermission = require('../middleware/requirePermission');
const { getTableData, updateTableData } = require('../controllers/dataController');

const router = express.Router();

// permission based on table name
const viewPermission = (req, res, next) => {
    const table = req.params.table;
    return requirePermission(`view_${table}`)(req, res, next);
};

const editPermission = (req, res, next) => {
    const table = req.params.table;
    return requirePermission(`edit_${table}`)(req, res, next);
};

router.get('/:table', authMiddleware, viewPermission, getTableData);
router.put('/:table/:id', authMiddleware, editPermission, updateTableData);

module.exports = router;