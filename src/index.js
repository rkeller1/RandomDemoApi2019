var express = require("express");
var app = express();
var _data = require("./_data");
var data2xml = require('data2xml');
var convert = data2xml();
var { parse } = require('json2csv');
var bodyParser = require('body-parser')

const PORT = process.env.PORT || 5000;

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
			res.set('Content-Type', 'text/plain');
			res.send(responseText);
		} else {
			res.json(data);
		}
	} else {
		res.json(data);
	}
};

app.use(express.body)

app.use("/debug", (req, res) => {
	let reqBody = '';
	let reqFields = '';
	try {
		reqBody = req.body.toString();
	} catch (e) {
	}

	const debuggingObject = {
		method: req.method,
		parameters: req.params,
		query: req.query,
		headers: req.headers,
		body: reqBody,
		fields: reqFields
	}
	console.log(JSON.stringify(debuggingObject, null, 4));
	res.statusCode = 200;
	res.send('Finished...');
});

app.use("/", express.static(__dirname + "/frontend"));

app.use("/static", express.static(__dirname + "/public"));
app.get("/users", (req, res, next) => {
	let fakeUsers = _data.getFakeUsers();
	responseHandler(fakeUsers, ['Users', 'User'], req, res);
});

app.get("/products", (req, res, next) => {
	let getExplicit = req.query.explicit == 1;
	let fakeProducts = _data.getFakeProducts(getExplicit);
	responseHandler(fakeProducts, ['Products', 'Product'], req, res);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
