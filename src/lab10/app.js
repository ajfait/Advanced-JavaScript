const http = require("http");
const fs = require("fs");

let server = http.createServer((req, res) => {
  let fileName = "index.html";
  fs.readFile(fileName, (err, data) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data.toString());
    res.end();
  });
});

server.listen(3333, () => {
  console.log("Listening on port 3333");
});
