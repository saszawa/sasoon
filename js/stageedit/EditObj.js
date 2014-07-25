var EditObj = Class.create(Sprite,{
  initialize: function(){
    Sprite.call(this,BOX_SIZE,BOX_SIZE);

    //戻す用にxId,yId
    this.xId = -1;
    this.yId = -1;
    this.objName = null;
  },
  run: function(){

    this.bloomArc();
    this.beamFire();
    this.playMySound();
    //	出したら消滅
    GAME.currentScene.removeChild(this);
  },
  ontouchstart: function(){
    //消しゴム
    if(creater.penColor == "eraser"){
      GAME.currentScene.removeChild(this);
    }
  },
  //消えた時の処理をまとめる
  onremovedfromscene: function(){
    creater.stages[this.xId][this.yId] = null;
    boxManager.boxArray[this.xId][this.yId].putedObjFlg = false;
    //消えたやつは戻せるようにこの配列に追加
    creater.noneCollisionStages[this.xId][this.yId] = this;
    creater.currentStage[this.xId][this.yId] = null;
  },
  beamFire: function beamFire(){
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
  },
  bloomArc: function bloomArc(){
    var arc = new HitArc(this.color);
    arc.x = this.x-128;
    arc.y = this.y-128;
    GAME.currentScene.addChild(arc);
  },
  //追加されたときに追加フラグ
  onaddedtoscene: function(){
    boxManager.boxArray[this.xId][this.yId].putedObjFlg = true;
    this.registJSON();
    creater.currentStage[this.xId][this.yId] = this;
  },
  playMySound: function playMySound(){
    if(this.objName){
      playSound(this.objName);
    }
  },
  registJSON: function registJSON(){
    creater.stages[this.xId][this.yId] = this.objName;
  }
});
