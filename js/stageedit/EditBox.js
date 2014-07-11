var EditBox = Class.create(Box,{
  initialize: function(xNumber,yNumber){
    //生成時にBoxの場所を引き数に持つ
    Box.call(this,BOX_SIZE,BOX_SIZE);
    // DOMモード
    this._element = document.createElement('div');
    //下線対応
    if(yNumber == 9){
      this._element.className = 'box edit_underline';
    }else{
      this._element.className = 'box';
    }
    this.moved = false;
    //idを降ってステージ作成に活かす
    this.xId = xNumber;
    this.yId = yNumber;
  },
  putStart: function putStart(){
      //スタートは一個しか置けない用にする
      if(creater.putStartFlg){
        return;
      }
      var start = new EditStart();
      //クリエイターがみんなから見えるので色々持たす
      creater.putStartFlg = true;
      creater.startObj = start;
      //TODO 上書き機能
      creater.stages[this.xId][this.yId] = "start";
      return start;
  },
  putSlanter: function putSlanter(){
      var slanter = new EditSlanter(this.xId,this.yId);
      creater.currentStage.push(slanter);
      //TODO 上書き機能
      creater.stages[this.xId][this.yId] = "slanter";
      return slanter;
  },
  putDiffusioner: function putDiffusioner(){
      var diffusioner  = new EditDiffusioner();
      creater.currentStage.push(diffusioner);
      //TODO 上書き機能
      creater.stages[this.xId][this.yId] = "diffusioner";
      return diffusioner;
  },
  putParentPipe: function putParentPipe(){
    //親パイプのとき
    //既に同色が置いてある場合
    var color = creater.pipeColor;
    var pipeErrorFlg = pipeManager.getPipeErrorFlg();
    if(pipeErrorFlg){
      return;
    }
//    for (pipeColor in pipeManager.pipeStatus){
//      if(pipeColor == color){
//        if(pipeManager.pipeStatus[pipeColor] == "parentPut" || pipeManager.pipeStatus[pipeColor] == "childPut" ){
//          //アラートでもならそうか
//          this.pipeErrorFlg = true;
//          return;
//        }
//      }
//    }
    var parentPipe = new EditPipe(color);

    creater.currentStage.push(parentPipe);
    creater.stages[this.xId][this.yId] = "pipe";
    pipeManager.pipeStatus[color] = "parentPut";
    creater.penColor = "childPipe";

    GAME.currentScene.removeChild(pipeManager.pipeInk);
    pipeManager.pipeInk = void 0;
    pipeManager.pipeInk = new ChildPipeInk(color);
    GAME.currentScene.addChild(pipeManager.pipeInk);
    return parentPipe;
  },
  putChildPipe: function putChildPipe(){
      //子パイプの時
      var color = creater.pipeColor;
      var childPipe = new EditChildPipe(color);

      //createrに登録
      creater.stages[this.xId][this.yId] = "pipeOut";
      //pipemanagerに登録
      pipeManager.pipeStatus[color] = "childPut";
      pipeManager.childPipe[color] = void 0;
      //なんでこここれでアクセスできんのやろ
      //console.log(pipeManager.childPipe[color]);

      //こことか循環リストまわした方が気持ちいいんだけど打ち止めさせたいからいいか
      switch(color)
      {
        case "blue":
          pipeManager.childPipe.blue = childPipe;
          color = "red";
          creater.pipeColor = "red";
          break;
        case "red":
          pipeManager.childPipe.red = childPipe;
          color = "green";
          creater.pipeColor = "green";
          break;
        case "green":
          pipeManager.childPipe.green = childPipe;
          color = "blue";
          creater.pipeColor = "blue";
          break;
      }

      creater.penColor = "parentPipe";

      GAME.currentScene.removeChild(pipeManager.pipeInk);
      pipeManager.pipeInk = void 0;
      pipeManager.pipeInk = new PipeInk(color);
      GAME.currentScene.addChild(pipeManager.pipeInk);

      return childPipe;
  },
  putGoal: function putGoal(){
    //goalは一個しか置けない用にするA
    if(creater.goalFlg){
      return;
    }
    var goal = new EditGoal();
    creater.currentStage.push(goal);
    //TODO 上書き機能
    creater.stages[this.xId][this.yId] = goal.color;
    creater.goalFlg = true;
    return goal;
  },
  putStar: function putStar(){
    //星を置く
    var star = new EditStar();
    creater.currentStage.push(star);
    creater.stages[this.xId][this.yId] = "star";
    creater.starMany++;
    return star;
  },
  ontouchstart: function(e){
    //スタートがすでに置かれていたら
    this.startEvent = e;
    this.moved = false;
    this._element.className = 'box touched';

    var penColor = creater.penColor;
    var obj = null;

    //TODO ここもメソッドかしたい
    //上書きを禁止
//  if(creater.stages[this.xId][this.yId] != null){
//   }
    if(penColor == "start"){
      if(creater.putStartFlg){
        return;
      }
      obj = this.putStart();
      creater.putStartFlg = true;
    }else if(penColor == "slanter" ){
      obj = this.putSlanter();
    }else if(penColor == "diffusioner"){
      obj = this.putDiffusioner();
    }else if(penColor == "parentPipe"){
      var pipeErrorFlg = pipeManager.getPipeErrorFlg(creater.pipeColor);
      if(pipeErrorFlg){
        return;
      }
      obj = this.putParentPipe();
    }else if(penColor == "childPipe"){
      obj = this.putChildPipe();
    }else if(penColor == "goal"){
      obj = this.putGoal();
    }else if(penColor == "star"){
    //みっつまでしかおけない
      if(creater.starMany >= 3){
        return;
      }
      obj = this.putStar();
    }
    else{
      //赤、緑、青、紫、オレンジ
      obj = new EditBlock(penColor);
      creater.currentStage.push(obj);
      //TODO 上書き機能
      //creater.stages[this.xId][this.yId] = obj.color;
    }

    obj.x = this.x;
    obj.y = this.y;
    this.parentNode.addChild(obj);
  },
  ontouchmove: function(e){
    if(Math.abs(this.startEvent.x - e.x) > 10 || Math.abs(this.startEvent.y - e.y) > 10){
      this.moved = true;
    }
  },
  ontouchend: function(){
    this._element.className = 'box';
    if(!this.parentNode.canTap){
      return;
    } else if(this.moved){
      return;
    }
    this.parentNode.canTap = false;
    var block = new Block('white');
    block.x = this.x;
    block.y = this.y;
    currentStage.push(block);
    this.parentNode.addChild(block);
  }
});
