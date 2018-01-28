<?php
require_once("vendor/autoload.php");
// Kickstart the framework
$f3 = Base::instance();
//debugger
Falsum\Run::handler();
Falsum\Run::handler(true);
// Load configuration
$f3->config('app/config/config.ini');
// Define routes
$f3->config('app/config/routes.ini');

$f3->run();
