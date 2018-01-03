var express = require("express");
var fs = require("fs");
var app = express();
var bodyParser = require("body-parser");


var stringifyFile;

app.use(bodyParser.json()); 

app.get("/getNote", function(req, res) {
  fs.readFile("./test.json", "utf-8", function(err, data) {
    if (err) throw err;
    stringifyFile = data
    res.send(data);
  });
});

app.post("/updateNote/:note", function(req, res) {
  stringifyFile = req.params.note;
  fs.writeFile("./test.json", stringifyFile, function(err) {
    if (err) throw err;
    console.log("File updated");
  });
  res.send();
});

app.use(function(req, res, next) {
  res.status(404).send("Sorry, I couldn't find it");
});

app.listen(3000);