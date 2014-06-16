var Pipe = Class.create(Sprite,{
  initialize: function(pipeStatus){
    Sprite.call(this,BOX_SIZE,BOX_SIZE);

    // DOMモード
    this._element = document.createElement('div');
    this._element.className = 'pipe';
    this.image = PIPE;
    this.pipeStatus = pipeStatus;

    // Beam用ステータス
    this.beamStatus = {
      top:{
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
  onaddedtoscene: function(){
    console.log(this.pipeStatus);
    this.pipeOut = new Sprite(BOX_SIZE,BOX_SIZE);
    this.pipeOut._element = document.createElement('div');
    this.pipeOut._element.className = 'pipeOut';
    this.pipeOut.image = PIPE_OUT;
    this.pipeOut.x = this.pipeStatus.x * BOX_SIZE;
    this.pipeOut.y = this.pipeStatus.y * BOX_SIZE;
    this.parentNode.addChild(this.pipeOut);
  },
  /**
  * Block.run()
  * 	4方向にBeamを出します
  */
  run: function(){
    clearTimeout(this.parentNode.endTimer);
    this.parentNode.endTimer = setTimeout(function(){
      GAME.currentScene.gameOver();
    },3500);

    var arc = new HitArc('blue');
    arc.x = this.pipeOut.x-128;
    arc.y = this.pipeOut.y-128;
    this.parentNode.addChild(arc);

    var beamInit = {
      x: this.pipeOut.x+BOX_SIZE/2-BEAM_SIZE/2,
      y: this.pipeOut.y+BOX_SIZE/2-BEAM_SIZE/2,
      color: 'white',
      parentBlock:this.pipeOut,
      beamLength:BEAM_LENGTH
    }
    this.parentNode.addChild(new Beam(this.beamStatus[this.pipeStatus.direction],beamInit));
    //	出したら消滅
    this.parentNode.removeChild(this.pipeOut);
    this.parentNode.removeChild(this);
  }
});
