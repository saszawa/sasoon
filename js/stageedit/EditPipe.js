var EditPipe = Class.create(EditObj,{
  initialize: function(color){
    EditObj.call(this,BOX_SIZE,BOX_SIZE);

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
  bloomArc: function bloomArc(theChildPipe){
    var arc = new HitArc(this.color);
    arc.x = theChildPipe.x-128;
    arc.y = theChildPipe.y-128;
    GAME.currentScene.addChild(arc);
  },
  getChildPipe: function getChildPipe(){
    var theChildPipe = null;
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
    return theChildPipe;
  },
  initPipeStatusEtc: function initPipeStatusEtc(){

    //パイプステータスを変更
    pipeManager.pipeStatus[this.color] = "nothing";
    pipeManager.initPipeEntityColor(this.color);

  },
  beamFire: function beamFire(thisChildPipe){
    var beamInit = {
      x: thisChildPipe.x+BOX_SIZE/2-BEAM_SIZE/2,
      y: thisChildPipe.y+BOX_SIZE/2-BEAM_SIZE/2,
      color: 'white',
      parentBlock:thisChildPipe,
      beamLength:BEAM_LENGTH
    }
    GAME.currentScene.addChild(new EditBeam(this.beamStatus[thisChildPipe.direction],beamInit));
  },
  run: function(){
    var thisChildPipe = this.getChildPipe();
    //自分の子供から演出を出す
    this.bloomArc(thisChildPipe);
    this.initPipeStatusEtc();
    this.beamFire(thisChildPipe);
    playSound(GAME.assets['sound/pipe.mp3'].clone());

    //	出したら消滅
    //子供も削除
    GAME.currentScene.removeChild(thisChildPipe);
    GAME.currentScene.removeChild(this);
  },
  ontouchstart: function(){
    //消しゴム
    if(creater.penColor == "eraser"){
      //インクを親に戻す
      GAME.currentScene.removeChild(this);
    }
  },
  onremovedfromscene: function(){
    creater.stages[this.xId][this.yId] = null;
    boxManager.boxArray[this.xId][this.yId].putedObjFlg = false;
    //消えたやつは戻せるようにこの配列に追加
    creater.noneCollisionStages[this.xId][this.yId] = this;
    creater.currentStage[this.xId][this.yId] = null;

    pipeManager.pipeEntity[this.color].parent.x = null;
    pipeManager.pipeEntity[this.color].parent.y = null;
    pipeManager.pipeStatus[this.color] = "nothing";

    //親を消したら子供も同時に消す
    if(pipeManager.childPipe[this.color] != null){
      GAME.currentScene.removeChild(pipeManager.childPipe[this.color]);
    }

    this.replacePipeInk();
  },
  replacePipeInk: function replacePipeInk(){
    GAME.currentScene.removeChild(pipeManager.pipeInk);
    pipeManager.pipeInk = void 0;
    pipeManager.pipeInk = new PipeInk(this.color);
    GAME.currentScene.addChild(pipeManager.pipeInk);
  },
  //追加されたときに追加フラグ
  onaddedtoscene: function(){
    pipeManager.pipeStatus[this.color] = "parentPut";
    creater.penColor = "childPipe";

//    GAME.currentScene.removeChild(pipeManager.pipeInk);
//    pipeManager.pipeInk = void 0;
//    pipeManager.pipeInk = new ChildPipeInk(this.color);
//    GAME.currentScene.addChild(pipeManager.pipeInk);

    boxManager.boxArray[this.xId][this.yId].putedObjFlg = true;
    pipeManager.pipeEntity[this.color].parent.x = this.xId;
    pipeManager.pipeEntity[this.color].parent.y = this.yId;
    pipeManager.pipeStatus[this.color] = "parentPut";
    this.registJSON();
    creater.currentStage[this.xId][this.yId] = this;

    pipeManager.adaptPipeStatus();
    pipeManager.adaptPipeInk();
  },
  registJSON: function registJSON(){
    creater.stages[this.xId][this.yId] = {name:"pipe",color:this.color};
  }
});
