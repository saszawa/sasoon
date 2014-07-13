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
  }
});
