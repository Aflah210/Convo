import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

/* =====================
   Global Middlewares
===================== */
app.use(cors());
app.use(express.json());

/* =====================
   Routes
===================== */
app.use("/api/auth", authRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "Server is running 🚀" });
});

/* =====================
   404 Handler
===================== */
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

/* =====================
   Global Error Handler
===================== */
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

/* =====================
   Server Start
===================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
