var EditGoal = Class.create(EditObj,{
  initialize: function(){
    EditObj.call(this,BOX_SIZE,BOX_SIZE);

    this._element = document.createElement('div');
    this._element.className = 'goal';
    this.objName = 'goal';
    this.scaleX = 0.8;
    this.scaleY = 0.8;
    this.distance = 1;

    //戻す用にxId,yId
    this.xId = -1;
    this.yId = -1;

    this.tl.scaleTo(0.6,0.6,30,CUBIC_EASEIN).scaleTo(0.8,0.8,30,CUBIC_EASEOUT).loop();
  },
  run: function(){

    this.playMySound();
    this.tl.clear();
    GAME.currentScene.removeChild(this);
  },
  //消えた時の処理をまとめる
  onremovedfromscene: function(){
    creater.stages[this.xId][this.yId] = null;
    boxManager.boxArray[this.xId][this.yId].putedObjFlg = false;
    //消えたやつは戻せるようにこの配列に追加
    creater.noneCollisionStages[this.xId][this.yId] = this;
    creater.goalFlg = false;
    creater.currentStage[this.xId][this.yId] = null;
  },
  //追加されたときに追加フラグ
  onaddedtoscene: function(){
    boxManager.boxArray[this.xId][this.yId].putedObjFlg = true;
    this.registJSON();
    creater.currentStage[this.xId][this.yId] = this;
    creater.goalFlg = true;
  },
});
