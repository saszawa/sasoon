function doPost(stageString,userName){

  userName = userName || '';
  var postData = 'user_name='+userName+'&stage_jsarray='+stageString;

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function (){
    if ((xmlHttp.readyState == 4) && (xmlHttp.status == 200)){
      if(xmlHttp.responseText === 'SUCCESS'){

      } else if(xmlHttp.responseText === 'FAILED'){
        
      }
    }
  }

  xmlHttp.open("POST", "php/stageRegist.php");
  xmlHttp.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
  xmlHttp.send(postData);

}
