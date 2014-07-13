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

    var that = this;

    this.tl.clear();
    //TODO stageからもけす
    that.parentNode.removeChild(that);
    creater.goalFlg = false;
  }
});
