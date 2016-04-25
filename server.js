'use stricts';

var express = require('express');
var mongojs = require('mongojs');

var app = express();
var db = mongojs("docuplace");

var Documents = require("./routes/Documents");
var documents = new Documents(db);

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.use(function(req, res, next){
	console.log("Alguien llego ", req.headers['user-agent']);
	next();
});

/**
 * /forms
 */
app.get("/forms/", function(req, res) {
	documents.getAll()
	.then(function(collections) {
		res.json(collections);
	});
});

/**
 * GET /forms/<form>/
 */
app.get("/forms/:form/", function(req, res) {
	var form = req.params.form;
	documents.getColl(form)
	.then(
		function(data) {
			res.json(data);
		},
		function(data) {
			res.json(data);
		}

	);
});

/**
 * POST /forms/<form>/
 */
app.post("/forms/:form/", function(req, res) {
	var form = req.params.form;
	var data = [];
	for (var k in req.body) {
		data[req.body[k].name] = req.body[k].value;
	}
	documents.saveColl(form, data)
	.then(function(data) {
		res.json(data);
	});
});


app.post("/save", function(req, res){
	documents.save({name: req.body.name || "noname",
					dni: parseInt(req.body.dni || "0000000"),
					city: req.body.city || "noCity"})
		.then(function(){
			res.end("alumno saved");
		}, function(){
			res.end("termino mal");
		});
});

app.get("/hi/:name", function(req, res){
	console.log(req.params);
	res.send("hi " + req.params.name);
});

app.listen(1234);
