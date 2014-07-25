var StarInk = Class.create(Sprite,{
  initialize: function(){
    Sprite.call(this,BOX_SIZE,BOX_SIZE);

    // DOMモード
    this._element = document.createElement('div');
    this.image = WHITE_STAR;
  },
  ontouchstart: function(){
    creater.penColor = "star";
  }
});
