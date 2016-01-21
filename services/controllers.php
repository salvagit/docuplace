<?php

// $app['db']->freeze(true);

// require_once 'controllers/form.php';
require_once 'controllers/forms.php';

// $app->mount('/form/', new SingleForm\SingleFormController());
$app->mount('/forms/', new MultiForm\MultiFormController());

// Home
$app->get('/', function() use ($app) 
{
  return file_get_contents(__DIR__ .'/../www/index.html');
});