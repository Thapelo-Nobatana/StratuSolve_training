// import dotenv from "dotenv";
// dotenv.config();

import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from project root
dotenv.config({
  path: path.resolve(__dirname, ".env"),
  override: true,
});

import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

console.log("DB USER:", process.env.DB_USER);
console.log("DB HOST:", process.env.DB_NAME);
console.log("DB PASSWORD:", process.env.DB_PASSWORD);
console.log("DB DATABASE:", process.env.DB_NAME);

export default db;
