var PipeDirectionArrow = Class.create(ExLabel,{
  initialize: function(text,color){
    var width = 640;
    var height = 64;
    ExLabel.call(this,width,height);

    // DOMモード
    this._element = document.createElement('div');
    this._element.innerHTML = text;
    this.color = color;
    this.direction = null;
  },
  setClassName: function(className){
    this._element.className = className;
  },
  ontouchend: function(){
    var theChildPipe;
    //direction設定
    switch(this.color)
    {
      case "blue":
        theChildPipe = pipeManager.childPipe.blue;
        break;
      case "red":
        theChildPipe = pipeManager.childPipe.red;
        break;
      case "green":
        theChildPipe = pipeManager.childPipe.green;
        break;
    }
    theChildPipe.direction = this.direction;
    theChildPipe._element.className = 'pipeOut ' + this.direction;
    //CreatertのstagesにDhirection追加 (JSON用)
    creater.stages[theChildPipe.xId][theChildPipe.yId] = { name:"pipeOut", direction:this.direction.toString() };
    pipeManager.pipeStatus[this.color] = "childPut";
    pipeManager.pipeEntity[this.color].child.direction = this.direction.toString();

    //direction設定したらけし
    GAME.currentScene.removeChild(theChildPipe.directionArrow.up);
    GAME.currentScene.removeChild(theChildPipe.directionArrow.left);
    GAME.currentScene.removeChild(theChildPipe.directionArrow.right);
    GAME.currentScene.removeChild(theChildPipe.directionArrow.down);
  }
});
