import db from '../db/database.js';

class Task {
  // Create a new task
  static async create(title, description, userId, completed = false, categoryId = null, ) {
    const sql = `
      INSERT INTO tasks (title, description, user_id, completed, category_id)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [
      title,
      description,
      userId,
      completed ? 1 : 0,
      categoryId
    ]);
    return result.insertId;
  }

  // load task user

  static async loadByUser(userid){
    const [rows] = await db.query('SELECT * FROM tasks WHERE user_id = ?', [userid]);
    return rows;
  }

  // Get a task by ID
  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
    return rows[0];
  }

  // Get all tasks for a user (optionally filtered by category)
  static async findAll(userId, categoryId = null) {
    let sql = 'SELECT * FROM tasks WHERE user_id = ?';
    const values = [userId];
    if (categoryId !== null) {
      sql += ' AND category_id = ?';
      values.push(categoryId);
    }
    const [rows] = await db.query(sql, values);
    return rows;
  }

  // Update a task
  static async update(id, data) {
    const { title, description, completed, categoryId } = data;

    let sql = 'UPDATE tasks SET ';
    const values = [];
    if (title !== undefined) {
      sql += 'title=?, ';
      values.push(title);
    }
    if (description !== undefined) {
      sql += 'description=?, ';
      values.push(description);
    }
    if (completed !== undefined) {
      sql += 'completed=?, ';
      values.push(completed ? 1 : 0);
    }
    if (categoryId !== undefined) {
      sql += 'category_id=?, ';
      values.push(categoryId);
    }

    sql = sql.slice(0, -2); // remove trailing comma
    sql += ' WHERE id=?';
    values.push(id);

    await db.query(sql, values);
  }

  // Delete a task
  static async delete(id) {
    await db.query('DELETE FROM tasks WHERE id=?', [id]);
  }

  // Delete all tasks for a user
  static async deleteAll(userId) {
    await db.query('DELETE FROM tasks WHERE user_id=?', [userId]);
  }
}

export default Task;