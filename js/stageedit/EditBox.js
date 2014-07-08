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
    this.xId = xNumber ;
    this.yId = yNumber ;
  },
  ontouchstart: function(e){
    this.startEvent = e;
    this.moved = false;
    this._element.className = 'box touched';

    var penColor = creater.penColor;
    var obj = null;

    //TODO ここもメソッドかしたい
    if(penColor == "start"){
      obj = new EditStart();
      //クリエイターがみんなから見えるので色々持たす
      creater.putStartFlg = true;
      creater.startObj = obj;
      //TODO 上書き機能
      creater.stages[this.xId][this.yId] = "start";
    }else if(penColor == "slanter" ){
      obj = new EditSlanter(this.xId,this.yId);
      creater.currentStage.push(obj);
      //TODO 上書き機能
      creater.stages[this.xId][this.yId] = "slanter";
    }else if(penColor == "diffusioner"){
      obj = new EditDiffusioner();
      creater.currentStage.push(obj);
      //TODO 上書き機能
      creater.stages[this.xId][this.yId] = "diffusioner";
    }else if(penColor == "parentPipe"){
      //親パイプのとき
      //TODO 親しか置いてないときのエラー処理
      var color = creater.pipeColor;
      obj = new EditPipe(color);

      creater.currentStage.push(obj);
      creater.stages[this.xId][this.yId] = "pipe";
      pipeManager.pipeStatus[color] = "parentPut";
      creater.penColor = "childPipe";

      GAME.currentScene.removeChild(pipeManager.pipeInk);
      pipeManager.pipeInk = void 0;
      pipeManager.pipeInk = new ChildPipeInk(color);
      GAME.currentScene.addChild(pipeManager.pipeInk);
    }else if(penColor == "childPipe"){
      //子パイプの時
      var color = creater.pipeColor;
      obj = new EditChildPipe(color);

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
          pipeManager.childPipe.blue = obj;
          color = "red";
          creater.pipeColor = "red";
          break;
        case "red":
          pipeManager.childPipe.red = obj;
          color = "green";
          creater.pipeColor = "green";
          break;
        case "green":
          pipeManager.childPipe.green = obj;
          color = "blue";
          creater.pipeColor = "blue";
          break;
      }

      creater.penColor = "parentPipe";

      GAME.currentScene.removeChild(pipeManager.pipeInk);
      pipeManager.pipeInk = void 0;
      pipeManager.pipeInk = new PipeInk(color);
      GAME.currentScene.addChild(pipeManager.pipeInk);

    }else{
      obj = new EditBlock(penColor);
      creater.currentStage.push(obj);
      //TODO 上書き機能
      creater.stages[this.xId][this.yId] = obj.color;
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
