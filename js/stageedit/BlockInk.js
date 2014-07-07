var BlockInk = Class.create(Block,{
  initialize: function(color){
    Block.call(this,BOX_SIZE,BOX_SIZE);

    // DOMモード
    this._element = document.createElement('div');
    this._element.className = color;

    this.color = color;

  },
  ontouchstart: function(){
    creater.penColor = this.color;
  }
});
