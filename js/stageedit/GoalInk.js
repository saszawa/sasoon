var GoalInk = Class.create(Sprite,{
  initialize: function(){
    Sprite.call(this,BOX_SIZE,BOX_SIZE);

    // DOMモード
    this._element = document.createElement('div');
    this._element.className = 'goal';

  },
  ontouchstart: function(){
    creater.penColor = "goal";
  }
});
