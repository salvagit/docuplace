define(['jquery', 'underscore', 'backbone'],
function($, _, Backbone) {

  'use strict';

  var FormsView = Backbone.View.extend({

    initialize: function (options) {

      this.FormsCollection = options.collection;

      var that = this;

      require(['views/Forms/CreateFormView'], function (CreateFormView) {
        (new CreateFormView({
          'FormsCollection': that.FormsCollection
        })).render();
      });

      this.FormsCollection.fetch();
    }

  });

  return FormsView;

});