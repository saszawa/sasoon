var Pipe = Class.create(Sprite,{
  initialize: function(color,pipeStatus){
    Sprite.call(this,BOX_SIZE,BOX_SIZE);

    // DOMモード
    this._element = document.createElement('div');
    this._element.className = 'pipe';
    this.image = PIPE_COLORS[color].pipe;
    this.pipeStatus = pipeStatus;
    this.color = color;

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
  onaddedtoscene: function(){
    this.pipeOut = new Sprite(BOX_SIZE,BOX_SIZE);
    this.pipeOut._element = document.createElement('div');
    this.pipeOut._element.className = 'pipeOut '+this.pipeStatus.direction;
    this.pipeOut.image = PIPE_COLORS[this.color].pipeOut;
    this.pipeOut.x = this.pipeStatus.x * BOX_SIZE;
    this.pipeOut.y = this.pipeStatus.y * BOX_SIZE;
    this.parentNode.addChild(this.pipeOut);
  },
  onremovedfromscene: function(){
    GAME.currentScene.removeChild(this.pipeOut);
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

    playSound(GAME.assets['sound/pipe.mp3'].clone());

    var arc = new HitArc(this.color);
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
    GAME.currentScene.removeChild(this.pipeOut);
    GAME.currentScene.removeChild(this);
  }
});
