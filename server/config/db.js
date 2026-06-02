const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
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
