const express = require("express");
const path = require("path");
const app = express();
const project = require("./resources/projects.js");
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

//route to create new project
app.post("/projects", (req, res) => {
  project.createProject(req, res);
});

//rpoute to get all projects
app.get("/projects", (req, res) => {
  project.getAllProjects(req, res);
});

app.get("/projects/:id", (req, res) => {
  project.getProjectById(req, res);
});

//route to get project by name
app.get("/projects/by-name/:projectname", (req, res) => {
  project.getProjectByName(req, res);
});

//route to update project by id
app.put("/projects/:id", (req, res) => {
  project.updateProject(req, res);
});

//route to update project by name
app.delete("/projects", (req, res) => {
  project.deleteAllProjects(req, res);
});

//route to delete project by id
app.delete("/projects/:id", (req, res) => {
  project.deleteProjectById(req, res);
});

// starts server and listens on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
