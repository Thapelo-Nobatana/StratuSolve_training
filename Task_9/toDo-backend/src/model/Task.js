import db from "../db/database.js";
import Category from "./Category.js";

class Task {
  // Create a new task
  static async create(
    title,
    description,
    userId,
    completed = false,
    categoryId = null
  ) {
    const sql = `
      INSERT INTO tasks (title, description, user_id, completed, category_id)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [
      title,
      description,
      userId,
      completed ? 1 : 0,
      categoryId,
    ]);
    return result.insertId;
  }

  // load task user

  static async loadByUser(userid) {
    let ConditionStr = userid ? "WHERE tasks.user_id = ?" : "";
    const sql = ` SELECT
      tasks.id,
      tasks.title,
      tasks.description,
      tasks.completed,
      tasks.user_id,
      categories.id AS category_id,
      categories.name AS category_name,
      categories.color AS category_color
    FROM tasks
    LEFT JOIN categories ON tasks.category_id = categories.id
    ${ConditionStr}
    ORDER BY tasks.id DESC`;
    const [rows] = await db.query(sql, [userid]);
    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      completed: !!row.completed,
      category: row.category_id
        ? {
            id: row.category_id,
            name: row.category_name,
            color: row.category_color,
          }
        : null,
    }));
  }
  // if the user is admin
  // static async adminLoadByUser() {}

  // Get a task by ID
  static async findById(id) {
    const [rows] = await db.query("SELECT * FROM tasks WHERE id = ?", [id]);
    return rows[0];
  }

  // Get all tasks for a user (optionally filtered by category)
  static async findAll(userId, categoryId = null) {
    let sql = "SELECT * FROM tasks WHERE user_id = ?";
    const values = [userId];
    if (categoryId !== null) {
      sql += " AND category_id = ?";
      values.push(categoryId);
    }
    const [rows] = await db.query(sql, values);
    return rows;
  }

  // Update a task
  static async update(id, data) {
    const { title, description, completed, categoryId } = data;

    let sql = "UPDATE tasks SET ";
    const values = [];
    if (title !== undefined) {
      sql += "title=?, ";
      values.push(title);
    }
    if (description !== undefined) {
      sql += "description=?, ";
      values.push(description);
    }
    if (completed !== undefined) {
      sql += "completed=?, ";
      values.push(completed ? 1 : 0);
    }
    if (categoryId !== undefined) {
      sql += "category_id=?, ";
      values.push(categoryId);
    }

    sql = sql.slice(0, -2); // remove trailing comma
    sql += " WHERE id=?";
    values.push(id);

    await db.query(sql, values);
  }

  // Get all tasks by user
  static async findAllWithUsers() {
    const sql = `SELECT
      tasks.id,
      tasks.title,
      tasks.description,
      tasks.completed,
      tasks.user_id,
      users.username,
      users.email,
      categories.id AS category_id,
      categories.name AS category_name,
      categories.color AS category_color
    FROM tasks
    JOIN users ON tasks.user_id = users.id
    LEFT JOIN categories ON tasks.category_id = categories.id
    ORDER BY tasks.id DESC`;
    // const [result] = await db.query(
    //   "SELECT tasks.*, users.username, users.email FROM tasks JOIN users ON tasks.user_id = users.id"
    // );
    const [rows] = await db.query(sql);
    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      completed: !!row.completed,
      user_id: row.user_id,
      username: row.username,
      email: row.email,
      category: row.category_id
        ? {
            id: row.category_id,
            name: row.category_name,
            color: row.category_color,
          }
        : null,
    }));
  }

  // Delete a task
  static async delete(id) {
    await db.query("DELETE FROM tasks WHERE id=?", [id]);
  }

  // Delete all tasks for a user
  static async deleteAll(userId) {
    await db.query("DELETE FROM tasks WHERE user_id=?", [userId]);
  }
}

export default Task;
