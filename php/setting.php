<?php

$db_name = 'secret';
$host_name = 'secret';
$dsn = "mysql:dbname={$db_name};host={$host_name};charset=utf8;";
$user = 'yourUserName';
$password = 'yourDBName';

try{
  $pdo = new PDO($dsn, $user, $password);
} catch (PDOException $e){
  echo 'Connection failed:'.$e->getMessage();
  die();
}
