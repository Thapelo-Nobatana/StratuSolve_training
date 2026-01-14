import db from "../db/database.js";
import bcrypt from "bcrypt";

class User {
  // Create a new user
  static async create(username, email, password, role = "user") {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = `
      INSERT INTO users (username, email, password, role)
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await db.query(sql, [
      username,
      email,
      hashedPassword,
      role,
    ]);
    console.log("userId:", result.insertId);

    return result.insertId;
  }

  // Find a user by ID
  static async findById(id) {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  }

  // Find a user by email
  static async findByEmail(email) {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0];
  }

  // Update user profile
  static async update(id, data) {
    const { username, email, photo } = data;

    let sql = "UPDATE users SET ";
    const values = [];
    if (username) {
      sql += "username=?, ";
      values.push(username);
    }
    if (email) {
      sql += "email=?, ";
      values.push(email);
    }
    if (photo) {
      sql += "photo=?, ";
      values.push(photo);
    }

    // Remove trailing comma
    sql = sql.slice(0, -2);
    sql += " WHERE id=?";
    values.push(id);

    await db.query(sql, values);
  }

  // reset password

  // static async updatePassword(email, password) {
  // let sql = "UPDATE users SET ";
  // const values = [];

  // if (password) {
  //   const updatedhashedPassword = await bcrypt.hash(password, 10);
  //   sql += "password=?,";
  //   values.push(updatedhashedPassword);
  // }

  // // Remove trailing comma
  // sql = sql.slice(0, -2);
  // sql += "WHERE email=?";
  // values.push(email);

  // await db.query(sql, values);

  //   if (!email || !password) {
  //     throw new Error("Email and password required");
  //   }

  //   const hashedPassword = await bcrypt.hash(password, 10);

  //   const [result] = await db.query(
  //     "UPDATE users SET password = ? WHERE email = ?",
  //     [hashedPassword, email]
  //   );

  //   if (result.affectedRows === 0) {
  //     throw new Error("User not found");
  //   }

  //   return true;
  // }

  static async saveResetToken(email, token, expires) {
    return db.query(
      "UPDATE users SET reset_token=?, reset_token_expires=? WHERE email=?",
      [token, expires, email]
    );
  }

  static async findByResetToken(token) {
    const [rows] = await db.query("SELECT * FROM users WHERE reset_token=?", [
      token,
    ]);
    return rows[0];
  }

  // clear user token after update

  static async clearResetToken(id) {
    return db.query(
      "UPDATE users SET reset_token=NULL, reset_token_expires=NULL WHERE id=?",
      [id]
    );
  }
  // Update user Password
  static async updatePasswordByEmail(email, hashedPassword) {
    const sql = `UPDATE users SET password = ? WHERE email= ?`;
    const [result] = await db.query(sql, [hashedPassword, email]);
    return result.affectedRows === 1;
  }

  // Delete user
  static async delete(id) {
    await db.query("DELETE FROM users WHERE id=?", [id]);
  }

  // Validate password (for login)
  static async validatePassword(user, password) {
    if (!user) return false;
    return await bcrypt.compare(password, user.password);
  }

  // Get all users (optional admin method)
  static async findAll() {
    const [rows] = await db.query("SELECT * FROM users");
    return rows;
  }
}

export default User;
