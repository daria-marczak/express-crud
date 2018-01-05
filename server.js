var express = require("express");
var fs = require("fs");
var app = express();
var bodyParser = require("body-parser");

var low = require("lowdb");
var FileSync = require("lowdb/adapters/FileSync");

var adapter = new FileSync("test.json");
var db = low(adapter);
db.defaults({notes: []})
  .write();

app.use(bodyParser.json()); 

app.get("/getNote", function(req, res) {
  fs.readFile("./test.json", "utf-8", function(err, data) {
    if (err) throw err;
    res.send(data);
  });
});

app.post("/updateNote/:value", function(req, res) {
  value = req.params.value;
  db.get("notes")
    .push(value)
    .write();
  // fs.writeFile("./test.json", stringifyFile, function(err) {
  //   if (err) throw err;
  //   console.log("File updated");
  //   res.send();
  // });
  res.end();
});

app.use(function(req, res, next) {
  res.status(404).send("Sorry, I couldn't find it");
});

app.listen(3000);