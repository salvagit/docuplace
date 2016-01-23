<?php

// Get Autoloader
require_once __DIR__.'/../vendor/autoload.php';

$container = new Pimple;

$container['db'] = $container->share(function($container) {

    $db_host = (string)(getenv('DB_HOST')) ? getenv('DB_HOST') : DB_HOST;
    $db_name = (string)(getenv('DB_NAME')) ? getenv('DB_NAME') : DB_NAME;
    $db_user = (string)(getenv('DB_USER')) ? getenv('DB_USER') : DB_USER;
    $db_pass = (string)(getenv('DB_PASS')) ? getenv('DB_PASS') : DB_PASS;

    $dsn = sprintf('%s:host=%s;port=%s;dbname=%s',
        'mysql',
        $db_host,
        '3306',
        $db_name
    );
    RedBeanPHP\R::setup($dsn, $db_user, $db_pass);
    return new RedBeanPHP\R;
});

return $container;