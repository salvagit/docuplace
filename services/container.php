<?php

// Get Autoloader
require_once __DIR__.'/../vendor/autoload.php';

$container = new Pimple;

$container['db'] = $container->share(function($container) {

    /**
     * @todo get data from external conf.
     * 
     */
    /*
    $dsn = sprintf(
        '%s:host=%s;port=%s;dbname=%s',
        'mysql',
        'localhost',
        '3306',
        'df'
    );
     */
    $dsn = sprintf(
        '%s:host=%s;port=%s;dbname=%s',
        'mysql',
        'us-cdbr-iron-east-03.cleardb.net',
        '3306',
        'heroku_b5392a2dc029bc8'
    );

    $user = 'ba461e9c0981c5';
    $pass = 'eb160774';

    RedBeanPHP\R::setup($dsn, $user, $pass);
    return new RedBeanPHP\R;
});

return $container;