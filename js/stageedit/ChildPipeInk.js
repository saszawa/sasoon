var ChildPipeInk = Class.create(Sprite,{
  initialize: function(color){
    Sprite.call(this,BOX_SIZE,BOX_SIZE);

    // DOMモード
    this._element = document.createElement('div');
    this.image = PIPE_COLORS[color].pipeOut;
    this.color = color;
    this._element.className = 'pipeOut '+ 'right';
    this.x = 410;
    this.y = 670; 
  },
  onremovedfromscene: function(){
  //  GAME.currentScene.removeChild(this.pipeOut);
  },
  ontouchstart: function(){
    creater.penColor = "childPipe";
    creater.pipeColor = this.color;
  }
});
