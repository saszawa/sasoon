var PipeInk = Class.create(Sprite,{
  initialize: function(color){
    Sprite.call(this,BOX_SIZE,BOX_SIZE);

    // DOMモード
    this._element = document.createElement('div');
    this._element.className = 'pipe';
    this.image = PIPE_COLORS[color].pipe;
    this.pipeStatus = null;
    this.color = color;
    this.x = 410;
    this.y = 670; 
  },
  onaddedtoscene: function(){
    //this.pipeOut = new Sprite(BOX_SIZE,BOX_SIZE);
    //this.pipeOut._element = document.createElement('div');
    //this.pipeOut._element.className = 'pipeOut '+this.pipeStatus.direction;
    //this.pipeOut.image = PIPE_COLORS[this.color].pipeOut;
  ////  this.pipeOut.x = this.pipeStatus.x * BOX_SIZE;
  ////  this.pipeOut.y = this.pipeStatus.y * BOX_SIZE;
    //this.parentNode.addChild(this.pipeOut);
  },
  onremovedfromscene: function(){
    GAME.currentScene.removeChild(this.pipeOut);
  },
  ontouchstart: function(){
    creater.penColor = "parentPipe";
    creater.pipeColor = this.color;
  }
});
