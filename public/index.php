<?php

// Get Errors.
ini_set('display_errors', 1);

// Get Autoloader
require_once __DIR__.'/../vendor/autoload.php';
error_log('1');
// App
$app = require __DIR__.'/../services/app.php';
error_log('2');

// Get Source.
require __DIR__.'/../services/controllers.php';
error_log('3');

// Run.
$app->run();
