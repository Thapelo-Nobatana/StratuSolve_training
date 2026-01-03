import db from '../db/database.js';

class Category {
  // Create a new category
  static async create({ name, color }) {
    const sql = `
      INSERT INTO categories (name, color)
      VALUES (?, ?)
    `;
    const [result] = await db.query(sql, [name, color]);
    return result.insertId;
  }

  // Get a category by ID
  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM categories WHERE id = ?', [id]);
    return rows[0];
  }

  // Get all categories
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM categories');
    return rows;
  }

  // Update a category
  static async update(id, data) {
    const { name, color } = data;

    let sql = 'UPDATE categories SET ';
    const values = [];
    if (name !== undefined) {
      sql += 'name=?, ';
      values.push(name);
    }
    if (color !== undefined) {
      sql += 'color=?, ';
      values.push(color);
    }

    sql = sql.slice(0, -2); // remove trailing comma
    sql += ' WHERE id=?';
    values.push(id);

    await db.query(sql, values);
  }

  // Delete a category
  static async delete(id) {
    await db.query('DELETE FROM categories WHERE id=?', [id]);
  }
}

export default Category;