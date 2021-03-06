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
          //小パイプも親の方で整形するので無視する
          if(stages[xNum][yNum].name != "pipeOut"){
            if( stages[xNum][yNum].name == "pipe"){
              //親パイプだった場合に子パイプも整形する
              var thePipeEntity = pipeManager.pipeEntity;
              var theColor = stages[xNum][yNum].color;
              pipeParentTmpObj = { x:thePipeEntity[theColor].parent.x, y:thePipeEntity[theColor].parent.y , color:theColor };
              pipeChildTmpObj = { x:thePipeEntity[theColor].child.x , y:thePipeEntity[theColor].child.y, direction:thePipeEntity[theColor].child.direction };
              //defineで使える形に直す
              var pipeJSON = { x:pipeParentTmpObj.x, y:pipeParentTmpObj.y, name:'pipe', color:theColor, pipeStatus: { x:pipeChildTmpObj.x, y:pipeChildTmpObj.y, direction:pipeChildTmpObj.direction } };
              objJSONArray.push(pipeJSON);
            }else if(stages[xNum][yNum] == "diffusioner" || stages[xNum][yNum] == "slanter" || stages[xNum][yNum] == "star"){
              //diffusionerかslanterの場合かstarの場合
              objJSON = { x:xNum, y:yNum, name:stages[xNum][yNum] };
              objJSONArray.push(objJSON);
            }else if(stages[xNum][yNum] == "goal"){
              //goalの場合
                objJSON = { x:xNum, y:yNum, name:'goal'};
                objJSONArray.push(objJSON);
            }
            else{
              //blockの場合
              objJSON = { x:xNum, y:yNum, name:'block',color:stages[xNum][yNum] };
              objJSONArray.push(objJSON);
            }
          }
        }
      }
    }
  }

  console.log(JSON.stringify(objJSONArray));
  // 入力欄付きのダイアログボックスを表示する
  var result = prompt(LANGUAGE[COUNTRYCODE].canInputName,LANGUAGE[COUNTRYCODE].yourName);
  result = result || "No Name";
  console.log(result);
  doPost(JSON.stringify(objJSONArray),result);
}
