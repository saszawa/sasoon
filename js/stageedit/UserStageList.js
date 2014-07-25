function getUserStageList(order, as){
  var postData = 'order='+order+'&as='+as;

  var userStagesStr;

  var xmlHttp = new XMLHttpRequest();

  xmlHttp.open("GET", "php/stage/list.php",false);
  xmlHttp.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
  xmlHttp.send(null);

  if (xmlHttp.status === 200){
    userStagesStr = xmlHttp.responseText;
  }

   var userStages = {};
   JSON.parse(userStagesStr).forEach(function(stage){
    userStages[stage.id] = [stage.user_name,JSON.parse(stage.stage_jsarray)];
   });

   return userStages;
}
