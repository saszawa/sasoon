var TestPlayButton = Class.create(ExLabel,{
  initialize: function(text,w,h){
    ExLabel.call(this,BOX_SIZE,BOX_SIZE);
    var width = w || 640;
    var height = h || 64;

    // DOMモード
    this._element = document.createElement('div');
    this._element.innerHTML = text;
  },
  ontouchstart: function(){
    //実行
    //パイプがちゃんと親と子供そろっているか確認
    for (pipeColor in pipeManager.pipeStatus){
      if(pipeManager.pipeStatus[pipeColor] == "parentPut" || pipeManager.pipeStatus[pipeColor] == "noneDirection"){
        alert(LANGUAGE[COUNTRYCODE].enterPipeError);
        return;
      }
    }

    //startが置いてあるかどうか
    if(!creater.putStartFlg){
      alert(LANGUAGE[COUNTRYCODE].enterStartError);
      return;
    }
    //まずはとっておく
    creater.copyStage = void 0;
    creater.copyStage = creater.currentStage.concat();
    creater.startObj.run();
  },
  setClassName: function(className){
    this._element.className = className;
  }
});
