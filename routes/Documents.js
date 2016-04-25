'use stricts';

function Documents(db){
	this.db = db;
};

Documents.prototype.saveColl = function(coll, data) {
	var self = this;
	return new Promise(function(resolve, reject) {
		console.log('init promise');
		var collection = self.db.collection(coll);
		console.log(collection);
		collection.save(data, function(err, doc) {
			console.log(doc);
			if(err) {
				console.log(1);
				reject(err);
			} else {
				console.log(2);
				resolve(doc);
			}
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
					docs[key].actions = `<a class="edit" title="Edit" id="${id}">`
															+ `<i class="glyphicon glyphicon-pencil"></i>`
															+ `</a>`
															+ `<a class=\"remove ml10\" title=\"Remove\" id=\"${id}\">`
															+ `<i class=\"glyphicon glyphicon-trash\"></i>`
															+ `</a>`;
					delete docs[key]._id
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
