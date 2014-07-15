var EditBlock = Class.create(Block,{
  initialize: function(color){
    Block.call(this,BOX_SIZE,BOX_SIZE);

    // DOMモード
    this._element = document.createElement('div');
    this._element.className = color;

    this.color = color;

    //戻す用にxId,yId
    this.xId = -1;
    this.yId = -1;

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
    if( 0 < effectLevel){
      var arc = new HitArc(this.color);
      arc.x = this.x-128;
      arc.y = this.y-128;
      GAME.currentScene.addChild(arc);
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
        GAME.currentScene.addChild(new EditBeam(this.beamStatus[beam],beamInit));
      }
      i++;
    }

    switch (this.color){
      case "blue":
        playSound(GAME.assets['sound/blue.mp3'].clone());
        break;
      case "green":
        playSound(GAME.assets['sound/green.mp3'].clone());
        break;
      case "red":
        playSound(GAME.assets['sound/red.mp3'].clone());
        break;
      case "purple":
        playSound(GAME.assets['sound/purple.mp3'].clone());
        break;
      case "orange":
        playSound(GAME.assets['sound/orange.mp3'].clone());
        break;
      case "white":
        playSound(GAME.assets['sound/white.mp3'].clone());
        break;
    }

    //	出したら消滅
    GAME.currentScene.removeChild(this);
    creater.stages[this.xId][this.yId] = null;
    //currentStageから削除したら戻せない
    var curStageLength = creater.currentStage.length;
    for(var i = 0; i < curStageLength; i++){
      if(creater.currentStage[i].xId == this.xId && creater.currentStage[i].yId == this.yId ) 
      {
        creater.currentStage.splice(i,1);
        break;
      }
    }
    boxManager.boxArray[this.xId][this.yId].putedObjFlg = false;
  },
  ontouchstart: function(){
    //currentStage
    //currentScene
    //Stages
    //消しゴム
    if(creater.penColor == "eraser"){
      var currentStageLength = creater.currentStage.length;
      var noneCollisionStagesLength = creater.noneCollisionStages.length;
      creater.copyStage = void 0;
      creater.copyStage = creater.currentStage.concat();

      //currentStageから消す
      for(var i = 0; i < currentStageLength; i++){
        //自分を消す
        //xId,yIdでやってるけど、ループまわさずやりたい
        //グローバルにアクセスしまくってる現状
        if(creater.currentStage[i].xId == this.xId && creater.currentStage[i].yId == this.yId){
          creater.currentStage.splice(i,1);
          break;
        }
      }
      creater.stages[this.xId][this.yId] = null;
      GAME.currentScene.removeChild(this);
      boxManager.boxArray[this.xId][this.yId].putedObjFlg = false;
    }
  }
});
