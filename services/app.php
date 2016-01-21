<?php

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

$app = new Application();

// request little hack.
$app->before(function (Request $request) {
    if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
        $data = json_decode($request->getContent(), true);
        $request->request->replace(is_array($data) ? $data : array());
    }
});

// get container.
$app['container'] = require_once __DIR__ .'/container.php';
$container = $app['container'];

// shortcut db
$app['db'] = $app->share(function($app) {
    return $app['container']['db'];
});

return $app;