define(['underscore', 'backbone', 'collections/FieldsCollection'],
function(_, Backbone, FieldsCollection){

	'use strict';

 	var FormModel = Backbone.Model.extend({

 		url: '/forms/',

		fields: {},

		initialize: function () {
			/*
			this.on('all', function (e) {
				console.log( this.get('name') + 'event: ' + e );
			});
			*/
			this.fields = new FieldsCollection([], { form : this });
		},

		addField: function (name) {
			this.fields.create({ name:name });
		}

 	});
	// Return the model for the module
	return FormModel;
});