var EditSlanter = Class.create(Slanter,{
  initialize: function(){
    Slanter.call(this,BOX_SIZE,BOX_SIZE);
    this._element = document.createElement('div');
    this._element.className = 'slanter';
    this.image = SLANTER;
    this.rotation = 45;

    //戻す用にxId,yId
    this.xId = -1;
    this.yId = -1;

    this.beamStatus = {
      topRight: {moveX: MOVE_PX  ,moveY: -MOVE_PX},
      rightDown:{moveX: MOVE_PX  ,moveY: MOVE_PX },
      downLeft: {moveX: -MOVE_PX ,moveY: MOVE_PX },
      leftTop:  {moveX: -MOVE_PX ,moveY: -MOVE_PX}
    };

    this.color = "green";

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
        beamLength: 2
      }
      GAME.currentScene.addChild(new EditBeam(this.beamStatus[beam],beamInit));
      i++;
    }

    playSound(GAME.assets['sound/slanter.mp3'].clone());
    //	出したら消滅
    GAME.currentScene.removeChild(this);
  }
});
