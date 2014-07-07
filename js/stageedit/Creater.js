var Creater =  function(color){
  this.penColor = color || 'white';
  this.stages = new Array(10);
  //スタートが置かれるまでは-1のまま
  this.startPin = -1;
  var that = this;
  //ステージ生成の元
  for(var x = 0; x < 10; x++){
    that.stages[x] = new Array(10);
  }
  //スタート地点を置いたフラグこれがないと実行出来ないようにする
  this.putStartFlg = false;
  this.startObj = null;

  //これで実行のcurrentStage管理
  this.currentStage = new Array(10);

}
