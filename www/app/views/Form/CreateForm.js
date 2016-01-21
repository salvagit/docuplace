define(['jquery', 'underscore', 'backbone',
        'text!templates/form/create.html',
        'bootstrap'],
function($,_,Backbone,t) {
    'use strict';
    var FormsView = new (Backbone.View.extend({
        t: _.template(t),
        events: {
            'submit #insert': 'submit',
            'click #doSave': 'save'
        },

        init: function (o) {
            this.el = o.el;
            this.c = o.c;
            this.isEdit = undefined !== o.m.attributes;
            this.m = !this.isEdit ? this.c.models[0] : o.m;
            this.render();
        },

        render: function () {

            this.$modalContainer = $(this.el).find('.modal-container');
console.log(this);
            this.$modalContainer.html(this.t({name:this.c.fname,m:this.m}));
            this.$modal = this.$modalContainer.find('.modal');
            this.$form = this.$modal.find('#insert');
            this.$save = this.$modal.find('#doSave');

            var that = this;
            this.$save.on('click', function(){
                that.save();
            });

            this.$form.on('submit', function(e) {
                that.submit(e);
            });

            // fire modal
            this.$modal.modal('show');
            return this.delegateEvents();
        },
        submit: function (e) {
            e.preventDefault();
            var that = this;
            var c = {
                success: function(d) {
console.log(d);
console.log('saved');
                    $('#table').bootstrapTable('refresh');
                    that.$modal.modal('hide');
                },
                error: function (er) {
                    console.error(er);
                }
            };
            if (!this.isEdit) {
                this.c.create(this.$form.serializeArray(),c);
            } else {
console.log('saving ..');
                this.m.save(this.$form.serializeArray(),c);
            }
        },
        save: function () {
            this.$form.trigger('submit');
        }
    }));
    return FormsView;
});