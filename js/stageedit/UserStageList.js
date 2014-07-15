function getUserStageList(order, as){
  var postData = 'order='+order+'&as='+as;

  var userStages = [];

  var xmlHttp = new XMLHttpRequest();

  xmlHttp.open("GET", "php/stage/list.php",false);
  xmlHttp.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
  xmlHttp.send(null);

  if (xmlHttp.status === 200){
    userStages = xmlHttp.responseText;
  }

  return JSON.parse(userStages);
}
