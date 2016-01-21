<?php

// Get Autoloader
require_once __DIR__.'/../vendor/autoload.php';

$container = new Pimple;

$container['db'] = $container->share(function($container) {

    $dsn = sprintf(
        '%s:host=%s;port=%s;dbname=%s',
        'mysql',
        ENV['DB_HOST'],
        '3306',
        ENV['DB_NAME']
    );

    $user = ENV['DB_USER'];
    $pass = ENV['DB_PASS'];

    RedBeanPHP\R::setup($dsn, $user, $pass);
    return new RedBeanPHP\R;
});

return $container;