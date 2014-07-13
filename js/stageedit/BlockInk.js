var BlockInk = Class.create(Block,{
  initialize: function(color){
    Block.call(this,BOX_SIZE,BOX_SIZE);

    // DOMモード
    this._element = document.createElement('div');
    this._element.className = color;

    this.color = color;

    if(this.color === 'orange'){
      this.image = ORANGE;
    } else if(this.color === 'purple'){
      this.image = PURPLE;
    }
  },
  ontouchstart: function(){
    creater.penColor = this.color;
  }
});
