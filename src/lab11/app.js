const express = require("express");
const app = express();
const port = 8080;

// JSON object
let cats = [
  { name: "josie" },
  { name: "june" },
  { name: "april" },
  { name: "ana" },
  { name: "aggie" },
  { name: "janis" },
  { name: "alex" },
  { name: "amelia" },
];

// Root
app.get("/", (req, res) => {
  res.send(
    '<h1>Lab 11</h1>\n<p>Endpoint 1: <a href="http://localhost:8080/hello-world">hello-world</a></p>\n<p>Endpoint 2: <a href="http://localhost:8080/json-object">json-object</a></p>\n<p>Endpoint 3: <a href="http://localhost:8080/file">file</a></p>'
  );
});

// The first end point should output hello world in an h1 tag
app.get("/hello-world", (req, res) => {
  res.send("<h1>hello world</h1>");
});

// The second end point should output a json object using the json method of the response object
app.get("/json-object", (req, res) => {
  res.json(cats);
});

// The third end point should output the contents of an html page using the file methods we used to read a file
app.get("/file", (req, res) => {
  res.sendFile(
    "/Volumes/AJPC_2TB_SSD/*Advanced JavaScript/src/lab11/index.html"
  );
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
