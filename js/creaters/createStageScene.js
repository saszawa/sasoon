function createStageScene(){

  stageScene = new Scene();
  stageScene.initStage = function(){
    var that = this;
    this.star = 0;

    this.canTap = true;
    clearTimeout(this.endTimer);
    this.endTimer = null;
    this.cleared = false;

    this.removeChild(this.retryLabel);

    // ステージの初期化
    for(var i = 0; i < currentStage.length;i++){
      this.removeChild(currentStage[i]);
      delete currentStage[i];
    }
    currentStage = [];
    // 取得済みの星の削除
    if(this.stars){
      for(var i = 0; i < this.stars.length;i++){
        this.removeChild(this.stars[i]);
        delete this.stars[i];
      }
    }
    this.stars = [];

    // タイマーのセット
    var timer = new Timer();
    stageScene.addChild(timer);

    // ステージの読み込み
    STAGES[LEVEL].forEach(function(blockInfo){
      var block = StageBuilder(blockInfo);
      block.x = blockInfo.x*BOX_SIZE;
      block.y = blockInfo.y*BOX_SIZE;
      currentStage.push(block);
      that.addChild(block);
    });

  }
  stageScene.showResult = function(){
    var ResultGroup = new Result();
    this.addChild(ResultGroup);
    clearTimeout(this.endTimer);


    if(typeof userData[LEVEL] === 'undefined' || userData[LEVEL] < this.star){
      userData[LEVEL] = this.star;
    }
    localStorage.setItem("hal", JSON.stringify(userData));

  }
  stageScene.gameOver = function(){
    var GameOverGroup = new GameOver();
    stageScene.removeChild(stageScene.retryLabel);
    this.addChild(GameOverGroup);
  }

  // BOX構築
  for(var x = 0; x < 10; x++){
    for(var y = 0; y < 10; y++){
      var box = new Box();
      box.x = x*BOX_SIZE;
      box.y = y*BOX_SIZE;
      stageScene.addChild(box);
    }
  }

  return stageScene;

}
