'use stricts';

const express = require('express');
const fs = require('fs');
const handlebars = require('handlebars');

module.exports = (db) => {

	let forms = express.Router();

	// method:get
	forms.get("/:form*?", (req, res) => {

		if (req.params && req.params.form) {
			((coll, db) => {
				return new Promise((resolve, reject) => {
					let collection = db.collection(coll);
					collection.find({},{}, (err, docs) => {
						if(err) console.log(err);
						else {
							(()=>{
								return new Promise ((resolve,reject) => {
									fs.readFile( __dirname + '/../views/row_menu.handlebars', 'utf8', (err, source) =>
										(err) ? reject(err) : resolve(source)
									);
								});
							})()
							.then(
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
			})(req.params.form, db)
			.then(
				(data) => res.json(data),
				(err) => res.json(err)
			);

		} else {
			((db) => {
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
			})(db)
			.then(
				(data) => res.json(data),
				(err) => res.json(err)
			);
		}
	});

	// method:post
	forms.post("/:form*?", (req, res) => {
		let form = req.params.form;
		if (form) {
			let data = {};
			for (let k in req.body) data[req.body[k].name] = req.body[k].value;
			((coll, data,db) => {
				return new Promise((resolve, reject) => {
					let collection = db.collection(coll);
					collection.save(data,
						(err, saved) => ( err || !saved ) ? reject(err) : resolve(saved)
					);
				});
			})(form,data,db)
			.then((data) => res.json(data));
		} else {
			((data, db) => {
				return new Promise( (resolve, reject) => {
					db.createCollection(data.name, (err, resp) => {
						// console.log(data);
						if (!err || 1 === resp.ok) {
							let collection = db.collection(data.name),
									schema = {};

							data.fields.forEach( (el, index, arr) => schema[el.name] = '' );

							collection.save(schema);
							resolve(data);
						} else reject(err);
					});
				});
			})(req.body,db)
			.then((data) => res.json(data));
		}
	});

	return forms;
};
