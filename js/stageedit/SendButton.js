var SendButton = Class.create(Sprite,{
  initialize: function(text,w,h){
    var width = w || 640;
    var height = h || 64;
    Sprite.call(this,width,height);

    this._element = document.createElement('div');
    this._element.innerHTML = text;
  },
  setClassName: function(className){
    this._element.className = className;
  },
  ontouchend: function sendJSON(){
    //スタートがないとだめ
    if(creater.startObj == null){
      alert(LANGUAGE[COUNTRYCODE].postStartNoneError);
      return;
    }else if(creater.goalFlg == null){
      //ゴールがないとだめ
      alert(LANGUAGE[COUNTRYCODE].postGoalNoneError);
      return;
    }else if(creater.starMany < 3){
      //星みっつ置いてないといけない
      alert(LANGUAGE[COUNTRYCODE].postStarManyError);
      return;
    }
 
    if(pipeManager.getPipeAnyError()){
      //パイプであり得ない状況があるかどうか
      alert(LANGUAGE[COUNTRYCODE].postPipeError);
      return;
    }
 
    makeJSON(creater.stages);
  }
});
