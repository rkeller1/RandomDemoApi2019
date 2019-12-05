var express = require("express");
var app = express();
var _data = require("./_data");
var data2xml = require('data2xml');
var convert = data2xml();
var { parse } = require('json2csv');

const PORT = process.env.PORT || 5000

var responseHandler = (data, dataKey, req, res) => {
	let getFormat = req.query.format;
	if (getFormat) {
		if (getFormat == 'xml') {
			let xmlStruct = {};
			xmlStruct[dataKey[1]] = data;
			let xmlContent = convert(dataKey[0], xmlStruct);
			res.set('Content-Type', 'text/xml');
			res.send(xmlContent);
		} else if (getFormat == 'text') {
			let responseText = parse(data);
			console.log(responseText);
			res.set('Content-Type', 'text/plain');
			res.send(responseText);
		} else {
			res.json(data);
		}
	} else {
		res.json(data);
	}
}

app.get("/", (req, res, next) => {
	res.send("Welcome to CVN Fake Users API 2019!");
});

app.use("/static", express.static(__dirname + "/public"));
// TODO: Implement format=json, format=xml etc
app.get("/users", (req, res, next) => {
	let fakeUsers = _data.getFakeUsers();
	responseHandler(fakeUsers, ['Users', 'User'], req, res);
});

app.get("/products", (req, res, next) => {
	let getExplicit = req.query.explicit == 1;
	let fakeProducts = _data.getFakeProducts(getExplicit);
	responseHandler(fakeProducts, ['Products', 'Product'], req, res);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`))
