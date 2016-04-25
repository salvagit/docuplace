requirejs.config({
    baseUrl: '../assets/components',
    paths: {
        views: '../../app/views',
        collections: '../../app/collections',
        models: '../../app/models',
        templates: '../../app/templates',
        jquery: 'jquery/dist/jquery.min',
        underscore: 'underscore/underscore-min',
        backbone: 'backbone/backbone',
        bootstrap: 'bootstrap/dist/js/bootstrap',
        'bootstrap-notify': 'bootstrap-notify/js/bootstrap-notify',
        bootbox: 'bootbox/bootbox',
        'bootstrap-table': 'bootstrap-table/dist/bootstrap-table.min',
        'bootstrap-table-export': 'bootstrap-table/dist/extensions/export/bootstrap-table-export.min',
        'tableExport-jquery': 'tableExport.jquery.plugin/tableExport',
        'jquery.base64': 'tableExport.jquery.plugin/jquery.base64',
    },
    map: {
        '*': {
            css: 'require-css/css',
            text: 'requirejs-text/text'
        }
    },
    shim: {
        'bootstrap': {
          deps: ["jquery"],
          exports: "$.fn.popover"
        },
        'bootstrap-table': {
            deps: ['jquery', 'backbone', 'underscore', 'bootstrap', 'css!bootstrap-table'],
            exports: 'bootstrap-table'
        },
        'bootstrap-table-export': {
            deps: ['bootstrap','bootstrap-table','tableExport-jquery'],
            exports: 'bootstrap-table-export'
        },
        'tableExport-jquery': {
            deps: ['jquery.base64'],
            exports: 'tableExport-jquery'
        }
    }
});

// Start the main app logic.
requirejs(['jquery', 'underscore', 'backbone', 'app/routers/router.js'],
function ( $, _, Backbone, router) {
    router.initialize();
});