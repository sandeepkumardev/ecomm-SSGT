require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/db");
const userRoutes = require("./src/routes/users");
const adminRoutes = require("./src/routes/admin");

const app = express();
const PORT = 4000;

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// admin routes
app.use("/admin", adminRoutes);

// user routes
app.use("", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
