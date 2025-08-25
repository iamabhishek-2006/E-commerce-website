require("dotenv").config();
const express = require("express");
const cors=require("cors");
const { connectDB } = require("./src/config/db");
const userRoutes = require("./src/routes/users");
const adminRoutes = require("./src/routes/admin");
const authRoutes = require("./src/routes/auth.routes");
const authMiddlewares = require("./src/middlewares/auth.middlewares");
const adminOnly=require("./src/middlewares/admin.middleware");
const publicRoutes=require("./src/routes/public.routes")

const app = express();
const PORT = 4000;

connectDB();

app.use(cors());

// middle to parse JSON bodies
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("",publicRoutes);
app.use("/auth", authRoutes);

app.use(authMiddlewares);  // using auth middlewares

// admin routes
app.use("/admin", adminRoutes,adminOnly);

// user routes
app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
