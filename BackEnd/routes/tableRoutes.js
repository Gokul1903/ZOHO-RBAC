const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const requirePermission = require("../middleware/requirePermission");
const { getTables,getEditableFields } = require("../controllers/tableController");


const router = express.Router();

router.get(
  "/tables",
  authMiddleware,
  requirePermission("view_tables"), 
  getTables
);

router.get(
  "/fields/:table",
  authMiddleware,
  getEditableFields
);
module.exports = router;