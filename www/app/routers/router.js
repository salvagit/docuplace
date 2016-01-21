define(['jquery', 'underscore', 'backbone', 'collections/FormsCollection', 'bootstrap'],
function($, _, Backbone, FormsCollection) {

    'use stricts';

    var AppRouter = Backbone.Router.extend({

        routes: {
          'tests': 'tests',
          'form/:f/': 'form',
          'forms': 'forms',
          // Default
          '*actions': 'defaultAction'
        },

        initialize: function() {
            this.formsColl =  new FormsCollection();
            var that = this;
            this.formsColl.fetch({
                success: function() {
                    require(['views/Forms/ListFormsView'], function (view) {
                        (new view({c:that.formsColl})).render();
                    });
                }
            });
        },

        form: function (f) {
            var that = this;
            require(['views/Form/FormView'], function (v) {
                this.f = this.f || new v;
                this.f.init(f);
            });
        },

        forms: function () {
            var that = this;
            require(['views/Forms/FormsView'], function (v) {
                that.forms = that.forms && new v({collection:that.formsColl});
            });
        },

        tests: function() {
          require(['views/TestFormsView'], function (v) {
            (new v()).test();
          });
        },

        defaultAction: function (actions) {
          if (!actions) {
            window.location = '/#/forms';
          }
          // console.error('No route:', actions);
        }

    });

    return {
        initialize: function() {
            var app_router = new AppRouter ();
            Backbone.history.start();
        }
    };

});