var Creater =  function(color){
  this.penColor = color || 'white';
  //パイプ制御用
  this.pipeColor = "blue";
  this.stages = new Array(10);
  var that = this;
  //ステージ生成の元
  for(var x = 0; x < 10; x++){
    that.stages[x] = new Array(10);
  }

  //スタート地点を置いたフラグこれがないと実行出来ないようにする
  this.putStartFlg = false;
  this.startObj = null;
  this.copyStartObj = null;
  this.putStartFlg = false;
  this.goalFlg = null;
  this.starMany = 0;
  this.startPos = {};

  //これで実行のcurrentStage管理 当たり判定　管理しやすい用にxId yId
  this.currentStage = new Array(10);
  for( var i = 0; i < 10; i++){
    this.currentStage[i] = new Array(10);
  }

  //実行前に戻す為の配列
  this.noneCollisionStages = new Array(10);
  for( var i = 0; i < 10; i++){
    this.noneCollisionStages[i] = new Array(10);
  }
  this.copyStage = [];
}
