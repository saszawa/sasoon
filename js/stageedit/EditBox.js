var EditBox = Class.create(Box,{
  initialize: function(xNumber,yNumber){
  //生成時にBoxの場所を引き数に持つ
    Box.call(this,BOX_SIZE,BOX_SIZE);
    // DOMモード
    this._element = document.createElement('div');
    this._element.className = 'box';
    this.moved = false;
    //idを降ってステージ作成に活かす
    this.xId = xNumber || -1;
    this.yId = yNumber || -1;
  },
  ontouchstart: function(e){
    this.startEvent = e;
    this.moved = false;
    this._element.className = 'box touched';

    var penColor = creater.penColor;
    var obj = null;

    if(penColor == "start"){
      obj = new EditStart();
      //クリエイターがみんなから見えるので色々持たす
      creater.putStartFlg = true;
      creater.startObj = obj;
    }else if(penColor == "slanter" ){
      obj = new EditSlanter(this.xId,this.yId);
      creater.currentStage.push(obj);
    } else{
      obj = new EditBlock(penColor);
      creater.currentStage.push(obj);
    }
    obj.x = this.x;
    obj.y = this.y;
    this.parentNode.addChild(obj);

    //TODO 上書き機能
    creater.stages[this.xId][this.yId] = obj.color;

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
