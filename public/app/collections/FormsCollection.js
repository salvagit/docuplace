define(['underscore', 'backbone', 'models/FormModel', 'collections/FieldsCollection'],
function(_, Backbone, FormModel, FieldCollection){

	'use strict';

	var FormsCollection = Backbone.Collection.extend({

		model: FormModel,

		url: '/forms/',

		name: '',

		initialize: function () {
/*
			this.on('all', function (e) {
				console.log( 'Forms Collection event: ' + e );
				console.log( this );
			});
*/
			this.on('reset', this.getFields, this);

		},

		getFields: function () {
			this.each(function (field) {
				field.fields = new FieldCollection([], {forms : field});
				field.fields.fetch();
			});
		}

	});

	return FormsCollection;
});