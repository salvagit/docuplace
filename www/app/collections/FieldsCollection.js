define(['underscore', 'backbone', 'models/FieldModel'],
function(_, Backbone, FieldModel){

	'use strict';

	var FieldsCollection = Backbone.Collection.extend({

		model: FieldModel,

		name: '',

		initialize: function (model, options) {
			/*
			this.on('all', function (e) {
				console.log( 'Fields Collection event: ' + e );
				console.log( this );
			});
			*/
			this.form = options.form;
		},
		url: function () {
			return this.form.url() + '/fields';
		}

	});

	return FieldsCollection;
});