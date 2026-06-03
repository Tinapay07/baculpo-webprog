const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const path = require("path");

dotenv.config();

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 8000;

const parseOrigins = (value = "") =>
  value
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

// Start with any configured frontend origins
const allowedOrigins = [
  ...parseOrigins(process.env.FRONTEND_ORIGIN),
  ...parseOrigins(process.env.FRONTEND_ORIGINS),
];

// During local development allow common localhost dev ports
if (process.env.NODE_ENV !== 'production') {
  allowedOrigins.push(
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:5175',
    'http://127.0.0.1:5175',
  );
}

const isAllowedVercelPreview = (origin = "") =>
  process.env.ALLOW_VERCEL_PREVIEWS === "true" &&
  /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin);

app.use(
  cors({
    origin(origin, callback) {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        isAllowedVercelPreview(origin)
      ) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);
app.use(express.json());

app.get("/", (req, res) => {
  const frontendOrigin =
    parseOrigins(process.env.FRONTEND_ORIGIN)[0] ||
    parseOrigins(process.env.FRONTEND_ORIGINS)[0];

  // Only auto-redirect to a configured frontend origin during development.
  // In production we prefer to return a small JSON health response so the API
  // root doesn't accidentally redirect to a developer localhost URL.
  if (frontendOrigin && process.env.NODE_ENV !== 'production') {
    res.redirect(frontendOrigin);
    return;
  }

  res.json({
    status: "ok",
    message: "Baculpo Webprog API is running.",
    health: "/api/health",
  });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/users", userRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Server Error" });
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
