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
    this.startObjFlg = false;
    //自分の上にオブジェクトが置かれているかどうか
    this.putedObjFlg = false;
    this.pipeNextAlreadyFlg = false;
  },
  putStart: function putStart(){
      //スタートは一個しか置けない用にする
      if(creater.putStartFlg){
        return;
      }
      var start = new EditStart();
      //クリエイターがみんなから見えるので色々持たす
      creater.putStartFlg = true;
      //nonecollisionstagesに追加しないように判定用
      this.startObjFlg = true;

      creater.startObj = void 0;
      creater.startObj = start;
      creater.stages[this.xId][this.yId] = "start";
      creater.startPos = {x: this.xId, y:this.yId};
      return start;
  },
  putSlanter: function putSlanter(){
      var slanter = new EditSlanter(this.xId,this.yId);
      return slanter;
  },
  putDiffusioner: function putDiffusioner(){
      var diffusioner  = new EditDiffusioner();
      return diffusioner;
  },
  putParentPipe: function putParentPipe(){
    //親パイプのとき
    var color = creater.pipeColor;
    var parentPipe = new EditPipe(color);

    pipeManager.pipeStatus[color] = "parentPut";
    creater.penColor = "childPipe";

    GAME.currentScene.removeChild(pipeManager.pipeInk);
    pipeManager.pipeInk = void 0;
    pipeManager.pipeInk = new ChildPipeInk(color);
    GAME.currentScene.addChild(pipeManager.pipeInk);
    return parentPipe;
  },
  //現状だと既にchildput場合にしか使わないかも
  itaratePipeInk: function itaratePipeInk(color){
      var chengeColor = null;
      switch(color)
      {
        //青以外
        case "blue":
          chengeColor = "red";
          break;
        case "red":
          chengeColor = "green";
          break;
        case "green":
          chengeColor = "blue";
          break;
      }
      GAME.currentScene.removeChild(pipeManager.pipeInk);
      creater.pipeColor = chengeColor;
      pipeManager.pipeInk = void 0;
      pipeManager.pipeInk = new PipeInk(chengeColor);
      GAME.currentScene.addChild(pipeManager.pipeInk);
  },
  //pipe用、速度の為にpipeManagerに書かなかった
  getNextColor: function getNextColor(color){
    var nextColor = null;
    var colorArray = ["blue","red","green"];
    var colorArrayLength = colorArray.length;
    for(var i = 0; i < colorArrayLength; i++){
      if( color == colorArray[i]){
         //要素超えないように
         if(i + 1 > colorArrayLength){
           return; 
         }
         return colorArray[i + 1];
      }
    }
    alert("pipe Color Error. color is not exist");
  },
  rotateCreaterPipeColor: function rotateCreaterPipeColor(color){
    //消しゴムの存在により、確定で子供のつぎに次の色の親がくる訳じゃなくなった。
    //なので、pipeEntityを確認してインクを変える
    //条件　
    //二つともある場合
    var theColor = null;
    if(pipeManager.pipeEntity[color].child.x != null){
      switch(color)
      {
        //青以外
        case "blue":
          theColor = "green";
          creater.pipeColor = "green";
        break;
        case "red":
          theColor = "blue";
          creater.pipeColor = "blue";
        break;
        case "green":
          theColor = "red";
          creater.pipeColor = "red";
        break;
      }
    }else{
      switch(color)
      {
        case "blue":
          theColor = "red";
          creater.pipeColor = "red";
          break;
        case "red":
          theColor = "green";
          creater.pipeColor = "green";
          break;
        case "green":;
          theColor = "blue";
          creater.pipeColor = "blue";
          break;
      }
    }
    return theColor;
  },
  putChildPipe: function putChildPipe(){
      //子パイプの時
      var color = creater.pipeColor;
      var childPipe = new EditChildPipe(color);

      var nextColor = this.getNextColor(color);
      //消しゴムの実装により次の色が既にある可能性がある
      if( pipeManager.pipeStatus[nextColor] == "childPut" ){
        //インクを次の色にする
        this.pipeNextAlreadyFlg = true;
      }

      //自分にもxId yId登録
      childPipe.xId = this.xId;
      childPipe.yId = this.yId;

      //pipemanagerに登録
      pipeManager.pipeStatus[color] = "noneDirection";

      //色を変える
      color = this.rotateCreaterPipeColor(color);

      creater.penColor = "parentPipe";

      if(this.pipeNextAlreadyFlg){
        this.itaratePipeInk(nextColor);
      }else{
        this.replacePipeInk(color);
      }
      //使ってない色のインクにかえるこれ合ったら上のいらん可能性たかい
      var unUsedColor = pipeManager.getUnusedColor();
      if(unUsedColor){
        this.replacePipeInk(unUsedColor);
      }

      return childPipe;
  },
  replacePipeInk: function replacePipeInk(color){
    GAME.currentScene.removeChild(pipeManager.pipeInk);
    pipeManager.pipeInk = void 0;
    pipeManager.pipeInk = new PipeInk(color);
    GAME.currentScene.addChild(pipeManager.pipeInk);
  },
  putGoal: function putGoal(){
    //goalは一個しか置けない用にするA
    if(creater.goalFlg){
      return;
    }
    var goal = new EditGoal();
    creater.currentStage.push(goal);
    //TODO 上書き機能
    creater.stages[this.xId][this.yId] = "goal";
    creater.goalFlg = true;
    return goal;
  },
  putStar: function putStar(){
    //星を置く
    var star = new EditStar();
    return star;
  },
  ontouchstart: function(e){
    //消しゴムインクだった場合何もしない
    if(this.putedObjFlg){
      //上書き防止
      return;
    }
    this.startEvent = e;
    this.moved = false;
    this._element.className = 'box touched';

    var penColor = creater.penColor;
    var obj = null;

    //TODO ここもメソッドかしたい
    if(penColor == "eraser"){
      return; 
    }
    else if(penColor == "start"){
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
      //既に同色の親が置いてあったら置けない
      var parentPutedFlg = pipeManager.getPipeParentPutedFlg(creater.pipeColor);
      if(parentPutedFlg){
        alert(LANGUAGE[COUNTRYCODE].sameColorParentError);
        creater.pipeColor = null;
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
    }

    obj.x = this.x;
    obj.y = this.y;
    //管理用ID
    obj.xId = this.xId;
    obj.yId = this.yId;
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
