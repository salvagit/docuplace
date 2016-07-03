/**
 * Create Form View.
 */
define(['jquery', 'underscore', 'backbone',
        'text!templates/createFormTpl.html',
        'models/FormModel',
        'collections/FieldsCollection',
        'views/Forms/FieldView', 'bootstrap-notify'],
function($, _, Backbone, template, FormModel, FieldsCollection, FieldView) {

  'use strict';

  var CreateFormView = Backbone.View.extend({

        el: '.main-content',

        template: _.template(template),

        events: {
            'submit #form': 'saveForm'
        },

        initialize: function (options) {
            this.formsCollection = options.FormsCollection;
            this.fieldsCollection = new FieldsCollection([], {forms : this.formsCollection});
            this.formModel = new FormModel();
            this.fieldsCollection.bind('add', this.addField, this);
        },

        render: function() {
console.log('create form view');
            this.$el.html(this.template());
            this.$fieldsContent = this.$el.find('.fields-container');
            this.$formName = this.$el.find('#formName');
            // this.$fieldsContent.append(this.addField());
            this.addField();
            return this.delegateEvents();
        },

        saveForm: function(e) {
            e.preventDefault();
            this.formModel.set('name', this.$formName.val());
            this.formModel.set('fields', this.fieldsCollection);
            var that = this;
            this.formsCollection.create(this.formModel,{
                wait: true,
                success: function(resp) {
                    console.log(resp);
                    that.formsCollection.fetch();
                    // console.error(this.formsCollection);
                    $('.notifications').notify({
                        message: { text: 'the form has been created successfully!' }
                    }).show();
                    that.render();
                }
            });
        },

        addField: function () {
            var that = this;
            this.$fieldsContent.append((
            new FieldView({
                $parent: that.$el,
                FieldsCollection: that.fieldsCollection
            })
            ).render().$el);
        }

    });

  return CreateFormView;
});
