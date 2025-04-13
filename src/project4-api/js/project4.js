"use strict";

// Global variables
const express = require("express");
const app = express();
const port = 8080;
const getURL = "/api/tasks/get:id";
const postURL = "/api/tasks/post:id/:description";
const deleteURL = "/api/tasks/delete:id/:description";

// Empty JSON object
let tasks = {};

/*
 * The http get endpoint will accepts 1 parameter named :id and returns the tasks
 * corresponding to that parameter value. The return value must has the content-type
 * set to application/json and returns a json collection of tasks. If no tasks exist
 * with the associated :id parameter, it returns an empty collection.
 */
app.get(getURL, (req, res) => {
  res.send("");
});

/*
 * The http post endpoint accepts 2 parameters named :id and :description and returns
 * a confirmation of the new task created. The http post handles an insert of a task
 * into the data collection.
 */
app.post(postURL, (req, res) => {
  res.send("");
});

/*
 * The http delete endpoint accepts 2 parameters named :id and :description and returns
 * a confirmation of the task deleted. The http delete handles a removal of a task that
 * has a matching id and description.
 */
app.delete(deleteURL, (req, res) => {
  res.send("");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
