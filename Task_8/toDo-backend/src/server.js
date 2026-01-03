import "dotenv/config" ;
import http from 'http';
import bcrypt from 'bcrypt';
import Task from './model/Task.js';
import User from './model/user.js';
import Category from './model/Category.js';
import { parseBody } from './utils/parseBody.js';
const hostName = 'localhost';
const port = 8100;

// this function is setting response, statuscode and stringify your data;
function send(res, status, data) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

// this is the server handler

async function handleClient(req, res) {

    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");

    //
  // Handle OPTIONS  requests
  if (req.method === "OPTIONS") {
        res.writeHead(204); // No Content
        res.end();
        return;
  }
   //  AUTH ROUTES


  // SIGNUP
  if (req.method === 'POST' && req.url === '/auth/signup') {
    try {
      const body = await parseBody(req);
      //early return 
      if (body.err){
        send(res, 400, { error: body.err});
        return;
        
      }
      if (body.email && body.password && body.role){
        const existing = await User.findByEmail(body.email);

        if (existing) {
          send(res, 409, { error: 'User already exists' });
          return;
        }
      console.log(body, existing ? "exists": "non-exist");

        const userId = await User.create(body.username, body.email,body.password
        );

        send(res, 200, { userId });
        return;
      }
      send(res, 400, { error: 'email is required in request body' });
    return;
      
    } catch {
      send(res, 400, { error: 'Invalid Request' });
    return;
 
    }
  }

  // LOGIN
  if (req.method === 'POST' && req.url === '/auth/login') {
    try {
      const body = await parseBody(req);
      const user = await User.findByEmail(body.email);

      if (!user) {
        send(res, 400, { error: 'Invalid credentials' });
        return;
      }

      const valid = await bcrypt.compare(body.password, user.password);
      if (!valid) {
        send(res, 400, { error: 'Invalid credentials' });
        return;
      }

      send(res, 200, {
        userId: user.id,
        username: user.username,
        role: user.role
      });
    } catch {
      send(res, 400, { error: 'Invalid request' });
    }
    return;
  }
  
  // update user

  if (req.method === 'PUT' && req.url.startsWith('/auth/update/')) {
  const id = req.url.split('/')[3];
 
  req.on('end', async () => {
    try {
      const data = await parseBody(req);

     await User.update(id, data);

       send(res, 200, { message: 'Task updated'})
  
    } catch {
      send(res, 400, {message: 'Invalid request'})
 
    }
  });
  return;
}


  /* =========================
     AUTH CHECK
  ========================= */
  const userId = req.headers.authorization || null;
  const user = userId ? await User.findById(userId) : null;

  /* =========================
     TASK ROUTES
  ========================= */

  // GET TASKS
  if (req.method === 'GET' && req.url === '/tasks') {

    if (!user) {
      send(res, 401, { error: 'Not authenticated' });
      return;
    }


    const tasks = await Task.loadByUser(user.id);
    console.log("all tasks from user ",userId," tasks ",tasks);
    send(res, 200, tasks);
    return;
  }

  // CREATE TASK
  if (req.method === 'POST' && req.url === '/tasks') {
    console.log("userId, ",userId)
    
    if (!user) {
      send(res, 401, { error: 'Not authenticated' });
      return;
    }

    const body = await parseBody(req);

    const id = await Task.create(
      body.title,
      body.description,
      userId,
      body.categoryId || null,
    );

    send(res, 200, { id });
    return;
  }

  // UPDATE TASK
  if (req.method === 'PUT' && req.url.startsWith('/tasks/')) {
    if (!user) {
      send(res, 401, { error: 'Not authenticated' });
      return;
    }

    const id = req.url.split('/')[2];
    const body = await parseBody(req);

    await Task.update(id, body);
    send(res, 200, { message: 'Task updated' });
    return;
  }

  // DELETE TASK
  if (req.method === 'DELETE' && req.url.startsWith('/tasks/')) {
    if (!user) {
      send(res, 401, { error: 'Not authenticated' });
      return;
    }

    const id = req.url.split('/')[2];
    await Task.delete(id);
    send(res, 200, { message: 'Task deleted' });
    return;
  }

  /* =========================
     CATEGORY ROUTES (ADMIN)
  ========================= */

  // GET CATEGORIES
  if (req.method === 'GET' && req.url === '/categories') {
    const categories = await Category.loadAll();
    send(res, 200, categories);
    return;
  }

  // CREATE CATEGORY (ADMIN ONLY)
  if (req.method === 'POST' && req.url === '/categories') {
    if (!user || user.role !== 'admin') {
      send(res, 403, { error: 'Forbidden' });
      return;
    }

    const body = await parseBody(req);
    await Category.create(body.name, body.color);

    send(res, 201, { message: 'Category created' });
    return;
  }

  /* =========================
     FALLBACK
  ========================= */
  send(res, 404, { error: 'Route not found' });
}

/* =========================
   START SERVER
========================= */
const server = http.createServer(handleClient);

server.listen(port, hostName, () => {
  console.log(`Server running at http://${hostName}:${port}`);
});