const mongoose = require("mongoose");

const DEFAULT_DB_NAME = "baculpo_db";

const getMongoUri = () =>
  process.env.MONGO_URI ||
  process.env.MONGODB_URI ||
  process.env.DATABASE_URL ||
  process.env.MONGO_URl ||
  process.env.MONGO_UR1;

const getMongoDbName = () =>
  process.env.MONGO_DB_NAME ||
  process.env.MONGODB_DB_NAME ||
  process.env.DB_NAME ||
  DEFAULT_DB_NAME;

const connectDB = async () => {
  try {
    const mongoUri = getMongoUri();
    const dbName = getMongoDbName();
    console.log("[db] MONGO_URI present:", Boolean(process.env.MONGO_URI));
    console.log("[db] MONGODB_URI present:", Boolean(process.env.MONGODB_URI));
    console.log("[db] DATABASE_URL present:", Boolean(process.env.DATABASE_URL));
    console.log("[db] MONGO_URl present:", Boolean(process.env.MONGO_URl));
    console.log("[db] MONGO_UR1 present:", Boolean(process.env.MONGO_UR1));
    console.log("[db] MongoDB database:", dbName);

    if (!mongoUri) {
      throw new Error(
        "Missing MongoDB connection string. Set MONGO_URI in Render environment variables.",
      );
    }

    const conn = await mongoose.connect(String(mongoUri).trim(), {
      dbName,
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
        "Authentication failed. Check MONGO_URI username/password, ensure the DB user exists in Atlas, and allow Render in Atlas Network Access.",
      );
    }

    throw error;
  }
};

module.exports = connectDB;
