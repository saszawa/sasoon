function makeJSON(stages){
  var json = JSON.stringify(stages);

  //実際にステージで使われる配列
  var objJSONArray = [];
  //startをはじめに登録する
  var startObjJSON = {x:creater.startPos.x,y:creater.startPos.y,name: "start"};
  objJSONArray[0] = startObjJSON;

  var objJSON = {};
  //パイプ用一時データ
  var pipeParentTmpObj = {};
  var pipeChildTmpObj = {};

  for (var xNum = 0 ; xNum < 10 ; xNum++){
    for (var yNum = 0 ; yNum < 10 ; yNum++){
      //xId,yidの場所に何もなかったら無視する
      if(stages[xNum][yNum]){
        //スタートだった場合は最初に登録してあるので無視する
        if(stages[xNum][yNum] != "start"){
          if( stages[xNum][yNum].name == "pipe"){
            //親パイプだった場合に子パイプも整形する
            var thePipeEntity = pipeManager.pipeEntity;
            var theColor = stages[xNum][yNum].color;
            pipeParentTmpObj = { x:thePipeEntity[theColor].parent.x, y:thePipeEntity[theColor].parent.y , color:theColor };
            pipeChildTmpObj = { x:thePipeEntity[theColor].child.x , y:thePipeEntity[theColor].child.y, direction:thePipeEntity[theColor].child.direction };
            //defineで使える形に直す
            var pipeJSON = { x:pipeParentTmpObj.x, y:pipeParentTmpObj.y, name:'pipe', color:theColor, pipeStatus: { x:pipeChildTmpObj.x, y:pipeChildTmpObj.y, direction:pipeChildTmpObj.direction } };
            objJSONArray.push(pipeJSON);
          }else{
            objJSON = { x:xNum, y:yNum, name:stages[xNum][yNum] };
            objJSONArray.push(objJSON);
          }
        }
      }
    }
  }

 
}
