const jwt = require("jsonwebtoken");

const generateSlug = (name) => {
  return name.toLowerCase().trim().replace(/\s+/g, "-");
};

const generateToken = (data) => {
  const accessToken = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1d" });
  const refreshToken = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "2d" });
  return { accessToken, refreshToken };
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateSlug, generateToken, verifyToken };
