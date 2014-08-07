<?php

$db_name = 'TouchBloomy';
$host_name = 'localhost';
$dsn = "mysql:dbname={$db_name};host={$host_name};charset=utf8;";
$user = 'root';
$password = 'root';

try{
  $pdo = new PDO($dsn, $user, $password);
} catch (PDOException $e){
  echo 'Connection failed:'.$e->getMessage();
  die();
}
