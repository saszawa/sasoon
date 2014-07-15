var EditGoal = Class.create(Goal,{
  initialize: function(){
    Goal.call(this,BOX_SIZE,BOX_SIZE);

    this._element = document.createElement('div');
    this._element.className = 'goal';
    this.scaleX = 0.8;
    this.scaleY = 0.8;
    this.distance = 1;

    //戻す用にxId,yId
    this.xId = -1;
    this.yId = -1;

    this.tl.scaleTo(0.6,0.6,30,CUBIC_EASEIN).scaleTo(0.8,0.8,30,CUBIC_EASEOUT).loop();
  },
  run: function(){

    playSound(GAME.assets['sound/goal.mp3'].clone());

    this.tl.clear();

    GAME.currentScene.removeChild(this);

    creater.stages[this.xId][this.yId] = null;
    creater.goalFlg = false;
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
      boxManager.boxArray[this.xId][this.yId].putedObjFlg = false;
      GAME.currentScene.removeChild(this);
    }
  }
});
