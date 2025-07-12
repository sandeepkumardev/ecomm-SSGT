require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/db");
const userRoutes = require("./src/routes/user.routes");

const app = express();
const PORT = 4000;

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
