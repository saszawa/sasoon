var EditStar = Class.create(EditObj,{
  initialize: function(){
    EditObj.call(this,BOX_SIZE,BOX_SIZE);

    //星を描く
    this._element = document.createElement('div');
    this.image = WHITE_STAR;
    this.hited = false;
    this.objName = 'star';

    //戻す用にxId,yId
    this.xId = -1;
    this.yId = -1;

  },
  run: function(){
    var that = this;
    this.hited = true;
    this.tl.scaleTo(0.5,0.5,7).scaleTo(1,1,2).then(function(){
      that.tl.clear();
      that.tl.delay(5).rotateBy(72 ,40 ,EXPO_EASEOUT);
    });
    this.image = YELLOW_STAR;
    this.playMySound();
  },
  //消えた時の処理をまとめる
  onremovedfromscene: function(){
    creater.stages[this.xId][this.yId] = null;
    boxManager.boxArray[this.xId][this.yId].putedObjFlg = false;
    //消えたやつは戻せるようにこの配列に追加
    creater.noneCollisionStages[this.xId][this.yId] = this;
    creater.currentStage[this.xId][this.yId] = null;
    creater.starMany--;
  },
  //追加されたときに追加フラグ
  onaddedtoscene: function(){
    creater.starMany++;
    boxManager.boxArray[this.xId][this.yId].putedObjFlg = true;
    this.registJSON();
    creater.currentStage[this.xId][this.yId] = this;
    //三つ以上は置けない
    if(creater.starMany > 3){
      GAME.currentScene.removeChild(this);
    }
  },
});
