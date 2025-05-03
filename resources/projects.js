const db = require("../db.js");

/**
 * constructor for the project object
 * @param {the data to instantiate a project} data
 */
const Project = function (data) {
  this.id = data.id;
  this.projectname = data.projectname;
  this.projectdesc = data.projectdesc;
  this.startdate = data.startdate;
  this.enddate = data.enddate;
};

/**
 * handler for creating a new project using json body and inserting it into the db
 * sends 400 error if body is empty, 500 on server error
 * @param {request being used} req
 * @param {response message to send back} res
 */
Project.createProject = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "content can't be empty" });
  } else {
    const newProject = new Project(req.body);
    db.query("INSERT INTO projects SET ?", newProject, (err, results) => {
      if (err) {
        return res
          .status(500)
          .send({ message: "Server error creating project" });
      }
      res.status(201).send(results);
    });
  }
};

/**
 * handler for getting all projects from the db
 * sends a 500 error on server error
 * @param {request being used} req
 * @param {response to send back} res
 */
Project.getAllProjects = (req, res) => {
  db.query("SELECT * FROM projects", (err, results) => {
    if (err) {
      return res
        .status(500)
        .send({ message: "Server error retrieving projects" });
    }
    res.status(200).send(results);
  });
};

/**
 * handler for getting a project by id from the db
 * sends a 404 if not found, 500 on server error
 * @param {request being used} req
 * @param {response to send back} res
 */
Project.getProjectById = (req, res) => {
  db.query(
    "SELECT * FROM projects WHERE id = ?",
    req.params.id,
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .send({ message: "Server error retrieving this project" });
      }
      if (results.length === 0) {
        return res.status(404);
      }
      res.status(200).send(results);
    }
  );
};

/**
 * handler for getting a project by name from the db
 * sends a 404 if not found, 500 on server error
 * @param {request being used} req
 * @param {response to send back} res
 */
Project.getProjectByName = (req, res) => {
  db.query(
    "SELECT * FROM projects WHERE projectname = ?",
    req.params.projectname,
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .send({ message: "Server error retrieving project with that name" });
      }
      if (results.length === 0) {
        return res.status(404).send("Project not found for this name");
      }
      res.status(200).send(results);
    }
  );
};

/**
 * handler for deleting all projects from the db
 * sends a 500 error on server failure
 * @param {request being used} req
 * @param {response to send back} res
 */
Project.deleteAllProjects = (req, res) => {
  db.query("DELETE FROM projects", (err, results) => {
    if (err) {
      return res
        .status(500)
        .send({ message: "Server error deleting all projects" });
    }
    res.status(200).send(results);
  });
};

/**
 * handler for deleting a singular project from the db
 * sends a 404 if not found, 500 on server error
 * @param {request being used} req
 * @param {response to send back} res
 */
Project.deleteProjectById = (req, res) => {
  db.query(
    "DELETE FROM projects WHERE id = ?",
    req.params.id,
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .send({ message: "Server error deleting project" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).send("Project not found for deletion");
      }
      res.status(200).send(results);
    }
  );
};

/**
 * handler for updating a project in the db
 * sends a 400 if body is empty, 404 if project not found, 500 on server error
 * @param {request being used} req
 * @param {response to send back} res
 */
Project.updateProject = (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: "body can't be empty when updating" });
  } else {
    const updatedProject = new Project(req.body);
    db.query(
      "UPDATE projects SET projectname = ?, projectdesc = ?, startdate = ?, enddate = ? WHERE id = ?",
      [
        updatedProject.projectname,
        updatedProject.projectdesc,
        updatedProject.startdate,
        updatedProject.enddate,
        req.params.id,
      ],
      (err, results) => {
        if (err) {
          return res
            .status(500)
            .send({ message: "Server error updating project" });
        }
        if (results.affectedRows === 0) {
          return res.status(404).send("Project not found for update");
        }
        res.status(200).send(results);
      }
    );
  }
};

module.exports = Project; //exports the project object and its functions
