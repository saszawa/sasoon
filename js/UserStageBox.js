var UserStageBox = Class.create(Sprite,{
  initialize: function(stageId,star,user_name){
    Sprite.call(this,BOX_SIZE*2,BOX_SIZE*2);
    this._element = document.createElement('div');
    this._element.innerHTML = user_name;
    this.image = SCORE_STARS[star];
    this.stageId = stageId;
    this.moved = false;
  },
  ontouchstart: function(e){
    this.startEvent = e;
    this.moved = false;
  },
  ontouchmove: function(e){
    if(Math.abs(this.startEvent.x - e.x) > 10 || Math.abs(this.startEvent.y - e.y) > 10){
      this.moved = true;
    }
  },
  ontouchend: function(e){
    GAME.currentScene.selectedStage(this.stageId,'user');
  }
});
