import http from "http";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";
import Task from "./model/Task.js";
import User from "./model/user.js";
import Category from "./model/Category.js";
import { isAdmin } from "./utils/isAdmin.js";
import { parseBody } from "./utils/parseBody.js";

// session helpers
import {
  createSession,
  getSession,
  destroySession,
} from "./utils/sessionStore.js";
import { parseCookies } from "./utils/parseCookies.js";

const hostName = "localhost";
const port = 8100;

// this function is setting response, statuscode and stringify your data;
function send(res, status, data) {
  res.statusCode = status;
  // res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
  return;
}

// this is the server handler

async function handleClient(req, res) {
  res.setHeader("Access-Control-Allow-Origin", `http://${hostName}:5173`);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Content-Type", "application/json");

  //  HANDLE OPTIONS REQUESTS
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // AUTH CHECK
  const cookies = parseCookies(req.headers.cookie);
  const session = cookies.sid ? getSession(cookies.sid) : null;
  const user = session ? await User.findById(session.userId) : null;

  // GET USER CHECK

  if (req.method === "GET" && req.url === "/auth/me") {
    if (!user) {
      send(res, 401, { user: null });
      return;
    }

    send(res, 200, {
      user: { id: user.id, username: user.username, role: user.role },
    });
    return;
  }

  //  AUTH ROUTES
  // SIGNUP
  if (req.method === "POST" && req.url === "/auth/signup") {
    try {
      const body = await parseBody(req);

      if (body.err) {
        send(res, 400, { error: body.err });
        return;
      }
      if (body.email && body.password && body.username) {
        const existing = await User.findByEmail(body.email);

        if (existing) {
          send(res, 400, { error: "User already exists" });
          return;
        }
        // creating a user
        const userId = await User.create(
          body.username,
          body.email,
          body.password
        );

        const user = await User.findById(userId);

        // create a seasion
        const sessionId = createSession(user);
        const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

        res.setHeader(
          "Set-Cookie",
          `sid=${sessionId}; HttpOnly; Path=/; SameSite=Lax; Expires=${expiryDate.toUTCString()}`
        );

        send(res, 200, {
          id: user.id,
          username: user.username,
          role: user.role,
        });
      }
      return;
    } catch {
      send(res, 400, { error: "Invalid Request" });
      return;
    }

    return;
  }

  // LOGIN
  if (req.method === "POST" && req.url === "/auth/login") {
    try {
      const body = await parseBody(req);
      const user = await User.findByEmail(body.email);
      if (!user) {
        send(res, 400, { error: "Invalid credentials" });
        return;
      }
      const valid = await bcrypt.compare(body.password, user.password);
      if (!valid) {
        send(res, 400, { error: "Invalid credentials" });
        return;
      }

      const sessionId = createSession(user);

      const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

      res.setHeader(
        "Set-Cookie",
        `sid=${sessionId}; HttpOnly; Path=/; SameSite=Lax; Expires=${expiryDate.toUTCString()}`
      );

      send(res, 200, {
        username: user.username,
        role: user.role,
      });
      return;
    } catch {
      send(res, 400, { error: "Invalid request" });
    }
    return;
  }

  // LOGOUT
  if (req.method === "POST" && req.url === "/auth/logout") {
    try {
      if (cookies.sid) {
        destroySession(cookies.sid);
      }
      res.setHeader(
        "Set-Cookie",
        "sid=; HttpOnly;  Path=/; SameSite=Lax; Max-Age=0"
      );

      send(res, 200, { message: "Logged out" });
      return;
    } catch {
      send(res, 400, { error: " something went wrong" });
      return;
    }
  }
  // USER ROUTES
  // Get users
  if (req.method === "GET" && req.url === "/admin/users") {
    try {
      if (!isAdmin(user)) {
        send(res, 400, { error: " Admin only" });
        return;
      }

      let users = await User.findAll();

      send(res, 200, users);
      // console.log("all users:", users);
      return;
    } catch {
      send(res, 400, { error: "Failed to fetch users" });
      return;
    }
  }

  //FORGOT PASSWORD END POINTS

  // forgot Password Endpoint
  if (req.method === "POST" && req.url === "/auth/forgot-password") {
    try {
      const { email } = await parseBody(req);

      const user = await User.findByEmail(email);
      if (!user) {
        return send(res, 200, {
          message: "If the email exists, a reset link has been sent",
        });
      }

      const token = crypto.randomBytes(32).toString("hex");
      const expires = new Date(Date.now() + 1000 * 60 * 15);

      await User.saveResetToken(email, token, expires);
      // TODO
      const resetLink = `http://${hostName}:5173/forgotpassword?token=${token}`;

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "nobatanathapelo@gmail.com",
          pass: "zemr haqk xril ojbl",
        },
      });
      await transporter.sendMail({
        from: `"Todo App" <${"Thapelo"}>`,
        to: email,
        subject: "Reset your password",
        html: resetLink,
      });

      send(res, 200, { message: "Reset link sent" });
      return;
    } catch {
      send(res, 500, { message: "Something went wrong" });
      return;
    }
  }

  //Reset Password Endpoint
  if (req.method === "POST" && req.url === "/auth/reset-password") {
    try {
      const { token, password } = await parseBody(req);

      const user = await User.findByResetToken(token);

      if (!user || new Date(user.reset_token_expires) < new Date()) {
        return send(res, 400, { message: "Invalid or expired token" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const update = await User.updatePasswordByEmail(
        user.email,
        hashedPassword
      );

      if (!update) {
        return send(res, 500, { message: "Could not update password" });
      }

      await User.clearResetToken(user.id);

      return send(res, 200, { message: "Password reset successful" });
    } catch (err) {
      console.error("Reset password error:", err);

      return send(res, 500, { message: "Could not reset password" });
    }
  }

  // update user Profile
  if (req.method === "PUT" && req.url === "/auth/update") {
    if (!user) {
      send(res, 401, { error: "Not authenticated" });
      return;
    }

    try {
      const body = await parseBody(req);

      // Only allow specific fields to be updated
      const allowedFields = ["username", "email", "photo"];
      const updateData = {};

      for (let field of allowedFields) {
        if (body[field] !== undefined) {
          updateData[field] = body[field];
        }
      }

      if (Object.keys(updateData).length === 0) {
        send(res, 400, { error: "No valid fields to update" });
        return;
      }

      // Call User.update with the logged-in user's ID
      await User.update(user.id, updateData);

      // Return updated user info
      const updatedUser = await User.findById(user.id);
      send(res, 200, {
        message: "Profile updated",
        user: {
          id: updatedUser.id,
          username: updatedUser.username,
          email: updatedUser.email,
          photo: updatedUser.photo,
        },
      });
    } catch (err) {
      // console.error("Profile update error:", err);
      send(res, 500, { message: "Server error" });
    }
  }

  // TASK ROUTES

  // GET TASKS
  if (req.method === "GET" && req.url === "/tasks") {
    console.log("we should get this:");
    if (!user) {
      send(res, 401, { error: "Not authenticated" });
      console.log("123");
      return;
    }

    const tasks = await Task.loadByUser(user.id);
    console.log("All tasks:", tasks);
    send(res, 200, tasks);
    return;
  }

  // CREATE TASK
  if (req.method === "POST" && req.url === "/tasks") {
    if (!user) {
      send(res, 401, { error: "Not authenticated" });
      return;
    }

    const body = await parseBody(req);

    const id = await Task.create(
      body.title,
      body.description,
      user.id,
      false,
      body.categoryId || null
    );

    send(res, 200, { id });
    return;
  }

  // UPDATE TASK
  if (req.method === "PUT" && req.url.startsWith("/tasks/")) {
    if (!user) {
      send(res, 401, { error: "Not authenticated" });
      return;
    }

    const id = req.url.split("/")[2];
    const body = await parseBody(req);

    await Task.update(id, body);
    send(res, 200, { message: "Task updated" });
    return;
  }

  // DELETE TASK
  if (req.method === "DELETE" && req.url.startsWith("/tasks/")) {
    if (!user) {
      send(res, 401, { error: "Not authenticated" });
      return;
    }

    const id = req.url.split("/")[2];
    await Task.delete(id);
    send(res, 200, { message: "Task deleted" });
    return;
  }

  // TASK WITH USER (ADMIN ONLY)

  if (req.method === "GET" && req.url === "/admin/tasks") {
    if (!isAdmin(user)) {
      send(res, 400, { message: "Admin only" });
      return;
    }

    const tasks = await Task.findAllWithUsers();
    send(res, 200, tasks);
    return;
  }

  // CATEGORY ROUTES (ADMIN ONLY)

  // GET CATEGORIES
  if (req.method === "GET" && req.url === "/categories") {
    const categories = await Category.findAll();
    send(res, 200, categories);
    return;
  }

  // CREATE CATEGORY (ADMIN ONLY)
  if (req.method === "POST" && req.url === "/categories") {
    if (!isAdmin(user)) {
      send(res, 400, { error: "Admin only" });
      return;
    }

    const body = await parseBody(req);

    await Category.create(body.name, body.color);

    send(res, 201, { message: "Category created" });
    return;
  }

  // UPDATE CATEGORIES

  if (req.method === "PUT" && req.url.startsWith("/categories/")) {
    const id = req.url.split("/")[2];

    const body = await parseBody(req);

    if (!isAdmin(user)) {
      send(res, 400, { error: "Admin only" });
      return;
    }

    await Category.update(id, body);
    send(res, 200, { message: "Category updated" });
    return;
  }

  // DELETE CATEGORIES
  if (req.method === "DELETE" && req.url.startsWith("/categories/")) {
    let id = req.url.split("/")[2];

    if (!isAdmin(user)) {
      send(res, 400, { error: "Admin only" });
      return;
    }

    await Category.delete(id);
    send(res, 200, { message: "Category deleted" });
    return;
  }

  //  FALLBACK

  send(res, 404, { error: "Route not found" });
  return;
}

//  START SERVER

const server = http.createServer(handleClient);

// SERVER Listen
server.listen(port, hostName, () => {
  console.log(`Server running at http://${hostName}:${port}`);
});
