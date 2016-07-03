/**
 * Document Field View.
 */
define(['jquery', 'underscore', 'backbone',
        'text!templates/fieldTpl.html',
        'models/FieldModel'],
function($, _, Backbone, fieldTpl, model) {

  'use strict';

  var FieldView = Backbone.View.extend({

    tagName: 'li',

    template: _.template(fieldTpl),

    events: {
      'submit #fieldForm': 'submitForm',
      'click #deleteField': 'deleteField',
      'focusout input#name': 'setModel',
      'change select#type': 'setModel',
    },

    initialize: function (options) {
      this.$parent = options.$parent;
      this.FieldsCollection = options.FieldsCollection;

      this.model = new model();

      this.model.bind('destroy', this.destroy, this);
    },

    render: function() {
      this.$el.html( this.template() );

      this.$el.css({
        'list-style-type': 'none'
      });

      this.$addBtn = this.$el.find('#saveField');
      this.$rmvBtn = this.$el.find('#deleteField');

      return this.delegateEvents();
    },

    addField: function () {
      this.model.set({name: '', type: ''});
    },

    setModel: function(e) {
      var key = $(e.target).attr('name'),
          val = $(e.target).val();
      this.model.set( key, val );
    },

    submitForm: function (e) {
      var that = this;
      e.preventDefault();
      // this.model.validate();
      this.FieldsCollection.add(this.model);
      this.$addBtn.fadeOut('slow', function () {
        this.remove();
        that.$rmvBtn.fadeIn('slow');
      });
    },

    deleteField: function (e) {
      e.preventDefault();
      this.model.destroy();
    },

    destroy: function () {
      var that = this;
      this.$el.fadeOut('slow', function(){
        that.remove();
        that.unbind();
      });
    }

  });
  // Our module now returns our view
  return FieldView;
});
