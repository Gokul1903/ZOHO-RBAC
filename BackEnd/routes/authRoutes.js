const express = require('express');
const { login } = require('../controllers/authController');
const router = express.Router();

router.post('/login', login);
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
  });

  return res.status(200).json({ message: "Logged out" });
});
module.exports = router;