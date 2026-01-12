import http from 'http';
import Person from './personClass.js';
import fs from 'fs'
import path from 'path';

const hostName = 'localhost';
const port = 8100;
 const htmlFileContent = fs.readFileSync(path.join('/Users/thapelo/Projects/StratuSolve_training/Task_7/task_node', 'frontend.html'), 'utf8');
 const scriptFile = fs.readFileSync(path.join('/Users/thapelo/Projects/StratuSolve_training/Task_7/task_node','app.js') );

 async function hendleClient(req, res){

  // Set CORS headers for all responses
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader('Content-Type', 'application/json');
  // Handle OPTIONS  requests
  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    res.end();
    return;
  }

    // render htmlFile
    if(req.method === "GET" && req.url === '/'){

        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 200;
        res.end(htmlFileContent)
        return;
    }
    // load scriptFile
    if(req.method === "GET" && req.url === '/app.js'){

        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(scriptFile);
        return;
    }



   // GET 
  if(req.method === "GET" && req.url === "/people") {

    res.statusCode = 200;
    const people = await Person.loadAllPeople()
    
    res.end(JSON.stringify(people));
    return;
  };

   // POST / Create Person
  if (req.method === "POST" && req.url === "/people") {
    let body = "";

    req.on("data", chunk => body += chunk);

    req.on("end", async () => {
      const data = JSON.parse(body);
      const id = await Person.createPerson(
        data.firstname,
        data.Surname,
        data.DateOfBirth,
        data.EmailAddress,
        data.Age
      );
      res.statusCode = 200;
      res.end(JSON.stringify({ id }));
    });
    return;
  }

  // update

   if (req.method === "PUT" && req.url.startsWith("/people/")) {

    const id = req.url.split("/")[2];
   
    let body = "";

    req.on("data", chunk => body += chunk);

    req.on("end", async () => {

        try {
             const data = JSON.parse(body);
            await Person.updatePerson(
                id,
                data.firstname,
                data.Surname,
                data.DateOfBirth,
                data.EmailAddress,
                data.Age
            );

            res.statusCode = 200;
            res.end(JSON.stringify({ message: "Updated", id }));
            
        } catch (error) {
         res.statusCode = 400;
        res.end(JSON.stringify({ error: error.message || "Invalid JSON" }));
        }
  
    });
    return;
  }

    // DELETE /people/:id
  if (req.method === "DELETE" && req.url.startsWith("/people/")) {
    const id = req.url.split("/")[2];
    try {
      await Person.deletePerson(id);
      res.statusCode = 200;
      res.end(JSON.stringify({ message: "Deleted", id }));
    } catch (err) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }
   // Delete All People
  if (req.method === "DELETE" && req.url === "/people") {
  await Person.deleteAllPeople();
  res.statusCode = 200;
  res.end(JSON.stringify({ message: "All people deleted" }));
  return;
}


    //unkown Route
    res.statusCode = 404;
    res.end( 
        JSON.stringify({
            error: 'Page not Found '
        })
    );
};

// creating the Server
const server = http.createServer(hendleClient);


// starting the server 

server.listen(port, hostName, () => {
    console.log(`API running on http://${hostName}:${port}`);
})