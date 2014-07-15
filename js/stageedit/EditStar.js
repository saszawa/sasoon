var EditStar = Class.create(Sprite,{
  initialize: function(){
    Sprite.call(this,BOX_SIZE,BOX_SIZE);

    //星を描く
    this._element = document.createElement('div');
    this.image = WHITE_STAR;
    this.hited = false;

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
    playSound(GAME.assets['sound/star.mp3'].clone());

    creater.stages[this.xId][this.yId] = null;
    boxManager.boxArray[this.xId][this.yId].putedObjFlg = false;
  },
  ontouchstart: function(){
    //currentStage
    //currentScene
    //Stages
    //消しゴム
    if(creater.penColor == "eraser"){
      var currentStageLength = creater.currentStage.length;
      var noneCollisionStagesLength = creater.noneCollisionStages.length;
      creater.copyStage = void 0;
      creater.copyStage = creater.currentStage.concat();

      //currentStageから消す
      for(var i = 0; i < currentStageLength; i++){
        //自分を消す
        //xId,yIdでやってるけど、ループまわさずやりたい
        //グローバルにアクセスしまくってる現状
        if(creater.currentStage[i].xId == this.xId && creater.currentStage[i].yId == this.yId){
          creater.currentStage.splice(i,1);
          break;
        }
      }

      creater.stages[this.xId][this.yId] = null;
      GAME.currentScene.removeChild(this);
      boxManager.boxArray[this.xId][this.yId].putedObjFlg = false;
    }
  }
});
