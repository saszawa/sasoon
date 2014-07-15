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
    //これは戻すたびに実体が増える前に解放する
    creater.currentStage = void 0;
    creater.currentStage = creater.copyStage.concat();

    var stageArrayLength = stageArray.length;
    for(var i = 0; i < stageArrayLength; i++){
      //戻す時に既に戻そうとする場所にオブジェクトがあったら
      debugger
      if(boxManager.boxArray[stageArray[i].xId][stageArray[i].yId].putedObjFlg){
        continue;
      }

      //TODO ここクラス名使わずに判定したい
      //親パイプのパイプマネージャー整理
      if(stageArray[i]._element.className == "pipe"){
        var parentPipeColor = stageArray[i].color;
        //実行したり消したりした後に戻すと同色が２個以上出来る可能性があるから条件で防ぐ
        if(pipeManager.pipeStatus[parentPipeColor] == "childPut" || pipeManager.pipeStatus[parentPipeColor] == "parentPut" || pipeManager.pipeStatus[parentPipeColor] == "noneDirection"){
          continue;
        }

        pipeManager.pipeEntity[parentPipeColor].parent.x = stageArray[i].xId;
        pipeManager.pipeEntity[parentPipeColor].parent.y = stageArray[i].yId;
        //stagearrayの順番は確定じゃないから子供が先に復活する場合もアル
        if(pipeManager.pipeStatus != "childPut"){
          pipeManager.pipeStatus[parentPipeColor] = "parentPut";
        }

      }
      //子パイプの方向決めオブジェクトを出さないようにする
      if(stageArray[i]._element.className.indexOf("pipeOut") != -1){
        stageArray[i].restoreFlg = true;
        //パイプマネージャーの不整合を直す
        var childPipeColor = stageArray[i].color;
        if(pipeManager.pipeStatus[childPipeColor] != "parentPut"){
          continue;
        }
        pipeManager.pipeEntity[childPipeColor].child.x = stageArray[i].xId;
        pipeManager.pipeEntity[childPipeColor].child.y = stageArray[i].yId;
        pipeManager.pipeEntity[childPipeColor].child.direction = stageArray[i].direction;
        //childpipeに登録
        pipeManager.childPipe[childPipeColor] = stageArray[i];
        pipeManager.pipeStatus[childPipeColor] = "childPut";
      }
      this.addCreatersStages(stageArray[i]);
      GAME.currentScene.addChild(stageArray[i]);
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
