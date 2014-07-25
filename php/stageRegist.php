<?php
  if( !(isset($_POST['user_name']) && isset($_POST['stage_jsarray'])) ){
    //var_dump($_POST);
    echo 'Post data not found;';
    return;
  }
  // 共通設定の読み込み
  include_once('setting.php');

  $sql = 'INSERT INTO User_Stages(user_name,stage_jsarray)
          VALUES (:user_name,:stage_jsarray)';
  $stmt = $pdo->prepare($sql);
  $stmt->bindParam(':user_name',$_POST['user_name']);
  $stmt->bindParam(':stage_jsarray',$_POST['stage_jsarray']);
  $wasInserted = $stmt->execute();

  if($wasInserted){
    echo 'SUCCESS';
  } else {
    echo 'FAILED';
  }
