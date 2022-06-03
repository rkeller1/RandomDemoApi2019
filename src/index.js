var express = require("express");
var app = express();
var _data = require("./_data");
var data2xml = require('data2xml');
var convert = data2xml();
var { parse } = require('json2csv');
var bodyParser = require('body-parser');

var WebSocket = require('ws');

const PORT = process.env.PORT || 5000;

let websocketUsers = [];

const wsServer = new WebSocket.Server({ noServer: true });
wsServer.on('connection', socket => {
	websocketUsers.push(socket);
	informUsers('New user connected');
});

var informUsers = (msg) => {
	websocketUsers.forEach(socket => {
		socket.send(msg);
	});
}

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
	informUsers(JSON.stringify(debuggingObject, null, 4));
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

const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
server.on('upgrade', (request, socket, head) => {
	wsServer.handleUpgrade(request, socket, head, socket => {
	  wsServer.emit('connection', socket, request);
	});
  });
