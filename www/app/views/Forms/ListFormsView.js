define(['jquery', 'underscore', 'backbone',
        'text!templates/listFormsTpl.html',
        'text!templates/formItem.html', 'bootstrap-notify'],
function($, _, Backbone, t, fi) {

  'use strict';

    var ListFormView = Backbone.View.extend({

        el: '.main-menu',

        t: _.template(t),

        initialize: function (o) {
            var that = this;
            this.formColl = o.c;
            this.formColl.on('sync', function(){
                that.fill();
            });
        },

        render: function() {
            // this.$el.html(this.t());
            this.fill();
        },

        fill: function () {
            var that = this;
            this.$el.html('');
            this.formColl.each(function(m){
                that.addForm(m);
            });
        },

        addForm: function(f) {
            this.$el.append(_.template(fi)({'name':f.get('name')}));
        }
    });

    return ListFormView;

});