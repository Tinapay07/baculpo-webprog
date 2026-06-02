const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    console.log("[db] MONGO_URI present:", Boolean(process.env.MONGO_URI));
    console.log("[db] MONGODB_URI present:", Boolean(process.env.MONGODB_URI));

    if (!mongoUri) {
      throw new Error(
        "Missing MongoDB connection string. Set MONGO_URI in Render environment variables.",
      );
    }

    const conn = await mongoose.connect(String(mongoUri).trim(), {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      w: "majority",
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    // Log the full error object for easier debugging (includes stack and driver details)
    console.error("MongoDB Connection Error:", error);

    // Give an actionable hint when authentication fails
    const msg = String(error.message || "").toLowerCase();
    if (
      msg.includes("auth") ||
      msg.includes("authentication") ||
      msg.includes("bad auth")
    ) {
      console.error(
        "Authentication failed. Check `server/.env` MONGO_URI username/password, ensure the DB user exists in Atlas, and whitelist your IP in Atlas Network Access.",
      );
    }

    throw error;
  }
};

module.exports = connectDB;
