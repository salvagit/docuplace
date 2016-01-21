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
            'click .edit': 'edit',
            'click .remove': 'remove'
        },

        edit: function(e) {
            var $id = this.getElId(e);
            var model = this.c.find(function(model){return model.get('id')==$id});
            this.addForm(model);
        },

        remove: function(e) {
            var $id = this.getElId(e);
            var model = this.c.find(function(model){return model.get('id')==$id});
            var that = this;
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

        getElId: function(e) {
            return $(e.target).attr('id') || $(e.target).parent().attr('id');
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
                columns: this.c.colls,
                //data: this.c.data,
                url:'/forms/'+this.c.fname,
                striped:true,
                // sidePagination:'server',
                search:true,
                showFooter:false,
                showColumns:false,
                showRefresh:true,
                showToggle:false,
                showPaginationSwitch:false,
                toolbar:'<button class="btn btn-default add">+</button>',
                checkboxHeader:true,
                maintainSelected:true,
                showExport:true,
                pagination:true,
            });

            return this.delegateEvents();
        },

        addForm: function (model) {
            var that = this;
            require(['views/Form/CreateForm'], function (v) {
                var o = {c:that.c,el:that.el,m:model};
                that.form = that.form || v.init(o);
            });
        }

    });

  return FormView;
});