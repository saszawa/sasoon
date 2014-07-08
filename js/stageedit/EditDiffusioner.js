var EditDiffusioner = Class.create(Diffusioner,{
  initialize: function(){
    Diffusioner.call(this,BOX_SIZE,BOX_SIZE);
    this._element = document.createElement('div');
    this._element.className = 'diffusioner';
    this.image = DIFFUSIONER;

    // 倍の早さ
    var movePx = MOVE_PX*2;

    this.beamStatus = {
      top:      {moveX: 0        ,moveY: -movePx},
      topRight: {moveX: movePx   ,moveY: -movePx},
      right:    {moveX: movePx   ,moveY: 0       },
      rightDown:{moveX: movePx   ,moveY: movePx },
      down:     {moveX: 0        ,moveY: movePx },
      downLeft: {moveX: -movePx  ,moveY: movePx },
      left:     {moveX: -movePx  ,moveY: 0       },
      leftTop:  {moveX: -movePx  ,moveY: -movePx}
    };

    this.color = "red";

  },
  run: function(){

    var arc = new HitArc(this.color);
    arc.x = this.x-128;
    arc.y = this.y-128;
    GAME.currentScene.addChild(arc);

    var i = 0;
    for(var beam in this.beamStatus){
      // 初期設定的な
      var beamInit = {
        x: this.x+BOX_SIZE/2-BEAM_SIZE/2,
        y: this.y+BOX_SIZE/2-BEAM_SIZE/2,
        parentBlock:this,
        beamLength: 1
      }
      GAME.currentScene.addChild(new EditBeam(this.beamStatus[beam],beamInit));
      i++;
    }

    playSound(GAME.assets['sound/diffusioner.mp3'].clone());
    //	出したら消滅
    GAME.currentScene.removeChild(this);
  }
});