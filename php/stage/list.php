<?php
  header('Content-Type: application/json; charset="UTF-8"');
  // 共通設定の読み込み
  include_once('../setting.php');

  $sql = 'SELECT * FROM User_Stages';
  $pdo->query('SET NAMES utf8');
  $stmt = $pdo->query($sql);
  $stages = array();

  while($result = $stmt->fetch(PDO::FETCH_ASSOC)){
    $stages[] = $result;
  }

  echo json_encode($stages);
