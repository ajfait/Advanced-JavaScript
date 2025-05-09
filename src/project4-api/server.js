/*
 * Alison Fait
 * Online
 * ajfait@madisoncollege.edu
 *
 */

"use strict";

// Create global constants
const BASE_URL = "/api/tasks";
const GET_TASK_URL = `${BASE_URL}/:id`;
const MODIFY_TASK_URL = `${BASE_URL}/:id/:description`;
const TASKS_FILE = path.join(__dirname, "tasks.json");

// Create global variables
const express = require("express");
const app = express();
const port = 8080;
const fs = require("fs");
const path = require("path");

// Declare tasks object to store task data
let tasks = {};

// Load tasks from file if it exists
if (fs.existsSync(TASKS_FILE)) {
  const rawData = fs.readFileSync(TASKS_FILE);
  tasks = JSON.parse(rawData);
}

// Use public folder for static assets
app.use(express.static("public"));

/*
 * This function saves tasks to the JSON file.
 */
function saveTasksToFile() {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

/*
 * The http get endpoint accepts 1 parameter named :id and returns the tasks
 * corresponding to that parameter value. The return value has the content-type
 * set to application/json and returns a json collection of tasks. If no tasks exist
 * with the associated :id parameter, it returns an empty collection.
 */
app.get(GET_TASK_URL, (req, res) => {
  const id = req.params.id;
  const retrievedTasks = tasks[id] || [];

  res.status(200).json(retrievedTasks);
});

/*
 * The http post endpoint accepts 2 parameters named :id and :description and returns
 * a confirmation of the new task created. The http post handles an insert of a task
 * into the data collection.
 */
app.post(MODIFY_TASK_URL, (req, res) => {
  const { id, description } = req.params;

  if (!tasks[id]) {
    tasks[id] = [];
  }

  tasks[id].push(description);
  saveTasksToFile();

  res.status(201).json({
    message: "Task added",
    id,
    description,
    tasks: tasks[id],
  });
});

/*
 * The http delete endpoint accepts 2 parameters named :id and :description and returns
 * a confirmation of the task deleted. The http delete handles a removal of a task that
 * has a matching id and description.
 */
app.delete(MODIFY_TASK_URL, (req, res) => {
  const { id, description } = req.params;

  if (!tasks[id]) {
    return res.status(404).json({ message: "No tasks found for this ID" });
  }

  const originalLength = tasks[id].length;
  tasks[id] = tasks[id].filter((task) => task !== description);
  saveTasksToFile();

  if (tasks[id].length < originalLength) {
    res.status(200).json({
      message: "Task deleted",
      id,
      description,
      remaining: tasks[id],
    });
  } else {
    res.status(404).json({ message: "Task not found", id, description });
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
