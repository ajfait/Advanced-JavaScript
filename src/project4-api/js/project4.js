"use strict";

const express = require("express");
const app = express();
const port = 8080;
const url = "/api/tasks/";

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
