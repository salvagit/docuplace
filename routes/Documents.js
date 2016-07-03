'use stricts';

function Documents(db){
	this.db = db;
};

Documents.prototype.createColl = function(data) {
	var self = this;
	return new Promise(function(resolve, reject) {
		self.db.createCollection(data.name, function(err, resp){
			console.log(data);
			if (!err || 1 === resp.ok) {
				var collection = self.db.collection(data.name),
						schema = {};

				data.fields.forEach(function (el, index, arr) {
					schema[el.name] = '';
				});

				collection.save(schema);
				resolve(data);
			} else reject(err);
		});
	});
};

Documents.prototype.saveColl = function(coll, data) {
	var self = this;
	return new Promise(function(resolve, reject) {
		var collection = self.db.collection(coll);
		collection.save(data,
		function(err, saved) {
			if( err || !saved ) reject(err);
			else resolve(saved);
		});

	});
};

Documents.prototype.get = function() {
	var self = this;
	return new Promise(function(resolve, reject){
		self.db.documents.find({},{}, function(err, docs){
			if(err) reject(err);
			else resolve(docs);
		});
	});
};

Documents.prototype.getColl = function(coll) {
	var self = this;
	return new Promise(function(resolve, reject) {
		var collection = self.db.collection(coll);
		collection.find({},{}, function(err, docs) {
			if(err) reject(err);
			else {
				for (var key in docs) {
					var id = docs[key]._id;
					// @todo use template engine.
					docs[key].actions = `<a class="edit" title="Edit" id="${id}">`
															+ `<i class="glyphicon glyphicon-pencil"></i>`
															+ `</a>`
															+ `<a class=\"remove ml10\" title=\"Remove\" id=\"${id}\">`
															+ `<i class=\"glyphicon glyphicon-trash\"></i>`
															+ `</a>`;
					// delete docs[key]._id
				}
				resolve(docs)
			};
		});
	});
};

Documents.prototype.getAll = function() {
	this.collections = [];
	var self = this;
	return new Promise(function(resolve, reject) {
		self.db.getCollectionNames(function(err, colNames) {
			if (err) reject(err);
			for (var i = 0; i < colNames.length; i++) {
				self.collections.push({name: colNames[i]} );
			}
			resolve(self.collections);
		});
	});
};

module.exports = Documents;
