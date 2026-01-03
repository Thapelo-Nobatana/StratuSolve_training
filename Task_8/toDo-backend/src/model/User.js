import db from '../db/database.js';
import bcrypt from 'bcrypt';

class User {
    
  // Create a new user
  static async create( username, email, password, role = 'user' ) {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = `
      INSERT INTO users (username, email, password, role)
      VALUES (?, ?, ?, ?)
    `;
    console.log("adding people ",sql);

    const [result] = await db.query(sql, [username, email,
       hashedPassword, role]);
    console.log(result, "adding ",email,username,hashedPassword)
    return result.insertId;

  }

  // Find a user by ID
  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  // Find a user by email 
  static async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  // Update user profile
  static async update(id, data) {
    const { username, password, photo } = data;

    let sql = 'UPDATE users SET ';
    const values = [];
    if (username) {
      sql += 'username=?, ';
      values.push(username);
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      sql += 'password=?, ';
      values.push(hashedPassword);
    }
    if (photo) {
      sql += 'photo=?, ';
      values.push(photo);
    }

    // Remove trailing comma
    sql = sql.slice(0, -2);
    sql += ' WHERE id=?';
    values.push(id);

    await db.query(sql, values);
  }

  // Delete user
  static async delete(id) {
    await db.query('DELETE FROM users WHERE id=?', [id]);
  }

  // Validate password (for login)
  static async validatePassword(user, password) {
    if (!user) return false;
    return await bcrypt.compare(password, user.password);
  }

  // Get all users (optional admin method)
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
  }
}


export default User;