var express = require("express");
var app = express();
var _data = require("./_data");

const PORT = process.env.PORT || 5000

app.use("/static", express.static(__dirname + "/public"));

app.get("/users", (req, res, next) => {
  let fakeUsers = _data.getFakeUsers();
  res.json(fakeUsers);
});
app.get("/", (req, res, next) => {
  res.send("Welcome to CVN Fake Users API!");
});

app.get("/products", (req, res, next) => {
  let getExplicit = req.query.explicit == 1;
  console.log(getExplicit);
  let fakeProducts = _data.getFakeProducts(getExplicit);
  res.json(fakeProducts);
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
