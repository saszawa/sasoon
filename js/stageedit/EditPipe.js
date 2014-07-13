var EditPipe = Class.create(Sprite,{
  initialize: function(color){
    Sprite.call(this,BOX_SIZE,BOX_SIZE);

    // DOMモード
    this._element = document.createElement('div');
    this._element.className = 'pipe';
    this.image = PIPE_COLORS[color].pipe;
    this.color = color;

    //戻す用にxId,yId
    this.xId = -1;
    this.yId = -1;

    // Beam用ステータス
    this.beamStatus = {
      up:{
        moveX: 0,
        moveY: -MOVE_PX,
      },
      right:{
        moveX: MOVE_PX,
        moveY: 0
      },
      down:{
        moveX: 0,
        moveY: MOVE_PX
      },
      left:{
        moveX: -MOVE_PX,
        moveY: 0
      }
    };
  },
  /**
  * Block.run()
  */
  run: function(){
    var theChildPipe = null;
    var arc = new HitArc(this.color);

    //自分の子供から演出を出す
    switch(this.color)
    {
      case "blue":
        var theChildPipe = pipeManager.childPipe.blue;
        break;
      case "red":
        var theChildPipe = pipeManager.childPipe.red;
        break;
      case "green":
        var theChildPipe = pipeManager.childPipe.green;
        break;
    }
    arc.x = theChildPipe.x-128;
    arc.y = theChildPipe.y-128;
    GAME.currentScene.addChild(arc);

    var beamInit = {
      x: theChildPipe.x+BOX_SIZE/2-BEAM_SIZE/2,
      y: theChildPipe.y+BOX_SIZE/2-BEAM_SIZE/2,
      color: 'white',
      parentBlock:theChildPipe,
      beamLength:BEAM_LENGTH
    }
    GAME.currentScene.addChild(new EditBeam(this.beamStatus[theChildPipe.direction],beamInit));
    playSound(GAME.assets['sound/pipe.mp3'].clone());
    //	出したら消滅
    GAME.currentScene.removeChild(theChildPipe);
    GAME.currentScene.removeChild(this);
  }
});
