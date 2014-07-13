var Creater =  function(color){
  this.penColor = color || 'white';
  //パイプ制御用
  this.pipeColor = "blue";
  this.stages = new Array(10);
  var that = this;
  //ステージ生成の元
  //TODO ここをdefineのstage配列に整形できるように定義し直す
  for(var x = 0; x < 10; x++){
    that.stages[x] = new Array(10);
  }
  //スタート地点を置いたフラグこれがないと実行出来ないようにする
  this.putStartFlg = false;
  this.startObj = null;
  this.putStartFlg = false;
  this.goalFlg = null;
  this.starMany = 0;
  this.startPos = {};

  //これで実行のcurrentStage管理
  this.currentStage = new Array(10);
}
