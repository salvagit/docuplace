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
        'us-cdbr-iron-east-02.cleardb.net',
        '3306',
        'heroku_f48cac587cefc1b'
    );

    $user = 'bc5fc2d8f36cfe';
    $pass = '30370d49';

    RedBeanPHP\R::setup($dsn, $user, $pass);
    return new RedBeanPHP\R;
});

return $container;