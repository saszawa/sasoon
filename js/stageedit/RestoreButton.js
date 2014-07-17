var RestoreButton = Class.create(ExLabel,{
  initialize: function(text,w,h){
    ExLabel.call(this,BOX_SIZE,BOX_SIZE);
    var width = w || 640;
    var height = h || 64;

    // DOMモード
    this._element = document.createElement('div');
    this._element.innerHTML = text;
  },
  ontouchstart: function(){
    var stageArray = creater.noneCollisionStages.concat();
    //一度も実行さor消去されていないなら
    if(stageArray == null){
      return;
    }
    //スタートがあれば元に戻す
    if(creater.startObj != null){
      GAME.currentScene.addChild(creater.startObj);
      //スタート出来るようにする 
      creater.putStartFlg = true;
    }


    var stageArrayLength = stageArray.length;

    for(var x = 0; x < 10; x++){
      for(var y = 0; y < 10; y++){
        //戻す時に既に戻そうとする場所にオブジェクトがあったら
        if(boxManager.boxArray[x][y].putedObjFlg){
          continue;
        }
        if(stageArray[x][y]){
          //パイプだった場合
          if(stageArray[x][y]._element.className == "pipe"){
            var parentPipeColor = stageArray[x][y].color;
            //実行したり消したりした後に戻すと同色が２個以上出来る可能性があるから条件で防ぐ
            if(pipeManager.pipeStatus[parentPipeColor] == "childPut" || pipeManager.pipeStatus[parentPipeColor] == "parentPut" || pipeManager.pipeStatus[parentPipeColor] == "noneDirection"){
              continue;
            }
            //stagearrayの順番は確定じゃないから子供が先に復活する場合もアル
            if(pipeManager.pipeStatus != "childPut"){
              pipeManager.pipeStatus[parentPipeColor] = "parentPut";
              var childPipeColor = stageArray[x][y].color;
            }
            this.addCreatersStages(stageArray[x][y])
            GAME.currentScene.addChild(stageArray[x][y]);
          }//小パイプダッタ場合
          else if(stageArray[x][y]._element.className.indexOf("pipeOut") != -1){
            //子パイプの方向決めオブジェクトを出さないようにする
            stageArray[x][y].restoreFlg = true;
            pipeManager.pipeStatus[childPipeColor] = "childPut";
            this.addCreatersStages(stageArray[x][y])
            GAME.currentScene.addChild(stageArray[x][y]);
          }else {
            this.addCreatersStages(stageArray[x][y])
            GAME.currentScene.addChild(stageArray[x][y]);
          }
        }
      }
    }
    //pipeInkを使ってない色のインクにかえる
    //全部使ってたらそのまま
    var unUsedColor = pipeManager.getUnusedColor();
    if(unUsedColor){
      GAME.currentScene.removeChild(pipeManager.pipeInk);
      pipeManager.pipeInk = void 0 
      pipeManager.pipeInk = new PipeInk(unUsedColor);
      GAME.currentScene.addChild(pipeManager.pipeInk);
    }
    pipeManager.adaptPipeStatus();
  },
  setClassName: function(className){
    this._element.className = className;
  },
  addCreatersStages: function addCreatersStages(obj){
    var objName = obj._element.className;
    if(objName == "start"){
      creater.stages[obj.xId][obj.yId] = "start";
    }else if(objName == "slanter"){
      creater.stages[obj.xId][obj.yId] = "slanter";
    }else if(objName == "diffusioner"){
      creater.stages[obj.xId][obj.yId] = "diffusioner";
    }else if(objName == "goal"){
      creater.stages[obj.xId][obj.yId] = "goal";
    }else if(objName == "star"){
      creater.stages[obj.xId][obj.yId] = "star";
    }else if(objName == "pipe"){
      creater.stages[obj.xId][obj.yId] = { "name": "pipe", "color": obj.color.toString() };
    }else if( objName.indexOf("pipeOut") != -1 ){
      creater.stages[obj.xId][obj.yId] = { "name": "pipeOut", "direction": obj.direction.toString() };
    }
    else{
      creater.stages[obj.xId][obj.yId] = obj.color;
    }
  }
});
