var Block = Class.create(Sprite,{
  initialize: function(color){
    Sprite.call(this,BOX_SIZE,BOX_SIZE);

    // DOMモード
    this._element = document.createElement('div');
    this._element.className = color;

    this.color = color;

    if(this.color === 'orange'){
      this.image = ORANGE;
    } else if(this.color === 'purple'){
      this.image = PURPLE;
    }

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
  /**
   * Block.run()
   * 	4方向にBeamを出します
   */
  run: function(){
    clearTimeout(this.parentNode.endTimer);
    this.parentNode.endTimer = setTimeout(function(){
      GAME.currentScene.gameOver();
    },3500);

    switch (this.color){
      case "blue":
        GAME.assets['sound/blue.mp3'].clone().play();
        break;
      case "green":
        GAME.assets['sound/green.mp3'].clone().play();
        break;
      case "red":
        GAME.assets['sound/red.mp3'].clone().play();
        break;
      case "purple":
        GAME.assets['sound/purple.mp3'].clone().play();
        break;
      case "orange":
        GAME.assets['sound/orange.mp3'].clone().play();
        break;
      case "white":
        GAME.assets['sound/white.mp3'].clone().play();
        break;
    }

    if( 0 < effectLevel){
      var arc = new HitArc(this.color);
      arc.x = this.x-128;
      arc.y = this.y-128;
      this.parentNode.addChild(arc);
    }

    var i = 0;
    for(var beam in this.beamStatus){
      if(DIRECTIONS[this.color][i]){
        // 初期設定的な
        var beamInit = {
          x: this.x+BOX_SIZE/2-BEAM_SIZE/2,
          y: this.y+BOX_SIZE/2-BEAM_SIZE/2,
          parentBlock:this,
          beamLength:BEAM_LENGTH
        }
        this.parentNode.addChild(new Beam(this.beamStatus[beam],beamInit));
      }
      i++;
    }
    //	出したら消滅
    this.parentNode.removeChild(this);
  }
});
