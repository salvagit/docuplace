/**
 * Single Documment Crud Class.
 */
define(['jquery', 'underscore', 'backbone',
        'collections/FormCollection',
        'text!templates/formTpl.html',
        'bootbox','bootstrap-table','bootstrap-table-export'],
function($, _, Backbone, c, tpl, bootbox) {

    'use strict';

    var FormView = Backbone.View.extend({

        el: '.main-content',

        template: _.template(tpl),

        events: {
            'click .add': 'addForm',
            'click a.edit': 'edit',
            'click .remove': 'remove'
        },

        init: function (name) {
            this.c = c;
            this.c.init(name);
            self = this;
            this.c.fetch({
                success:function(a,b){
                    self.c.data = b;
                    self.c.colls = [];
                    if (b[0]) {
                        _.each( Object.keys(b[0]) , function(field) {
                            if ('id'!==field){
                                self.c.colls.push({field:field,title:field});
                            }
                        });
                    }
                    self.render();
                }
            });
        },

        render: function () {
            this.$el.html(this.template({name:this.c.fname}));
            this.$el.find('#table').bootstrapTable({
                url: '/forms/' + this.c.fname,
                columns: this.c.colls,
                striped:true,
                search:true,
                showRefresh:true,
                checkboxHeader:true,
                maintainSelected:true,
                showExport:true,
                pagination:true,
                // @todo template.
                toolbar:'<button class="btn btn-default add">+</button>',

                // data: this.c.data,
                // sidePagination:'server',

                showToggle:false,
                showFooter:false,
                showColumns:false,
                showPaginationSwitch:false,
            });

            return this.delegateEvents();
        },
        /**
         * insert documment.
         */
        addForm: function (model) {
            var that = this;
            require(['views/Form/CreateForm'], function (v) {
                var o = {c:that.c,el:that.el,m:model};
                that.form = that.form || v.init(o);
            });
        },
        /**
         * edit documment.
         */
        edit: function(e) {

          var $id = this.getElId(e);
          // @todo find better method.
          var model = this.c.find(function(model) {
            if (model.get('_id') === $id) return model;
          });
          this.addForm(model);
        },
        /**
         * delete documment.
         */
        remove: function(e) {
            var $id = this.getElId(e),
                // @todo find better method.
                model = this.c.find(function(model){
                  if (model.get('_id') === $id) return model;
                });

            bootbox.confirm("Are you sure?", function(result) {
                if (result) {
                    model.destroy({
                        success:function(){
                            $('#table').bootstrapTable('refresh');
                            $('.notifications').notify({
                                message: { text: 'deleted!' }
                            }).show();
                        }
                    });
                }
            });
        },
        // @todo get id from tr.
        getElId: function(e) {
            return $(e.target).attr('id') || $(e.target).parent().attr('id');
        },

    });

  return FormView;
});
