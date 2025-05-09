const jwt = require("jsonwebtoken");
const db = require("../models");

const authorizeRoles = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
      }

      const token = authHeader.split(" ")[1];

      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ error: "Unauthorized: Token has expired" });
        }
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
      }

      // Fetch user but exclude password for security
      const user = await db.User.findByPk(decoded.id, {
        attributes: { exclude: ["password"] },
      });

      if (!user) {
        return res.status(401).json({ error: "Unauthorized: User not found" });
      }

      if (!user.isActive) {
        return res.status(403).json({ error: "Forbidden: Your account is deactivated" });
      }

      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ error: "Forbidden: You do not have access" });
      }

      req.user = user; // Attach user to request object
      next();
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
};

module.exports = { authorizeRoles };
