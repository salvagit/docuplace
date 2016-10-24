'use stricts';

const express = require('express');
const fs = require('fs');
const handlebars = require('handlebars');

let db;

module.exports = (db) => {
	this.db = db;
	let forms = express.Router();
	// @todo find better way
	forms.get("/:form*?", (req,res) => get(req,res,db));
	forms.post("/:form*?", (req,res) => post(req,res,db));
	return forms;
};

// method:get
let get = (req,res,db) => {

	let getForm = (coll, db) => {
		return new Promise((resolve, reject) => {
			let collection = db.collection(coll);
			collection.find({},{}, (err, docs) => {
				if(err) reject(err);
				else {
					(()=>{
						/**
						 * Get template.
						 * @todo delegate 2 ui.
						 */
						return new Promise ( (resolve, reject) => {
							fs.readFile( __dirname + '/../views/row_menu.handlebars', 'utf8',
								(err, source) => (err) ? reject(err) : resolve(source)
							);
						});
					})()
					.then(
						// prepare response.
						(source) => {
							for (let key in docs) {
								let template = handlebars.compile(source);
								docs[key].actions = template({ id : docs[key]._id });
							}
							resolve(docs);
						},
						err => console.log(err)
					);
				}
			});
		});
	};

	let getForms = (db) => {
		return new Promise((resolve, reject) => {
			let collections = [];
			db.getCollectionNames((err, colNames) => {
				if (err) reject(err);
				for (let i = 0; i < colNames.length; i++) {
					collections.push({name: colNames[i]} );
				}
				resolve(collections);
			});
		});
	};
	if (req.params && req.params.form) {
		getForm(req.params.form, db)
		.then(
			(data) => res.json(data),
			(err) => res.json(err)
		);
	} else {
		getForms(db)
		.then(
			(data) => res.json(data),
			(err) => res.json(err)
		);
	}
};

// method:post
let post = (req,res, db) => {

	let insertInForm = (coll,data,db) => {
		return new Promise( (resolve, reject) => {
			let collection = db.collection(coll);
			collection.save(data,
				(err, saved) => ( err || !saved ) ? reject(err) : resolve(saved)
			);
		});
	};

	let insertForm = (data, db) => {
		return new Promise( (resolve, reject) => {
			db.createCollection(data.name, (err, resp) => {
				// if err, reject.
				if (err) reject(err);

				let collection = db.collection(data.name),
						schema = {};
				// prepare schema.
				data.fields.forEach( el => schema[el.name] = '' );
				// save schema.
				collection.save(schema);
				// resolve promise.
				resolve(data);
			});
		});
	};

	if (req.params && req.params.form) {
		// get params.
		let data = {};
		for (let k in req.body) data[req.body[k].name] = req.body[k].value;
		insertInForm(req.params.form, data,db)
		.then((data) => res.json(data));
	} else {
		insertForm(req.body,db)
		.then((data) => res.json(data));
	}
};
