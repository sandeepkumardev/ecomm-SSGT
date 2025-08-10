const { verifyToken } = require("../utils");

module.exports = (req, res, next) => {
  // verify token
  const isValid = req.headers.authorization?.startsWith("Bearer ");
  if (!isValid) return res.status(401).json({ success: false, error: "Unauthorized" });

  try {
    const token = req.headers.authorization.split(" ")[1];
    const payload = verifyToken(token);

    const { role } = req.query;
    if (role === "admin" && payload.role !== "admin") {
      return res.json({
        success: false,
        error: "You are not an admin",
      });
    }

    if (!payload.id) {
      return res.json({
        success: false,
        error: "invalid token",
      });
    }

    req.user = payload;
  } catch (error) {
    return res.json({
      success: false,
      error: "invalid token",
    });
  }

  next();
};
