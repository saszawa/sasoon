var EditStart = Class.create(Start,{
  initialize: function(xNumber,yNumber){
    Start.call(this,BOX_SIZE,BOX_SIZE);

    // DOMモード
    this._element = document.createElement('div');
    this._element.className = 'start';
    this.backgroundColor = COLORS.white;

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
    this.xId = xNumber;
    this.yId = yNumber;
  },
  run: function(){
    //爆発した場所のxId,yIdを引き数に持つ
    var arc = new HitArc('white');
    arc.x = this.x-128;
    arc.y = this.y-128;
    GAME.currentScene.addChild(arc);

    var i = 0;
    for(var beam in this.beamStatus){
      if(DIRECTIONS['white'][i]){
        // 初期設定的な
        var beamInit = {
          x: this.x+BOX_SIZE/2-BEAM_SIZE/2,
          y: this.y+BOX_SIZE/2-BEAM_SIZE/2,
          color: 'white',
          parentBlock:this,
          beamLength:BEAM_LENGTH
        }
        GAME.currentScene.addChild(new Beam(this.beamStatus[beam],beamInit));
      }
      i++;
    }
    playSound(GAME.assets['sound/start.mp3'].clone());
    //出したら消滅
    GAME.currentScene.removeChild(this);
    delete creater.currentStage[this.xId][this.yId];
    creater.startObj = null;
  }
});
