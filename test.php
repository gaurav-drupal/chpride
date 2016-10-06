<?php

$nid = 8;
$uid = 2;

$_SERVER['HTTP_HOST'] = 'localhost'; // or the hostname of the drupal site you want to acces
$_SERVER['REMOTE_ADDR'] = '127.0.0.1';
 
  
//chdir('../../../../..'); // modify as needed to get to the drupal root.
$current_drupal_root = getcwd() ;

define('DRUPAL_ROOT', $current_drupal_root);
require_once DRUPAL_ROOT . '/includes/bootstrap.inc';
drupal_bootstrap(DRUPAL_BOOTSTRAP_FULL);

$callback = drupal_get_path('module', 'custom_pickup') . '/callback.php?nid=' . $nid . '&uid=' . $uid;
print '<html><head><title>Test</title></head><body>';
print '<a href="//www.google.com/">Test link</a>';
print $callback . "\n";
