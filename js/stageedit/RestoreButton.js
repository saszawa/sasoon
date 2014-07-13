var RestoreButton = Class.create(ExLabel,{
  initialize: function(text,w,h){
    ExLabel.call(this,BOX_SIZE,BOX_SIZE);
    var width = w || 640;
    var height = h || 64;

    // DOMモード
    this._element = document.createElement('div');
    this._element.innerHTML = text;
  },
  ontouchstart: function(){
    var stageArray = creater.noneCollisionStages.concat();
    console.log("stageArray");
    console.log(stageArray);
    //一度も実行されていないなら
    if(stageArray == null){
      return;
    }
    //元に戻す
    GAME.currentScene.addChild(creater.startObj);
    //これは戻すたびに実体が増える前に解放する
    creater.currentStage = void 0;
    creater.currentStage = creater.copyStage.concat();
    
    for(var i = 0; i < stageArray.length; i++){
      //子パイプの方向決めオブジェクトを出さないようにする
      //TODO ここクラス名使わずに判定したい
      if(stageArray[i]._element.className.indexOf("pipeOut") != -1){
        stageArray[i].restoreFlg = true;
      }
      GAME.currentScene.addChild(stageArray[i]);
    }
    
    //スタート出来るようにする 
    creater.putStartFlg = true;
  },
  setClassName: function(className){
    this._element.className = className;
  }
});
