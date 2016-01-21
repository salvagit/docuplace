define(['jquery', 'underscore', 'backbone'],
function($, _, Backbone) {

    var DashCoursesView = Backbone.View.extend({

    el: 'body',

    events: {},

    initialize: function () {},

    render: function() {
      // Using Underscore we can compile our template with data
      // var compiledTemplate = _.template( dashLayoutTpl, {content: homeTpl} );
      // Append our compiled templates
      this.$el.html( 'front' );
    }

  });
  // Our module now returns our view
  return DashCoursesView;
});