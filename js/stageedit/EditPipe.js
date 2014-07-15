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
        //パイプステータスを変更
        pipeManager.pipeStatus.blue = "nothing";
        pipeManager.initPipeEntityColor("blue");
        break;
      case "red":
        var theChildPipe = pipeManager.childPipe.red;
        pipeManager.pipeStatus.red = "nothing";
        pipeManager.initPipeEntityColor("red");
        break;
      case "green":
        var theChildPipe = pipeManager.childPipe.green;
        pipeManager.pipeStatus.green = "nothing";
        pipeManager.initPipeEntityColor("green");
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
    //子供も削除
    GAME.currentScene.removeChild(theChildPipe);
    creater.stages[theChildPipe.xId][theChildPipe.yId] = null;
    //
    var curStageLength = creater.currentStage.length;
    creater.stages[theChildPipe.xId][theChildPipe.yId] = null;
    boxManager.boxArray[theChildPipe.xId][theChildPipe.yId].putedObjFlg = false;
    //子供はcurrentstageにはいってないので意味ない
//    for(var i = 0; i < curStageLength; i++){
//      if(creater.currentStage[i].xId == theChildPipe.xId && creater.currentStage[i].yId == theChildPipe.yId ) 
//      {
//        creater.currentStage.splice(i,1);
//        break;
//      }
//    }

    GAME.currentScene.removeChild(this);
    creater.stages[this.xId][this.yId] = null;
    //currentStageから削除
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
    //stages
    //消しゴム
    if(creater.penColor == "eraser"){
      var currentStageLength = creater.currentStage.length;
      
      //戻れるようにコピーステージを作る
      creater.copyStage = void 0;
      creater.copyStage = [];
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

      //pipeStatusいじらな
      var color = this.color;
      creater.stages[this.xId][this.yId] = null;
      pipeManager.pipeEntity[color].parent.x = null;
      pipeManager.pipeEntity[color].parent.y = null;
      pipeManager.pipeStatus[color] = "nothing";
      //親を消したら子供も同時に消す
      if(pipeManager.childPipe[color] != null){
        GAME.currentScene.removeChild(pipeManager.childPipe[color]);
        boxManager.boxArray[pipeManager.childPipe[color].xId][pipeManager.childPipe[color].yId].putedObjFlg = false;
        creater.stages[pipeManager.childPipe[color].xId][pipeManager.childPipe[color].yId] = null;
        pipeManager.pipeEntity[color].child.x = null;
        pipeManager.pipeEntity[color].child.y = null;
        pipeManager.pipeEntity[color].child.direction = null;
        pipeManager.childPipe[color] = null;
      }

      boxManager.boxArray[this.xId][this.yId].putedObjFlg = false;
      //インクを親に戻す
      GAME.currentScene.removeChild(this);
      GAME.currentScene.removeChild(pipeManager.pipeInk);
      pipeManager.pipeInk = void 0;
      pipeManager.pipeInk = new PipeInk(color);
      GAME.currentScene.addChild(pipeManager.pipeInk);
    }
  }
});
