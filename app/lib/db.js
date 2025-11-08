import mysql from "mysql2/promise";
import dotenv from "dotenv";
import path from "path";

// Force-load .env.local from project root
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

export async function connectDB() {
  try {
    console.log("🔍 Checking DB ENV:", {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD ? "(hidden)" : "(empty)",
      database: process.env.DB_NAME,
    });

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME,
    });

    console.log("Database connected successfully!");
    return connection;
  } catch (error) {
    console.error(" Database connection error:", error);
    throw error;
  }
}
