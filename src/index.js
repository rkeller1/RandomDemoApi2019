var express = require("express");
var app = express();
var _data = require("./_data");

app.use("/static", express.static(__dirname + "/public"));

app.get("/users", (req, res, next) => {
  let fakeUsers = _data.getFakeUsers();
  res.json(fakeUsers);
});
app.get("/", (req, res, next) => {
  res.send("Welcome");
});

app.get("/products", (req, res, next) => {
  let getExplicit = req.query.explicit == 1;
  console.log(getExplicit);
  let fakeProducts = _data.getFakeProducts(getExplicit);
  res.json(fakeProducts);
});

app.listen(443, () => {
  console.log("Server running on port 443");
});
