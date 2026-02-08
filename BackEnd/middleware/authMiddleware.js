const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token =
      req.headers.authorization?.split(" ")[1] || req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // assign userid roleid and permission to req.user
    req.user = {
      user_id: decoded.user_id,
      role_id: decoded.role_id,
      permissions: decoded.permissions || []
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;