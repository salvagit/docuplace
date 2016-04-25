define(['underscore', 'backbone'],
function(_, Backbone){

	'use strict';

	var FormCollection = Backbone.Collection.extend({

		model: Backbone.Model.extend(),

		url: function() {
			return '/forms/' + this.fname + '/';
		},

		init: function (name) {
			this.fname = name;
		}

	});

	return new FormCollection;
});