'use stricts';

const express = require('express');

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
							for (let key in docs) {
								let id = docs[key]._id;
								// @todo use template engine.
								docs[key].actions = `<a class="edit" title="Edit" id="${id}">`
																		+ `<i class="glyphicon glyphicon-pencil"></i>`
																		+ `</a>`
																		+ `<a class=\"remove ml10\" title=\"Remove\" id=\"${id}\">`
																		+ `<i class=\"glyphicon glyphicon-trash\"></i>`
																		+ `</a>`;
								// delete docs[key]._id
							}
							// console.log(docs);
							resolve(docs)
						};
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
						console.log(err, colNames);
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

							data.fields.forEach( (el, index, arr)  => schema[el.name] = '' );

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
