<?php

// Get Errors.
ini_set('display_errors', 1);

// Get Autoloader
require_once __DIR__.'/../vendor/autoload.php';

// App
$app = require __DIR__.'/../services/app.php';

// Get Source.
require __DIR__.'/../services/controllers.php';

// Run.
$app->run();