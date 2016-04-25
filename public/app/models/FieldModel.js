define(['underscore', 'backbone'],
function(_, Backbone) {

	'use strict';

 	var FieldModel = Backbone.Model.extend({

 		defaults: {
			name: 'undefined',
			type: 'undefined',
			required: 'undefined',
			valid: 'undefined'
		},

		initialize: function () {
			this.on('all', function (e) {
				console.log( this.get('name') + 'event: ' + e );
			});
		}

 	});
	// Return the model for the module
	return FieldModel;
});